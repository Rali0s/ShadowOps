import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Terminal, Settings, Shield, Eye } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

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
              <h1 className="text-lg font-bold text-terminal-red-bright font-mono">_Fq</h1>
              <p className="text-xs text-terminal-red-secondary -mt-1">Brainwave Frequency System</p>
            </div>
          </Link>

          {/* Main Navigation - Open Access */}
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

            <Link href="/ops-manual">
              <Button 
                variant={isActive("/ops-manual") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/ops-manual") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Shield className="w-4 h-4 mr-2" />
                Ops Manual
              </Button>
            </Link>

            <Link href="/blackbriar">
              <Button 
                variant={isActive("/blackbriar") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/blackbriar") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Eye className="w-4 h-4 mr-2" />
                Blackbriar
              </Button>
            </Link>

            <Link href="/admin">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/admin") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </nav>

          {/* Open Access Badge */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-terminal-red-dark/30 rounded-lg border border-terminal-red-muted">
            <div className="w-2 h-2 bg-terminal-green rounded-full"></div>
            <span className="text-xs font-mono text-terminal-green uppercase font-bold">
              Open Access
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;