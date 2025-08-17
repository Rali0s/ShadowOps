import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, CreditCard } from "lucide-react";

interface PaymentFormProps {
  tier: string;
  onSuccess?: () => void;
}

export function PaymentForm({ tier, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const tierPrices = {
    recruit: '$29',
    operator: '$79',
    shadow: '$199'
  };

  const tierNames = {
    recruit: 'RECRUIT',
    operator: 'OPERATOR', 
    shadow: 'SHADOW'
  };

  const currentPrice = tierPrices[tier as keyof typeof tierPrices] || '$79';
  const currentName = tierNames[tier as keyof typeof tierNames] || 'OPERATOR';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/terminal`,
        },
      });

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "An error occurred during payment processing.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Successful",
          description: `Welcome to ${currentName} access level! Redirecting to terminal...`,
        });
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card-bg border border-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Order Summary</h3>
          <div className="text-right">
            <div className={`text-xl font-bold font-mono ${
              tier === 'shadow' ? 'text-red-400' : 
              tier === 'operator' ? 'text-terminal-green' : 
              'text-terminal-amber'
            }`}>
              {currentPrice}
            </div>
            <div className="text-sm text-gray-400">/month</div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">{currentName} Access</span>
            <span className="text-white">{currentPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Tax</span>
            <span className="text-gray-400">Calculated at checkout</span>
          </div>
          <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
            <span className="text-white">Total</span>
            <span className="text-white">{currentPrice}/month</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <PaymentElement 
          options={{
            layout: "tabs",
            paymentMethodOrder: ['card'],
          }}
          data-testid="stripe-payment-element"
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="w-full bg-terminal-green text-terminal-bg font-bold text-lg py-4 hover:bg-terminal-amber transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="button-complete-payment"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-5 w-5" />
            Complete Payment {currentPrice}
          </>
        )}
      </Button>

      <div className="text-center">
        <div className="flex items-center justify-center text-xs text-gray-500">
          <CreditCard className="mr-1 h-3 w-3" />
          Secure payment powered by Stripe
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your payment information is encrypted and secure
        </p>
      </div>
    </form>
  );
}
