import { Request, Response, NextFunction } from 'express';
import { storage } from '../storage';
import { logger } from '../logger';
import { getBetaStatus } from '../config';

export interface PaymentBypassConfig {
  discordBypassEnabled: boolean;
  betaBypassEnabled: boolean;
  requireGuildMembership: boolean;
  bypassTiers: string[];
}

// Default configuration for payment bypass
const defaultConfig: PaymentBypassConfig = {
  discordBypassEnabled: true, // Discord verified users get free access
  betaBypassEnabled: true, // Beta users get free access during beta period
  requireGuildMembership: true, // Must be in the Discord guild
  bypassTiers: ['beta', 'elite', 'shadow'], // Tiers that bypass payment
};

/**
 * Payment Bypass Portal Middleware
 * This middleware determines if a user can bypass Stripe payment requirements
 * 
 * Bypass conditions:
 * 1. Discord verified + guild member = Free lifetime access or beta pricing
 * 2. Beta period active + Discord verified = Free access
 * 3. Special tier status (elite, shadow) = Free access
 */
export const checkPaymentBypass = async (
  req: Request & { session: any },
  res: Response,
  next: NextFunction
) => {
  try {
    // Skip bypass check if no user is authenticated
    if (!req.session?.userId) {
      logger.debug('Payment bypass check skipped - no authenticated user');
      return next();
    }

    // Get user from database
    const user = typeof req.session.userId === 'string'
      ? await storage.getUser(req.session.userId)
      : null;

    if (!user) {
      logger.debug('Payment bypass check skipped - user not found in database');
      return next();
    }

    // Check bypass conditions
    const betaStatus = getBetaStatus();
    const bypassReasons: string[] = [];
    let canBypass = false;

    // 1. Check Discord verification bypass
    if (defaultConfig.discordBypassEnabled && user.discordVerified) {
      if (!defaultConfig.requireGuildMembership || user.discordVerified) {
        // During beta: Free access
        // After beta: Special pricing or free tier
        if (defaultConfig.betaBypassEnabled && !betaStatus.expired) {
          canBypass = true;
          bypassReasons.push('Discord verified + beta period active');
        } else if (user.subscriptionTier === 'elite' || user.subscriptionTier === 'shadow') {
          canBypass = true;
          bypassReasons.push(`Discord verified + ${user.subscriptionTier} tier`);
        } else {
          // Discord users get special pricing after beta
          canBypass = true;
          bypassReasons.push('Discord verified - eligible for special pricing');
        }
      }
    }

    // 2. Check tier-based bypass
    if (!canBypass && user.subscriptionTier && defaultConfig.bypassTiers.includes(user.subscriptionTier)) {
      canBypass = true;
      bypassReasons.push(`Tier bypass: ${user.subscriptionTier}`);
    }

    // Attach bypass information to request for downstream use
    (req as any).paymentBypass = {
      canBypass,
      reasons: bypassReasons,
      user: {
        id: user.id,
        email: user.email,
        discordVerified: user.discordVerified,
        subscriptionTier: user.subscriptionTier,
      },
      betaActive: !betaStatus.expired,
    };

    logger.debug('Payment bypass check completed', {
      userId: user.id,
      canBypass,
      reasons: bypassReasons,
    });

    next();
  } catch (error) {
    logger.error('Payment bypass middleware error', error);
    // Don't block the request on error
    next();
  }
};

/**
 * Require payment or bypass middleware
 * This enforces payment requirements unless user has valid bypass
 */
export const requirePaymentOrBypass = async (
  req: Request & { session: any },
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user has payment bypass
    const bypassInfo = (req as any).paymentBypass;
    
    if (bypassInfo?.canBypass) {
      logger.info('Payment requirement bypassed', {
        userId: bypassInfo.user.id,
        reasons: bypassInfo.reasons,
      });
      return next();
    }

    // Check if user has active subscription
    const user = typeof req.session?.userId === 'string'
      ? await storage.getUser(req.session.userId)
      : null;

    if (user?.stripeSubscriptionId) {
      // User has a subscription, allow access
      return next();
    }

    // No bypass and no subscription - require payment
    logger.warn('Payment required - no bypass or active subscription', {
      userId: req.session?.userId,
    });

    return res.status(402).json({
      error: 'Payment Required',
      message: 'Subscribe to access this feature',
      redirectTo: '/subscribe',
      bypassOptions: {
        discord: 'Join our Discord community for special access',
        subscription: '$5.89/month for full access',
      },
    });
  } catch (error) {
    logger.error('Payment requirement check error', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to verify payment status',
    });
  }
};

/**
 * Discord bypass configuration endpoint
 * Returns the current bypass rules for the frontend
 */
export const getPaymentBypassConfig = async (
  req: Request,
  res: Response
) => {
  const betaStatus = getBetaStatus();
  
  res.json({
    discord: {
      enabled: defaultConfig.discordBypassEnabled,
      requiresGuild: defaultConfig.requireGuildMembership,
      betaActive: !betaStatus.expired,
      betaDaysRemaining: betaStatus.daysRemaining,
    },
    pricing: {
      beta: '$5.89/month (locked forever)',
      regular: '$20/month',
      discord: betaStatus.expired ? '$5.89/month' : 'FREE during beta',
    },
    bypassTiers: defaultConfig.bypassTiers,
  });
};