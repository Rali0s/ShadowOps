import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { 
  Lock, 
  Brain, 
  Shield, 
  Zap, 
  Loader2,
  Star,
  Users,
  ArrowRight,
  Settings,
  Eye
} from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
}

export function ProtectedRoute({ children, requireSubscription = true }: ProtectedRouteProps) {
  const { user, isLoading, isSubscribed } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Check for admin mode on component mount
  useEffect(() => {
    const adminMode = localStorage.getItem('neural_matrix_admin_mode') === 'true';
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin') === 'true';
    
    if (adminMode || adminParam) {
      setIsAdminMode(true);
      if (adminParam) {
        localStorage.setItem('neural_matrix_admin_mode', 'true');
        // Clean URL after setting admin mode
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
    
    // Desktop: Show admin panel if user presses Ctrl+Shift+A
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
    };
    
    // Mobile: Triple tap sequence on logo to access admin
    let tapCount = 0;
    let tapTimer: NodeJS.Timeout;
    
    const handleTripleTap = () => {
      tapCount++;
      clearTimeout(tapTimer);
      
      if (tapCount === 3) {
        setShowAdminPanel(true);
        tapCount = 0;
      } else {
        tapTimer = setTimeout(() => {
          tapCount = 0;
        }, 1000);
      }
    };
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyPress);
    
    // Add triple-tap listener to any element with class 'admin-tap-trigger'
    const addTapListeners = () => {
      const triggers = document.querySelectorAll('.admin-tap-trigger');
      triggers.forEach(trigger => {
        trigger.addEventListener('touchend', handleTripleTap);
        trigger.addEventListener('click', handleTripleTap);
      });
    };
    
    // Set up tap listeners after a short delay to ensure elements are rendered
    const setupTimer = setTimeout(addTapListeners, 500);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearTimeout(tapTimer);
      clearTimeout(setupTimer);
      const triggers = document.querySelectorAll('.admin-tap-trigger');
      triggers.forEach(trigger => {
        trigger.removeEventListener('touchend', handleTripleTap);
        trigger.removeEventListener('click', handleTripleTap);
      });
    };
  }, []);

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    setIsAdminMode(newMode);
    localStorage.setItem('neural_matrix_admin_mode', newMode.toString());
    setShowAdminPanel(false);
    
    // Show notification
    if (newMode) {
      console.log('🔓 Neural Matrix Admin Mode ENABLED - Full access granted');
    } else {
      console.log('🔒 Neural Matrix Admin Mode DISABLED - Normal auth required');
    }
  };

  // Lock body scroll when admin panel is open
  useEffect(() => {
    if (showAdminPanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAdminPanel]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="text-white w-10 h-10" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin text-red-400 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Connecting to Neural Matrix...</p>
          <p className="text-gray-500 text-sm mt-2">Verifying access permissions</p>
        </div>
      </div>
    );
  }

  // Admin bypass - allow access without authentication
  if (isAdminMode) {
    return (
      <>
        {/* Admin Mode Indicator - Fixed z-index bleeding */}
        <div className="fixed top-4 right-4 z-20 bg-red-600/20 border border-red-500 rounded-lg p-3 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center space-x-2 text-red-400 text-sm font-mono">
            <Shield className="w-4 h-4" />
            <span>ADMIN MODE</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>
        
        {/* Admin Panel */}
        {showAdminPanel && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-hidden">
            <div className="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Neural Matrix Admin Panel
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-red-900/20 rounded border border-red-500/30">
                  <span className="text-red-400 font-mono text-sm">Admin Status:</span>
                  <Badge className="bg-green-600 text-white">ACTIVE</Badge>
                </div>
                <p className="text-gray-300 text-sm">
                  All authentication and subscription requirements are bypassed. Full access to Neural Matrix training protocols enabled.
                </p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={toggleAdminMode}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Disable Admin Mode
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowAdminPanel(false)}
                  className="border-gray-600 text-gray-300"
                >
                  Close
                </Button>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Press <kbd className="bg-gray-800 px-1 rounded">Ctrl+Shift+A</kbd> to open this panel<br/>
                  Add <code className="text-red-400">?admin=true</code> to URL for quick access
                </p>
              </div>
            </div>
          </div>
        )}
        
        {children}
      </>
    );
  }

  // Show subscription required screen
  if (requireSubscription && (!user || !isSubscribed)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Header - Fixed z-index */}
        <header className="border-b border-red-500/20 bg-black/95 backdrop-blur-sm relative z-30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center admin-tap-trigger cursor-pointer" title="Triple tap for admin access">
                  <Brain className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-400 font-mono">_Fq</h1>
                  <p className="text-xs text-gray-400 -mt-1">Neural Matrix</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
              </div>
            </div>
          </div>
        </header>

        {/* Access Required Content - Pulled back from header */}
        <div className="container mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Lock Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
              <Lock className="text-white w-12 h-12" />
            </div>

            <Badge className="mb-6 bg-red-600/20 border-red-500 text-red-400 text-lg px-4 py-2">
              🔒 Premium Neural Enhancement Required
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
              Access Restricted
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The <strong className="text-red-400">ShadowFang Neural Matrix</strong> requires active membership. 
              Join neurohackers unlocking advanced cognitive protocols.
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">AI Frequency Training</h3>
                  <p className="text-gray-400 text-sm">Advanced binaural beat generation with real-time adaptation</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">15+ Training Modules</h3>
                  <p className="text-gray-400 text-sm">Declassified HUMINT protocols with interactive sessions</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Safety Protocols</h3>
                  <p className="text-gray-400 text-sm">Military-grade tie-down procedures for safe training</p>
                </CardContent>
              </Card>
            </div>

            {/* Pricing */}
            <Card className="bg-gradient-to-b from-red-900/20 to-black border-red-500/50 max-w-md mx-auto mb-8">
              <CardHeader className="text-center">
                <Badge className="mb-2 bg-green-600 text-white">Limited Time Offer</Badge>
                <div className="text-center">
                  <span className="text-4xl font-bold text-red-400">$5.89</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <div className="text-gray-400 line-through">$19.99/month</div>
                <p className="text-green-400 font-semibold">Save 70% • Professional Grade Training</p>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {[
                  "Complete Neural Matrix Access",
                  "All Frequency Training Modules", 
                  "AI-Driven Binaural Beat Generation",
                  "Advanced Safety Protocols",
                  "Mobile App (iOS/Android)",
                  "Priority Support & Updates"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/subscribe">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg px-8 py-4">
                  Unlock Neural Matrix
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Admin Panel Access (Hidden) */}
            {showAdminPanel && (
              <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
                <div className="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Neural Matrix Admin Panel
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-600">
                      <span className="text-gray-400 font-mono text-sm">Admin Status:</span>
                      <Badge variant="outline" className="border-gray-500 text-gray-400">DISABLED</Badge>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Enable admin mode to bypass authentication and subscription requirements for testing purposes.
                    </p>
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 mt-3">
                      <p className="text-blue-300 text-xs">
                        <strong>Mobile Access:</strong> Triple-tap the brain icon 🧠 in any header
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={toggleAdminMode}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Enable Admin Mode
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAdminPanel(false)}
                      className="border-gray-600 text-gray-300"
                    >
                      Close
                    </Button>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-500">
                      <strong>Desktop:</strong> Press <kbd className="bg-gray-800 px-1 rounded">Ctrl+Shift+A</kbd><br/>
                      <strong>Mobile:</strong> Triple-tap any brain icon 🧠<br/>
                      <strong>URL:</strong> Add <code className="text-red-400">?admin=true</code>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono">2,847</span>
                <span className="text-gray-400">members</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-gray-400 ml-2">4.9/5 rating</span>
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400 font-mono">97%</span> completion rate
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User has access, render children
  return <>{children}</>;
}