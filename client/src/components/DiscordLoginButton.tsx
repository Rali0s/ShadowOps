import { Button } from "@/components/ui/button";
import { SiDiscord } from "react-icons/si";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface DiscordLoginButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showText?: boolean;
  disabled?: boolean;
}

export function DiscordLoginButton({ 
  variant = "default", 
  size = "default", 
  className,
  showText = true,
  disabled = false 
}: DiscordLoginButtonProps) {
  const { loginWithDiscord, recheckDiscordMutation } = useAuth();
  
  const isLoading = recheckDiscordMutation.isPending;
  
  const handleClick = () => {
    if (isLoading || disabled) return;
    loginWithDiscord();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={cn(
        "bg-[#5865F2] hover:bg-[#4752C4] text-white border-0",
        "focus:ring-2 focus:ring-[#5865F2]/50 focus:ring-offset-2",
        "transition-all duration-200 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      data-testid="button-discord-login"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <SiDiscord className="w-4 h-4 mr-2" />
      )}
      {showText && (
        <span>
          {isLoading ? "Connecting..." : "Continue with Discord"}
        </span>
      )}
    </Button>
  );
}

export function DiscordRecheckButton({ 
  variant = "outline", 
  size = "sm", 
  className 
}: Omit<DiscordLoginButtonProps, 'showText'>) {
  const { recheckDiscordMutation } = useAuth();
  
  const isLoading = recheckDiscordMutation.isPending;
  
  const handleRecheck = () => {
    if (isLoading) return;
    recheckDiscordMutation.mutate();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRecheck}
      disabled={isLoading}
      className={cn(
        "border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white",
        "focus:ring-2 focus:ring-[#5865F2]/50 focus:ring-offset-2",
        "transition-all duration-200 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      data-testid="button-discord-recheck"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <SiDiscord className="w-4 h-4 mr-2" />
      )}
      <span>
        {isLoading ? "Checking..." : "Recheck Discord"}
      </span>
    </Button>
  );
}

// Discord status indicator component for showing verification status
export function DiscordStatus() {
  const { user, betaStatus } = useAuth();

  if (!user?.discordId) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="text-discord-status-none">
        <SiDiscord className="w-4 h-4" />
        <span>Not connected to Discord</span>
      </div>
    );
  }

  const isVerified = user.discordVerified;
  const isBetaExpired = betaStatus?.expired;
  const canAccessBeta = isVerified && !isBetaExpired;

  return (
    <div className="flex items-center gap-2 text-sm" data-testid="text-discord-status-connected">
      <SiDiscord className="w-4 h-4 text-[#5865F2]" />
      <div className="flex flex-col">
        <span className="font-medium">
          {user.discordUsername || 'Discord User'}
        </span>
        <div className="flex items-center gap-2 text-xs">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isVerified ? "bg-green-500" : "bg-yellow-500"
          )} />
          <span className={cn(
            isVerified ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
          )}>
            {isVerified ? "Verified" : "Pending verification"}
          </span>
          {canAccessBeta && (
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              • Beta Access
            </span>
          )}
          {isVerified && isBetaExpired && (
            <span className="text-orange-600 dark:text-orange-400">
              • Beta Expired
            </span>
          )}
        </div>
      </div>
    </div>
  );
}