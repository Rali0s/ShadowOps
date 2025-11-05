import { createContext, ReactNode, useContext, useMemo } from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";

interface User {
  id: string;
  email: string | null;
  subscriptionStatus: "active" | "inactive" | "trial" | "cancelled";
  subscriptionTier: "none" | "alpha" | "beta" | "theta" | "gamma";
  subscriptionId?: string | null;
  trialEndsAt?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  username?: string | null;
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

const defaultUser: User = {
  id: "demo-user",
  email: null,
  subscriptionStatus: "active",
  subscriptionTier: "gamma",
  subscriptionId: "demo-subscription",
  trialEndsAt: null,
  firstName: "Shadow",
  lastName: "Operative",
  profileImageUrl: null,
  username: "ShadowOpsDemo",
  discordId: "demo-discord-id",
  discordUsername: "ShadowOpsDemo",
  discordAvatar: null,
  discordVerified: true,
};

const defaultBetaStatus: BetaStatus = {
  endsAt: null,
  expired: false,
  message: "Demo mode — unrestricted access",
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
};

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
  recheckDiscordMutation: UseMutationResult<User, Error, void>;
  loginWithDiscord: () => void;
  loginWithReplit: () => void;
  checkPaymentStatus: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const loginMutation = useMutation<User, Error, LoginData>({
    mutationFn: async () => defaultUser,
  });

  const registerMutation = useMutation<User, Error, RegisterData>({
    mutationFn: async () => defaultUser,
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => undefined,
  });

  const recheckDiscordMutation = useMutation<User, Error, void>({
    mutationFn: async () => defaultUser,
  });

  const value = useMemo<AuthContextType>(() => ({
    user: defaultUser,
    isLoading: false,
    error: null,
    isSubscribed: true,
    isAuthorized: true,
    betaStatus: defaultBetaStatus,
    isBetaLoading: false,
    canBypassPayment: true,
    loginMutation,
    logoutMutation,
    registerMutation,
    recheckDiscordMutation,
    loginWithDiscord: () => void 0,
    loginWithReplit: () => void 0,
    checkPaymentStatus: () => void 0,
  }), [
    loginMutation,
    logoutMutation,
    registerMutation,
    recheckDiscordMutation,
  ]);

  return (
    <AuthContext.Provider value={value}>
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
