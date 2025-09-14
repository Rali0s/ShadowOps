import { useAuth } from "@/hooks/use-auth";
import { Route } from "wouter";
import { 
  AuthLoadingGate, 
  DiscordRequiredGate, 
  BetaExpiredGate, 
  SubscriptionRequiredGate 
} from "@/components/auth-gates";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading, isAuthorized, betaStatus, isBetaLoading } = useAuth();

  // Show loading while checking auth or beta status
  if (isLoading || isBetaLoading) {
    return (
      <Route path={path}>
        <AuthLoadingGate />
      </Route>
    );
  }

  // No user at all - need Discord verification
  if (!user) {
    return (
      <Route path={path}>
        <DiscordRequiredGate />
      </Route>
    );
  }

  // User exists but not Discord verified - need Discord verification
  if (!user.discordVerified) {
    return (
      <Route path={path}>
        <DiscordRequiredGate />
      </Route>
    );
  }

  // User has Discord but beta expired and no active subscription
  if (betaStatus?.expired && user.subscriptionStatus !== 'active') {
    return (
      <Route path={path}>
        <BetaExpiredGate />
      </Route>
    );
  }

  // User is authorized (either Discord verified + beta not expired, OR has active subscription)
  if (isAuthorized) {
    return (
      <Route path={path}>
        <Component />
      </Route>
    );
  }

  // Fallback for any other unauthorized state
  return (
    <Route path={path}>
      <SubscriptionRequiredGate />
    </Route>
  );
}
