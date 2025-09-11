import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Code, Menu, Users, Lock } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-red-muted bg-card-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-terminal-red-primary rounded-lg flex items-center justify-center">
              <Code className="text-white text-sm font-bold" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-terminal-red-bright font-mono">_Fq</h1>
              <p className="text-xs text-terminal-red-secondary -mt-1 hidden sm:block">Is This A Simulation</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            
            <Link href="/shadowfang-training">
              <Button 
                size="sm"
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                SHADOWFANG
              </Button>
            </Link>
            
            <Link href="/subscribe">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold"
              >
                <Lock className="w-4 h-4 mr-2" />
                Join Elite
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;