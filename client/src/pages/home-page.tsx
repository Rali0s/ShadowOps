import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Removed useAuth - now open access system
import { Shield, Code, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FrequencyLogo } from "@/components/frequency-logo";
import { BrainwaveFrequencyDisplay } from "@/components/brainwave-frequency-display";
import { BrainwaveSynchronizedWheel } from "@/components/brainwave-synchronized-wheel";
import { EnhancedTerminal } from "@/components/enhanced-terminal";

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
                  <em>"Is it truly accidental when one inadvertently declassifies what was once Neural Matrix - perhaps never officially real, yet potentially meaningful for those few who sought genuine advancement?"</em>
                  <br />
                  <span className="text-yellow-400/70 font-mono text-xs mt-2 block">— A question of intent vs. consequence in the evolution from classified operations to civilian cognitive enhancement</span>
                </AlertDescription>
              </Alert>
            </div>

            {/* FOIA Search Tips */}
            <div className="mb-16 max-w-3xl mx-auto px-4">
              <Alert className="border-blue-500/30 bg-blue-500/5">
                <Zap className="h-4 w-4 text-blue-400" />
                <AlertTitle className="text-blue-400 text-left">Self-Study Research Tips</AlertTitle>
                <AlertDescription className="text-blue-200/90 text-sm text-left">
                  <strong className="text-blue-300">Search FOIA Yourself!</strong> Access Freedom of Information Act databases for authentic study materials:
                  <br />• <strong>FBI Records:</strong> vault.fbi.gov - Search classified documents
                  <br />• <strong>CIA Library:</strong> cia.gov/readingroom - Declassified operations 
                  <br />• <strong>NSA Archives:</strong> nsa.gov/resources - Technical documents
                  <br />• <strong>Military Archives:</strong> aad.archives.gov - Historical records
                  <br />
                  <span className="text-blue-400/70 font-mono text-xs mt-2 block">Think for yourself. Question everything. DYOR (Do Your Own Research)</span>
                </AlertDescription>
              </Alert>
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

          {/* Interactive Terminal - Primary Interface */}
          <div className="mb-16 max-w-4xl mx-auto px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-terminal-red-bright mb-6 text-center font-mono">
              Interactive Frequency Terminal
            </h3>
            <div className="bg-black rounded-lg border border-gray-600 overflow-hidden shadow-2xl">
              <div className="bg-gray-900 px-3 sm:px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-sm"></div>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm font-mono">operative@fq_neural_matrix: ~</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-green-400 text-xs font-mono">●</div>
                  <span className="text-gray-400 text-xs font-mono">_Fq Neural Terminal</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded-sm flex items-center justify-center cursor-pointer">
                      <span className="text-gray-300 text-xs font-bold">−</span>
                    </div>
                    <div className="w-3 h-3 bg-gray-600 hover:bg-gray-500 rounded-sm flex items-center justify-center cursor-pointer">
                      <span className="text-gray-300 text-xs font-bold">□</span>
                    </div>
                    <div className="w-3 h-3 bg-red-600 hover:bg-red-500 rounded-sm flex items-center justify-center cursor-pointer">
                      <span className="text-white text-xs font-bold">×</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-96 sm:h-[500px]">
                <EnhancedTerminal />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}