import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import { setupAuth } from "./auth";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication for subscription management
  setupAuth(app);
  
  // Simple health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "operational",
      mode: "open_access",
      timestamp: new Date().toISOString(),
      brainwaveSystem: "active",
      frequencyBands: ["alpha", "beta", "theta", "gamma"]
    });
  });

  // Mock admin stats for dashboard
  app.get("/api/admin/stats", (req, res) => {
    res.json({
      totalSessions: 1247,
      activeUsers: 89,
      totalFrequencyAnalyses: 5634,
      systemUptime: "99.9%",
      averageSessionLength: "45 minutes",
      popularFrequencies: {
        alpha: 34,
        beta: 28,
        theta: 25,
        gamma: 13
      }
    });
  });

  // Brainwave frequency data endpoint
  app.get("/api/frequencies", (req, res) => {
    res.json([
      {
        id: 1,
        name: "Alpha",
        range: "8-12 Hz",
        description: "Relaxed wakefulness and creative flow state",
        color: "#ff6b6b",
        available: true
      },
      {
        id: 2,
        name: "Beta", 
        range: "12-30 Hz",
        description: "Alert analytical thinking and problem-solving",
        color: "#4ecdc4",
        available: true
      },
      {
        id: 3,
        name: "Theta",
        range: "4-8 Hz", 
        description: "Deep processing and creative insights",
        color: "#45b7d1",
        available: true
      },
      {
        id: 4,
        name: "Gamma",
        range: "30-100+ Hz",
        description: "Peak cognitive performance and consciousness",
        color: "#96ceb4",
        available: true
      }
    ]);
  });

  // Neurohacker subscription endpoint
  app.post('/api/subscribe-neurohacker', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    let user = req.user;

    if (user.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      if (subscription.status === 'active') {
        return res.json({
          subscriptionId: subscription.id,
          status: 'already_subscribed',
          message: 'Already subscribed to neurohacker tier'
        });
      }
    }
    
    if (!user.email) {
      return res.status(400).json({ error: 'Email required for subscription' });
    }

    try {
      let customer;
      if (user.stripeCustomerId) {
        customer = await stripe.customers.retrieve(user.stripeCustomerId);
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.username,
          metadata: {
            userId: user.id,
            tier: 'neurohacker'
          }
        });
        user = await storage.updateUserStripeInfo(user.id, customer.id);
      }

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: process.env.STRIPE_PRICE_ID,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: user.id,
          tier: 'neurohacker'
        }
      });

      await storage.updateUserStripeInfo(user.id, customer.id, subscription.id);
      await storage.updateUserSubscriptionTier(user.id, 'neurohacker');
  
      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
        status: 'subscription_created'
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      return res.status(400).json({ error: error.message });
    }
  });

  // Check subscription status
  app.get('/api/subscription-status', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.json({ tier: 'free', subscribed: false });
    }

    const user = req.user;
    if (!user.stripeSubscriptionId) {
      return res.json({ tier: 'free', subscribed: false });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      const isActive = subscription.status === 'active';
      
      if (isActive && user.subscriptionTier !== 'neurohacker') {
        await storage.updateUserSubscriptionTier(user.id, 'neurohacker');
      } else if (!isActive && user.subscriptionTier === 'neurohacker') {
        await storage.updateUserSubscriptionTier(user.id, 'free');
      }

      res.json({
        tier: isActive ? 'neurohacker' : 'free',
        subscribed: isActive,
        status: subscription.status,
        currentPeriodEnd: (subscription as any).current_period_end
      });
    } catch (error) {
      console.error('Subscription status error:', error);
      res.json({ tier: 'free', subscribed: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}