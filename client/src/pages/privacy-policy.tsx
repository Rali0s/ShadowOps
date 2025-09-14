import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as WouterLink } from "wouter";
import { Shield, ArrowLeft, Eye, Lock, Database, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 14, 2025";

  return (
    <div className="min-h-screen bg-black dark:bg-black text-green-400 dark:text-green-400 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-green-300 text-lg">
            How we collect, use, and protect your information
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

        {/* Privacy Overview */}
        <Card className="border-cyan-500/30 bg-cyan-900/10 backdrop-blur-sm" data-testid="card-privacy-overview">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Your Privacy Matters</h3>
                <p className="text-green-300 text-sm">
                  We are committed to protecting your privacy and being transparent about how we handle your data. 
                  This policy explains what information we collect, how we use it, and your rights regarding your personal information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Content */}
        <div className="space-y-6">
          
          {/* Section 1: Information We Collect */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-collect">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Database className="w-5 h-5" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <h4 className="text-cyan-300 font-semibold">1.1 Discord OAuth Information</h4>
              <p>When you authenticate with Discord, we collect:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Discord username and user ID</li>
                <li>Discord avatar/profile picture</li>
                <li>Email address (if provided by Discord)</li>
                <li>Discord server membership status</li>
                <li>Discord roles and permissions in our server</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">1.2 Account Information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Authentication tokens and session data</li>
                <li>Account creation date and login timestamps</li>
                <li>Subscription status and billing information</li>
                <li>Platform usage preferences and settings</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">1.3 Usage Data</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pages visited and features accessed</li>
                <li>Time spent on platform and session duration</li>
                <li>Browser type, device information, and IP address</li>
                <li>Frequency training sessions and preferences</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">1.4 Payment Information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Stripe customer ID and subscription details</li>
                <li>Billing history and transaction records</li>
                <li>Payment method information (processed securely by Stripe)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 2: How We Use Information */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-use">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>We use the collected information for the following purposes:</p>
              
              <h4 className="text-cyan-300 font-semibold">2.1 Service Provision</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Authenticate and verify your identity</li>
                <li>Provide access to platform features and content</li>
                <li>Manage Discord server roles and permissions</li>
                <li>Process subscription payments and billing</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">2.2 Platform Improvement</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Analyze usage patterns to improve user experience</li>
                <li>Develop new features and functionalities</li>
                <li>Monitor platform performance and security</li>
                <li>Troubleshoot technical issues and bugs</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">2.3 Communication</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Send important service updates and announcements</li>
                <li>Provide customer support and technical assistance</li>
                <li>Notify about subscription renewals and billing</li>
                <li>Share community updates through Discord</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 3: Data Sharing */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-sharing">
            <CardHeader>
              <CardTitle className="text-cyan-400">3. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>We may share your information in the following limited circumstances:</p>

              <h4 className="text-cyan-300 font-semibold">3.1 Service Providers</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Discord:</strong> For authentication and community management</li>
                <li><strong>Stripe:</strong> For payment processing and subscription management</li>
                <li><strong>Hosting Providers:</strong> For secure data storage and platform hosting</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">3.2 Legal Requirements</h4>
              <p>We may disclose information when required by law or to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Comply with legal obligations or court orders</li>
                <li>Protect our rights, property, or safety</li>
                <li>Prevent fraud or abuse of our services</li>
                <li>Respond to government requests or investigations</li>
              </ul>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold">We Never Sell Your Data</p>
                <p className="text-sm">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Data Security */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-security">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                4. Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>We implement various security measures to protect your information:</p>
              
              <h4 className="text-cyan-300 font-semibold">4.1 Technical Safeguards</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure database storage with access controls</li>
                <li>Regular security audits and vulnerability testing</li>
                <li>Multi-factor authentication for administrative access</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">4.2 Operational Security</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Limited employee access to personal data</li>
                <li>Regular security training and awareness programs</li>
                <li>Incident response procedures for data breaches</li>
                <li>Regular data backups and disaster recovery plans</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5: Your Rights */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-rights">
            <CardHeader>
              <CardTitle className="text-cyan-400">5. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>You have the following rights regarding your personal information:</p>

              <h4 className="text-cyan-300 font-semibold">5.1 Access and Control</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">5.2 GDPR Rights (EU Residents)</h4>
              <p>If you're in the European Union, you have additional rights under GDPR:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Right to object to data processing</li>
                <li>Right to restrict processing of your data</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with supervisory authorities</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">5.3 CCPA Rights (California Residents)</h4>
              <p>California residents have rights under the California Consumer Privacy Act:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Right to know what personal information is collected</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 6: Cookies and Tracking */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-cookies">
            <CardHeader>
              <CardTitle className="text-cyan-400">6. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>We use cookies and similar technologies to:</p>
              
              <h4 className="text-cyan-300 font-semibold">6.1 Essential Cookies</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Maintain your authentication session</li>
                <li>Remember your platform preferences</li>
                <li>Ensure platform security and functionality</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">6.2 Analytics and Performance</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Monitor platform usage and performance</li>
                <li>Identify and fix technical issues</li>
                <li>Understand user behavior patterns</li>
              </ul>

              <p>You can control cookies through your browser settings, but disabling certain cookies may affect platform functionality.</p>
            </CardContent>
          </Card>

          {/* Section 7: Data Retention */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-retention">
            <CardHeader>
              <CardTitle className="text-cyan-400">7. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>We retain your information for different periods based on the type of data:</p>

              <h4 className="text-cyan-300 font-semibold">7.1 Account Information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Active accounts: Retained while your account is active</li>
                <li>Deleted accounts: Permanently deleted within 30 days</li>
                <li>Backup systems: Up to 90 days for disaster recovery</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">7.2 Usage and Analytics Data</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Aggregated analytics: Retained indefinitely (anonymized)</li>
                <li>Individual usage logs: Deleted after 12 months</li>
                <li>Session data: Deleted after 30 days</li>
              </ul>

              <h4 className="text-cyan-300 font-semibold">7.3 Financial Records</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Billing records: Retained for 7 years (tax compliance)</li>
                <li>Payment transactions: Processed and stored by Stripe</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 8: International Data Transfers */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-international">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                8. International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Standard contractual clauses for EU data transfers</li>
                <li>Adequacy decisions for approved countries</li>
                <li>Privacy Shield or similar certification programs</li>
                <li>Strong encryption for all international transfers</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 9: Children's Privacy */}
          <Card className="border-yellow-500/30 bg-yellow-900/10 backdrop-blur-sm" data-testid="card-section-children">
            <CardHeader>
              <CardTitle className="text-yellow-400">9. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                Our Service is not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children under 18. If you are a parent or guardian and believe your 
                child has provided us with personal information, please contact us immediately.
              </p>
              <p>
                If we discover we have collected personal information from a child under 18 without parental consent, 
                we will delete that information promptly.
              </p>
            </CardContent>
          </Card>

          {/* Section 10: Changes to Privacy Policy */}
          <Card className="border-green-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-section-changes">
            <CardHeader>
              <CardTitle className="text-cyan-400">10. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last updated" date</li>
                <li>Sending email notifications for material changes</li>
                <li>Discord announcements for significant updates</li>
              </ul>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this 
                Privacy Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-cyan-500/30 bg-black/60 backdrop-blur-sm" data-testid="card-contact">
            <CardHeader>
              <CardTitle className="text-cyan-400">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-green-300">
              <p>
                If you have any questions about this Privacy Policy, your data rights, or our privacy practices, 
                please contact us:
              </p>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <ul className="space-y-2">
                  <li><strong>Website:</strong> <a href="https://ghz.life" className="text-cyan-400 hover:underline" data-testid="link-website">ghz.life</a></li>
                  <li><strong>Discord:</strong> Join our community server for support</li>
                  <li><strong>Data Protection:</strong> Contact us through Discord or website for privacy requests</li>
                </ul>
              </div>
              <p className="text-green-300/70 text-sm">
                This Privacy Policy is effective as of {lastUpdated}.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}