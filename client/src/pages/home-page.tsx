import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Removed useAuth - now open access system
import { Terminal, Shield, Code } from "lucide-react";
import { FrequencyLogo } from "@/components/frequency-logo";
import { BrainwaveFrequencyDisplay } from "@/components/brainwave-frequency-display";
import { BrainwaveSynchronizedWheel } from "@/components/brainwave-synchronized-wheel";

export default function HomePage() {
  // Open access system - no user authentication needed

  return (
    <div className="bg-terminal-bg text-gray-100">

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-block p-8 bg-card-bg rounded-2xl glass-effect mb-8 border border-terminal-red-muted">
              <div className="flex justify-center mb-4">
                <FrequencyLogo size={80} className="bg-terminal-bg rounded-xl p-2 border border-terminal-red-primary" />
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-terminal-red-bright mb-2 font-mono tracking-tight">_Fq</h2>
              <p className="text-terminal-red-secondary font-mono text-sm sm:text-base font-medium">Is This A Simulation</p>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Master brainwave frequency analysis and neural optimization. Train across Alpha, Beta, 
              Theta, and Gamma frequencies for peak cognitive performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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
              <Link href="/admin" data-testid="button-access-admin">
                <Button className="px-8 py-4 bg-terminal-red-dark text-white font-semibold rounded-xl hover:bg-terminal-red-muted transition-all transform hover:scale-105">
                  <Code className="mr-2" />
                  System Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Sacred Geometry Brainwave Wheel */}
          <div className="mb-12">
            <BrainwaveSynchronizedWheel size={350} className="mb-8" />
          </div>

          {/* Brainwave Frequency Display */}
          <div className="mb-16">
            <BrainwaveFrequencyDisplay className="mx-auto max-w-6xl" />
          </div>

          {/* Terminal Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-gray-400 text-sm font-mono">_Fq Frequency Terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
                <div className="terminal-text text-terminal-green">
                  <p>[SYSTEM] _Fq Frequency Analysis v3.1.4 - NEURAL_SYNC</p>
                  <p>[BOOT] Initializing brainwave frequency monitoring...</p>
                  <p>[ACCESS] Neural profile: OPEN_ACCESS</p>
                  <p>[FREQ] Current mode: ALL_FREQUENCIES_AVAILABLE</p>
                  <p>[INFO] Welcome to advanced frequency training</p>
                  <p className="mt-4 text-terminal-amber">Available Frequency Commands:</p>
                  <p>  help          - Display available commands</p>
                  <p>  modules       - List training modules</p>
                  <p>  progress      - Show completion status</p>
                  <p>  scenario      - Start training scenario</p>
                  <p>  cert          - Generate certificate</p>
                  <p className="mt-4 text-white">operative@fq_system:~$ <span className="animate-pulse">_</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info */}

        </div>
      </main>
    </div>
  );
}