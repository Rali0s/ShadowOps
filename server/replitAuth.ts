// Replit Auth integration using OpenID Connect
// Based on blueprint:javascript_log_in_with_replit

import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' && process.env.REPL_URL?.startsWith('https://'),
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  await storage.upsertReplitUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    try {
      const claims = tokens.claims();
      if (!claims?.sub) {
        throw new Error('Invalid claims: missing subject');
      }
      const user = { userId: claims.sub }; // Store userId for session
      updateUserSession(user, tokens);
      await upsertUser(claims);
      verified(null, user);
    } catch (error) {
      console.error('❌ Replit Auth verification error:', error);
      verified(error as Error);
    }
  };

  // Keep track of registered strategies
  const registeredStrategies = new Set<string>();

  // Get the proper callback URL for Replit Auth
  const getCallbackURL = () => {
    // In Replit, use REPLIT_DEV_DOMAIN or construct from slug/owner
    if (process.env.REPLIT_DEV_DOMAIN) {
      return `https://${process.env.REPLIT_DEV_DOMAIN}/api/callback`;
    }
    // Fallback: construct from REPL_SLUG and REPL_OWNER if available
    if (process.env.REPL_SLUG && process.env.REPL_OWNER) {
      return `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/api/callback`;
    }
    // Development fallback - this won't work for actual OAuth but prevents crashes
    return "http://localhost:5000/api/callback";
  };

  // Helper function to ensure strategy exists
  const ensureStrategy = () => {
    const strategyName = 'replitauth';
    if (!registeredStrategies.has(strategyName)) {
      const callbackURL = getCallbackURL();
      console.log('🟡 Registering Replit Auth strategy with callback:', callbackURL);
      const strategy = new Strategy(
        {
          name: strategyName,
          config,
          scope: "openid email profile offline_access",
          callbackURL,
        },
        verify,
      );
      passport.use(strategy);
      registeredStrategies.add(strategyName);
    }
  };

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser(async (user: Express.User, cb) => {
    // Populate session.userId for compatibility with existing routes
    const userObj = user as any;
    if (userObj.userId) {
      // Session userId will be available via req.user.userId
      cb(null, userObj);
    } else {
      cb(null, user);
    }
  });

  app.get("/api/login", (req, res, next) => {
    try {
      console.log('🟡 Replit Auth login attempt');
      ensureStrategy();
      console.log('🟡 Calling passport.authenticate...');
      
      const authMiddleware = passport.authenticate('replitauth', {
        prompt: "login consent",
        scope: ["openid", "email", "profile", "offline_access"],
      });
      
      console.log('🟡 Auth middleware created, executing...');
      authMiddleware(req, res, (err: any) => {
        if (err) {
          console.error('❌ Passport authenticate error:', err);
          return res.status(500).json({ error: 'Authentication failed', details: err.message });
        }
        next(err);
      });
    } catch (error) {
      console.error('❌ Replit Auth login error:', error);
      res.status(500).json({ error: 'Authentication initialization failed', details: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.get("/api/callback", (req, res, next) => {
    ensureStrategy();
    passport.authenticate('replitauth', {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    const postLogoutUri = process.env.REPLIT_DEV_DOMAIN 
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : `${req.protocol}://${req.hostname}`;
      
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: postLogoutUri,
        }).href
      );
    });
  });

  // Get current user endpoint
  app.get("/api/auth/user", async (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user as any;
      const claims = user.claims;
      
      if (!claims?.sub) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Fetch user from database
      const dbUser = await storage.getUser(claims.sub);
      
      if (!dbUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Return user data with subscription info
      // Map database fields to frontend expected format
      const subscriptionStatus = dbUser.stripeSubscriptionId ? 'active' : 'inactive';
      
      res.json({
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        profileImageUrl: dbUser.profileImageUrl,
        subscriptionStatus: subscriptionStatus,
        subscriptionTier: dbUser.subscriptionTier || 'none',
        subscriptionId: dbUser.stripeSubscriptionId,
        discordId: dbUser.discordId,
        discordUsername: dbUser.discordUsername,
        discordAvatar: dbUser.discordAvatar,
        discordVerified: dbUser.discordVerified,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
