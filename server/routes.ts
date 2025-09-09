import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil" as any,
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
    userId?: number;
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

  // Auth middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId || !findUser(req.session.userId)) {
      return res.status(401).json({ message: 'Authentication required' });
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
  app.get("/api/user", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = findUser(req.session.userId);
    if (!user) {
      req.session.userId = undefined;
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if trial has expired
    if (user.subscriptionStatus === 'trial' && user.trialEndsAt && new Date() > user.trialEndsAt) {
      user.subscriptionStatus = 'inactive';
    }

    // Return user without password
    const { password: _, ...userResponse } = user;
    res.json(userResponse);
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
      const user = findUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // If user already has active subscription, return existing
      if (user.subscriptionStatus === 'active' && user.subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
        const invoice = await stripe.invoices.retrieve(subscription.latest_invoice as string, {
          expand: ['payment_intent']
        });
        
        return res.json({
          subscriptionId: subscription.id,
          clientSecret: (invoice.payment_intent as any)?.client_secret,
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
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
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
        const invoice = event.data.object;
        if (invoice.subscription) {
          // Find user by subscription ID and update status
          const user = users.find(u => u.subscriptionId === invoice.subscription);
          if (user) {
            user.subscriptionStatus = 'active';
          }
        }
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        if (failedInvoice.subscription) {
          const user = users.find(u => u.subscriptionId === failedInvoice.subscription);
          if (user) {
            user.subscriptionStatus = 'inactive';
          }
        }
        break;

      case 'customer.subscription.deleted':
        const cancelledSubscription = event.data.object;
        const user = users.find(u => u.subscriptionId === cancelledSubscription.id);
        if (user) {
          user.subscriptionStatus = 'cancelled';
        }
        break;
    }

    res.json({ received: true });
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}