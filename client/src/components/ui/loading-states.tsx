import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <Loader2 
      className={cn(
        "animate-spin text-terminal-red-primary",
        sizeClasses[size],
        className
      )} 
    />
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className="h-4 bg-terminal-red-dark/20 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

interface LoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function LoadingState({ 
  isLoading, 
  error, 
  children, 
  loadingText = "Loading...",
  className 
}: LoadingStateProps) {
  if (error) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="text-center">
          <div className="text-terminal-scarlet font-mono text-sm mb-2">Error</div>
          <div className="text-terminal-red-secondary text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="md" />
          <span className="text-terminal-red-secondary font-mono text-sm">
            {loadingText}
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

interface TerminalLoadingProps {
  message?: string;
}

export function TerminalLoading({ message = "Initializing terminal..." }: TerminalLoadingProps) {
  return (
    <div className="h-full bg-black rounded-lg border border-gray-700 flex items-center justify-center">
      <div className="text-center font-mono">
        <div className="flex items-center justify-center mb-4">
          <LoadingSpinner size="lg" className="text-terminal-red-primary" />
        </div>
        <div className="text-terminal-red-secondary text-sm animate-pulse">
          {message}
        </div>
      </div>
    </div>
  );
}