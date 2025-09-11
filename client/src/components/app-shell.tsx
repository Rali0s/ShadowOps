import { MobileNav } from '@/components/ui/mobile-nav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Brain, Users, Lock } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
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
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center admin-tap-trigger" title="Triple tap for admin access">
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
            <div className="flex items-center space-x-3">
              {/* Desktop Navigation (hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-mono">2,847</span>
                  <span className="text-gray-400">users</span>
                </div>
                
                <Link href="/blackbriar-training">
                  <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-600/20">
                    Training
                  </Button>
                </Link>
                <Link href="/subscribe">
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                    <Lock className="w-4 h-4 mr-1" />
                    Access
                  </Button>
                </Link>
              </div>
              
              {/* Mobile Navigation */}
              <MobileNav userCount="2,847" showAuthButton={true} />
            </div>
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