import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { setupAuth } from "./auth";

import { z } from "zod";

// Initialize Stripe only if secret key is provided
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Stripe subscription endpoint
  app.post('/api/get-or-create-subscription', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    if (!stripe) {
      return res.status(503).json({ 
        error: { message: 'Payment processing is not configured. Please contact administrator.' } 
      });
    }

    let user = req.user!;
    const { tier = 'operator' } = req.body;

    if (user.stripeSubscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
      
      if (subscription.latest_invoice && typeof subscription.latest_invoice === 'object') {
        const invoice = subscription.latest_invoice as Stripe.Invoice;
        const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;
        
        res.send({
          subscriptionId: subscription.id,
          clientSecret: paymentIntent?.client_secret,
        });
        return;
      }
    }
    
    if (!user.email) {
      return res.status(400).json({ error: { message: 'No user email on file' } });
    }

    try {
      let customer;
      if (user.stripeCustomerId) {
        customer = await stripe.customers.retrieve(user.stripeCustomerId);
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.username,
        });
        
        user = await storage.updateUserStripeInfo(user.id, customer.id);
      }

      // Price mapping for different tiers
      const priceMapping = {
        recruit: process.env.STRIPE_RECRUIT_PRICE_ID || 'price_recruit',
        operative: process.env.STRIPE_OPERATIVE_PRICE_ID || 'price_operative',
        operator: process.env.STRIPE_OPERATOR_PRICE_ID || 'price_operator', 
        shadow: process.env.STRIPE_SHADOW_PRICE_ID || 'price_shadow'
      };

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          price: priceMapping[tier as keyof typeof priceMapping] || priceMapping.operator,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      await storage.updateUserStripeInfo(user.id, customer.id, subscription.id);
      await storage.updateUserSubscriptionTier(user.id, tier);
  
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent;

      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
      });
    } catch (error: any) {
      return res.status(400).send({ error: { message: error.message } });
    }
  });



  // Admin endpoints
  app.get('/api/admin/stats', async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.sendStatus(403);
    }

    try {
      const stats = await storage.getSystemStats();
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
