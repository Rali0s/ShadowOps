import express, { type Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual, webcrypto } from "crypto";
import { promisify } from "util";
import fetch from "node-fetch";
import { storage } from "./storage";

const scryptAsync = promisify(scrypt);

// Discord signature verification function
async function verifyDiscordSignature(
  signature: string,
  timestamp: string,
  body: string,
  publicKey: string
): Promise<boolean> {
  try {
    
    // Convert signature from hex to Uint8Array
    const sig = new Uint8Array(Buffer.from(signature, 'hex'));
    
    // Convert public key from hex to Uint8Array
    const key = new Uint8Array(Buffer.from(publicKey, 'hex'));
    
    // Create message to verify (timestamp + body)
    const message = new TextEncoder().encode(timestamp + body);
    
    // Import the public key
    const cryptoKey = await webcrypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'Ed25519',
        namedCurve: 'Ed25519',
      },
      false,
      ['verify']
    );
    
    // Verify the signature
    const isValid = await webcrypto.subtle.verify(
      'Ed25519',
      cryptoKey,
      sig,
      message
    );
    
    return isValid;
  } catch (error) {
    console.error('Discord signature verification error:', error);
    return false;
  }
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

// Discord environment variable validation
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY?.trim();
if (!DISCORD_PUBLIC_KEY) {
  throw new Error('Missing required: DISCORD_PUBLIC_KEY');
}
console.log('✅ Discord public key loaded:', DISCORD_PUBLIC_KEY.length, 'characters');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

// In-memory user storage for this demo
interface User {
  id: number;
  email: string;
  password: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscriptionId?: string;
  customerId?: string;
  trialEndsAt?: Date;
  createdAt: Date;
}

let users: User[] = [];
let userIdCounter = 1;

// Password hashing
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Extend Express session types
declare module 'express-session' {
  interface SessionData {
    userId?: number | string; // Support both in-memory (number) and database (string) IDs
    discordState?: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Session middleware
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is required for production');
  }

