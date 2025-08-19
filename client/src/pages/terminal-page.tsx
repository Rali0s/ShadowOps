import { useState, useEffect } from "react";
import { EnhancedTerminal } from "@/components/enhanced-terminal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Terminal, Home, Shield } from "lucide-react";

export default function TerminalPage() {
  const [isTerminalReady, setIsTerminalReady] = useState(false);

  useEffect(() => {
    // Simulate boot sequence
    const timer = setTimeout(() => {
      setIsTerminalReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
                <h1 className="text-lg sm:text-xl font-bold text-terminal-green font-mono">_Fq Terminal</h1>
                <p className="text-xs text-gray-400">
                  <span className="hidden sm:inline">Open Access | Brainwave Training | Session: ACTIVE</span>
                  <span className="sm:hidden">Open Access</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800 text-xs sm:text-sm">
                  <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>

              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-terminal-green/20 rounded-lg border border-terminal-green/30">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-terminal-green font-bold">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card-bg border-gray-700 mb-6">
              <CardContent className="p-4">
                <h3 className="text-terminal-red-bright font-mono font-bold mb-3 text-sm">
                  FREQUENCY BANDS
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-terminal-red-primary" />
                    <div>
                      <div className="text-white font-mono text-xs">Alpha (8-12 Hz)</div>
                      <div className="text-gray-400 text-xs">Relaxed awareness</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-terminal-red-primary" />
                    <div>
                      <div className="text-white font-mono text-xs">Beta (12-30 Hz)</div>
                      <div className="text-gray-400 text-xs">Alert thinking</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-terminal-red-primary" />
                    <div>
                      <div className="text-white font-mono text-xs">Theta (4-8 Hz)</div>
                      <div className="text-gray-400 text-xs">Deep processing</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-terminal-red-primary" />
                    <div>
                      <div className="text-white font-mono text-xs">Gamma (30-100+ Hz)</div>
                      <div className="text-gray-400 text-xs">Peak performance</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-3">
            <Card className="bg-card-bg border-gray-700">
              <CardContent className="p-0">
                {!isTerminalReady ? (
                  <div className="h-[500px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-terminal-green font-mono text-sm mb-2">
                        INITIALIZING BRAINWAVE TERMINAL...
                      </div>
                      <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-terminal-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <EnhancedTerminal />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}