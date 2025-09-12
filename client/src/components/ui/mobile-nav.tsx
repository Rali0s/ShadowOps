import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link, useLocation } from 'wouter';
import { navigationConfig } from '@/components/navigation/nav-config';
import { 
  Menu, 
  Brain, 
  Lock,
  X,
  ChevronRight
} from 'lucide-react';

interface MobileNavProps {
  showAuthButton?: boolean;
}

export function MobileNav({ showAuthButton = true }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

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
            {navigationConfig.map((item, index) => {
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

          {/* Bottom Actions */}
          {showAuthButton && (
            <div className="p-6 pt-4 border-t border-gray-700 mt-auto">
              <Link href="/subscribe">
                <Button 
                  onClick={() => setOpen(false)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  data-testid="button-unlock-access"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock Full Access
                </Button>
              </Link>
              <p className="text-xs text-gray-500 text-center mt-2">
                $5.89/month • Cancel anytime
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}