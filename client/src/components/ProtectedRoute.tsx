import { ReactNode } from 'react';
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
  ArrowRight
} from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireSubscription?: boolean;
}

export function ProtectedRoute({ children, requireSubscription = true }: ProtectedRouteProps) {
  const { user, isLoading, isSubscribed } = useAuth();

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

  // Show subscription required screen
  if (requireSubscription && (!user || !isSubscribed)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        {/* Header */}
        <header className="border-b border-red-500/20 bg-black/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Brain className="text-white w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-red-400 font-mono">_Fq</h1>
                  <p className="text-xs text-gray-400 -mt-1">Neural Matrix</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-mono">2,847</span>
                  <span className="text-gray-400">active members</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Access Required Content */}
        <div className="container mx-auto px-4 sm:px-6 py-20">
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
              The <strong className="text-red-400">Blackbriar Neural Matrix</strong> requires active membership. 
              Join <strong className="text-cyan-400">2,847 neurohackers</strong> unlocking advanced cognitive protocols.
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