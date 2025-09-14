import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as WouterLink } from "wouter";
import { ScrollText, ArrowLeft, Shield, AlertTriangle } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "September 14, 2025";

  return (
    <div className="min-h-screen bg-black dark:bg-black text-green-400 dark:text-green-400 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-green-300 text-lg">
            _Fq neurohacker platform terms and conditions
          </p>
          <p className="text-green-300/70 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-start">
          <WouterLink href="/">
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </WouterLink>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          
          {/* Important Notice */}
          <Card className="border-yellow-500/30 bg-yellow-900/10 backdrop-blur-sm" data-testid="card-important-notice">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Important Notice</h3>
                  <p className="text-green-300 text-sm">
                    By using the _Fq neurohacker platform, you agree to these terms. This platform provides experimental 
                    brainwave frequency training and neurohacking tools. Results may vary and are not guaranteed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Acceptance of Terms */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-acceptance">
            <CardHeader>
              <CardTitle className="text-cyan-400">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                These Terms of Service ("Terms") govern your access to and use of the _Fq neurohacker platform 
                ("Service"), operated by _Fq neurohacker ("we," "us," or "our"). The Service is accessible at ghz.life 
                and related Discord integration services.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
                part of these terms, you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Section 2: Service Description */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-service">
            <CardHeader>
              <CardTitle className="text-cyan-400">2. Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                _Fq neurohacker is a neurohacking membership platform that provides:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Brainwave frequency training (Alpha, Beta, Theta, Gamma frequencies)</li>
                <li>Neural matrix programming tools</li>
                <li>Shadowfang tactical training modules</li>
                <li>Discord community integration with role-based access</li>
                <li>Frequency generation and binaural beat tools</li>
                <li>Cognitive enhancement methodologies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3: Beta Access and Subscription */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-beta">
            <CardHeader>
              <CardTitle className="text-cyan-400">3. Beta Access and Subscription Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <h4 className="text-cyan-300 font-semibold">3.1 Beta Period</h4>
              <p>
                The platform is currently in beta testing phase, offering free access until December 31, 2025. 
                Beta access requires Discord community membership and verification.
              </p>
              
              <h4 className="text-cyan-300 font-semibold">3.2 Post-Beta Subscription</h4>
              <p>
                After the beta period ends, continued access requires a monthly subscription of $5.89 USD. 
                Subscription fees are processed through Stripe payment systems.
              </p>
              
              <h4 className="text-cyan-300 font-semibold">3.3 Cancellation</h4>
              <p>
                You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing cycle. 
                No refunds are provided for partial months.
              </p>
            </CardContent>
          </Card>

          {/* Section 4: Discord Integration */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-discord">
            <CardHeader>
              <CardTitle className="text-cyan-400">4. Discord Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                Our Service integrates with Discord for authentication and community access. By using Discord OAuth:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You authorize us to access your Discord user information (username, ID, avatar)</li>
                <li>You authorize us to verify your membership in our Discord server</li>
                <li>We may use Discord linked roles to manage access permissions</li>
                <li>You must maintain Discord community guidelines and our community standards</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5: User Conduct */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-conduct">
            <CardHeader>
              <CardTitle className="text-cyan-400">5. User Conduct and Restrictions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Service for any illegal or unauthorized purposes</li>
                <li>Attempt to bypass authentication or access controls</li>
                <li>Share, distribute, or resell access to the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Interfere with or disrupt the Service's functionality</li>
                <li>Use the Service to harm yourself or others</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6: Health and Safety */}
          <Card className="border-red-500/30 bg-red-900/10 backdrop-blur-sm" data-testid="card-section-health">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                6. Health and Safety Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 font-semibold mb-2">Important Medical Disclaimer:</p>
                <p>
                  The _Fq neurohacker platform provides experimental brainwave frequency training and is not intended 
                  to diagnose, treat, cure, or prevent any medical condition. 
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consult a healthcare professional before using frequency-based training</li>
                <li>Discontinue use if you experience any adverse effects</li>
                <li>Do not use if you have epilepsy, seizure disorders, or are photosensitive</li>
                <li>Results are experimental and not scientifically guaranteed</li>
                <li>Use at your own risk and responsibility</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 7: Intellectual Property */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-ip">
            <CardHeader>
              <CardTitle className="text-cyan-400">7. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive 
                property of _Fq neurohacker and its licensors. The Service is protected by copyright, trademark, 
                and other laws.
              </p>
              <p>
                You are granted a limited, non-exclusive, non-transferable license to access and use the Service 
                for personal, non-commercial purposes only.
              </p>
            </CardContent>
          </Card>

          {/* Section 8: Limitation of Liability */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-liability">
            <CardHeader>
              <CardTitle className="text-cyan-400">8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                To the maximum extent permitted by applicable law, _Fq neurohacker shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Your sole remedy and our entire liability shall be limited to the amount paid by you for the Service 
                during the twelve (12) months prior to the event giving rise to liability.
              </p>
            </CardContent>
          </Card>

          {/* Section 9: Termination */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-termination">
            <CardHeader>
              <CardTitle className="text-cyan-400">9. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                We may terminate or suspend your access immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will cease immediately. All provisions of the 
                Terms which by their nature should survive termination shall survive.
              </p>
            </CardContent>
          </Card>

          {/* Section 10: Changes to Terms */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-changes">
            <CardHeader>
              <CardTitle className="text-cyan-400">10. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree 
                to be bound by the revised terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-cyan-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-contact">
            <CardHeader>
              <CardTitle className="text-cyan-400">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                If you have any questions about these Terms of Service, please contact us through our Discord community 
                or visit our platform at <a href="https://ghz.life" className="text-cyan-400 hover:underline" data-testid="link-website">ghz.life</a>.
              </p>
              <p className="text-green-300/70 text-sm">
                These Terms of Service are effective as of {lastUpdated}.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}