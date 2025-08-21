import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Brain,
  Clock,
  Eye,
  Target,
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
  Shield
} from "lucide-react";

interface GuidelineSection {
  title: string;
  description: string;
  guidelines: string[];
  importance: 'low' | 'medium' | 'high' | 'critical';
  frequency: string;
  icon: React.ReactNode;
}

const SELF_REPORT_GUIDELINES: GuidelineSection[] = [
  {
    title: "Brainwave State Awareness",
    description: "Self-monitor your cognitive state during frequency training sessions",
    guidelines: [
      "Note your mental clarity level before starting (1-10 scale)",
      "Observe any shifts in focus or alertness during sessions",
      "Record subjective feelings of relaxation or stimulation",
      "Pay attention to physical sensations (tingling, warmth, etc.)",
      "Document any visual or auditory perceptions during training"
    ],
    importance: 'high',
    frequency: 'Each session',
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: "Psychological Programming Response",
    description: "Monitor your reactions to psychological programming elements",
    guidelines: [
      "Note emotional responses to anchor triggers",
      "Observe changes in thought patterns after sessions",
      "Record any spontaneous recall of programming elements",
      "Monitor stress levels before and after exposure",
      "Document dream content or sleep pattern changes"
    ],
    importance: 'critical',
    frequency: 'Daily',
    icon: <Target className="w-5 h-5" />
  },
  {
    title: "Cognitive Enhancement Progress",
    description: "Track subjective improvements in mental performance",
    guidelines: [
      "Assess memory recall improvements in daily tasks",
      "Note changes in problem-solving approaches",
      "Record instances of enhanced creativity or insight",
      "Monitor attention span during work or study",
      "Document any changes in learning speed or retention"
    ],
    importance: 'medium',
    frequency: 'Weekly',
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Side Effects & Safety Monitoring",
    description: "Watch for any adverse reactions or concerning symptoms",
    guidelines: [
      "Report headaches, dizziness, or disorientation",
      "Monitor for unusual mood changes or irritability",
      "Note any persistent ringing in ears or visual disturbances",
      "Record sleep disruptions or vivid nightmares",
      "Document any feelings of dissociation or unreality"
    ],
    importance: 'critical',
    frequency: 'Immediately',
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    title: "Sacred Geometry Interaction",
    description: "Document your responses to sacred geometry visualizations",
    guidelines: [
      "Note visual tracking ease and comfort level",
      "Record any meditative or trance-like states induced",
      "Observe synchronization with displayed frequency patterns",
      "Document color perception changes or visual effects",
      "Record duration of sustained attention to patterns"
    ],
    importance: 'medium',
    frequency: 'Each visualization session',
    icon: <Eye className="w-5 h-5" />
  },
  {
    title: "Training Session Context",
    description: "Record environmental and personal factors affecting training",
    guidelines: [
      "Note time of day and duration of sessions",
      "Record environmental conditions (noise, lighting, etc.)",
      "Document your energy level and mood before starting",
      "Note any substances consumed (caffeine, medications, etc.)",
      "Record interruptions or distractions during sessions"
    ],
    importance: 'medium',
    frequency: 'Each session',
    icon: <Clock className="w-5 h-5" />
  }
];

const IMPORTANCE_COLORS = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400"
};

export default function SelfReportGuidelinesPage() {
  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 mobile-safe-padding">
      <div className="max-w-6xl mx-auto container-responsive py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-terminal-red-primary rounded-lg">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-terminal-red-bright font-mono">Self-Report Guidelines</h1>
              <p className="text-sm sm:text-base text-terminal-red-secondary">Personal monitoring protocols for safe cognitive enhancement</p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Shield className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">No Tracking - Self-Monitoring Only</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              These guidelines are for personal awareness and safety. No data is collected or tracked by the platform. 
              Use your own judgment and maintain your own records as needed.
            </AlertDescription>
          </Alert>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {SELF_REPORT_GUIDELINES.map((section, index) => (
            <Card key={index} className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-terminal-red-bright flex items-center gap-3 text-lg">
                  <div className="p-2 bg-terminal-red-primary rounded-lg">
                    {section.icon}
                  </div>
                  {section.title}
                  <Badge className={IMPORTANCE_COLORS[section.importance]}>
                    {section.importance.toUpperCase()}
                  </Badge>
                </CardTitle>
                <p className="text-terminal-red-secondary text-sm">
                  {section.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>Frequency: {section.frequency}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {section.guidelines.map((guideline, gIndex) => (
                    <div key={gIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-terminal-red-primary mt-0.5 flex-shrink-0" />
                      <span>{guideline}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Safety Notice */}
        <Card className="bg-yellow-950/30 border-yellow-700/50">
          <CardHeader>
            <CardTitle className="text-yellow-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Safety Reminder
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-200 space-y-3">
            <p className="font-semibold">
              PRODUCT OF A MAD MAN - Psychology Degree Minus Math Prerequisites
            </p>
            <div className="space-y-2 text-sm">
              <p>• <strong>Discontinue immediately</strong> if you experience severe discomfort, disorientation, or concerning symptoms</p>
              <p>• <strong>Consult healthcare professionals</strong> for any persistent or worrying effects</p>
              <p>• <strong>This platform is experimental</strong> and not a substitute for professional medical or psychological care</p>
              <p>• <strong>Think for yourself. Question everything. DYOR.</strong></p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8 bg-terminal-red-muted/30" />

        {/* Usage Instructions */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright">How to Use These Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-terminal-red-secondary space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-terminal-red-primary/10 rounded-lg">
                <div className="w-12 h-12 bg-terminal-red-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-terminal-red-bright mb-2">Read Before Starting</h3>
                <p className="text-sm">Review all guidelines before beginning any training sessions</p>
              </div>
              <div className="text-center p-4 bg-terminal-red-primary/10 rounded-lg">
                <div className="w-12 h-12 bg-terminal-red-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-terminal-red-bright mb-2">Monitor Yourself</h3>
                <p className="text-sm">Use these as personal awareness checkpoints during training</p>
              </div>
              <div className="text-center p-4 bg-terminal-red-primary/10 rounded-lg">
                <div className="w-12 h-12 bg-terminal-red-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-terminal-red-bright mb-2">Take Action</h3>
                <p className="text-sm">Stop or modify training based on your observations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}