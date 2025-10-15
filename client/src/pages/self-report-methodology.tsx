import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen,
  PenTool,
  Lightbulb,
  Eye,
  Brain,
  Lock,
  Crown,
  CheckCircle,
  BarChart3,
  Target,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

const ADVANCED_METHODS = [
  {
    title: "Top-Down vs Bottom-Up Processing",
    description: "Analyze how you process information from concepts to details or details to concepts",
    icon: <Target className="w-5 h-5" />,
    techniques: [
      "Document your natural problem-solving approach in notebook",
      "Track which method works better for different task types",
      "Note when you switch between approaches",
      "Analyze patterns in your preferred processing style"
    ]
  },
  {
    title: "Inductive vs Deductive Reasoning",
    description: "Track reasoning patterns from specific examples to general principles or vice versa",
    icon: <Lightbulb className="w-5 h-5" />,
    techniques: [
      "Identify pattern recognition leading to general conclusions",
      "Document application of general rules to specific cases",
      "Note which reasoning style feels natural in different contexts",
      "Track accuracy and confidence levels for each approach"
    ]
  },
  {
    title: "Transactional vs Relational Processing",
    description: "Monitor task-focused interactions versus relationship-focused processing",
    icon: <CheckCircle className="w-5 h-5" />,
    techniques: [
      "Track when you focus on completing tasks (transactional)",
      "Note instances of relationship and context consideration (relational)",
      "Document which approach works for different problems",
      "Record energy levels and stress during each mode"
    ]
  }
];

const ANALYSIS_TECHNIQUES = [
  {
    category: "Pattern Recognition",
    methods: [
      "Weekly trend analysis using simple averages",
      "Time-of-day correlation tracking",
      "Environmental factor influence mapping",
      "Baseline comparison over time"
    ]
  },
  {
    category: "Statistical Approaches",
    methods: [
      "Moving averages to smooth daily variations",
      "Before/after comparisons with confidence intervals",
      "Outlier identification and analysis",
      "Long-term trend visualization"
    ]
  },
  {
    category: "Behavioral Analysis",
    methods: [
      "Decision-making behavior pattern tracking",
      "Cognitive load response behavioral changes",
      "Risk assessment and tolerance analysis",
      "Environmental behavioral triggers"
    ]
  }
];

