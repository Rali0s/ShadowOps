import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { 
  Brain, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Loader2,
  UserPlus,
  LogIn,
  Shield
} from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !isLoading) {
      setLocation('/blackbriar-training');
    }
  }, [user, isLoading, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;

    if (isLogin) {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ email, password });
    }
  };

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  // Don't render if user is already authenticated
  if (user && !isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header - Fixed z-index */}
      <header className="border-b border-red-500/20 bg-black/95 backdrop-blur-sm relative z-30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center admin-tap-trigger cursor-pointer" title="Triple tap for admin access">
                <Brain className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-400 font-mono">_Fq</h1>
                <p className="text-xs text-gray-400 -mt-1">Neural Matrix</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Hero Content */}
            <div className="text-left lg:pr-8">
              <Badge className="mb-6 bg-red-600/20 border-red-500 text-red-400">
                🔒 Secure Neural Access Portal
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent">
                Access Your
                <span className="block text-red-400">Neural Matrix</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {isLogin ? (
                  <>Welcome back to the <strong className="text-red-400">Blackbriar Neural Enhancement Platform</strong>. Sign in to continue your cognitive training.</>
                ) : (
                  <>Join <strong className="text-cyan-400">2,847 neurohackers</strong> unlocking advanced brainwave protocols. Start your <strong className="text-green-400">7-day free trial</strong> today.</>
                )}
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {[
                  "15+ Declassified HUMINT Training Modules",
                  "AI-Driven Frequency Entrainment", 
                  "Advanced Safety Protocols",
                  "Mobile Access (iOS/Android)"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400">Military-Grade Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">256-bit Encryption</span>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white flex items-center justify-center space-x-2">
                    {isLogin ? <LogIn className="w-6 h-6 text-red-400" /> : <UserPlus className="w-6 h-6 text-green-400" />}
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  </CardTitle>
                  {!isLogin && (
                    <p className="text-sm text-gray-400 mt-2">
                      Start your 7-day free trial • No credit card required
                    </p>
                  )}
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                          required
                          data-testid="input-email"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-red-500"
                          required
                          minLength={6}
                          data-testid="input-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {!isLogin && (
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum 6 characters
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className={`w-full text-lg py-3 ${
                        isLogin 
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                          : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                      }`}
                      disabled={isSubmitting || !email || !password}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          {isLogin ? 'Signing In...' : 'Creating Account...'}
                        </>
                      ) : (
                        <>
                          {isLogin ? <LogIn className="mr-2 w-5 h-5" /> : <UserPlus className="mr-2 w-5 h-5" />}
                          {isLogin ? 'Access Neural Matrix' : 'Start Free Trial'}
                        </>
                      )}
                    </Button>

                    {/* Toggle Mode */}
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-gray-400 hover:text-white transition-colors"
                        data-testid="button-toggle-mode"
                      >
                        {isLogin ? (
                          <>Don't have an account? <span className="text-green-400">Start free trial</span></>
                        ) : (
                          <>Already have an account? <span className="text-red-400">Sign in</span></>
                        )}
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
                  <Shield className="w-4 h-4" />
                  <span>Your data is encrypted and secure</span>
                </div>
                <p className="text-xs text-gray-500">
                  {isLogin ? 'Secure login' : '7-day free trial'} • Cancel anytime • No spam
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}