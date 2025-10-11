import Stripe from 'stripe';
import { getStripeConfig } from './config';
import { logger } from './logger';
import { storage } from './storage';

const stripeConfig = getStripeConfig();

// Initialize Stripe with production-ready configuration
export const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
  telemetry: false, // Disable telemetry in production
});

export interface CreateSubscriptionParams {
  userId: string;
  email: string;
  priceId?: string;
  metadata?: Record<string, string>;
}

export interface SubscriptionResult {
  subscriptionId: string;
  clientSecret: string | null;
  status: string;
}

/**
 * Service class for Stripe operations with proper error handling
 */
export class StripeService {
  /**
   * Create or retrieve a Stripe customer
   */
  async createOrGetCustomer(userId: string, email: string): Promise<string> {
    try {
      // Check if user already has a Stripe customer ID
      const user = await storage.getUser(userId);
      
      if (user?.stripeCustomerId) {
        logger.debug('Retrieved existing Stripe customer', { 
          userId, 
          customerId: user.stripeCustomerId 
        });
        return user.stripeCustomerId;
      }
      
      // Create new customer
      const customer = await stripe.customers.create({
        email,
        metadata: {
          userId,
          platform: 'shadowfang',
          created: new Date().toISOString(),
        },
      });
      
      // Save customer ID to database
      await storage.updateUserStripeInfo(userId, customer.id);
      
      logger.info('Created new Stripe customer', {
        userId,
        customerId: customer.id,
        email,
      });
      
      return customer.id;
    } catch (error) {
      logger.error('Failed to create/get Stripe customer', error);
      throw error;
    }
  }
  
  /**
   * Create a subscription with proper Discord bypass handling
   */
  async createSubscription(params: CreateSubscriptionParams): Promise<SubscriptionResult> {
    try {
      const { userId, email, priceId = stripeConfig.priceId, metadata = {} } = params;
      
      // Get or create customer
      const customerId = await this.createOrGetCustomer(userId, email);
      
      // Check if user already has an active subscription
      const user = await storage.getUser(userId);
      if (user?.stripeSubscriptionId) {
        const existingSubscription = await stripe.subscriptions.retrieve(
          user.stripeSubscriptionId
        );
        
        if (existingSubscription.status === 'active') {
          logger.info('User already has active subscription', {
            userId,
            subscriptionId: existingSubscription.id,
          });
          
          const invoice = await stripe.invoices.retrieve(
            existingSubscription.latest_invoice as string,
            { expand: ['payment_intent'] }
          ) as Stripe.Invoice & { payment_intent?: Stripe.PaymentIntent };
          
          return {
            subscriptionId: existingSubscription.id,
            clientSecret: invoice.payment_intent?.client_secret || null,
            status: 'already_active',
          };
        }
      }
      
      // Create new subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId,
          ...metadata,
        },
      });
      
      // Update user with subscription ID
      await storage.updateUserStripeInfo(userId, customerId, subscription.id);
      
      logger.success('Created new subscription', {
        userId,
        subscriptionId: subscription.id,
        customerId,
      });
      
      const latestInvoice = subscription.latest_invoice as Stripe.Invoice & { 
        payment_intent?: Stripe.PaymentIntent 
      };
      
      return {
        subscriptionId: subscription.id,
        clientSecret: latestInvoice.payment_intent?.client_secret || null,
        status: 'created',
      };
    } catch (error) {
      logger.error('Failed to create subscription', error);
      throw error;
    }
  }
  
  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
      
      logger.info('Subscription cancelled', { subscriptionId });
    } catch (error) {
      logger.error('Failed to cancel subscription', error);
      throw error;
    }
  }
  
  /**
   * Process webhook events with proper error handling
   */
  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    logger.info('Processing Stripe webhook', { 
      type: event.type, 
      id: event.id 
    });
    
    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdate(
            event.data.object as Stripe.Subscription
          );
          break;
          
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(
            event.data.object as Stripe.Subscription
          );
          break;
          
        case 'invoice.payment_succeeded':
          await this.handlePaymentSucceeded(
            event.data.object as Stripe.Invoice
          );
          break;
          
        case 'invoice.payment_failed':
          await this.handlePaymentFailed(
            event.data.object as Stripe.Invoice
          );
          break;
          
        default:
          logger.debug('Unhandled webhook event type', { type: event.type });
      }
    } catch (error) {
      logger.error('Webhook processing error', error);
      throw error;
    }
  }
  
  private async handleSubscriptionUpdate(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) {
      logger.warn('Subscription update without userId metadata', {
        subscriptionId: subscription.id,
      });
      return;
    }
    
    const tier = subscription.status === 'active' ? 'elite' : 'beta';
    await storage.updateUserSubscriptionTier(userId, tier);
    
    logger.info('Updated user subscription tier', {
      userId,
      subscriptionId: subscription.id,
      tier,
      status: subscription.status,
    });
  }
  
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) {
      logger.warn('Subscription deleted without userId metadata', {
        subscriptionId: subscription.id,
      });
      return;
    }
    
    await storage.updateUserSubscriptionTier(userId, 'none');
    
    logger.info('User subscription cancelled', {
      userId,
      subscriptionId: subscription.id,
    });
  }
  
  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    logger.info('Payment succeeded', {
      invoiceId: invoice.id,
      customerId: invoice.customer,
      amount: invoice.amount_paid,
    });
  }
  
  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    logger.error('Payment failed', {
      invoiceId: invoice.id,
      customerId: invoice.customer,
      amount: invoice.amount_due,
    });
  }
}

// Export singleton instance
export const stripeService = new StripeService();