export default function SelfReportMethodologyPage() {
  const { isSubscribed } = useAuth();

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
              <h1 className="text-2xl sm:text-3xl font-bold text-terminal-red-bright font-mono">
                Self-Report Methodology
              </h1>
              <p className="text-sm sm:text-base text-terminal-red-secondary">
                Solo double-blind research approach with tiered methodologies
              </p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">Always No Data Logged</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              This platform never collects or stores your personal observations. 
              All methodologies are for your own private research using physical notebooks.
            </AlertDescription>
          </Alert>
        </div>

        {/* Tier One - Free Basic Methodology */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-700 text-white">Tier One</Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-red-bright">
                Basic Notebook Methodology
              </h2>
            </div>
          </div>

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
                The foundation of self-research: a simple notebook and pen (or pencil).
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-terminal-red-bright font-semibold mb-1">Privacy</h3>
                      <p className="text-sm">Your observations stay completely private</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-terminal-red-bright font-semibold mb-1">Simplicity</h3>
                      <p className="text-sm">No software to learn, just write</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-terminal-red-bright font-semibold mb-1">Flexibility</h3>
                      <p className="text-sm">Document however works best for you</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-terminal-red-bright font-semibold mb-1">Permanence</h3>
                      <p className="text-sm">Physical notebooks last forever</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-terminal-red-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-terminal-red-bright font-semibold mb-1">Mindfulness</h3>
                      <p className="text-sm">Writing by hand enhances reflection</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-primary/30">
                <h3 className="text-terminal-red-bright font-semibold mb-2">Basic Documentation Format:</h3>
                <div className="font-mono text-sm space-y-1 text-terminal-red-secondary">
                  <p>• Date & time of session</p>
                  <p>• What you did (which training/frequency)</p>
                  <p>• How you felt before, during, and after</p>
                  <p>• Any notable observations or insights</p>
                  <p>• Duration of session</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 bg-terminal-red-muted/30" />

        {/* Tier Two - Paid Researcher Tier */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Tier Two - Researcher
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-terminal-red-bright">
                Advanced Research Methodologies
              </h2>
            </div>
          </div>

          {!isSubscribed ? (
            <Card className="bg-card-bg border-terminal-red-muted/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center space-y-4 p-6">
                  <Lock className="w-16 h-16 text-yellow-500 mx-auto" />
                  <h3 className="text-2xl font-bold text-terminal-red-bright">Researcher Tier Required</h3>
                  <p className="text-terminal-red-secondary max-w-md">
                    Subscribe to unlock advanced research methodologies, cognitive models, 
                    and data analysis techniques for analyzing your notebook entries.
                  </p>
                  <div className="pt-4">
                    <Link href="/subscribe">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                        data-testid="button-upgrade-researcher"
                      >
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade to Researcher Tier
                      </Button>
                    </Link>
                  </div>
                  <p className="text-xs text-gray-500">
                    $5.89/month • Cancel anytime • Still no data collection
                  </p>
                </div>
              </div>
              <CardContent className="p-12 opacity-30">
                <div className="space-y-6">
                  <div className="h-40 bg-terminal-red-dark/20 rounded-lg"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-terminal-red-dark/20 rounded-lg"></div>
                    <div className="h-32 bg-terminal-red-dark/20 rounded-lg"></div>
                    <div className="h-32 bg-terminal-red-dark/20 rounded-lg"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Alert className="border-yellow-600/50 bg-yellow-600/10">
                <Crown className="h-4 w-4 text-yellow-500" />
                <AlertTitle className="text-yellow-500">Researcher Tier Unlocked</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Learn advanced methods to analyze your own handwritten data. 
                  Still no digital logging - all techniques use your physical notebook.
                </AlertDescription>
              </Alert>

              {/* Cognitive Research Models */}
              <Card className="bg-card-bg border-yellow-600/30">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright">Cognitive Research Models</CardTitle>
                  <p className="text-sm text-terminal-red-secondary">
                    Advanced frameworks for analyzing your own thought patterns by hand
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {ADVANCED_METHODS.map((method, index) => (
                      <Card key={index} className="bg-terminal-red-dark/20 border-terminal-red-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-terminal-red-bright flex items-center gap-2 text-base">
                            <div className="p-2 bg-terminal-red-primary rounded-lg">
                              {method.icon}
                            </div>
                            {method.title}
                          </CardTitle>
                          <p className="text-xs text-terminal-red-secondary">{method.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {method.techniques.map((technique, tIndex) => (
                              <div key={tIndex} className="flex items-start gap-2 text-xs text-gray-300">
                                <div className="w-1 h-1 bg-terminal-red-primary rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{technique}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Data Analysis Techniques */}
              <Card className="bg-card-bg border-yellow-600/30">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Data Analysis Techniques
                  </CardTitle>
                  <p className="text-sm text-terminal-red-secondary">
                    Learn to analyze your notebook entries using statistical approaches
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ANALYSIS_TECHNIQUES.map((category, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-terminal-red-bright font-semibold flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          {category.category}
                        </h3>
                        <div className="space-y-2">
                          {category.methods.map((method, mIndex) => (
                            <div key={mIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-terminal-red-primary mt-0.5 flex-shrink-0" />
                              <span>{method}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Behavioral Observation Framework */}
              <Card className="bg-card-bg border-yellow-600/30">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright">Behavioral Observation Framework</CardTitle>
                  <p className="text-sm text-terminal-red-secondary">
                    Structured approaches for tracking behavioral patterns in your notebook
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-terminal-red-bright font-semibold mb-3">Daily Observation Methods:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Choose 3-5 specific behaviors to track consistently</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Establish baseline measurements before training</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Use objective metrics when possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Note environmental factors influencing performance</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-terminal-red-bright font-semibold mb-3">Weekly Analysis Protocol:</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Review your notebook entries for patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Calculate simple averages by hand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Compare weekly trends to identify changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-terminal-red-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span>Sketch simple graphs to visualize progress</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-terminal-red-dark/20 rounded-lg">
                    <h4 className="text-terminal-red-bright font-semibold mb-2">Example Analysis Template:</h4>
                    <div className="font-mono text-xs space-y-1 text-terminal-red-secondary">
                      <p><strong className="text-terminal-red-bright">Week:</strong> Jan 1-7, 2025</p>
                      <p><strong className="text-terminal-red-bright">Metric:</strong> Focus Duration (minutes)</p>
                      <p><strong className="text-terminal-red-bright">Daily Scores:</strong> Mon:25, Tue:30, Wed:28, Thu:35, Fri:32, Sat:40, Sun:38</p>
                      <p><strong className="text-terminal-red-bright">Weekly Average:</strong> 32.6 minutes (vs 24.5 last week)</p>
                      <p><strong className="text-terminal-red-bright">Trend:</strong> +33% improvement</p>
                      <p><strong className="text-terminal-red-bright">Best Conditions:</strong> Morning sessions, theta training, quiet environment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert className="border-terminal-red-primary/30 bg-terminal-red-dark/10">
                <Lightbulb className="h-4 w-4" />
                <AlertTitle className="text-terminal-red-bright">Remember: Solo Double-Blind</AlertTitle>
                <AlertDescription className="text-terminal-red-secondary text-sm">
                  These advanced methodologies empower you to conduct rigorous self-research using only your notebook. 
                  This platform still collects no data - you are the researcher and the subject of your own study.
                </AlertDescription>
              </Alert>
            </>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-terminal-red-primary/10 rounded-lg">
          <p className="text-sm italic text-center text-terminal-red-secondary">
            "Think for yourself. Question everything. DYOR."
          </p>
          <p className="text-xs text-center text-gray-500 mt-2">
            Your research, your data, your notebook. This platform never logs your personal observations.
          </p>
        </div>
      </div>
    </div>
  );
}
