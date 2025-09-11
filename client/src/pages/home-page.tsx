import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Code, Zap, Brain, Users, TrendingUp, Lock, Star, ChevronRight, Timer, Terminal, FileText, Settings, Search, Play, BarChart3, Database, Wifi } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FrequencyLogo } from "@/components/frequency-logo";
import { BrainwaveFrequencyDisplay } from "@/components/brainwave-frequency-display";
import { BrainwaveSynchronizedWheel } from "@/components/brainwave-synchronized-wheel";

export default function HomePage() {
  const [wheelSize, setWheelSize] = useState(350);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });
  
  
  // Scarcity timer for early access pricing
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {/* Logo & Brand */}
          <div className="mb-8">
            <div className="inline-block p-6 bg-card-bg rounded-2xl border border-terminal-red-muted mb-4">
              <FrequencyLogo size={80} className="bg-terminal-bg rounded-xl p-2 border border-terminal-red-primary" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-terminal-red-bright mb-2 font-mono">_Fq</h1>
            <p className="text-terminal-red-secondary font-mono text-lg mb-8">Neural Enhancement Platform</p>
          </div>

          {/* Simple Value Prop */}
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 max-w-3xl mx-auto">
            Master Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600"> Neural Frequencies</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join <strong className="text-red-400">neurohackers worldwide</strong> optimizing cognitive performance
          </p>

          {/* Simple CTA */}
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-2">$5.89/mo</div>
            <div className="text-gray-400 line-through mb-4">Was $19.99</div>
            <Link href="/subscribe">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 text-lg"
                data-testid="button-subscribe-hero"
              >
                Start Training
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400">
            <ChevronRight className="w-6 h-6 rotate-90 animate-bounce" />
          </div>
        </div>
      </section>

        {/* Features Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Neural Frequencies</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Master the four core brainwave states for optimal cognitive performance</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="bg-black/50 border-red-700/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-400 font-bold text-2xl">α</span>
                </div>
                <h4 className="text-red-300 font-semibold mb-2">Alpha</h4>
                <p className="text-sm text-gray-400">8-12 Hz</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-cyan-700/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-400 font-bold text-2xl">β</span>
                </div>
                <h4 className="text-cyan-300 font-semibold mb-2">Beta</h4>
                <p className="text-sm text-gray-400">12-30 Hz</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-blue-700/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-400 font-bold text-2xl">θ</span>
                </div>
                <h4 className="text-blue-300 font-semibold mb-2">Theta</h4>
                <p className="text-sm text-gray-400">4-8 Hz</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-green-700/50 text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-400 font-bold text-2xl">γ</span>
                </div>
                <h4 className="text-green-300 font-semibold mb-2">Gamma</h4>
                <p className="text-sm text-gray-400">30-100+ Hz</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neural Matrix Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Neural Synchronization Matrix</h3>
          <BrainwaveSynchronizedWheel 
            size={wheelSize} 
            className="mb-8" 
          />
          <p className="text-gray-400 max-w-md mx-auto">
            Real-time visualization • Sacred geometry patterns
          </p>
        </div>
      </section>

      {/* Main Thesis - Sell Monthly Package */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Why <span className="text-red-400">2,847 Neurohackers</span> Choose _Fq
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Skip years of trial and error. Get instant access to proven brainwave optimization protocols used by cognitive enhancement professionals, researchers, and elite performers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black/30 border border-red-700/30 rounded-xl p-6">
                <div className="text-red-400 text-3xl font-bold mb-3">$5.89</div>
                <div className="text-white font-semibold mb-2">vs $300+/hour</div>
                <div className="text-gray-400 text-sm">Professional neurofeedback sessions</div>
              </div>
              <div className="bg-black/30 border border-green-700/30 rounded-xl p-6">
                <div className="text-green-400 text-3xl font-bold mb-3">24/7</div>
                <div className="text-white font-semibold mb-2">Instant Access</div>
                <div className="text-gray-400 text-sm">Train anytime, anywhere</div>
              </div>
              <div className="bg-black/30 border border-blue-700/30 rounded-xl p-6">
                <div className="text-blue-400 text-3xl font-bold mb-3">94%</div>
                <div className="text-white font-semibold mb-2">Success Rate</div>
                <div className="text-gray-400 text-sm">Measurable cognitive improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Command Interface Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">Neural Training Interface</h3>
            <p className="text-gray-400">Professional-grade cognitive enhancement tools</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            
            {/* Termux-style interface */}
            <div className="bg-black rounded-lg border border-gray-600 overflow-hidden shadow-2xl">
              {/* Header bar */}
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
              
              {/* Terminal content area */}
              <div className="bg-black p-3 space-y-2">
                {/* Welcome message */}
                <div className="text-green-400 text-sm font-mono mb-3">
                  <span className="text-gray-500">$</span> neural_matrix_v2.1.3 <span className="text-gray-400">ready</span>
                </div>
                
                {/* Command buttons grid - Streamlined */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  
                  <Link href="/neural-matrix">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-yellow-600/50 text-yellow-400 hover:bg-yellow-600/20 hover:text-yellow-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-matrix"
                    >
                      <Shield className="w-5 h-5" />
                      <span className="text-xs font-mono">neural_matrix</span>
                    </Button>
                  </Link>
                  
                  <Link href="/ops-manual">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-orange-600/50 text-orange-400 hover:bg-orange-600/20 hover:text-orange-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-ops"
                    >
                      <Terminal className="w-5 h-5" />
                      <span className="text-xs font-mono">ops_manual</span>
                    </Button>
                  </Link>
                  
                  <Link href="/methodology">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-gray-600 text-gray-400 hover:bg-gray-600/20 hover:text-gray-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-research"
                    >
                      <Search className="w-5 h-5" />
                      <span className="text-xs font-mono">research</span>
                    </Button>
                  </Link>
                  
                  <Link href="/frequency-generator">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-purple-600/50 text-purple-400 hover:bg-purple-600/20 hover:text-purple-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-freq-gen"
                    >
                      <Brain className="w-5 h-5" />
                      <span className="text-xs font-mono">freq_gen</span>
                    </Button>
                  </Link>
                </div>
                
                {/* Membership Benefits */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <div className="text-center mb-4">
                    <div className="text-sm font-mono text-red-400 mb-2">NEUROHACKER ELITE MEMBERSHIP</div>
                    <div className="text-xs text-gray-400">What You Get:</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-cyan-400">✓ All 4 Frequency Bands</div>
                    <div className="text-green-400">✓ Sacred Geometry Matrix</div>
                    <div className="text-yellow-400">✓ Classified Archives</div>
                    <div className="text-purple-400">✓ Research Protocols</div>
                    <div className="text-blue-400">✓ Advanced Training</div>
                    <div className="text-red-400">✓ 24/7 Access</div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="text-xs font-mono text-gray-500 mb-2">
                      Status: <span className="text-yellow-400">Demo Mode</span> • 
                      Users: <span className="text-green-400">Online</span>
                    </div>
                    <Link href="/subscribe" className="text-red-400 hover:text-red-300 underline text-sm font-semibold">
                      → Unlock Full Neural Matrix Access
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Begin?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join the neural enhancement revolution
            </p>
            
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/50 rounded-xl p-6 mb-8">
              <div className="text-3xl font-bold text-white mb-2">$5.89/mo</div>
              <div className="text-gray-400 line-through mb-4">Regular: $19.99/mo</div>
              <Link href="/subscribe">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-lg"
                  data-testid="button-subscribe-final"
                >
                  Start Neural Training
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-4">Cancel anytime • 30-day guarantee</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}