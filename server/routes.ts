import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import fetch from "node-fetch";
import { storage } from "./storage";

const scryptAsync = promisify(scrypt);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

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
  app.use(session({
    secret: process.env.SESSION_SECRET || 'neural-matrix-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    }
  }));

  // Helper to find user
  const findUser = (id: number): User | undefined => users.find(u => u.id === id);
  const findUserByEmail = (email: string): User | undefined => users.find(u => u.email === email);

  // Auth middleware - supports both in-memory (number) and database (string) user IDs
  const requireAuth = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Check if user exists in either system
    if (typeof req.session.userId === 'number') {
      // In-memory user system
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
  // Register endpoint
  app.post("/api/register", async (req, res) => {
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

  // Login endpoint
  app.post("/api/login", async (req, res) => {
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
      const user = typeof req.session.userId === 'number' ? findUser(req.session.userId) : null;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If user already has active subscription, return existing
      if (user.subscriptionStatus === 'active' && user.subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
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
      let customerId = user.customerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
        });
        customerId = customer.id;
        user.customerId = customerId;
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

      // Update user
      user.subscriptionId = subscription.id;
      
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
    
    if (!config.clientId || !config.redirectUri) {
      return res.status(500).json({ 
        message: 'Discord OAuth not configured. Missing CLIENT_ID or REDIRECT_URI.' 
      });
    }

    const state = randomBytes(32).toString('hex');
    req.session.discordState = state;

    const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize');
    discordAuthUrl.searchParams.set('client_id', config.clientId);
    discordAuthUrl.searchParams.set('redirect_uri', config.redirectUri);
    discordAuthUrl.searchParams.set('response_type', 'code');
    discordAuthUrl.searchParams.set('scope', 'identify guilds');
    discordAuthUrl.searchParams.set('state', state);

    res.redirect(discordAuthUrl.toString());
  });

  // Discord OAuth callback endpoint
  app.get("/api/auth/discord/callback", async (req, res) => {
    try {
      const config = getDiscordConfig();
      const { code, state } = req.query;

      if (!config.clientId || !config.clientSecret || !config.redirectUri) {
        return res.status(500).json({ 
          message: 'Discord OAuth not configured properly' 
        });
      }

      // Verify state parameter
      if (!state || state !== req.session.discordState) {
        return res.status(400).json({ message: 'Invalid state parameter' });
      }

      if (!code) {
        return res.status(400).json({ message: 'Authorization code not provided' });
      }

      // Exchange code for access token
      const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
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
        console.error('Discord token exchange failed:', tokenResponse.status, tokenResponse.statusText);
        return res.status(400).json({ message: 'Failed to exchange authorization code' });
      }

      const tokenData = await tokenResponse.json() as { access_token: string };

      // Get user info
      const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      if (!userResponse.ok) {
        console.error('Failed to fetch Discord user info:', userResponse.status, userResponse.statusText);
        return res.status(400).json({ message: 'Failed to get user information' });
      }

      const discordUser = await userResponse.json() as {
        id: string;
        username: string;
        avatar: string | null;
        email?: string;
      };

      // Check guild membership if guild ID is configured
      let discordVerified = true; // Default to true if no guild check is configured
      if (config.guildId) {
        discordVerified = await checkGuildMembership(tokenData.access_token, config.guildId);
      }

      // Upsert user in database
      const user = await storage.upsertUserByDiscord(
        discordUser.id,
        discordUser.username,
        discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : '',
        discordVerified,
        discordUser.email
      );

      // Set session for traditional auth system (using user ID as string for database compatibility)
      req.session.userId = user.id; // Store the actual database user ID
      req.session.discordState = undefined; // Clear state

      // Redirect to frontend
      res.redirect('/'); // or wherever you want users to land after OAuth
    } catch (error) {
      console.error('Discord OAuth callback error:', error);
      res.status(500).json({ message: 'Internal server error during Discord authentication' });
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

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}