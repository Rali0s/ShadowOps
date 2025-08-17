import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Terminal, Shield, Code } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-card-bg/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-terminal-green rounded-lg flex items-center justify-center">
                <Code className="text-terminal-bg text-lg font-bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-terminal-green font-mono">BlackRaven OS</h1>
                <p className="text-xs text-gray-400">Cybersecurity Training Platform</p>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              {user ? (
                <>
                  <Link href="/terminal" className="text-gray-300 hover:text-terminal-green transition-colors" data-testid="link-terminal">
                    Terminal
                  </Link>
                  <Link href="/advanced-terminal" className="text-gray-300 hover:text-terminal-green transition-colors" data-testid="link-advanced-terminal">
                    Advanced
                  </Link>
                  <Link href="/courses" className="text-gray-300 hover:text-terminal-green transition-colors" data-testid="link-courses">
                    Courses
                  </Link>
                  <Link href="/courses" data-testid="button-dashboard">
                    <Button className="px-4 py-2 bg-terminal-green text-terminal-bg rounded-lg font-semibold hover:bg-terminal-amber transition-colors">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/auth" data-testid="button-login">
                  <Button className="px-4 py-2 bg-terminal-green text-terminal-bg rounded-lg font-semibold hover:bg-terminal-amber transition-colors">
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-block p-6 bg-card-bg rounded-2xl glass-effect mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-terminal-green to-cyber-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-3xl text-terminal-bg" />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-terminal-green mb-2 font-mono">BlackRaven OS</h2>
              <p className="text-terminal-amber font-mono text-sm">Elite Cybersecurity Training</p>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Master cybersecurity through hands-on terminal training. Learn penetration testing, 
              digital forensics, and advanced security techniques.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {user ? (
                <>
                  <Link href="/terminal" data-testid="button-access-terminal">
                    <Button className="px-8 py-4 bg-terminal-green text-terminal-bg font-semibold rounded-xl hover:bg-terminal-amber transition-all transform hover:scale-105">
                      <Terminal className="mr-2" />
                      Basic Terminal
                    </Button>
                  </Link>
                  <Link href="/advanced-terminal" data-testid="button-access-advanced-terminal">
                    <Button className="px-8 py-4 bg-cyber-blue text-white font-semibold rounded-xl hover:bg-terminal-green hover:text-terminal-bg transition-all transform hover:scale-105">
                      <Shield className="mr-2" />
                      Advanced Terminal
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/auth" data-testid="button-get-started">
                  <Button className="px-8 py-4 bg-terminal-green text-terminal-bg font-semibold rounded-xl hover:bg-terminal-amber transition-all transform hover:scale-105">
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
                <Button variant="outline" className="px-6 py-3 border-2 border-terminal-green text-terminal-green font-semibold rounded-xl hover:bg-terminal-green hover:text-terminal-bg transition-all">
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