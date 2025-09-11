import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  Check, 
  Lock,
  Star,
  Users,
  ArrowRight,
  Play
} from 'lucide-react';

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Driven Frequency Entrainment",
      description: "Advanced binaural beat generation synchronized with classified HUMINT protocols"
    },
    {
      icon: Target,
      title: "Precision Training Modules", 
      description: "15+ declassified training manuals converted to interactive teleprompter sessions"
    },
    {
      icon: Shield,
      title: "Tie-Down Safety Protocols",
      description: "Military-grade psychological safety measures to prevent cognitive dissonance"
    },
    {
      icon: Zap,
      title: "Real-Time Biometric Sync",
      description: "Live session tracking with frequency adaptation and progress analytics"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cognitive Neuroscientist",
      content: "The most sophisticated training platform I've encountered. The frequency entrainment protocols are remarkable.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "Former Intelligence Analyst", 
      content: "Finally, declassified techniques made accessible. The ShadowFang system is revolutionary.",
      rating: 5
    },
    {
      name: "Dr. James Wright",
      role: "Psychology Researcher",
      content: "Exceptional integration of binaural beats with structured learning. Results speak for themselves.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Header - Fixed z-index and simplified for mobile */}
      <header className="sticky top-0 z-30 border-b border-red-500/20 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center admin-tap-trigger cursor-pointer" title="Triple tap for admin access">
                <Brain className="text-white w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-red-400 font-mono">_Fq</h1>
                <p className="text-xs md:text-sm text-gray-400 -mt-1">Neurohacker Platform</p>
              </div>
            </div>
            
            {/* Simple Navigation Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono text-sm">2,847</span>
                <span className="text-gray-400 text-xs hidden sm:inline">users</span>
              </div>
              <Link href="/blackbriar-training">
                <Button size="sm" variant="outline" className="border-red-500 text-red-400 hover:bg-red-600/20">
                  Training
                </Button>
              </Link>
              <Link href="/subscribe">
                <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                  <Lock className="w-4 h-4 mr-1" />
                  Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Content pulled back from header */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <Badge className="mb-6 md:mb-8 bg-red-600/20 border-red-500 text-red-400 md:text-lg md:px-6 md:py-3">
              🔒 Declassified • Military-Grade • Neural Enhancement
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent leading-tight">
              Neural Matrix
              <span className="block text-red-400">Training Platform</span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 md:mb-12 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed">
              Master declassified <strong className="text-red-400">HUMINT protocols</strong> through 
              AI-driven frequency entrainment. Access 15+ classified training manuals converted to 
              interactive <strong className="text-cyan-400">binaural beat sessions</strong>.
            </p>

            <div className="flex flex-col sm:flex-row md:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16">
              <Link href="/subscribe">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 w-full sm:w-auto">
                  Start Neural Training
                  <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 w-full sm:w-auto"
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                <Play className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                Watch Demo
              </Button>
            </div>

            {/* Stats - Tablet Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 md:gap-12 max-w-2xl md:max-w-4xl mx-auto">
              <div className="text-center tablet-grid">
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-400 mb-1 md:mb-2">15+</div>
                <div className="text-gray-400 md:text-lg lg:text-xl">Training Modules</div>
              </div>
              <div className="text-center tablet-grid">
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-cyan-400 mb-1 md:mb-2">2,847</div>
                <div className="text-gray-400 md:text-lg lg:text-xl">Active Users</div>
              </div>
              <div className="text-center tablet-grid">
                <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-400 mb-1 md:mb-2">97%</div>
                <div className="text-gray-400 md:text-lg lg:text-xl">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 relative z-0">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Advanced Neural <span className="text-red-400">Enhancement</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Military-grade cognitive training protocols adapted for civilian neural enhancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 tablet-grid">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-red-500/50 transition-all duration-300 card-tablet md:card-highres">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-white w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                  </div>
                  <CardTitle className="text-lg md:text-xl lg:text-2xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center text-sm md:text-base lg:text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-900/30 relative z-0">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Neural <span className="text-red-400">Enhancement</span> Access
            </h2>
            <p className="text-xl text-gray-300">
              Professional-grade cognitive training for serious practitioners
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-b from-red-900/20 to-black border-red-500/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700"></div>
              
              <CardHeader className="text-center pb-4">
                <Badge className="mb-4 bg-red-600 text-white">Most Popular</Badge>
                <CardTitle className="text-2xl text-white mb-2">Neural Matrix Pro</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-red-400">$5.89</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  Unlock all classified training protocols
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    "15+ Declassified Training Modules",
                    "AI-Driven Frequency Entrainment", 
                    "Real-Time Biometric Synchronization",
                    "Advanced Tie-Down Safety Protocols",
                    "Mobile App Access (iOS/Android)",
                    "Priority Support & Updates",
                    "ShadowFang Enhanced Training Tools"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/subscribe">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg py-3 mt-6">
                    Begin Neural Training
                    <Lock className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  Cancel anytime • 7-day free trial • Secure payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by <span className="text-red-400">Professionals</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Brain className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-400 font-mono">_Fq</h3>
                <p className="text-xs text-gray-400">Neural Enhancement Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2025 Neural Matrix Platform</span>
              <span>•</span>
              <span>Declassified Training Protocols</span>
              <span>•</span>
              <span>Military-Grade Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}