import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, Shield, Lock } from "lucide-react";

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
        return_url: window.location.origin + "/terminal",
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
        title: "Payment Successful",
        description: "Welcome to BlackRaven OS! Redirecting to terminal...",
      });
      setTimeout(() => setLocation("/terminal"), 2000);
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
  
  // Get tier from URL params
  const searchParams = new URLSearchParams(window.location.search);
  const tier = searchParams.get('tier') || 'operator';

  const tierInfo = {
    recruit: { name: 'RECRUIT', price: '$29', color: 'text-terminal-amber' },
    operator: { name: 'OPERATOR', price: '$79', color: 'text-terminal-green' },
    shadow: { name: 'SHADOW', price: '$199', color: 'text-red-400' }
  };

  const currentTier = tierInfo[tier as keyof typeof tierInfo] || tierInfo.operator;

  useEffect(() => {
    // Don't try to create subscription if Stripe is not configured
    if (!stripePromise) {
      setLoading(false);
      return;
    }

    // Create subscription as soon as the page loads
    apiRequest("POST", "/api/get-or-create-subscription", { tier })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
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
  }, [tier, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-terminal-green mx-auto mb-4" />
          <p className="text-gray-300 font-mono">Initializing payment system...</p>
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
      {/* Header */}
      <div className="border-b border-gray-800 bg-card-bg/90">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-terminal-green rounded-lg flex items-center justify-center">
                <Lock className="text-terminal-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-terminal-green font-mono">BlackRaven OS</h1>
                <p className="text-xs text-gray-400">Secure Payment Portal</p>
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
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-card-bg rounded-xl mb-4">
              <CreditCard className="h-12 w-12 text-terminal-green mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Complete Your Subscription</h1>
            <p className="text-gray-400">Secure payment processing powered by Stripe</p>
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
                    <SubscribeForm tier={tier} />
                  </Elements>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2">
              <Card className="bg-card-bg border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-700">
                    <div>
                      <h3 className={`font-bold ${currentTier.color}`}>{currentTier.name} Access</h3>
                      <p className="text-sm text-gray-400">Monthly subscription</p>
                    </div>
                    <span className="text-white font-mono text-lg" data-testid="text-price">
                      {currentTier.price}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span data-testid="text-subtotal">{currentTier.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span data-testid="text-tax">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 flex justify-between text-white font-bold">
                      <span>Total</span>
                      <span data-testid="text-total">{currentTier.price}/month</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h4 className="font-semibold text-terminal-green mb-2">Included Features:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {tier === 'recruit' && (
                        <>
                          <li>• Basic command line training</li>
                          <li>• 5 training modules</li>
                          <li>• Community support</li>
                        </>
                      )}
                      {tier === 'operator' && (
                        <>
                          <li>• Advanced penetration testing</li>
                          <li>• 20+ training modules</li>
                          <li>• Live scenarios</li>
                          <li>• Certificate generation</li>
                        </>
                      )}
                      {tier === 'shadow' && (
                        <>
                          <li>• All operator features</li>
                          <li>• Red team simulations</li>
                          <li>• Custom scenarios</li>
                          <li>• 1-on-1 mentoring</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your payment information is secure and encrypted
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
