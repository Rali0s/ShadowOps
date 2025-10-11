import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

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

/**
 * Hook to check payment bypass configuration
 * Determines if user can access platform without payment
 */
export function usePaymentBypass() {
  const {
    data: bypassConfig,
    isLoading,
    error,
  } = useQuery<PaymentBypassConfig>({
    queryKey: ['/api/payment-bypass-config'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/payment-bypass-config');
      if (!response.ok) {
        throw new Error('Failed to fetch payment bypass config');
      }
      return await response.json();
    },
    staleTime: 60000, // Cache for 1 minute
    retry: 1,
  });

  // Helper to determine if Discord users get free access
  const isDiscordFree = Boolean(
    bypassConfig?.discord.enabled && 
    bypassConfig?.discord.betaActive
  );

  // Helper to get the appropriate pricing for Discord users
  const getDiscordPricing = () => {
    if (!bypassConfig) return '$5.89/month';
    return bypassConfig.pricing.discord;
  };

  // Helper to check if a tier bypasses payment
  const isBypassTier = (tier: string | undefined) => {
    if (!tier || !bypassConfig) return false;
    return bypassConfig.bypassTiers.includes(tier);
  };

  return {
    bypassConfig,
    isLoading,
    error,
    isDiscordFree,
    getDiscordPricing,
    isBypassTier,
  };
}