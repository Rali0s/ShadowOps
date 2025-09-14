import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Brain, Users, Timer, AlertTriangle, Shield, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

// Loading state while checking Discord/beta status
export function AuthLoadingGate() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="text-center">
        <Brain className="h-12 w-12 animate-pulse text-red-400 mx-auto mb-4" />
        <Loader2 className="h-6 w-6 animate-spin text-red-300 mx-auto mb-4" />
        <p className="text-gray-300 font-mono">Checking Neural Matrix Access...</p>
        <p className="text-red-400 text-sm mt-2">Verifying your authorization level</p>
      </div>
    </div>
  );
}

// Discord verification required screen
export function DiscordRequiredGate() {
  const { loginWithDiscord, user, recheckDiscordMutation } = useAuth();
  const [, setLocation] = useLocation();

  const handleDiscordLogin = () => {
    if (user) {
      // User exists but Discord not verified, trigger recheck
      recheckDiscordMutation.mutate();
    } else {
      // No user, proceed with Discord login
      loginWithDiscord();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-card-bg border-red-500/30 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Discord Verification Required
          </CardTitle>
          <Badge className="mx-auto bg-red-600/20 text-red-300 border-red-500/50">
            <Timer className="w-3 h-3 mr-1" />
            Beta Access Phase
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Join our Discord community to access the Neural Matrix platform during the beta phase.
            </p>
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
              <h4 className="text-red-300 font-semibold mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                What you'll get:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Access to all frequency generators</li>
                <li>• SHADOWFANG training materials</li>
                <li>• Classified research archive</li>
                <li>• Neural matrix visualization tools</li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={handleDiscordLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3"
            disabled={recheckDiscordMutation.isPending}
            data-testid="button-discord-verify"
          >
            {recheckDiscordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking Discord Status...
              </>
            ) : user ? (
              <>
                <Users className="mr-2 h-4 w-4" />
                Verify Discord Connection
              </>
            ) : (
              <>
                <Users className="mr-2 h-4 w-4" />
                Connect with Discord
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">
              Don't have Discord? <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300">Download here</a>
            </p>
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="text-gray-400 hover:text-white text-sm"
              data-testid="button-back-home"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Beta expired screen - requires subscription
export function BetaExpiredGate() {
  const { betaStatus } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-card-bg border-orange-500/30 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Beta Phase Ended
          </CardTitle>
          <Badge className="mx-auto bg-orange-600/20 text-orange-300 border-orange-500/50">
            <Timer className="w-3 h-3 mr-1" />
            Subscription Required
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              The beta access period has ended. Subscribe to continue accessing the Neural Matrix platform.
            </p>
            {betaStatus?.message && (
              <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-3 mb-4">
                <p className="text-orange-200 text-sm">{betaStatus.message}</p>
              </div>
            )}
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
              <h4 className="text-red-300 font-semibold mb-2 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Premium Features:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Advanced frequency generators</li>
                <li>• Complete SHADOWFANG training</li>
                <li>• Classified research materials</li>
                <li>• Neural matrix synchronization</li>
                <li>• Priority support & updates</li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={() => setLocation("/subscribe")}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3"
            data-testid="button-subscribe"
          >
            <Lock className="mr-2 h-4 w-4" />
            Subscribe for Access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="text-gray-400 hover:text-white text-sm"
              data-testid="button-back-home"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Alternative subscription required gate (for non-Discord users post-beta)
export function SubscriptionRequiredGate() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-card-bg border-red-500/30 shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Premium Access Required
          </CardTitle>
          <Badge className="mx-auto bg-red-600/20 text-red-300 border-red-500/50">
            <Lock className="w-3 h-3 mr-1" />
            Neurohacker Elite
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Access the complete Neural Matrix platform with a premium subscription.
            </p>
            <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mb-4">
              <h4 className="text-red-300 font-semibold mb-2 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Unlock Everything:
              </h4>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• All frequency generation tools</li>
                <li>• Complete training modules</li>
                <li>• Declassified research archive</li>
                <li>• Advanced neural visualization</li>
                <li>• Exclusive community access</li>
              </ul>
            </div>
          </div>
          
          <Button 
            onClick={() => setLocation("/subscribe")}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3"
            data-testid="button-subscribe"
          >
            <Lock className="mr-2 h-4 w-4" />
            Get Neurohacker Elite Access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="text-gray-400 hover:text-white text-sm"
              data-testid="button-back-home"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}