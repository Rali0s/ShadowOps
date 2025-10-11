import { createContext, ReactNode, useContext, useEffect, useRef, useCallback } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { usePaymentBypass } from "@/hooks/use-payment-bypass";

interface User {
  id: number;
  email: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial' | 'cancelled';
  subscriptionId?: string;
  trialEndsAt?: string;
  discordId?: string | null;
  discordUsername?: string | null;
  discordAvatar?: string | null;
  discordVerified?: boolean;
}

interface BetaStatus {
  endsAt: string | null;
  expired: boolean;
  message: string;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  isSubscribed: boolean;
  isAuthorized: boolean;
  betaStatus: BetaStatus | null;
  isBetaLoading: boolean;
  canBypassPayment: boolean;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
  recheckDiscordMutation: UseMutationResult<any, Error, void>;
  loginWithDiscord: () => void;
  checkPaymentStatus: () => void;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const prevBetaStatus = useRef<BetaStatus | null>(null);
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/user");
        if (!response.ok) {
          if (response.status === 401) {
            return null; // Not authenticated
          }
          throw new Error('Failed to fetch user');
        }
        return await response.json();
      } catch (error) {
        return null; // Handle network errors gracefully
      }
    },
    retry: false,
  });

  // Beta status query
  const {
    data: betaStatus,
    isLoading: isBetaLoading,
  } = useQuery<BetaStatus>({
    queryKey: ["/api/beta-status"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/beta-status");
      if (!response.ok) {
        throw new Error('Failed to fetch beta status');
      }
      return await response.json();
    },
    retry: false,
  });

  const { bypassConfig, isDiscordFree, isBypassTier } = usePaymentBypass();
  
  const isSubscribed = user?.subscriptionStatus === 'active' || user?.subscriptionStatus === 'trial';
  
  // Enhanced authorization logic with payment bypass
  const isAuthorized = Boolean(
    // Active subscription always grants access
    (user?.subscriptionStatus === 'active') ||
    // Discord verified users get access based on bypass rules
    (user?.discordVerified && (isDiscordFree || !betaStatus?.expired)) ||
    // Special tier users bypass payment requirements
    (user && isBypassTier((user as any).subscriptionTier))
  );

  // Monitor beta status changes for active session handling
  useEffect(() => {
    if (!betaStatus || !prevBetaStatus.current) {
      prevBetaStatus.current = betaStatus ?? null;
      return;
    }

    // Detect beta expiration during active session
    const betaJustExpired = !prevBetaStatus.current.expired && betaStatus.expired;
    
    if (betaJustExpired && user) {
      if (user.subscriptionStatus === 'active') {
        toast({
          title: "Beta Period Ended",
          description: "Your subscription ensures continued access to all features.",
        });
      } else if (user.discordVerified) {
        toast({
          title: "Beta Access Expired",
          description: "Your beta access has ended. Subscribe to continue your neurohacker journey!",
          variant: "destructive",
        });
        
        // Invalidate user and beta queries to refresh auth state
        queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        queryClient.invalidateQueries({ queryKey: ["/api/beta-status"] });
        
        // Redirect to subscription page after a short delay
        setTimeout(() => {
          window.location.href = '/subscribe';
        }, 3000);
      } else {
        toast({
          title: "Beta Period Ended",
          description: "Join Discord and subscribe to unlock full access!",
          variant: "destructive",
        });
      }
    }

    prevBetaStatus.current = betaStatus;
  }, [betaStatus, user, toast]);

  // Discord login function
  const loginWithDiscord = () => {
    window.location.href = '/api/auth/discord/login';
  };

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      if (!res.ok) {
        throw new Error('Invalid credentials');
      }
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to Neural Matrix Pro.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome to Neural Matrix Pro!",
        description: "Account created successfully. Your 7-day trial has started.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "Successfully logged out from Neural Matrix Pro.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const recheckDiscordMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/recheck-discord");
      if (!response.ok) {
        throw new Error('Failed to recheck Discord verification');
      }
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate user query to refetch updated Discord status
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Discord Status Updated",
        description: "Your Discord verification status has been rechecked.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Discord Recheck Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Check if user can bypass payment
  const canBypassPayment = Boolean(
    (user?.discordVerified && isDiscordFree) ||
    (user && isBypassTier((user as any).subscriptionTier))
  );
  
  // Check payment status function
  const checkPaymentStatus = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    queryClient.invalidateQueries({ queryKey: ["/api/payment-bypass-config"] });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        isSubscribed,
        isAuthorized,
        betaStatus: betaStatus ?? null,
        isBetaLoading,
        canBypassPayment,
        loginMutation,
        logoutMutation,
        registerMutation,
        recheckDiscordMutation,
        loginWithDiscord,
        checkPaymentStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
