import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { EnhancedTerminal } from "@/components/enhanced-terminal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Terminal, Home, User, Settings, LogOut, Shield } from "lucide-react";

export default function TerminalPage() {
  const { user, logoutMutation } = useAuth();
  const [isTerminalReady, setIsTerminalReady] = useState(false);

  const { data: userProgress } = useQuery({
    queryKey: ["/api/user/progress"],
    enabled: !!user,
  });

  const { data: courses } = useQuery({
    queryKey: ["/api/courses"],
  });

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setIsTerminalReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-card-bg/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-terminal-green rounded-lg flex items-center justify-center">
                <Terminal className="text-terminal-bg text-sm sm:text-lg" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-terminal-green font-mono">BlackRaven OS Terminal</h1>
                <p className="text-xs text-gray-400">
                  <span className="hidden sm:inline">User: {user.username} | Tier: {user.subscriptionTier?.toUpperCase() || 'NONE'} | Session: ACTIVE</span>
                  <span className="sm:hidden">{user.username} | {user.subscriptionTier?.toUpperCase() || 'NONE'}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" data-testid="button-home">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-terminal-green">
                  <Home className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>
              <Link href="/advanced-terminal" data-testid="button-advanced">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-terminal-green">
                  <Shield className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Advanced</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)] sm:h-[calc(100vh-80px)]">
        {/* Sidebar - Mobile: Top, Desktop: Left */}
        <div className="w-full lg:w-80 border-b lg:border-r lg:border-b-0 border-gray-800 bg-card-bg/50 p-3 sm:p-6 overflow-y-auto max-h-64 lg:max-h-none">
          <div className="space-y-3 sm:space-y-6">
            {/* User Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-terminal-green rounded-full flex items-center justify-center">
                    <User className="text-terminal-bg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white" data-testid="text-username">{user.username}</h3>
                    <p className="text-sm text-terminal-green" data-testid="text-subscription-tier">
                      {user.subscriptionTier?.toUpperCase() || 'FREE'} TIER
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="text-terminal-green">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session</span>
                    <span className="text-terminal-amber">SECURE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Commands */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold text-terminal-green mb-2 sm:mb-3 text-sm sm:text-base">Quick Commands</h3>
                <div className="space-y-1 sm:space-y-2 font-mono text-xs sm:text-sm">
                  <div className="text-terminal-amber cursor-pointer hover:text-white" data-testid="command-help">
                    help - Show available commands
                  </div>
                  <div className="text-terminal-amber cursor-pointer hover:text-white" data-testid="command-modules">
                    modules - List training modules
                  </div>
                  <div className="text-terminal-amber cursor-pointer hover:text-white" data-testid="command-progress">
                    progress - Show completion status
                  </div>
                  <div className="text-terminal-amber cursor-pointer hover:text-white" data-testid="command-scenario">
                    scenario - Start training scenario
                  </div>
                  <div className="text-terminal-amber cursor-pointer hover:text-white" data-testid="command-cert">
                    cert - Generate certificate
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-3 sm:p-4">
                <h3 className="font-semibold text-cyber-blue mb-3">Training Progress</h3>
                {userProgress && userProgress.length > 0 ? (
                  <div className="space-y-3">
                    {userProgress.slice(0, 3).map((progress) => (
                      <div key={progress.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Course Progress</span>
                          <span className="text-terminal-green" data-testid="text-progress-percent">
                            {progress.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-terminal-green h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No training progress yet. Start a module to begin!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Terminal */}
        <div className="flex-1 relative p-3 sm:p-0">
          <div className="absolute inset-0 overflow-hidden">
            <div className="terminal-scanline"></div>
          </div>
          
          <div className="relative z-10 h-full">
            {!isTerminalReady ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-pulse mb-4">
                    <Terminal className="h-16 w-16 text-terminal-green mx-auto mb-4" />
                  </div>
                  <div className="font-mono text-terminal-green">
                    <p>[SYSTEM] Initializing BlackRaven OS...</p>
                    <p>[BOOT] Loading training environment...</p>
                    <p>[AUTH] User authenticated: {user.username.toUpperCase()}_****</p>
                    <p className="animate-pulse">[INIT] Starting terminal interface...</p>
                  </div>
                </div>
              </div>
            ) : (
              <EnhancedTerminal 
                user={user} 
                courses={courses || []}
                userProgress={userProgress || []}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
