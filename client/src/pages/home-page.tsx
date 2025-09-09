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
  const [currentUserCount, setCurrentUserCount] = useState(89);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });
  
  // Psychological trigger: Real-time user count simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUserCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(67, Math.min(156, prev + change));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
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
    <div className="bg-terminal-bg text-gray-100 overflow-x-hidden">
      {/* Mobile-First Hero Section */}
      <section className="relative">
        {/* Social Proof Bar */}
        <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border-b border-red-700/30">
          <div className="container mx-auto px-4 py-2 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs sm:text-sm">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-mono">{currentUserCount}</span>
                <span className="text-gray-300">neurohackers online</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-red-400" />
                <span className="text-red-400">47% growth this week</span>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8 sm:py-12">
          {/* Primary Value Proposition */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-red-600/20 text-red-300 border-red-500/50">
              <Brain className="w-3 h-3 mr-1" />
              Neural Enhancement Platform
            </Badge>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-terminal-red-bright mb-4 font-mono tracking-tight leading-tight">
              Unlock Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Neural Matrix</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Join elite neurohackers mastering brainwave frequency optimization. 
              <br className="hidden sm:block" />
              <strong className="text-red-400">Train like the pros</strong> with classified cognitive enhancement protocols.
            </p>

            {/* Early Access CTA */}
            <div className="bg-gradient-to-r from-red-600/10 to-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8 mx-auto max-w-md">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Timer className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-semibold text-sm">Early Access Pricing Ends In:</span>
              </div>
              <div className="font-mono text-2xl text-red-300 mb-4">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-white mb-1">$5.89/mo</div>
                <div className="text-gray-400 line-through text-sm">Regular: $19.99/mo</div>
                <div className="text-green-400 text-sm font-semibold">Save 70% - Limited Time</div>
              </div>
              <Link href="/subscribe">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  data-testid="button-subscribe-hero"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Unlock Neural Matrix Access
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-xs text-gray-400 mt-2">Cancel anytime • 30-day guarantee</p>
            </div>
          </div>

          {/* Logo Section */}
          <div className="text-center mb-12">
            <div className="inline-block p-6 bg-card-bg rounded-2xl glass-effect border border-terminal-red-muted">
              <div className="flex justify-center mb-3">
                <FrequencyLogo size={60} className="bg-terminal-bg rounded-xl p-2 border border-terminal-red-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-red-bright mb-1 font-mono">_Fq</h2>
              <p className="text-terminal-red-secondary font-mono text-sm">Is This A Simulation</p>
            </div>
          </div>

            {/* Social Proof & Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-400 mb-1">2,847</div>
                <div className="text-sm text-gray-300">Active Neurohackers</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-4">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-300">4.9/5 Rating</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">94%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* What You Get */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">What You'll Master</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-400 font-bold">α</span>
                  </div>
                  <h4 className="font-bold text-red-300 mb-2">Alpha Waves</h4>
                  <p className="text-sm text-gray-300">8-12 Hz • Creative flow states</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/20 border-cyan-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-cyan-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-cyan-400 font-bold">β</span>
                  </div>
                  <h4 className="font-bold text-cyan-300 mb-2">Beta Waves</h4>
                  <p className="text-sm text-gray-300">12-30 Hz • Analytical thinking</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 font-bold">θ</span>
                  </div>
                  <h4 className="font-bold text-blue-300 mb-2">Theta Waves</h4>
                  <p className="text-sm text-gray-300">4-8 Hz • Deep insights</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 font-bold">γ</span>
                  </div>
                  <h4 className="font-bold text-green-300 mb-2">Gamma Waves</h4>
                  <p className="text-sm text-gray-300">30-100+ Hz • Peak performance</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FOIA Section - Positioned as bonus content */}
          <div className="mb-12 max-w-3xl mx-auto">
            <Alert className="border-blue-500/30 bg-blue-500/5">
              <Zap className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-400 text-left">Bonus: Research Intelligence</AlertTitle>
              <AlertDescription className="text-blue-200/90 text-sm text-left">
                <strong className="text-blue-300">Advanced FOIA Research Training Included!</strong>
                <br />• FBI vault.fbi.gov - Classified documents
                <br />• CIA cia.gov/readingroom - Declassified operations 
                <br />• NSA nsa.gov/resources - Technical documents
                <br />• Military aad.archives.gov - Historical records
                <br />
                <span className="text-blue-400/70 font-mono text-xs mt-2 block">Think for yourself. Question everything. DYOR</span>
              </AlertDescription>
            </Alert>
          </div>

          {/* Sacred Geometry Brainwave Wheel */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-6">Neural Synchronization Matrix</h3>
            <BrainwaveSynchronizedWheel 
              size={wheelSize} 
              className="mb-4" 
            />
            <p className="text-center text-sm text-gray-400 max-w-md mx-auto">
              Real-time brainwave visualization • Sacred geometry patterns enhance neural synchronization
            </p>
          </div>

          {/* Brainwave Frequency Display */}
          <div className="mb-16">
            <BrainwaveFrequencyDisplay className="mx-auto max-w-6xl" />
          </div>

          {/* Mock Termux Interface - Button Based */}
          <div className="mb-16 max-w-4xl mx-auto px-4">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-terminal-red-bright mb-2 font-mono">
                Neural Command Interface
              </h3>
              <p className="text-sm text-gray-400">Tap commands • Full access requires subscription</p>
            </div>
            
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
              <div className="bg-black p-4 space-y-3">
                {/* Welcome message */}
                <div className="text-green-400 text-sm font-mono mb-4">
                  <span className="text-gray-500">$</span> welcome to neural matrix v2.1.3
                  <br />
                  <span className="text-gray-400">Type commands or tap buttons below...</span>
                </div>
                
                {/* Command buttons grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <Link href="/subscribe">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-red-600/50 text-red-400 hover:bg-red-600/20 hover:text-red-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-upgrade"
                    >
                      <Lock className="w-5 h-5" />
                      <span className="text-xs font-mono">upgrade</span>
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-600 text-cyan-400 hover:bg-cyan-600/20 hover:text-cyan-300 h-16 flex flex-col items-center justify-center space-y-1"
                    data-testid="button-alpha"
                  >
                    <Zap className="w-5 h-5" />
                    <span className="text-xs font-mono">alpha</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-600 text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 h-16 flex flex-col items-center justify-center space-y-1"
                    data-testid="button-beta"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-xs font-mono">beta</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-600 text-purple-400 hover:bg-purple-600/20 hover:text-purple-300 h-16 flex flex-col items-center justify-center space-y-1"
                    data-testid="button-theta"
                  >
                    <Brain className="w-5 h-5" />
                    <span className="text-xs font-mono">theta</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-gray-900 border-gray-600 text-green-400 hover:bg-green-600/20 hover:text-green-300 h-16 flex flex-col items-center justify-center space-y-1"
                    data-testid="button-gamma"
                  >
                    <Wifi className="w-5 h-5" />
                    <span className="text-xs font-mono">gamma</span>
                  </Button>
                  
                  <Link href="/neural-matrix">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-gray-600 text-yellow-400 hover:bg-yellow-600/20 hover:text-yellow-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-matrix"
                    >
                      <Database className="w-5 h-5" />
                      <span className="text-xs font-mono">matrix</span>
                    </Button>
                  </Link>
                  
                  <Link href="/ops-manual">
                    <Button 
                      variant="outline" 
                      className="w-full bg-gray-900 border-gray-600 text-orange-400 hover:bg-orange-600/20 hover:text-orange-300 h-16 flex flex-col items-center justify-center space-y-1"
                      data-testid="button-ops"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-xs font-mono">ops</span>
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
                </div>
                
                {/* Status line */}
                <div className="mt-6 pt-4 border-t border-gray-800 text-xs font-mono text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>Status: <span className="text-yellow-400">Demo Mode</span></span>
                    <span>Users: <span className="text-green-400">{currentUserCount}</span></span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    For full access to all neural frequencies, 
                    <Link href="/subscribe" className="text-red-400 hover:text-red-300 underline">
                      upgrade to neurohacker elite
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/50 rounded-2xl p-8 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Upgrade Your Mind?
              </h3>
              <p className="text-gray-300 mb-6">
                Join thousands of neurohackers optimizing their cognitive performance
              </p>
              <Link href="/subscribe">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-lg mb-4"
                  data-testid="button-subscribe-final"
                >
                  Start Your Neural Journey - $5.89/mo
                </Button>
              </Link>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                <span>✓ Cancel anytime</span>
                <span>✓ 30-day guarantee</span>
                <span>✓ Full access</span>
              </div>
            </div>
          </div>

          {/* Philosophical note moved to footer */}
          <div className="max-w-3xl mx-auto text-center">
            <Alert className="border-yellow-500/30 bg-yellow-500/5">
              <Shield className="h-4 w-4 text-yellow-400" />
              <AlertTitle className="text-yellow-400 text-left">The Question</AlertTitle>
              <AlertDescription className="text-yellow-200/90 text-sm text-left">
                <em>"Is it truly accidental when one inadvertently declassifies what was once Neural Matrix?"</em>
                <br />
                <span className="text-yellow-400/70 font-mono text-xs mt-2 block">— Evolution from classified to civilian enhancement</span>
              </AlertDescription>
            </Alert>
          </div>

        </main>
      </section>
    </div>
  );
}