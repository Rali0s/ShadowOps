import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Code, Terminal, Settings, LogOut, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-red-muted bg-card-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-terminal-red-primary rounded-lg flex items-center justify-center">
              <Code className="text-white text-sm font-bold" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-terminal-red-bright font-mono">BlackRaven OS</h1>
              <p className="text-xs text-terminal-red-secondary -mt-1">Cybersecurity Training</p>
            </div>
          </Link>

          {/* Main Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/terminal">
                <Button 
                  variant={isActive("/terminal") ? "default" : "ghost"}
                  size="sm"
                  className={`
                    ${isActive("/terminal") 
                      ? "bg-terminal-red-primary text-white" 
                      : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                    }
                    font-medium transition-colors
                  `}
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  Terminal
                </Button>
              </Link>
              
              <Link href="/advanced-terminal">
                <Button 
                  variant={isActive("/advanced-terminal") ? "default" : "ghost"}
                  size="sm"
                  className={`
                    ${isActive("/advanced-terminal") 
                      ? "bg-terminal-red-primary text-white" 
                      : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                    }
                    font-medium transition-colors
                  `}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </Link>
              

            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Tier Badge */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-terminal-red-dark/30 rounded-lg border border-terminal-red-muted">
                  <div className="w-2 h-2 bg-terminal-red-bright rounded-full"></div>
                  <span className="text-xs font-mono text-terminal-red-bright uppercase font-bold">
                    {user.subscriptionTier || 'Guest'}
                  </span>
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-terminal-red-secondary hover:text-terminal-red-bright">
                      <User className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card-bg border-terminal-red-muted">
                    <DropdownMenuItem className="text-terminal-red-secondary hover:text-terminal-red-bright focus:bg-terminal-red-dark/20">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-terminal-red-muted" />
                    <DropdownMenuItem 
                      onClick={() => logoutMutation.mutate()}
                      className="text-terminal-red-secondary hover:text-terminal-red-bright focus:bg-terminal-red-dark/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button 
                  size="sm"
                  className="bg-terminal-red-primary text-white hover:bg-terminal-red-secondary transition-colors font-medium"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;