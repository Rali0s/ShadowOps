import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { navigationConfig } from '@/components/navigation/nav-config';
import { 
  Menu, 
  Brain, 
  Lock,
  Users,
  CheckCircle,
  AlertTriangle,
  User,
  CreditCard
} from 'lucide-react';

interface MobileNavProps {
  // No props needed - auth state is handled internally
}

export function MobileNav(props: MobileNavProps = {}) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthorized, isLoading, betaStatus } = useAuth();

  // Filter navigation items based on auth status
  const visibleNavItems = navigationConfig.filter(item => {
    if (!item.protected) return true; // Show public items
    return isAuthorized; // Show protected items only if authorized
  });

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 hover:bg-red-600/20 hover:text-red-400"
            size="sm"
            data-testid="button-open-menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-[300px] sm:w-[350px] bg-black/95 border-r-red-500/30 backdrop-blur-sm p-0"
        >
          {/* Header */}
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <div>
                <SheetTitle className="text-red-400 font-mono font-bold text-lg">
                  Neural Matrix
                </SheetTitle>
                <p className="text-xs text-gray-400 -mt-1">Neurohacker Platform</p>
              </div>
            </div>
          </SheetHeader>

          <div className="px-6">
            <Separator className="bg-red-500/20" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 space-y-1">
            {visibleNavItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <Link key={index} href={item.href}>
                  <div
                    onClick={() => setOpen(false)}
                    className={`
                      w-full flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer group
                      ${isActive 
                        ? 'bg-red-600/20 border border-red-500/30 text-red-400' 
                        : 'hover:bg-red-600/10 border border-transparent text-gray-300 hover:text-red-400'
                      }
                    `}
                    data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium block">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-xs text-gray-500 block">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.protected && (
                      <Lock className="w-3 h-3 text-gray-500" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Access Options - Only show when not logged in */}
          {!user && (
            <div className="px-6 pb-2 space-y-2">
              {/* Free Discord Access */}
              <button
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/api/auth/discord/login';
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:bg-indigo-600/10 border border-indigo-700/50 text-indigo-400 hover:text-indigo-300"
                data-testid="button-discord-free"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium block">
                      Discord Access
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Free • Join community
                    </span>
                  </div>
                </div>
              </button>

              {/* Paid Subscription */}
              <Link href="/subscribe">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer hover:bg-red-600/10 border border-red-700/50 text-red-400 hover:text-red-300"
                  data-testid="button-payment-entry"
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium block">
                        Direct Subscription
                      </span>
                      <span className="text-xs text-gray-500 block">
                        $5.89/mo • No Discord needed
                      </span>
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="p-6 pt-4 border-t border-gray-700 mt-auto">
            {/* Auth Status Display */}
            {!isLoading && user && (
              <div className="mb-4">
                {user.discordVerified && !betaStatus?.expired ? (
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/50 w-full justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Beta Access Active
                  </Badge>
                ) : user.subscriptionStatus === 'active' ? (
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/50 w-full justify-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Elite Member
                  </Badge>
                ) : user.discordVerified && betaStatus?.expired ? (
                  <Badge className="bg-orange-600/20 text-orange-400 border-orange-500/50 w-full justify-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Beta Ended
                  </Badge>
                ) : null}
                {user.discordUsername && (
                  <div className="text-xs text-gray-400 text-center mt-2">
                    Connected as @{user.discordUsername}
                  </div>
                )}
              </div>
            )}

            {/* Auth Action Button */}
            {!user ? (
              <Button 
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/api/auth/discord/login';
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                data-testid="button-discord-login"
              >
                <Users className="w-4 h-4 mr-2" />
                Connect with Discord
              </Button>
            ) : !user.discordVerified ? (
              <Button 
                onClick={() => {
                  setOpen(false);
                  window.location.href = '/api/auth/discord/login';
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                data-testid="button-verify-discord"
              >
                <Users className="w-4 h-4 mr-2" />
                Verify Discord
              </Button>
            ) : !isAuthorized ? (
              <Link href="/subscribe">
                <Button 
                  onClick={() => setOpen(false)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  data-testid="button-subscribe"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Subscribe for Access
                </Button>
              </Link>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-green-400 font-medium">
                  Access Granted
                </div>
              </div>
            )}
            
            {!isAuthorized && (
              <p className="text-xs text-gray-500 text-center mt-2">
                {!user ? 'Join Discord community for beta access' : 
                 !user.discordVerified ? 'Verify Discord account' :
                 '$5.89/month • Cancel anytime'}
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}