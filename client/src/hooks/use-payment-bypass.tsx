export interface PaymentBypassConfig {
  discord: {
    enabled: boolean;
    requiresGuild: boolean;
    betaActive: boolean;
    betaDaysRemaining: number;
  };
  pricing: {
    beta: string;
    regular: string;
    discord: string;
  };
  bypassTiers: string[];
}

const staticConfig: PaymentBypassConfig = {
  discord: {
    enabled: true,
    requiresGuild: false,
    betaActive: true,
    betaDaysRemaining: 999,
  },
  pricing: {
    beta: "$0.00/month",
    regular: "$5.89/month",
    discord: "$0.00/month",
  },
  bypassTiers: ["gamma", "theta", "beta"],
};

/**
 * Demo hook returning static payment bypass configuration.
 * Authentication has been removed, so all premium features are unlocked by default.
 */
export function usePaymentBypass() {
  const bypassConfig = staticConfig;

  const isDiscordFree = bypassConfig.discord.enabled && bypassConfig.discord.betaActive;

  const getDiscordPricing = () => bypassConfig.pricing.discord;

  const isBypassTier = (tier: string | undefined) => {
    if (!tier) return false;
    return bypassConfig.bypassTiers.includes(tier);
  };

  return {
    bypassConfig,
    isLoading: false,
    error: null,
    isDiscordFree,
    getDiscordPricing,
    isBypassTier,
  };
}
