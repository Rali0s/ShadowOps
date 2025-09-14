import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link as WouterLink } from "wouter";
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Brain, 
  RadioIcon,
  Zap
} from "lucide-react";

export default function DiscordLinkedRolesPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black dark:bg-black text-green-400 dark:text-green-400 flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading Discord verification status...</div>
      </div>
    );
  }

  const isDiscordVerified = user?.discordVerified || false;
  const hasDiscordInfo = user?.discordId && user?.discordUsername;

  return (
    <div className="min-h-screen bg-black dark:bg-black text-green-400 dark:text-green-400 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Discord Linked Roles
            </h1>
          </div>
          <p className="text-green-300 text-lg max-w-2xl mx-auto">
            Verify your Discord membership to unlock advanced neurohacking features and exclusive community access.
          </p>
        </div>

        {/* User Status Card */}
        <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-user-status">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Brain className="w-5 h-5" />
              Your Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!user ? (
              <div className="text-center space-y-4">
                <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                <div>
                  <p className="text-red-400 text-lg font-semibold">Not Authenticated</p>
                  <p className="text-green-300">You need to log in to verify your Discord status</p>
                </div>
                <WouterLink href="/">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black" data-testid="button-login">
                    Login to Continue
                  </Button>
                </WouterLink>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  {isDiscordVerified ? (
                    <CheckCircle2 className="w-12 h-12 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-400">
                      Discord Verification: {isDiscordVerified ? 'Verified' : 'Unverified'}
                    </h3>
                    <p className="text-green-300 mt-1">
                      {isDiscordVerified 
                        ? 'You have access to all premium neurohacking features!'
                        : 'Join our Discord server to unlock premium features'
                      }
                    </p>
                  </div>
                </div>

                {hasDiscordInfo && (
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <h4 className="text-green-400 font-semibold mb-2">Discord Account</h4>
                    <div className="flex items-center gap-3">
                      {user.discordAvatar && (
                        <img 
                          src={user.discordAvatar} 
                          alt="Discord Avatar" 
                          className="w-8 h-8 rounded-full"
                          data-testid="img-discord-avatar"
                        />
                      )}
                      <div>
                        <p className="text-cyan-400 font-medium" data-testid="text-discord-username">
                          {user.discordUsername}
                        </p>
                        <p className="text-green-300 text-sm" data-testid="text-discord-id">
                          ID: {user.discordId}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Roles/Features */}
        <Card className="border-cyan-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-available-roles">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Zap className="w-5 h-5" />
              Available Discord Roles & Features
            </CardTitle>
            <CardDescription className="text-green-300">
              Features unlocked through Discord community membership
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    Beta Access
                  </Badge>
                  <span className="text-green-300">Free until Dec 2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                    Neural Matrix
                  </Badge>
                  <span className="text-green-300">Advanced brainwave training</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    Shadowfang Ops
                  </Badge>
                  <span className="text-green-300">Tactical mind programming</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <RadioIcon className="w-4 h-4 text-green-400" />
                  <span className="text-green-300">Frequency Generator Access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className="text-green-300">Cognitive Enhancement Tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-green-300">Exclusive Community Access</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isDiscordVerified && (
            <Button 
              className="bg-[#5865F2] hover:bg-[#4f5acb] text-white flex items-center gap-2"
              onClick={() => window.location.href = '/api/auth/discord/login'}
              data-testid="button-join-discord"
            >
              <ExternalLink className="w-4 h-4" />
              Join Discord Community
            </Button>
          )}
          
          {user && (
            <WouterLink href="/">
              <Button 
                variant="outline" 
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                data-testid="button-return-home"
              >
                Return to Dashboard
              </Button>
            </WouterLink>
          )}
        </div>

        {/* Discord Integration Notice */}
        <Card className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm" data-testid="card-discord-notice">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Shield className="w-8 h-8 text-purple-400 mx-auto" />
              <h3 className="text-lg font-semibold text-purple-400">Secure Discord Integration</h3>
              <p className="text-green-300 text-sm max-w-2xl mx-auto">
                Your Discord data is securely stored and used only for verification purposes. 
                We follow strict privacy guidelines and never access your personal messages or server data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}