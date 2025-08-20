import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  FlaskConical, 
  Target, 
  Search, 
  ClipboardCheck, 
  BarChart3, 
  XCircle, 
  CheckCircle2,
  AlertTriangle,
  Brain,
  Microscope,
  TrendingDown
} from "lucide-react";

interface TheoryTest {
  id: string;
  theory: string;
  hypothesis: string;
  predictions: string[];
  methodology: string;
  dataPoints: string[];
  results: string[];
  conclusion: string;
  disproven: boolean;
  confidence: number;
  biases: string[];
  status: 'draft' | 'testing' | 'analyzed' | 'concluded';
}

interface StudySession {
  startTime: Date;
  endTime?: Date;
  theoryTests: TheoryTest[];
  selfReports: SelfReport[];
  biasChecks: BiasCheck[];
  metacognition: MetacognitionData;
}

interface SelfReport {
  timestamp: Date;
  emotionalState: string;
  cognitiveLoad: number;
  expectations: string;
  observations: string;
  confidence: number;
  biasAwareness: string[];
}

interface BiasCheck {
  biasType: string;
  description: string;
  detected: boolean;
  severity: 'low' | 'medium' | 'high';
  mitigation: string;
}

interface MetacognitionData {
  awarenessLevel: number;
  reflectionQuality: number;
  biasRecognition: number;
  methodAdherence: number;
}

const COMMON_BIASES = [
  { name: "Confirmation Bias", description: "Seeking information that confirms existing beliefs" },
  { name: "Cherry Picking", description: "Selecting only favorable evidence" },
  { name: "Anchoring Bias", description: "Over-relying on first information received" },
  { name: "Availability Heuristic", description: "Overestimating probability of memorable events" },
  { name: "Hindsight Bias", description: "Believing past events were more predictable" },
  { name: "Overconfidence Effect", description: "Overestimating accuracy of beliefs" },
  { name: "Dunning-Kruger Effect", description: "Incompetent overestimate their competence" },
  { name: "Survivorship Bias", description: "Focusing on successful outcomes only" }
];

const SCIENTIFIC_METHOD_STEPS = [
  { 
    step: "Question", 
    icon: Search, 
    description: "Identify what you want to test or disprove",
    color: "text-red-400"
  },
  { 
    step: "Research", 
    icon: Microscope, 
    description: "Gather existing knowledge and identify assumptions",
    color: "text-red-500"
  },
  { 
    step: "Hypothesis", 
    icon: Target, 
    description: "Form a testable prediction that could be wrong",
    color: "text-red-600"
  },
  { 
    step: "Experiment", 
    icon: FlaskConical, 
    description: "Design tests specifically to disprove your theory",
    color: "text-red-700"
  },
  { 
    step: "Analysis", 
    icon: BarChart3, 
    description: "Examine data objectively, looking for disconfirming evidence",
    color: "text-red-800"
  },
  { 
    step: "Conclusion", 
    icon: ClipboardCheck, 
    description: "Accept when your theory has been disproven",
    color: "text-red-900"
  }
];

