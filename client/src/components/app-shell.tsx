import { MobileNav } from '@/components/ui/mobile-nav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Brain, Users, Lock, CheckCircle, AlertTriangle, User } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

// Navigation content component
const NavigationContent = () => {
  const { user, isAuthorized, isLoading, betaStatus } = useAuth();

  return (
    <div className="flex items-center space-x-3">
      {/* Auth Status Indicator (desktop only) */}
      {!isLoading && (
        <div className="hidden lg:flex items-center space-x-2">
          {user?.discordVerified && !betaStatus?.expired ? (
            <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
              <CheckCircle className="w-3 h-3 mr-1" />
              Beta Access
            </Badge>
          ) : user?.subscriptionStatus === 'active' ? (
            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50">
              <CheckCircle className="w-3 h-3 mr-1" />
              Elite Member
            </Badge>
          ) : user?.discordVerified && betaStatus?.expired ? (
            <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/50">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Beta Ended
            </Badge>
          ) : null}
        </div>
      )}

      {/* Desktop Navigation (hidden on mobile) */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Show training link only if authorized */}
        {isAuthorized && (
          <Link href="/shadowfang-training">
            <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-600/20">
              Training
            </Button>
          </Link>
        )}
        
        {/* Auth CTA button based on state */}
        {!user ? (
          <Button 
            onClick={() => window.location.href = '/api/auth/discord/login'}
            size="sm" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            data-testid="button-discord-login"
          >
            <Users className="w-4 h-4 mr-1" />
            Discord Login
          </Button>
        ) : !user.discordVerified ? (
          <Button 
            onClick={() => window.location.href = '/api/auth/discord/login'}
            size="sm" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            data-testid="button-verify-discord"
          >
            <Users className="w-4 h-4 mr-1" />
            Verify Discord
          </Button>
        ) : !isAuthorized ? (
          <Link href="/subscribe">
            <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
              <Lock className="w-4 h-4 mr-1" />
              Subscribe
            </Button>
          </Link>
        ) : (
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-300">
              {user.discordUsername && `@${user.discordUsername}`}
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Mobile Navigation Header */}
      <header className="sticky top-0 z-30 bg-black/95 border-b border-red-500/20 backdrop-blur-sm pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Brain className="text-white w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    _Fq
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">Is This A Simulation</p>
                </div>
              </div>
            </Link>
            
            {/* Navigation */}
            <NavigationContent />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative pt-4">
        {children}
      </main>
    </div>
  );
}