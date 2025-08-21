import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Removed useAuth - now open access system
import { Terminal, Shield, Code, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FrequencyLogo } from "@/components/frequency-logo";
import { BrainwaveFrequencyDisplay } from "@/components/brainwave-frequency-display";
import { BrainwaveSynchronizedWheel } from "@/components/brainwave-synchronized-wheel";

export default function HomePage() {
  // Open access system - no user authentication needed
  const [wheelSize, setWheelSize] = useState(350);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setWheelSize(200);
      } else if (window.innerWidth < 768) {
        setWheelSize(280);
      } else {
        setWheelSize(350);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

            {/* Philosophical Declassification Question */}
            <div className="mb-8 max-w-3xl mx-auto px-4">
              <Alert className="border-yellow-500/30 bg-yellow-500/5">
                <Shield className="h-4 w-4 text-yellow-400" />
                <AlertTitle className="text-yellow-400 text-left">Declassification Paradox</AlertTitle>
                <AlertDescription className="text-yellow-200/90 text-sm text-left">
                  <em>"Is it truly accidental when one inadvertently declassifies what was once Blackbriar - perhaps never officially real, yet potentially meaningful for those few who sought genuine advancement?"</em>
                  <br />
                  <span className="text-yellow-400/70 font-mono text-xs mt-2 block">— A question of intent vs. consequence in the evolution from classified operations to civilian cognitive enhancement</span>
                </AlertDescription>
              </Alert>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 px-4">
              <Link href="/terminal" data-testid="button-access-terminal">
                <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-terminal-red-primary text-white font-semibold rounded-xl hover:bg-terminal-red-secondary transition-all transform hover:scale-105 text-sm sm:text-base">
                  <Terminal className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Basic Terminal
                </Button>
              </Link>
              <Link href="/advanced-terminal" data-testid="button-access-advanced-terminal">
                <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-terminal-red-secondary text-white font-semibold rounded-xl hover:bg-terminal-red-primary transition-all transform hover:scale-105 text-sm sm:text-base">
                  <Shield className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  Advanced Terminal
                </Button>
              </Link>
              <Link href="/admin" data-testid="button-access-admin">
                <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-terminal-red-dark text-white font-semibold rounded-xl hover:bg-terminal-red-muted transition-all transform hover:scale-105 text-sm sm:text-base">
                  <Code className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  System Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Sacred Geometry Brainwave Wheel */}
          <div className="mb-12">
            <BrainwaveSynchronizedWheel 
              size={wheelSize} 
              className="mb-8" 
            />
          </div>

          {/* Brainwave Frequency Display */}
          <div className="mb-16">
            <BrainwaveFrequencyDisplay className="mx-auto max-w-6xl" />
          </div>

          {/* Terminal Preview */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-3 sm:px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 sm:ml-4 text-gray-400 text-xs sm:text-sm font-mono">_Fq Frequency Terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-3 sm:p-6 font-mono text-xs sm:text-sm h-64 sm:h-96 overflow-y-auto">
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