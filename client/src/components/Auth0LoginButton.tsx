import { Button } from "@/components/ui/button";
import { KeyRound, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface Auth0LoginButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  showText?: boolean;
  disabled?: boolean;
}

export function Auth0LoginButton({ 
  variant = "default", 
  size = "default", 
  className,
  showText = true,
  disabled = false 
}: Auth0LoginButtonProps) {
  const { loginWithAuth0, isLoading: authLoading } = useAuth();
  
  const handleClick = () => {
    if (authLoading || disabled) return;
    loginWithAuth0();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={authLoading || disabled}
      className={cn(
        "bg-[#EB5424] hover:bg-[#D94B1F] text-white border-0",
        "focus:ring-2 focus:ring-[#EB5424]/50 focus:ring-offset-2",
        "transition-all duration-200 ease-in-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      data-testid="button-auth0-login"
    >
      {authLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <KeyRound className="w-4 h-4 mr-2" />
      )}
      {showText && (
        <span>
          {authLoading ? "Connecting..." : "Continue with Auth0"}
        </span>
      )}
    </Button>
  );
}

export function Auth0Status() {
  const { user } = useAuth();

  if (!user?.auth0Id) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground" data-testid="text-auth0-status-none">
        <KeyRound className="w-4 h-4" />
        <span>Not connected to Auth0</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm" data-testid="text-auth0-status-connected">
      <KeyRound className="w-4 h-4 text-[#EB5424]" />
      <div className="flex flex-col">
        <span className="font-medium">
          {user.auth0Username || 'Auth0 User'}
        </span>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-green-600 dark:text-green-400">
            Authenticated • Beta Access
          </span>
        </div>
      </div>
    </div>
  );
}
