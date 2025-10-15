import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BookOpen,
  PenTool,
  Lightbulb,
  Eye,
  Brain
} from "lucide-react";

export default function SelfReportMethodologyPage() {
  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 mobile-safe-padding">
      <div className="max-w-4xl mx-auto container-responsive py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-terminal-red-primary rounded-lg">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-terminal-red-bright font-mono">Self-Report Methodology</h1>
              <p className="text-sm sm:text-base text-terminal-red-secondary">Simple analog approach to personal observation</p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">Keep It Simple</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              No complex systems. No data collection. Just you, a notebook, and your observations.
              This platform does not collect or store any of your personal data.
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Recommendation */}
        <div className="space-y-6">
          <Card className="bg-card-bg border-terminal-red-primary/50">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright flex items-center gap-3 text-xl">
                <div className="p-2 bg-terminal-red-primary rounded-lg">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                Use a Physical Notebook & Pen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p className="text-lg">
                The best way to track your personal observations is with a simple notebook and pen (or pencil).
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-terminal-red-bright font-semibold mb-1">Write What You Notice</h3>
                    <p className="text-sm">Document your observations, feelings, and experiences in your own words.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-terminal-red-bright font-semibold mb-1">Track Your Progress</h3>
                    <p className="text-sm">Note patterns, changes, and insights over time in your personal journal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-terminal-red-bright font-semibold mb-1">Keep It Private</h3>
                    <p className="text-sm">Your notebook is yours alone. No apps, no cloud storage, no data collection.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-primary/30">
                <h3 className="text-terminal-red-bright font-semibold mb-2">Simple Documentation Format:</h3>
                <div className="font-mono text-sm space-y-1 text-terminal-red-secondary">
                  <p>• Date & time of session</p>
                  <p>• What you did (which training/frequency)</p>
                  <p>• How you felt before, during, and after</p>
                  <p>• Any notable observations or insights</p>
                  <p>• Duration of session</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-terminal-red-primary/10 rounded-lg">
                <p className="text-sm italic text-center text-terminal-red-secondary">
                  "Think for yourself. Question everything. DYOR."
                </p>
                <p className="text-xs text-center text-gray-500 mt-2">
                  This is your personal journey. Document it however works best for you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why Analog? */}
          <Card className="bg-card-bg border-terminal-red-muted/30">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright">Why Keep It Analog?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-300 text-sm">
              <p>
                • <strong className="text-terminal-red-bright">Privacy:</strong> Your observations stay completely private. No servers, no databases, no tracking.
              </p>
              <p>
                • <strong className="text-terminal-red-bright">Simplicity:</strong> No apps to learn, no software to maintain. Just write.
              </p>
              <p>
                • <strong className="text-terminal-red-bright">Flexibility:</strong> Document in whatever format makes sense to you. No rigid forms or fields.
              </p>
              <p>
                • <strong className="text-terminal-red-bright">Permanence:</strong> Physical notebooks last. No risk of data loss, account deletion, or platform changes.
              </p>
              <p>
                • <strong className="text-terminal-red-bright">Mindfulness:</strong> The act of writing by hand can enhance reflection and awareness.
              </p>
            </CardContent>
          </Card>

          {/* Educational Note */}
          <Alert className="border-terminal-red-primary/30 bg-terminal-red-dark/10">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">Educational Purpose</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary text-sm">
              This page teaches self-observation methodology for educational purposes only. 
              You maintain complete control of your own documentation. 
              This platform does not collect, store, or process any personal data from your training sessions.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