  // Determine if we're on Replit (check for .replit.app domain)
  const isReplit = process.env.REPL_URL || (process.env.NODE_ENV === 'production');
  
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId', // Give the session cookie a specific name
    cookie: {
      secure: false, // Set to false for Replit compatibility
      httpOnly: true, // Prevent XSS attacks
      sameSite: 'lax', // Use 'lax' for better compatibility with OAuth flows
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      // Don't set domain explicitly - let the browser handle it
    }
  }));

  // Helper to find user
  const findUser = (id: number): User | undefined => users.find(u => u.id === id);
  const findUserByEmail = (email: string): User | undefined => users.find(u => u.email === email);

  // Auth middleware - supports both in-memory (dev) and database (production) user IDs
  const requireAuth = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ 
        message: 'Authentication required',
        redirectTo: process.env.NODE_ENV === 'production' ? '/api/auth/discord/login' : null
      });
    }

    // In production, only allow database users (Discord OAuth)
    if (process.env.NODE_ENV === 'production' && typeof req.session.userId === 'number') {
      return res.status(401).json({ 
        message: 'Please login with Discord OAuth',
        redirectTo: '/api/auth/discord/login'
      });
    }

    // Check if user exists in either system
    if (typeof req.session.userId === 'number') {
      // In-memory user system (development only)
      if (!findUser(req.session.userId)) {
        return res.status(401).json({ message: 'Authentication required' });
      }
    } else {
      // Database user system (Discord OAuth users)
      try {
        const dbUser = await storage.getUser(req.session.userId);
        if (!dbUser) {
          return res.status(401).json({ message: 'Authentication required' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Authentication required' });
      }
    }
    
    next();
  };
  // Register endpoint - Disabled in production (Discord OAuth only)
  app.post("/api/register", async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ 
        message: 'Email/password registration is disabled in production. Please use Discord OAuth.',
        redirectTo: '/api/auth/discord/login'
      });
    }
    
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      // Check if user already exists
      if (findUserByEmail(email)) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Create user with trial
      const hashedPassword = await hashPassword(password);
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7); // 7-day trial

      const newUser: User = {
        id: userIdCounter++,
        email,
        password: hashedPassword,
        subscriptionStatus: 'trial',
        trialEndsAt,
        createdAt: new Date(),
      };

      users.push(newUser);
      req.session.userId = newUser.id;
      
      // Return user without password
      const { password: _, ...userResponse } = newUser;
      res.status(201).json(userResponse);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Login endpoint - Disabled in production (Discord OAuth only)
  app.post("/api/login", async (req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ 
        message: 'Email/password login is disabled in production. Please use Discord OAuth.',
        redirectTo: '/api/auth/discord/login'
      });
    }
    
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password required' });
      }

      const user = findUserByEmail(email);
      if (!user || !(await comparePasswords(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      req.session.userId = user.id;
      
      // Return user without password
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get current user
  app.get("/api/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    // Try to get user from database first (for Discord users)
    try {
      const dbUser = await storage.getUser(req.session.userId.toString());
      if (dbUser) {
        // Return database user with Discord fields
        const { password: _, ...userResponse } = dbUser;
        return res.json({
          ...userResponse,
          // Map database user to match expected format
          subscriptionStatus: dbUser.subscriptionTier === 'none' ? 'inactive' : 'active',
          discordId: dbUser.discordId,
          discordUsername: dbUser.discordUsername,
          discordAvatar: dbUser.discordAvatar,
          discordVerified: dbUser.discordVerified
        });
      }
    } catch (error) {
      console.error('Error fetching database user:', error);
    }

    // Fallback to in-memory user system
    const user = typeof req.session.userId === 'number' ? findUser(req.session.userId) : null;
    if (!user) {
      req.session.userId = undefined;
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if trial has expired
    if (user.subscriptionStatus === 'trial' && user.trialEndsAt && new Date() > user.trialEndsAt) {
      user.subscriptionStatus = 'inactive';
    }

    // Return user without password, but include Discord fields (will be null for non-Discord users)
    const { password: _, ...userResponse } = user;
    res.json({
      ...userResponse,
      discordId: null,
      discordUsername: null,
      discordAvatar: null,
      discordVerified: false
    });
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Create subscription
  app.post("/api/create-subscription", requireAuth, async (req, res) => {
    try {
      // In production, only work with database users (Discord OAuth)
      if (process.env.NODE_ENV === 'production' && typeof req.session.userId === 'number') {
        return res.status(403).json({ 
          message: 'Subscription creation requires Discord OAuth authentication',
          redirectTo: '/api/auth/discord/login'
        });
      }
      
      // Get user from appropriate system
      let user: User | any = null;
      let isDbUser = false;
      
      if (typeof req.session.userId === 'number') {
        // In-memory user system
        user = findUser(req.session.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      } else if (typeof req.session.userId === 'string') {
        // Database user system
        try {
          user = await storage.getUser(req.session.userId);
          isDbUser = true;
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          return res.status(500).json({ message: 'Failed to fetch user data' });
        }
      } else {
        return res.status(401).json({ message: 'Invalid user session' });
      }

      // Check subscription status - handle both user types
      const userSubscriptionStatus = isDbUser ? 
        (user.subscriptionTier === 'none' ? 'inactive' : 'active') : 
        user.subscriptionStatus;
      const userSubscriptionId = isDbUser ? user.stripeSubscriptionId : user.subscriptionId;
      
      // If user already has active subscription, return existing
      if (userSubscriptionStatus === 'active' && userSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(userSubscriptionId);
        const invoice = await stripe.invoices.retrieve(subscription.latest_invoice as string, {
          expand: ['payment_intent']
        }) as Stripe.Invoice & {
          payment_intent?: Stripe.PaymentIntent;
        };
        
        return res.json({
          subscriptionId: subscription.id,
          clientSecret: invoice.payment_intent?.client_secret,
        });
      }

      // Create Stripe customer if needed
      const userCustomerId = isDbUser ? user.stripeCustomerId : user.customerId;
      let customerId = userCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
        });
        customerId = customer.id;
        
        // Update user with customer ID
        if (isDbUser) {
          // For database users, we'd need to update via storage - but this is a simplified demo
          // In a real app, you'd call storage.updateUser() here
        } else {
          user.customerId = customerId;
        }
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: process.env.STRIPE_PRICE_ID,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with subscription ID
      if (isDbUser) {
        // For database users, we'd need to update via storage - but this is a simplified demo
        // In a real app, you'd call storage.updateUser() here
      } else {
        user.subscriptionId = subscription.id;
      }
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret: ((subscription.latest_invoice as any)?.payment_intent as Stripe.PaymentIntent)?.client_secret,
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      res.status(500).json({ message: error.message || 'Failed to create subscription' });
    }
  });

  // Stripe webhook handler (for subscription updates)
  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle subscription events
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string | Stripe.Subscription };
        if (invoice.subscription) {
          // Find user by subscription ID and update status
          const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription.id;
          const user = users.find(u => u.subscriptionId === subscriptionId);
          if (user) {
            user.subscriptionStatus = 'active';
          }
        }
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice & { subscription?: string | Stripe.Subscription };
        if (failedInvoice.subscription) {
          const subscriptionId = typeof failedInvoice.subscription === 'string' ? failedInvoice.subscription : failedInvoice.subscription.id;
          const user = users.find(u => u.subscriptionId === subscriptionId);
          if (user) {
            user.subscriptionStatus = 'inactive';
          }
        }
        break;

      case 'customer.subscription.deleted':
        const cancelledSubscription = event.data.object as Stripe.Subscription;
        const user = users.find(u => u.subscriptionId === cancelledSubscription.id);
        if (user) {
          user.subscriptionStatus = 'cancelled';
        }
        break;
    }

    res.json({ received: true });
  });

  // Discord OAuth environment variables check
  const getDiscordConfig = () => {
    return {
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      redirectUri: process.env.DISCORD_REDIRECT_URI || `${process.env.REPL_URL || 'http://localhost:5000'}/api/auth/discord/callback`,
      guildId: process.env.DISCORD_GUILD_ID,
      betaEndAt: process.env.BETA_END_AT
    };
  };

  // Helper function to check Discord guild membership
  const checkGuildMembership = async (accessToken: string, guildId: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch Discord guilds:', response.status, response.statusText);
        return false;
      }

      const guilds = await response.json() as Array<{ id: string }>;
      return guilds.some(guild => guild.id === guildId);
    } catch (error) {
      console.error('Error checking guild membership:', error);
      return false;
    }
  };

  // Beta status endpoint
  app.get("/api/beta-status", (req, res) => {
    const config = getDiscordConfig();
    
    if (!config.betaEndAt) {
      return res.json({ 
        endsAt: null, 
        expired: false,
        message: 'Beta end date not configured' 
      });
    }

    const betaEndDate = new Date(config.betaEndAt);
    const now = new Date();
    const expired = now > betaEndDate;

    res.json({
      endsAt: betaEndDate.toISOString(),
      expired,
      message: expired ? 'Beta period has ended' : 'Beta period is active'
    });
  });

  // Discord OAuth login endpoint
  app.get("/api/auth/discord/login", (req, res) => {
    const config = getDiscordConfig();
    
    console.log('🔵 Discord OAuth Login - Start', {
      sessionId: req.sessionID,
      hasSession: !!req.session,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'],
      host: req.headers['host']
    });
    
    if (!config.clientId || !config.redirectUri) {
      return res.status(500).json({ 
        message: 'Discord OAuth not configured. Missing CLIENT_ID or REDIRECT_URI.' 
      });
    }

    const state = randomBytes(32).toString('hex');
    req.session.discordState = state;
    
    // Force session save to ensure it persists
    req.session.save((err) => {
      if (err) {
        console.error('❌ Session save error:', err);
      } else {
        console.log('✅ Session saved successfully');
      }
    });

    console.log('🔵 Discord OAuth Login - Generated State', {
      state: state,
      sessionDiscordState: req.session.discordState,
      sessionId: req.sessionID,
      redirectUri: config.redirectUri
    });

    const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize');
    discordAuthUrl.searchParams.set('client_id', config.clientId);
    discordAuthUrl.searchParams.set('redirect_uri', config.redirectUri);
    discordAuthUrl.searchParams.set('response_type', 'code');
    discordAuthUrl.searchParams.set('scope', 'identify guilds');
    discordAuthUrl.searchParams.set('state', state);

    console.log('🔵 Redirecting to Discord:', discordAuthUrl.toString());
    res.redirect(discordAuthUrl.toString());
  });

  // Discord OAuth callback endpoint
  app.get("/api/auth/discord/callback", async (req, res) => {
    try {
      console.log('🟢 Discord OAuth Callback - Start', {
        sessionId: req.sessionID,
        hasSession: !!req.session,
        sessionDiscordState: req.session?.discordState,
        userAgent: req.headers['user-agent'],
        referer: req.headers['referer'],
        host: req.headers['host'],
        cookies: req.headers.cookie
      });
      
      const config = getDiscordConfig();
      const { code, state } = req.query;

      console.log('🟢 Discord OAuth Callback - Parameters', {
        code: code ? 'present' : 'missing',
        state: state,
        sessionState: req.session?.discordState,
        stateMatch: state === req.session?.discordState
      });

      if (!config.clientId || !config.clientSecret || !config.redirectUri) {
        console.error('❌ Discord OAuth configuration missing:', {
          hasClientId: !!config.clientId,
          hasClientSecret: !!config.clientSecret,
          hasRedirectUri: !!config.redirectUri
        });
        return res.status(500).json({ 
          message: 'Discord OAuth not configured properly' 
        });
      }

      // Verify state parameter
      if (!state || state !== req.session.discordState) {
        console.error('❌ State parameter validation failed', {
          providedState: state,
          sessionState: req.session?.discordState,
          hasSession: !!req.session,
          sessionId: req.sessionID,
          sessionKeys: req.session ? Object.keys(req.session) : 'no session'
        });
        return res.status(400).json({ 
          message: 'Invalid state parameter',
          debug: process.env.NODE_ENV === 'development' ? {
            providedState: state,
            sessionState: req.session?.discordState,
            sessionId: req.sessionID
          } : undefined
        });
      }

      console.log('✅ State parameter validation passed');

      if (!code) {
        console.error('❌ Authorization code not provided');
        return res.status(400).json({ message: 'Authorization code not provided' });
      }

      // Exchange code for access token
      console.log('🟡 Exchanging code for access token...');
      let tokenResponse;
      try {
        tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            client_id: config.clientId,
            client_secret: config.clientSecret,
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: config.redirectUri
          })
        });

        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          console.error('❌ Discord token exchange failed:', {
            status: tokenResponse.status,
            statusText: tokenResponse.statusText,
            error: errorText
          });
          return res.status(400).json({ message: 'Failed to exchange authorization code' });
        }
      } catch (error) {
        console.error('❌ Error during token exchange request:', error);
        return res.status(500).json({ message: 'Network error during token exchange' });
      }

      let tokenData;
      try {
        tokenData = await tokenResponse.json() as { access_token: string };
        console.log('✅ Token exchange successful');
      } catch (error) {
        console.error('❌ Error parsing token response:', error);
        return res.status(500).json({ message: 'Invalid token response from Discord' });
      }

      // Get user info
      console.log('🟡 Fetching Discord user info...');
      let userResponse;
      try {
        userResponse = await fetch('https://discord.com/api/users/@me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          console.error('❌ Failed to fetch Discord user info:', {
            status: userResponse.status,
            statusText: userResponse.statusText,
            error: errorText
          });
          return res.status(400).json({ message: 'Failed to get user information' });
        }
      } catch (error) {
        console.error('❌ Error during user info request:', error);
        return res.status(500).json({ message: 'Network error during user info fetch' });
      }

      let discordUser;
      try {
        discordUser = await userResponse.json() as {
          id: string;
          username: string;
          avatar: string | null;
          email?: string;
        };
        console.log('✅ Discord user info fetched:', {
          id: discordUser.id,
          username: discordUser.username,
          hasEmail: !!discordUser.email
        });
      } catch (error) {
        console.error('❌ Error parsing user info response:', error);
        return res.status(500).json({ message: 'Invalid user info response from Discord' });
      }

      // Check guild membership if guild ID is configured
      console.log('🟡 Checking guild membership...');
      let discordVerified = true; // Default to true if no guild check is configured
      if (config.guildId) {
        try {
          discordVerified = await checkGuildMembership(tokenData.access_token, config.guildId);
          console.log('✅ Guild membership check completed:', { discordVerified });
        } catch (error) {
          console.error('❌ Error checking guild membership:', error);
          // Don't fail the entire flow, just set as unverified
          discordVerified = false;
        }
      } else {
        console.log('ℹ️ No guild ID configured, skipping guild check');
      }

      // Upsert user in database
      console.log('🟡 Upserting user in database...');
      let user;
      try {
        user = await storage.upsertUserByDiscord(
          discordUser.id,
          discordUser.username,
          discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : '',
          discordVerified,
          discordUser.email
        );
        console.log('✅ User upserted successfully:', { userId: user.id, username: user.username });
      } catch (error) {
        console.error('❌ Error upserting user in database:', error);
        return res.status(500).json({ message: 'Database error during user creation' });
      }

      // Set session for traditional auth system (using user ID as string for database compatibility)
      console.log('🟡 Setting user session...');
      try {
        req.session.userId = user.id; // Store the actual database user ID
        req.session.discordState = undefined; // Clear state
        
        // Force session save to ensure it persists
        await new Promise<void>((resolve, reject) => {
          req.session.save((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        console.log('✅ Session set successfully');
      } catch (error) {
        console.error('❌ Error setting session:', error);
        return res.status(500).json({ message: 'Session error during authentication' });
      }

      // Redirect to frontend
      console.log('✅ Discord OAuth callback completed successfully, redirecting to /');
      res.redirect('/');
    } catch (error) {
      console.error('❌ Unexpected error in Discord OAuth callback:', error);
      // Log the full error details
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      res.status(500).json({ 
        message: 'Internal server error during Discord authentication',
        ...(process.env.NODE_ENV === 'development' && { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        })
      });
    }
  });

  // Recheck Discord verification endpoint
  app.post("/api/recheck-discord", requireAuth, async (req, res) => {
    try {
      const config = getDiscordConfig();
      if (!config.guildId) {
        return res.status(400).json({ message: 'Guild verification not configured' });
      }

      // Check if user exists in either system
      let user = null;
      if (typeof req.session.userId === 'number') {
        user = findUser(req.session.userId);
      } else if (req.session.userId) {
        user = await storage.getUser(req.session.userId);
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // For recheck, we'd need the user to go through OAuth again to get a fresh token
      // This is a simplified version that redirects to re-authenticate
      res.json({ 
        message: 'To recheck Discord verification, please use the Discord login flow again',
        discordLoginUrl: '/api/auth/discord/login'
      });
    } catch (error) {
      console.error('Discord recheck error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Discord Interactions endpoint handler (shared logic)
  const discordInteractionsHandler = async (req: any, res: any) => {
    try {
      // Parse the raw body for logging and processing
      let parsedBody;
      try {
        parsedBody = JSON.parse(req.body.toString());
      } catch (parseError) {
        console.error('❌ Failed to parse Discord interaction body:', parseError);
        return res.status(400).json({ error: 'Invalid JSON body' });
      }

      console.log('🟣 Discord interaction received:', {
        headers: req.headers,
        body: parsedBody
      });

      // Verify Discord signature
      const signature = req.headers['x-signature-ed25519'] as string;
      const timestamp = req.headers['x-signature-timestamp'] as string;

      if (!signature || !timestamp) {
        console.error('❌ Missing Discord signature or timestamp headers');
        return res.status(401).json({ error: 'Missing signature headers' });
      }

      // Use the raw body string for signature verification (exactly as Discord sent it)
      const rawBodyString = req.body.toString();
      const isValidRequest = await verifyDiscordSignature(
        signature,
        timestamp,
        rawBodyString,
        DISCORD_PUBLIC_KEY! // Non-null assertion since we validated it exists at startup
      );

      if (!isValidRequest) {
        console.error('❌ Invalid Discord signature');
        return res.status(401).json({ error: 'Invalid request signature' });
      }

      console.log('✅ Discord signature verified');

      const interaction = parsedBody;

      // Handle different interaction types
      switch (interaction.type) {
        case 1: // PING
          console.log('🏓 Discord PING interaction');
          return res.json({ type: 1 }); // PONG

        case 2: // APPLICATION_COMMAND
          console.log('🎯 Discord application command:', interaction.data?.name);
          return res.json({
            type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
            data: {
              content: `Hello from _Fq neurohacker! Command: ${interaction.data?.name || 'unknown'}`,
              flags: 64 // EPHEMERAL
            }
          });

        case 3: // MESSAGE_COMPONENT
          console.log('🔘 Discord message component interaction');
          return res.json({
            type: 4,
            data: {
              content: 'Component interaction received!',
              flags: 64
            }
          });

        default:
          console.log('❓ Unknown Discord interaction type:', interaction.type);
          return res.json({
            type: 4,
            data: {
              content: 'Unknown interaction type',
              flags: 64
            }
          });
      }
    } catch (error) {
      console.error('❌ Discord interactions error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Discord Interactions endpoint routes (both /api/discord/interactions and /discord/interactions)
  // Use raw body middleware specifically for Discord interactions to preserve exact body for signature verification
  app.post("/api/discord/interactions", express.raw({ type: 'application/json' }), discordInteractionsHandler);
  app.post("/discord/interactions", express.raw({ type: 'application/json' }), discordInteractionsHandler);
  
  // Add GET handlers to return proper 405 Method Not Allowed instead of SPA fallback
  app.get("/api/discord/interactions", (req, res) => {
    res.status(405).json({ error: "Method Not Allowed", message: "Use POST for Discord interactions" });
  });
  app.get("/discord/interactions", (req, res) => {
    res.status(405).json({ error: "Method Not Allowed", message: "Use POST for Discord interactions" });
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}