export default function ScientificMethodPage() {
  const [currentSession, setCurrentSession] = useState<StudySession>({
    startTime: new Date(),
    theoryTests: [],
    selfReports: [],
    biasChecks: [],
    metacognition: {
      awarenessLevel: 0,
      reflectionQuality: 0,
      biasRecognition: 0,
      methodAdherence: 0
    }
  });

  const [activeTheory, setActiveTheory] = useState<TheoryTest | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selfReportData, setSelfReportData] = useState<Partial<SelfReport>>({});
  const [biasCheckResults, setBiasCheckResults] = useState<BiasCheck[]>([]);

  const initializeNewTheory = () => {
    const newTheory: TheoryTest = {
      id: `theory_${Date.now()}`,
      theory: "",
      hypothesis: "",
      predictions: [""],
      methodology: "",
      dataPoints: [""],
      results: [""],
      conclusion: "",
      disproven: false,
      confidence: 50,
      biases: [],
      status: 'draft'
    };
    setActiveTheory(newTheory);
    setCurrentStep(0);
  };

  const updateTheory = (updates: Partial<TheoryTest>) => {
    if (!activeTheory) return;
    const updated = { ...activeTheory, ...updates };
    setActiveTheory(updated);
    
    // Update session
    const updatedTests = currentSession.theoryTests.filter(t => t.id !== activeTheory.id);
    updatedTests.push(updated);
    setCurrentSession({
      ...currentSession,
      theoryTests: updatedTests
    });
  };

  const addSelfReport = () => {
    const report: SelfReport = {
      timestamp: new Date(),
      emotionalState: selfReportData.emotionalState || "",
      cognitiveLoad: selfReportData.cognitiveLoad || 5,
      expectations: selfReportData.expectations || "",
      observations: selfReportData.observations || "",
      confidence: selfReportData.confidence || 50,
      biasAwareness: selfReportData.biasAwareness || []
    };

    setCurrentSession({
      ...currentSession,
      selfReports: [...currentSession.selfReports, report]
    });

    setSelfReportData({});
  };

  const performBiasCheck = () => {
    const detectedBiases = COMMON_BIASES.map(bias => ({
      biasType: bias.name,
      description: bias.description,
      detected: Math.random() > 0.7, // Simulate bias detection
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      mitigation: `Consider alternative perspectives for ${bias.name.toLowerCase()}`
    }));

    setBiasCheckResults(detectedBiases);
    setCurrentSession({
      ...currentSession,
      biasChecks: [...currentSession.biasChecks, ...detectedBiases]
    });
  };

  const calculateDisproofScore = (theory: TheoryTest): number => {
    let score = 0;
    
    // Points for attempting to disprove
    if (theory.methodology.toLowerCase().includes('disprove') || 
        theory.methodology.toLowerCase().includes('falsify')) {
      score += 30;
    }
    
    // Points for identifying biases
    score += theory.biases.length * 10;
    
    // Points for low confidence (healthy skepticism)
    score += (100 - theory.confidence) * 0.3;
    
    // Points for actually being disproven
    if (theory.disproven) {
      score += 40;
    }
    
    return Math.min(100, Math.round(score));
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-terminal-red-primary rounded-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-terminal-red-bright font-mono">Scientific Method Training</h1>
              <p className="text-terminal-red-secondary">Learn to disprove theories through self-study and self-report methodologies</p>
            </div>
          </div>

          {/* Session Progress */}
          <div className="bg-card-bg rounded-lg p-4 border border-terminal-red-muted">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-terminal-red-bright">{currentSession.theoryTests.length}</div>
                <div className="text-sm text-terminal-red-secondary">Theories Tested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terminal-red-bright">
                  {currentSession.theoryTests.filter(t => t.disproven).length}
                </div>
                <div className="text-sm text-terminal-red-secondary">Theories Disproven</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terminal-red-bright">{currentSession.selfReports.length}</div>
                <div className="text-sm text-terminal-red-secondary">Self-Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-terminal-red-bright">
                  {currentSession.biasChecks.filter(b => b.detected).length}
                </div>
                <div className="text-sm text-terminal-red-secondary">Biases Detected</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="method" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-terminal-red-dark">
            <TabsTrigger value="method" className="text-terminal-red-secondary data-[state=active]:text-white">Method Steps</TabsTrigger>
            <TabsTrigger value="theory" className="text-terminal-red-secondary data-[state=active]:text-white">Theory Testing</TabsTrigger>
            <TabsTrigger value="self-report" className="text-terminal-red-secondary data-[state=active]:text-white">Self-Report</TabsTrigger>
            <TabsTrigger value="analysis" className="text-terminal-red-secondary data-[state=active]:text-white">Analysis</TabsTrigger>
          </TabsList>

          {/* Scientific Method Steps */}
          <TabsContent value="method" className="space-y-6">
            <Card className="bg-card-bg border-terminal-red-muted">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <TrendingDown className="w-6 h-6" />
                  The Disproof-Focused Scientific Method
                </CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Learn to actively seek evidence that disproves your theories - the hallmark of true scientific thinking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {SCIENTIFIC_METHOD_STEPS.map((methodStep, index) => {
                    const IconComponent = methodStep.icon;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                          currentStep === index 
                            ? 'bg-terminal-red-primary/20 border-terminal-red-primary' 
                            : 'bg-terminal-red-dark/20 border-terminal-red-muted hover:border-terminal-red-secondary'
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className={`p-3 rounded-lg bg-terminal-red-primary/20`}>
                          <IconComponent className={`w-6 h-6 ${methodStep.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-terminal-red-bright">
                            Step {index + 1}: {methodStep.step}
                          </h3>
                          <p className="text-sm text-terminal-red-secondary">{methodStep.description}</p>
                        </div>
                        <Badge 
                          variant={currentStep === index ? "default" : "secondary"}
                          className={currentStep === index ? "bg-terminal-red-primary" : ""}
                        >
                          {currentStep === index ? "Current" : "Pending"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>

                <Alert className="mt-6 border-terminal-red-primary bg-terminal-red-primary/10">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle className="text-terminal-red-bright">Key Principle</AlertTitle>
                  <AlertDescription className="text-terminal-red-secondary">
                    The goal is not to prove your theory right, but to find evidence that proves it wrong. 
                    A theory that survives attempts at disproof becomes stronger.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theory Testing */}
          <TabsContent value="theory" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-terminal-red-bright">Theory Testing Workshop</h2>
              <Button 
                onClick={initializeNewTheory}
                className="bg-terminal-red-primary hover:bg-terminal-red-secondary"
              >
                <Target className="w-4 h-4 mr-2" />
                New Theory Test
              </Button>
            </div>

            {activeTheory ? (
              <Card className="bg-card-bg border-terminal-red-muted">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright">Theory Under Test</CardTitle>
                  <Progress value={(currentStep / SCIENTIFIC_METHOD_STEPS.length) * 100} className="w-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Theory Statement */}
                  <div>
                    <Label htmlFor="theory" className="text-terminal-red-bright">Your Theory (What do you believe?)</Label>
                    <Textarea
                      id="theory"
                      placeholder="State your theory clearly. Example: 'People learn better when listening to classical music'"
                      value={activeTheory.theory}
                      onChange={(e) => updateTheory({ theory: e.target.value })}
                      className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                    />
                  </div>

                  {/* Falsifiable Hypothesis */}
                  <div>
                    <Label htmlFor="hypothesis" className="text-terminal-red-bright">
                      Falsifiable Hypothesis (How could this be wrong?)
                    </Label>
                    <Textarea
                      id="hypothesis"
                      placeholder="Create a specific, testable prediction that could be disproven. Example: 'If my theory is true, students will score 20% higher on tests when studying with classical music vs. silence'"
                      value={activeTheory.hypothesis}
                      onChange={(e) => updateTheory({ hypothesis: e.target.value })}
                      className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                    />
                  </div>

                  {/* Disproof Methodology */}
                  <div>
                    <Label htmlFor="methodology" className="text-terminal-red-bright">
                      Disproof Methodology (How will you try to disprove this?)
                    </Label>
                    <Textarea
                      id="methodology"
                      placeholder="Design your study to specifically look for evidence that your theory is wrong. What conditions would disprove it?"
                      value={activeTheory.methodology}
                      onChange={(e) => updateTheory({ methodology: e.target.value })}
                      className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                    />
                  </div>

                  {/* Results & Conclusion */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="results" className="text-terminal-red-bright">Observed Results</Label>
                      <Textarea
                        id="results"
                        placeholder="What actually happened? Be objective and honest about the data."
                        value={activeTheory.results.join('\n')}
                        onChange={(e) => updateTheory({ results: e.target.value.split('\n') })}
                        className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="conclusion" className="text-terminal-red-bright">Honest Conclusion</Label>
                      <Textarea
                        id="conclusion"
                        placeholder="Was your theory disproven? Partially supported? What did you learn?"
                        value={activeTheory.conclusion}
                        onChange={(e) => updateTheory({ conclusion: e.target.value })}
                        className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                      />
                    </div>
                  </div>

                  {/* Confidence & Disproof Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-terminal-red-bright">Confidence Level: {activeTheory.confidence}%</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={activeTheory.confidence}
                        onChange={(e) => updateTheory({ confidence: parseInt(e.target.value) })}
                        className="w-full mt-2"
                      />
                      <p className="text-xs text-terminal-red-secondary mt-1">
                        Lower confidence shows healthy skepticism
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Label className="text-terminal-red-bright">Theory Status:</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={activeTheory.disproven ? "secondary" : "default"}
                          size="sm"
                          onClick={() => updateTheory({ disproven: false })}
                          className="bg-terminal-red-secondary"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Supported
                        </Button>
                        <Button
                          variant={activeTheory.disproven ? "default" : "secondary"}
                          size="sm"
                          onClick={() => updateTheory({ disproven: true })}
                          className="bg-terminal-red-primary"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Disproven
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Disproof Score */}
                  <div className="bg-terminal-red-dark/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-terminal-red-bright font-semibold">Scientific Rigor Score</span>
                      <span className="text-2xl font-bold text-terminal-red-bright">
                        {calculateDisproofScore(activeTheory)}/100
                      </span>
                    </div>
                    <Progress value={calculateDisproofScore(activeTheory)} className="mt-2" />
                    <p className="text-xs text-terminal-red-secondary mt-2">
                      Higher scores indicate better scientific methodology and willingness to be wrong
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card-bg border-terminal-red-muted">
                <CardContent className="p-8 text-center">
                  <Target className="w-16 h-16 text-terminal-red-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-terminal-red-bright mb-2">No Active Theory</h3>
                  <p className="text-terminal-red-secondary mb-4">
                    Start testing a theory to learn the scientific method of disproof
                  </p>
                  <Button 
                    onClick={initializeNewTheory}
                    className="bg-terminal-red-primary hover:bg-terminal-red-secondary"
                  >
                    Begin Theory Testing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Self-Report */}
          <TabsContent value="self-report" className="space-y-6">
            <Card className="bg-card-bg border-terminal-red-muted">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright">Self-Report & Bias Monitoring</CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Monitor your mental state and potential biases during the scientific process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Emotional State */}
                <div>
                  <Label className="text-terminal-red-bright">Current Emotional State</Label>
                  <Input
                    placeholder="Describe how you're feeling (excited, anxious, confident, skeptical, etc.)"
                    value={selfReportData.emotionalState || ""}
                    onChange={(e) => setSelfReportData({ ...selfReportData, emotionalState: e.target.value })}
                    className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                  />
                </div>

                {/* Cognitive Load */}
                <div>
                  <Label className="text-terminal-red-bright">
                    Mental Effort Level: {selfReportData.cognitiveLoad || 5}/10
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={selfReportData.cognitiveLoad || 5}
                    onChange={(e) => setSelfReportData({ ...selfReportData, cognitiveLoad: parseInt(e.target.value) })}
                    className="w-full mt-2"
                  />
                  <p className="text-xs text-terminal-red-secondary mt-1">
                    How mentally taxing is this process for you right now?
                  </p>
                </div>

                {/* Expectations */}
                <div>
                  <Label className="text-terminal-red-bright">Expectations & Preconceptions</Label>
                  <Textarea
                    placeholder="What do you expect to find? What do you hope will happen? Be honest about your biases."
                    value={selfReportData.expectations || ""}
                    onChange={(e) => setSelfReportData({ ...selfReportData, expectations: e.target.value })}
                    className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                  />
                </div>

                {/* Observations */}
                <div>
                  <Label className="text-terminal-red-bright">Real-Time Observations</Label>
                  <Textarea
                    placeholder="What are you noticing as you conduct your study? Any surprises or unexpected findings?"
                    value={selfReportData.observations || ""}
                    onChange={(e) => setSelfReportData({ ...selfReportData, observations: e.target.value })}
                    className="mt-2 bg-terminal-red-dark/20 border-terminal-red-muted text-gray-100"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={addSelfReport}
                    className="bg-terminal-red-primary hover:bg-terminal-red-secondary"
                  >
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Save Self-Report
                  </Button>
                  <Button 
                    onClick={performBiasCheck}
                    variant="outline"
                    className="border-terminal-red-muted text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Run Bias Check
                  </Button>
                </div>

                {/* Bias Check Results */}
                {biasCheckResults.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-terminal-red-bright">Detected Potential Biases</h3>
                    {biasCheckResults.filter(bias => bias.detected).map((bias, index) => (
                      <Alert key={index} className="border-terminal-red-primary bg-terminal-red-primary/10">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-terminal-red-bright">{bias.biasType}</AlertTitle>
                        <AlertDescription className="text-terminal-red-secondary">
                          {bias.description} - {bias.mitigation}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Self-Report History */}
            {currentSession.selfReports.length > 0 && (
              <Card className="bg-card-bg border-terminal-red-muted">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright">Self-Report History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentSession.selfReports.slice(-3).map((report, index) => (
                      <div key={index} className="bg-terminal-red-dark/20 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-terminal-red-secondary">
                            {report.timestamp.toLocaleTimeString()}
                          </span>
                          <Badge className="bg-terminal-red-primary">
                            Confidence: {report.confidence}%
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <p><strong>State:</strong> {report.emotionalState}</p>
                          <p><strong>Load:</strong> {report.cognitiveLoad}/10</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="bg-card-bg border-terminal-red-muted">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright">Session Analysis</CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Review your scientific method application and bias awareness
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Theory Summary */}
                <div className="grid gap-4">
                  {currentSession.theoryTests.map((theory, index) => (
                    <div key={theory.id} className="bg-terminal-red-dark/20 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-terminal-red-bright">Theory {index + 1}</h3>
                        <div className="flex items-center gap-2">
                          {theory.disproven ? (
                            <Badge className="bg-terminal-red-primary">
                              <XCircle className="w-3 h-3 mr-1" />
                              Disproven
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Supported
                            </Badge>
                          )}
                          <Badge variant="outline" className="border-terminal-red-muted">
                            Score: {calculateDisproofScore(theory)}/100
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-terminal-red-secondary mb-2">{theory.theory}</p>
                      <div className="text-xs text-terminal-red-secondary">
                        Confidence: {theory.confidence}% | 
                        Biases Identified: {theory.biases.length}
                      </div>
                    </div>
                  ))}

                  {currentSession.theoryTests.length === 0 && (
                    <div className="text-center py-8">
                      <BarChart3 className="w-16 h-16 text-terminal-red-primary mx-auto mb-4" />
                      <p className="text-terminal-red-secondary">No theories tested yet</p>
                    </div>
                  )}
                </div>

                {/* Learning Insights */}
                {currentSession.theoryTests.length > 0 && (
                  <div className="mt-6 p-4 bg-terminal-red-primary/10 rounded-lg border border-terminal-red-primary">
                    <h3 className="font-semibold text-terminal-red-bright mb-3">Learning Insights</h3>
                    <div className="space-y-2 text-sm text-terminal-red-secondary">
                      <p>• Disproof Rate: {Math.round((currentSession.theoryTests.filter(t => t.disproven).length / currentSession.theoryTests.length) * 100)}%</p>
                      <p>• Average Confidence: {Math.round(currentSession.theoryTests.reduce((sum, t) => sum + t.confidence, 0) / currentSession.theoryTests.length)}%</p>
                      <p>• Self-Reports Completed: {currentSession.selfReports.length}</p>
                      <p>• Biases Detected: {currentSession.biasChecks.filter(b => b.detected).length}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}