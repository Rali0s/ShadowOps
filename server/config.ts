import { z } from 'zod';

// Environment variable validation schema
const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  SESSION_SECRET: z.string().min(32),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Discord OAuth
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  DISCORD_REDIRECT_URI: z.string().url().optional(),
  DISCORD_GUILD_ID: z.string().optional(),
  DISCORD_PUBLIC_KEY: z.string(),
  
  // Beta Configuration
  BETA_END_AT: z.string().datetime().default('2025-12-06T00:00:00.000Z'),
  
  // Stripe
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_PRICE_ID: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  VITE_STRIPE_PUBLIC_KEY: z.string(),
  
  // Testing Stripe Keys (for e2e tests)
  TESTING_STRIPE_SECRET_KEY: z.string().optional(),
  TESTING_VITE_STRIPE_PUBLIC_KEY: z.string().optional(),
  
  // Optional
  REPL_URL: z.string().url().optional(),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    console.error('⚠️  Environment validation warnings:');
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    
    // In production, exit on missing env vars
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Production environment validation failed. Exiting...');
      process.exit(1);
    }
    
    // In development, use safe defaults
    console.warn('⚠️  Using development defaults for missing environment variables');
    return {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || '5000',
      SESSION_SECRET: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
      DATABASE_URL: process.env.DATABASE_URL || '',
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || '',
      DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
      DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
      DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY || '',
      BETA_END_AT: process.env.BETA_END_AT || '2025-12-06T00:00:00.000Z',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
      STRIPE_PRICE_ID: process.env.STRIPE_PRICE_ID || '',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
      VITE_STRIPE_PUBLIC_KEY: process.env.VITE_STRIPE_PUBLIC_KEY || '',
      TESTING_STRIPE_SECRET_KEY: process.env.TESTING_STRIPE_SECRET_KEY,
      TESTING_VITE_STRIPE_PUBLIC_KEY: process.env.TESTING_VITE_STRIPE_PUBLIC_KEY,
      REPL_URL: process.env.REPL_URL,
    };
  }
}

export const config = validateEnv();

// Discord configuration helper
export const getDiscordConfig = () => ({
  clientId: config.DISCORD_CLIENT_ID,
  clientSecret: config.DISCORD_CLIENT_SECRET,
  redirectUri: config.DISCORD_REDIRECT_URI || 
    `${config.REPL_URL || `http://localhost:${config.PORT}`}/api/auth/discord/callback`,
  guildId: config.DISCORD_GUILD_ID,
  publicKey: config.DISCORD_PUBLIC_KEY,
  betaEndAt: config.BETA_END_AT,
});

// Stripe configuration helper
export const getStripeConfig = () => ({
  secretKey: config.NODE_ENV === 'test' && config.TESTING_STRIPE_SECRET_KEY 
    ? config.TESTING_STRIPE_SECRET_KEY 
    : config.STRIPE_SECRET_KEY,
  publicKey: config.NODE_ENV === 'test' && config.TESTING_VITE_STRIPE_PUBLIC_KEY
    ? config.TESTING_VITE_STRIPE_PUBLIC_KEY
    : config.VITE_STRIPE_PUBLIC_KEY,
  priceId: config.STRIPE_PRICE_ID,
  webhookSecret: config.STRIPE_WEBHOOK_SECRET,
});

// Beta status helper
export const getBetaStatus = () => {
  const betaEndDate = new Date(config.BETA_END_AT);
  const now = new Date();
  const expired = now > betaEndDate;
  
  return {
    endsAt: betaEndDate.toISOString(),
    expired,
    daysRemaining: expired ? 0 : Math.ceil((betaEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    message: expired ? 'Beta period has ended' : 'Beta period is active',
  };
};

// Production readiness checks
export const isProductionReady = () => {
  const checks = {
    hasSessionSecret: config.SESSION_SECRET.length >= 32,
    hasDatabase: !!config.DATABASE_URL,
    hasDiscord: !!config.DISCORD_CLIENT_ID && !!config.DISCORD_CLIENT_SECRET,
    hasStripe: !!config.STRIPE_SECRET_KEY && !!config.STRIPE_PRICE_ID,
    hasWebhookSecret: !!config.STRIPE_WEBHOOK_SECRET,
  };
  
  const isReady = Object.values(checks).every(check => check);
  
  if (!isReady && config.NODE_ENV === 'production') {
    console.error('⚠️  Production readiness check failed:', checks);
  }
  
  return { isReady, checks };
};