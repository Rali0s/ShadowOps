import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain,
  Clock,
  Eye,
  Target,
  CheckCircle,
  AlertTriangle,
  FileText,
  Zap,
  Shield,
  BookOpen,
  PenTool,
  BarChart3,
  Lightbulb
} from "lucide-react";

interface MethodologySection {
  title: string;
  description: string;
  steps: string[];
  tools: string[];
  frequency: string;
  icon: React.ReactNode;
}

const SELF_REPORT_METHODS: MethodologySection[] = [
  {
    title: "Subjective State Journaling",
    description: "Learn to document your cognitive and emotional states during training",
    steps: [
      "Create a simple scale (1-10) for mental clarity, focus, relaxation",
      "Note timestamp and session type before starting",
      "Record initial state, any changes during session, and post-session state",
      "Use consistent terminology to track patterns over time",
      "Review weekly to identify trends and optimal conditions"
    ],
    tools: ["Personal notebook", "Voice recorder app", "Simple spreadsheet", "Phone notes"],
    frequency: "Each session",
    icon: <PenTool className="w-5 h-5" />
  },
  {
    title: "Behavioral Observation",
    description: "Techniques for monitoring changes in daily performance and habits",
    steps: [
      "Choose 3-5 specific behaviors to track (focus duration, memory recall, creativity)",
      "Establish baseline measurements before starting training",
      "Use objective metrics when possible (minutes of sustained attention)",
      "Note environmental factors that may influence performance",
      "Compare weekly averages to identify gradual changes"
    ],
    tools: ["Habit tracking apps", "Timer apps", "Personal reflection journal", "Photo diary"],
    frequency: "Daily",
    icon: <Eye className="w-5 h-5" />
  },
  {
    title: "Physiological Awareness",
    description: "Monitor physical responses and sensations during training",
    steps: [
      "Learn to identify physical sensations (tension, warmth, tingling)",
      "Note breathing patterns and heart rate changes",
      "Track sleep quality and energy levels",
      "Monitor for any discomfort or unusual sensations",
      "Record duration and intensity of physical responses"
    ],
    tools: ["Body scan meditation", "Heart rate monitor", "Sleep tracking app", "Energy level diary"],
    frequency: "Each session",
    icon: <Brain className="w-5 h-5" />
  },
  {
    title: "Top-Down vs Bottom-Up Processing",
    description: "Study how you process information from concepts to details or details to concepts",
    steps: [
      "Document your natural problem-solving approach (general-to-specific vs specific-to-general)",
      "Track which method works better for different types of tasks",
      "Note when you switch between approaches and what triggers the change",
      "Record effectiveness of each approach for different cognitive states",
      "Analyze patterns in your preferred processing style over time"
    ],
    tools: ["Problem-solving journal", "Task type categorization", "Decision tree mapping", "Process flow diagrams"],
    frequency: "Weekly analysis",
    icon: <Target className="w-5 h-5" />
  },
  {
    title: "Inductive vs Deductive Reasoning",
    description: "Track your reasoning patterns from specific examples to general principles or vice versa",
    steps: [
      "Identify instances of pattern recognition leading to general conclusions (inductive)",
      "Document times when you apply general rules to specific cases (deductive)",
      "Note which reasoning style feels more natural in different contexts",
      "Track accuracy and confidence levels for each reasoning approach",
      "Analyze how brainwave states affect your reasoning preferences"
    ],
    tools: ["Logic pattern tracker", "Reasoning confidence scale", "Example-to-rule mapping", "Decision accuracy log"],
    frequency: "Daily observations",
    icon: <Lightbulb className="w-5 h-5" />
  },
  {
    title: "Transactional vs Relational Processing",
    description: "Monitor how you handle task-focused interactions versus relationship-focused processing",
    steps: [
      "Track when you focus on completing specific tasks (transactional)",
      "Note instances of relationship and context consideration (relational)",
      "Document which approach works better for different types of problems",
      "Record energy levels and stress during each processing mode",
      "Analyze how cognitive enhancement affects your processing balance"
    ],
    tools: ["Interaction type log", "Context awareness tracker", "Relationship mapping", "Processing mode diary"],
    frequency: "Daily",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

const DOCUMENTATION_TECHNIQUES = [
  {
    category: "Written Methods",
    techniques: [
      "Stream of consciousness writing immediately post-session",
      "Structured questionnaires with consistent rating scales",
      "Timeline documentation showing before/during/after states",
      "Keyword tagging system for quick pattern recognition"
    ]
  },
  {
    category: "Digital Tools",
    techniques: [
      "Voice memo recordings for hands-free documentation",
      "Photo documentation of visual experiences or mood boards",
      "Simple spreadsheet tracking with timestamps and ratings",
      "Calendar integration to correlate with life events"
    ]
  },
  {
    category: "Analytical Approaches",
    techniques: [
      "Weekly pattern analysis and trend identification",
      "Correlation tracking between variables (time of day, mood, effectiveness)",
      "Before/after comparison using consistent metrics",
      "Long-term progress documentation with monthly reviews"
    ]
  }
];

export default function SelfReportMethodologyPage() {
  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 mobile-safe-padding">
      <div className="max-w-6xl mx-auto container-responsive py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-terminal-red-primary rounded-lg">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-terminal-red-bright font-mono">Self-Report Methodology</h1>
              <p className="text-sm sm:text-base text-terminal-red-secondary">Learn scientific approaches to personal observation and documentation</p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">Educational Purpose Only</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              These methodologies teach you how to conduct your own self-observation studies. 
              This is purely educational - you maintain complete control of your own data and documentation.
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full bg-terminal-red-dark">
            <TabsTrigger value="methods" className="text-terminal-red-secondary data-[state=active]:text-white">
              Core Methods
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="text-terminal-red-secondary data-[state=active]:text-white">
              Cognitive Models
            </TabsTrigger>
            <TabsTrigger value="documentation" className="text-terminal-red-secondary data-[state=active]:text-white">
              Documentation
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-terminal-red-secondary data-[state=active]:text-white">
              Analysis & Ethics
            </TabsTrigger>
          </TabsList>

          {/* Core Methods Tab */}
          <TabsContent value="methods" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {SELF_REPORT_METHODS.slice(0, 3).map((method, index) => (
                <Card key={index} className="bg-card-bg border-terminal-red-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-terminal-red-bright flex items-center gap-3 text-lg">
                      <div className="p-2 bg-terminal-red-primary rounded-lg">
                        {method.icon}
                      </div>
                      {method.title}
                    </CardTitle>
                    <p className="text-terminal-red-secondary text-sm">
                      {method.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Frequency: {method.frequency}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Steps:</h4>
                      <div className="space-y-2">
                        {method.steps.map((step, sIndex) => (
                          <div key={sIndex} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-terminal-red-primary font-bold mt-0.5 flex-shrink-0">{sIndex + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Suggested Tools:</h4>
                      <div className="flex flex-wrap gap-1">
                        {method.tools.map((tool, tIndex) => (
                          <Badge key={tIndex} variant="secondary" className="text-xs bg-terminal-red-dark text-terminal-red-secondary">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cognitive Models Tab */}
          <TabsContent value="cognitive" className="space-y-6">
            <div className="mb-6">
              <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
                <Brain className="h-5 w-5" />
                <AlertTitle className="text-terminal-red-bright">Advanced Cognitive Research Models</AlertTitle>
                <AlertDescription className="text-terminal-red-secondary">
                  These methodologies focus on higher-order cognitive processes and reasoning patterns. 
                  Future expansion planned for heuristics and behavioral analysis frameworks.
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {SELF_REPORT_METHODS.slice(3).map((method, index) => (
                <Card key={index + 3} className="bg-card-bg border-terminal-red-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-terminal-red-bright flex items-center gap-3 text-lg">
                      <div className="p-2 bg-terminal-red-primary rounded-lg">
                        {method.icon}
                      </div>
                      {method.title}
                    </CardTitle>
                    <p className="text-terminal-red-secondary text-sm">
                      {method.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Frequency: {method.frequency}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Steps:</h4>
                      <div className="space-y-2">
                        {method.steps.map((step, sIndex) => (
                          <div key={sIndex} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-terminal-red-primary font-bold mt-0.5 flex-shrink-0">{sIndex + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Suggested Tools:</h4>
                      <div className="flex flex-wrap gap-1">
                        {method.tools.map((tool, tIndex) => (
                          <Badge key={tIndex} variant="secondary" className="text-xs bg-terminal-red-dark text-terminal-red-secondary">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Future Research Areas */}
            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Future Research Framework Expansion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-terminal-red-bright text-sm font-semibold mb-3">Planned Heuristics Research:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Availability Heuristic tracking and bias detection</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Representativeness heuristic pattern analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Anchoring and adjustment mechanism studies</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Cognitive shortcuts effectiveness measurement</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-terminal-red-bright text-sm font-semibold mb-3">Planned Behavioral Analysis:</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Decision-making behavior pattern tracking</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Cognitive load response behavioral changes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Risk assessment and tolerance behavioral analysis</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>Social and environmental behavioral triggers</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-terminal-red-dark/20 rounded-lg">
                  <p className="text-xs text-terminal-red-secondary italic">
                    These advanced methodologies will be personally integrated in future updates, 
                    providing comprehensive cognitive behavioral analysis frameworks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {DOCUMENTATION_TECHNIQUES.map((category, index) => (
                <Card key={index} className="bg-card-bg border-terminal-red-muted/30">
                  <CardHeader>
                    <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.techniques.map((technique, tIndex) => (
                        <div key={tIndex} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-terminal-red-primary mt-0.5 flex-shrink-0" />
                          <span>{technique}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright">Sample Documentation Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-terminal-red-dark/20 p-4 rounded-lg font-mono text-sm text-terminal-red-secondary">
                  <div className="space-y-2">
                    <div><strong className="text-terminal-red-bright">Date/Time:</strong> 2025-01-15 / 14:30</div>
                    <div><strong className="text-terminal-red-bright">Session Type:</strong> Alpha Wave Training (10Hz)</div>
                    <div><strong className="text-terminal-red-bright">Pre-Session State:</strong> Mental clarity: 6/10, Energy: 7/10, Mood: Neutral</div>
                    <div><strong className="text-terminal-red-bright">During Session:</strong> Noticed increased relaxation after 5min, visual patterns appeared around 8min</div>
                    <div><strong className="text-terminal-red-bright">Post-Session:</strong> Mental clarity: 8/10, Energy: 6/10, Mood: Calm/focused</div>
                    <div><strong className="text-terminal-red-bright">Duration:</strong> 15 minutes</div>
                    <div><strong className="text-terminal-red-bright">Environment:</strong> Quiet room, dim lighting, comfortable temperature</div>
                    <div><strong className="text-terminal-red-bright">Notes:</strong> Best session this week, will try same time tomorrow</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis & Ethics Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card-bg border-terminal-red-muted/30">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Data Analysis Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Pattern Recognition:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Weekly trend analysis using simple averages</li>
                        <li>• Correlation tracking (time of day vs. effectiveness)</li>
                        <li>• Environmental factor influence mapping</li>
                        <li>• Baseline comparison over time</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Statistical Approaches:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Moving averages to smooth daily variations</li>
                        <li>• Before/after comparisons with confidence intervals</li>
                        <li>• Outlier identification and analysis</li>
                        <li>• Long-term trend visualization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card-bg border-terminal-red-muted/30">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Ethical Self-Study Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Personal Safety:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Stop immediately if experiencing discomfort</li>
                        <li>• Maintain objectivity and avoid bias</li>
                        <li>• Set reasonable expectations and timeframes</li>
                        <li>• Consult professionals for concerning symptoms</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-terminal-red-bright text-sm font-semibold mb-2">Data Privacy:</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Keep all documentation private and secure</li>
                        <li>• Never share personal data without consent</li>
                        <li>• Use coded identifiers if sharing anonymized insights</li>
                        <li>• Respect your own privacy boundaries</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-yellow-700/50 bg-yellow-950/30">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle className="text-yellow-300">Important Reminders</AlertTitle>
              <AlertDescription className="text-yellow-200 space-y-2">
                <p className="font-semibold">PRODUCT OF A MAD MAN - Educational Content Only</p>
                <div className="text-sm space-y-1">
                  <p>• This platform provides educational methodology, not clinical research</p>
                  <p>• You are the sole controller of your data and observations</p>
                  <p>• Results are subjective and should not be considered medical evidence</p>
                  <p>• Think for yourself. Question everything. DYOR.</p>
                </div>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}