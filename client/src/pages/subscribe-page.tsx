import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CreditCard, Shield, Lock, Brain, Star, CheckCircle, Users, Timer, Zap, Target, TrendingUp } from "lucide-react";

// Initialize Stripe only if public key is available
const stripePromise = import.meta.env.VITE_STRIPE_PUBLIC_KEY 
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  : null;

const SubscribeForm = ({ tier }: { tier: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/",
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "ShadowFang Beta Access Unlocked! 🧠",
        description: "Welcome to the neurohacker beta program. Your rate is locked at $5.89/mo forever!",
      });
      setTimeout(() => setLocation("/"), 2000);
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        options={{
          layout: "tabs",
        }}
        data-testid="payment-element"
      />
      <Button 
        type="submit" 
        className="w-full bg-terminal-green text-terminal-bg font-bold hover:bg-terminal-amber transition-colors py-3"
        disabled={!stripe || !elements || isProcessing}
        data-testid="button-submit-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Complete Subscription
          </>
        )}
      </Button>
    </form>
  );
};

export default function SubscribePage() {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });
  const [spotsLeft] = useState(47); // Scarcity psychology
  
  // Single neurohacker tier
  const tierInfo = {
    name: 'NEUROHACKER ELITE',
    price: '$5.89',
    originalPrice: '$19.99',
    savings: '70%',
    color: 'text-red-400',
    description: 'Complete Neural Matrix Access'
  };

  // Scarcity timer
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
    // Don't try to create subscription if Stripe is not configured
    if (!stripePromise) {
      setLoading(false);
      return;
    }

    // Create subscription
    apiRequest("POST", "/api/create-subscription")
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else if (data.status === 'already_subscribed') {
          toast({
            title: "Already Subscribed",
            description: "You're already a neurohacker elite member!",
          });
          setLocation("/");
        } else {
          throw new Error('No client secret received');
        }
      })
      .catch((error) => {
        console.error('Subscription creation failed:', error);
        setLocation("/auth");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLocation, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 animate-pulse text-red-400 mx-auto mb-4" />
          <p className="text-gray-300 font-mono">Connecting to Neural Matrix...</p>
          <p className="text-red-400 text-sm mt-2">Preparing your cognitive enhancement gateway</p>
        </div>
      </div>
    );
  }

  if (!stripePromise || !clientSecret) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <Card className="max-w-md mx-4 bg-card-bg border-gray-700">
          <CardContent className="pt-6 text-center">
            <div className="text-red-400 mb-4">
              <Shield className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {!stripePromise ? "Payment System Unavailable" : "Authentication Required"}
            </h2>
            <p className="text-gray-400 mb-4">
              {!stripePromise 
                ? "Payment processing is not configured. Please contact administrator." 
                : "Please log in to access subscription services."
              }
            </p>
            <Button 
              onClick={() => setLocation(!stripePromise ? "/" : "/auth")} 
              className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber"
              data-testid="button-back-or-login"
            >
              {!stripePromise ? "Back to Home" : "Login / Register"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Urgency Header Bar */}
      <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border-b border-red-700/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-red-400" />
              <span className="text-red-300">Early Access Ends:</span>
              <span className="font-mono text-red-200">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300">Only {spotsLeft} spots left at this price</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-gray-800 bg-card-bg/90">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Brain className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-400 font-mono">Neural Matrix</h1>
                <p className="text-xs text-gray-400">Neurohacker Elite Gateway</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="text-gray-400 hover:text-white"
              data-testid="button-back-home"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600/20 text-red-300 border-red-500/50">
              <TrendingUp className="w-3 h-3 mr-1" />
              70% Early Access Discount
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Unlock Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Neural Potential</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Join <strong className="text-red-400">2,847 neurohackers</strong> who've already unlocked advanced brainwave optimization protocols
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">2,847 members</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-yellow-400 text-sm ml-1">4.9/5 rating</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">94% success rate</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-gradient-to-r from-red-600/10 to-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8 mx-auto max-w-md">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">${tierInfo.price.slice(1)}/mo</div>
                <div className="text-gray-400 line-through text-lg mb-1">{tierInfo.originalPrice}/mo</div>
                <div className="text-green-400 font-semibold mb-4">Save {tierInfo.savings} - Limited Time Only</div>
                <div className="text-sm text-gray-300">
                  Complete Neural Matrix Access • All Frequencies • Unlimited Training
                </div>
              </div>
            </div>

            <div className="inline-block p-4 bg-card-bg rounded-xl mb-4">
              <Lock className="h-8 w-8 text-red-400 mx-auto" />
            </div>
            <p className="text-gray-400">🔒 Secure payment processing • Cancel anytime • 30-day guarantee</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-3">
              <Card className="bg-card-bg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-terminal-green" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <SubscribeForm tier="neurohacker" />
                  </Elements>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary & Features */}
            <div className="md:col-span-2">
              <Card className="bg-card-bg border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-red-400" />
                    Neural Matrix Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-red-300">Neurohacker Elite</h3>
                        <p className="text-sm text-gray-400">Monthly subscription</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono text-xl">{tierInfo.price}</div>
                        <div className="text-gray-400 line-through text-sm">{tierInfo.originalPrice}</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                        Save {tierInfo.savings} • Limited Time
                      </Badge>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      Complete Neural Enhancement Suite
                    </h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start space-x-3">
                        <Zap className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Alpha Wave Training (8-12 Hz)</div>
                          <div className="text-gray-400">Creative flow states & relaxed focus</div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Beta Wave Training (12-30 Hz)</div>
                          <div className="text-gray-400">Analytical thinking & problem-solving</div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Theta Wave Training (4-8 Hz)</div>
                          <div className="text-gray-400">Deep insights & creative breakthroughs</div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Zap className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Gamma Wave Training (30-100+ Hz)</div>
                          <div className="text-gray-400">Peak cognitive performance</div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Brain className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Sacred Geometry Neural Matrix</div>
                          <div className="text-gray-400">Real-time visualization & synchronization</div>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <Shield className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">Classified Research Archive</div>
                          <div className="text-gray-400">FOIA declassified cognitive enhancement docs</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Guarantees */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h5 className="font-semibold text-green-400 mb-2">30-Day Guarantee</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>✓ Cancel anytime, no questions asked</li>
                      <li>✓ Full refund within 30 days</li>
                      <li>✓ Keep all downloaded materials</li>
                      <li>✓ Instant access upon payment</li>
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-700">
                    <Shield className="h-4 w-4 inline mr-1" />
                    256-bit SSL encryption • PCI DSS compliant • Powered by Stripe
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
