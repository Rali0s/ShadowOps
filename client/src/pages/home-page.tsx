import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Terminal, Shield, Code } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-terminal-bg text-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-block p-8 bg-card-bg rounded-2xl glass-effect mb-8 border border-terminal-red-muted">
              <div className="w-20 h-20 bg-gradient-to-br from-terminal-red-primary to-terminal-red-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-terminal-red-bright mb-2 font-mono tracking-tight">BlackRaven OS</h2>
              <p className="text-terminal-red-secondary font-mono text-sm sm:text-base font-medium">Elite Cybersecurity Training</p>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Master cybersecurity through hands-on terminal training. Learn penetration testing, 
              digital forensics, and advanced security techniques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {user ? (
                <>
                  <Link href="/terminal" data-testid="button-access-terminal">
                    <Button className="px-8 py-4 bg-terminal-red-primary text-white font-semibold rounded-xl hover:bg-terminal-red-secondary transition-all transform hover:scale-105">
                      <Terminal className="mr-2" />
                      Basic Terminal
                    </Button>
                  </Link>
                  <Link href="/advanced-terminal" data-testid="button-access-advanced-terminal">
                    <Button className="px-8 py-4 bg-terminal-red-secondary text-white font-semibold rounded-xl hover:bg-terminal-red-primary transition-all transform hover:scale-105">
                      <Shield className="mr-2" />
                      Advanced Terminal
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/auth" data-testid="button-get-started">
                  <Button className="px-8 py-4 bg-terminal-red-primary text-white font-semibold rounded-xl hover:bg-terminal-red-secondary transition-all transform hover:scale-105">
                    <Terminal className="mr-2" />
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Terminal Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm font-mono">BlackRaven OS Terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
                <div className="terminal-text text-terminal-green">
                  <p>[SYSTEM] BlackRaven OS v2.0.1 - CLASSIFIED</p>
                  <p>[BOOT] Initializing cybersecurity training environment...</p>
                  <p>[AUTH] User authenticated: {user ? `${user.username.toUpperCase()}` : 'GUEST_USER'}</p>
                  <p>[INFO] Welcome to advanced cybersecurity training</p>
                  <p className="mt-4 text-terminal-amber">Available Commands:</p>
                  <p>  help          - Display available commands</p>
                  <p>  modules       - List training modules</p>
                  <p>  progress      - Show completion status</p>
                  <p>  scenario      - Start training scenario</p>
                  <p>  cert          - Generate certificate</p>
                  <p className="mt-4 text-white">blackraven@psychproject:~$ <span className="animate-pulse">_</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          {!user && (
            <div className="mt-16 text-center">
              <p className="text-gray-400 mb-4">Ready to start your cybersecurity journey?</p>
              <Link href="/auth" data-testid="button-signup">
                <Button variant="outline" className="px-6 py-3 border-2 border-terminal-red-primary text-terminal-red-primary font-semibold rounded-xl hover:bg-terminal-red-primary hover:text-white transition-all">
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}