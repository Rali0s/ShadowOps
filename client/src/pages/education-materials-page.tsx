import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Brain,
  Home,
  Navigation,
  Lightbulb,
  Target,
  Volume2,
  Eye,
  CheckCircle,
  ArrowRight,
  MapPin,
  MessageSquare,
  RefreshCw,
  Zap,
  Award,
  Search,
  Clock
} from "lucide-react";

interface StudyTechnique {
  title: string;
  description: string;
  steps: string[];
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  icon: React.ReactNode;
}

interface PalaceStation {
  location: string;
  concept: string;
  visualization: string;
  mnemonic: string;
}

const STUDY_TECHNIQUES: StudyTechnique[] = [
  {
    title: "Mind Palace (Method of Loci)",
    description: "Ancient mnemonic technique using spatial memory to store and retrieve information in familiar locations",
    steps: [
      "Choose a familiar location (your home, school, street)",
      "Map key stations (rooms, hallways, objects)", 
      "Convert information into vivid, exaggerated imagery",
      "Walk through palace placing images sequentially",
      "Expand and layer multiple palaces for different topics"
    ],
    benefits: [
      "Leverages natural spatial memory abilities",
      "Unlimited storage capacity",
      "Perfect for sequential information",
      "Used by memory champions worldwide",
      "Integrates with psychological programming"
    ],
    difficulty: 'intermediate',
    duration: '30-60 min to build, lifetime to master',
    icon: <Home className="w-6 h-6" />
  },
  {
    title: "Rubber Duck Debugging",
    description: "Verbal explanation technique adapted from programming to force clarity and expose knowledge gaps",
    steps: [
      "Choose your 'duck' (object, stuffed toy, or mirror)",
      "Walk through your Mind Palace verbally",
      "Explain each station and concept aloud",
      "Debug weak spots by strengthening unclear images",
      "Repeat until explanation flows without hesitation"
    ],
    benefits: [
      "Forces verbal articulation of knowledge",
      "Exposes weak associations immediately",
      "Reinforces through multiple modalities",
      "Builds teaching and presentation skills",
      "Perfect for self-study validation"
    ],
    difficulty: 'beginner',
    duration: '10-20 min per session',
    icon: <MessageSquare className="w-6 h-6" />
  },
  {
    title: "Mentalist Debugging Palace",
    description: "Combined system integrating Mind Palace construction with Rubber Duck debugging for maximum retention",
    steps: [
      "Build palace with distinct loci stations",
      "Place encoded information as vivid imagery",
      "Run debugging session explaining to duck",
      "Patch weak spots with stronger visualizations", 
      "Finalize with silent recall walkthrough"
    ],
    benefits: [
      "Combines best of both techniques",
      "Self-correcting memory system",
      "Builds confidence through validation",
      "Creates robust long-term retention",
      "Ideal for complex topic mastery"
    ],
    difficulty: 'advanced',
    duration: '45-90 min to establish',
    icon: <Brain className="w-6 h-6" />
  }
];

const EXAMPLE_PALACE: PalaceStation[] = [
  {
    location: "Front Door",
    concept: "Introduction to Psychology",
    visualization: "Freud knocking with a cigar, smoke forming question marks",
    mnemonic: "The gateway to understanding the mind"
  },
  {
    location: "Living Room Couch", 
    concept: "Cognitive Theory",
    visualization: "Giant brain-shaped sofa with neurons as cushions",
    mnemonic: "Where thoughts sit and process information"
  },
  {
    location: "Kitchen Sink",
    concept: "Brainwave States",
    visualization: "Waves of colored water labeled Alpha, Beta, Theta, Gamma",
    mnemonic: "Washing away old patterns, flowing new frequencies"
  },
  {
    location: "Bedroom Desk",
    concept: "Knot Solution Programming",
    visualization: "Textbooks tied in complex knots, equations floating above",
    mnemonic: "Study station where complex problems get untangled"
  },
  {
    location: "Garage",
    concept: "Philosophical Applications",
    visualization: "Martial artist practicing forms with philosophical quotes",
    mnemonic: "Where theory meets practical implementation"
  }
];

const DIFFICULTY_COLORS = {
  beginner: "bg-green-500/20 text-green-400",
  intermediate: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400"
};

export default function EducationMaterialsPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<string>("mind-palace");
  const [currentStation, setCurrentStation] = useState<number>(0);
  const [palaceWalkthrough, setPalaceWalkthrough] = useState<boolean>(false);

  const startPalaceWalkthrough = () => {
    setPalaceWalkthrough(true);
    setCurrentStation(0);
  };

  const nextStation = () => {
    if (currentStation < EXAMPLE_PALACE.length - 1) {
      setCurrentStation(currentStation + 1);
    } else {
      setPalaceWalkthrough(false);
      setCurrentStation(0);
    }
  };

  const resetWalkthrough = () => {
    setPalaceWalkthrough(false);
    setCurrentStation(0);
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-terminal-red-primary rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-terminal-red-bright font-mono">Education Materials</h1>
              <p className="text-terminal-red-secondary">Advanced memory techniques for psychological programming and cognitive enhancement</p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Brain className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">Mentalist Training Guide</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              Mind Palace + Rubber Duck Debugging for Memory & Mentalism. Think for yourself. Question everything. DYOR.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="techniques" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-terminal-red-dark">
            <TabsTrigger value="techniques" className="text-terminal-red-secondary data-[state=active]:text-white">
              Study Techniques
            </TabsTrigger>
            <TabsTrigger value="palace-example" className="text-terminal-red-secondary data-[state=active]:text-white">
              Palace Example
            </TabsTrigger>
            <TabsTrigger value="debugging-guide" className="text-terminal-red-secondary data-[state=active]:text-white">
              Debugging Guide
            </TabsTrigger>
            <TabsTrigger value="advanced-tips" className="text-terminal-red-secondary data-[state=active]:text-white">
              Advanced Tips
            </TabsTrigger>
          </TabsList>

          {/* Study Techniques */}
          <TabsContent value="techniques" className="space-y-6">
            <div className="grid gap-6">
              {STUDY_TECHNIQUES.map((technique, index) => (
                <Card key={index} className="bg-card-bg border-terminal-red-muted">
                  <CardHeader>
                    <CardTitle className="text-terminal-red-bright flex items-center gap-3">
                      <div className="p-2 bg-terminal-red-primary rounded-lg">
                        {technique.icon}
                      </div>
                      {technique.title}
                      <Badge className={DIFFICULTY_COLORS[technique.difficulty]}>
                        {technique.difficulty.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-terminal-red-secondary">
                      {technique.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-terminal-red-bright">
                      <Clock className="w-4 h-4" />
                      {technique.duration}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-terminal-red-bright mb-3 flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Steps to Master:
                      </h3>
                      <ol className="space-y-2">
                        {technique.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-3 text-terminal-red-secondary">
                            <div className="flex-shrink-0 w-6 h-6 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                              {stepIndex + 1}
                            </div>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <Separator className="bg-terminal-red-muted" />
                    
                    <div>
                      <h3 className="font-semibold text-terminal-red-bright mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Key Benefits:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {technique.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2 text-terminal-red-secondary text-sm">
                            <CheckCircle className="w-4 h-4 text-terminal-red-bright" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Palace Example */}
          <TabsContent value="palace-example" className="space-y-6">
            <Card className="bg-card-bg border-terminal-red-muted">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Psychology Paper Mind Palace Example
                </CardTitle>
                <CardDescription className="text-terminal-red-secondary">
                  Interactive walkthrough of a Mind Palace built to memorize a psychology paper outline
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!palaceWalkthrough ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      {EXAMPLE_PALACE.map((station, index) => (
                        <div key={index} className="p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-terminal-red-primary rounded-full flex items-center justify-center text-white font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-terminal-red-bright mb-1 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {station.location}
                              </h3>
                              <Badge variant="outline" className="border-terminal-red-muted text-terminal-red-secondary mb-2">
                                {station.concept}
                              </Badge>
                              <p className="text-terminal-red-secondary text-sm mb-2">
                                <strong>Visualization:</strong> {station.visualization}
                              </p>
                              <p className="text-terminal-red-bright text-sm">
                                <strong>Mnemonic:</strong> {station.mnemonic}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        onClick={startPalaceWalkthrough}
                        className="bg-terminal-red-primary hover:bg-terminal-red-bright"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Start Guided Walkthrough
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-terminal-red-bright">
                        Palace Walkthrough - Station {currentStation + 1} of {EXAMPLE_PALACE.length}
                      </h3>
                      <Button 
                        onClick={resetWalkthrough}
                        variant="outline"
                        size="sm"
                        className="border-terminal-red-muted text-terminal-red-secondary"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    
                    <Card className="bg-terminal-red-dark/30 border-terminal-red-primary">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                            {currentStation + 1}
                          </div>
                          <h2 className="text-2xl font-bold text-terminal-red-bright">
                            {EXAMPLE_PALACE[currentStation].location}
                          </h2>
                          <Badge className="bg-terminal-red-primary text-white">
                            {EXAMPLE_PALACE[currentStation].concept}
                          </Badge>
                          <div className="space-y-3 text-left max-w-2xl mx-auto">
                            <div className="p-4 bg-terminal-red-dark/50 rounded-lg">
                              <p className="text-terminal-red-secondary">
                                <strong className="text-terminal-red-bright">Visualization:</strong><br />
                                {EXAMPLE_PALACE[currentStation].visualization}
                              </p>
                            </div>
                            <div className="p-4 bg-terminal-red-dark/50 rounded-lg">
                              <p className="text-terminal-red-secondary">
                                <strong className="text-terminal-red-bright">Mnemonic:</strong><br />
                                {EXAMPLE_PALACE[currentStation].mnemonic}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={nextStation}
                        className="bg-terminal-red-primary hover:bg-terminal-red-bright"
                      >
                        {currentStation < EXAMPLE_PALACE.length - 1 ? (
                          <>
                            Next Station
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Complete Walkthrough
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Debugging Guide */}
          <TabsContent value="debugging-guide" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-card-bg border-terminal-red-muted">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Rubber Duck Debugging for Mentalism
                  </CardTitle>
                  <CardDescription className="text-terminal-red-secondary">
                    Adapt programming debugging techniques to strengthen memory palaces and expose knowledge gaps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-terminal-red-bright mb-3">Choose Your Duck</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Physical Object</div>
                          <p className="text-sm text-terminal-red-secondary">Rubber duck, stuffed animal, or any object on your desk</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Mirror Technique</div>
                          <p className="text-sm text-terminal-red-secondary">Explain to yourself in a mirror for self-reflection</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Palace Character</div>
                          <p className="text-sm text-terminal-red-secondary">Symbolic character living within your Mind Palace</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-terminal-red-bright mb-3">Debugging Process</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                          <p className="text-terminal-red-secondary text-sm">Walk through palace verbally narrating each station</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                          <p className="text-terminal-red-secondary text-sm">Identify stations where explanation falters or feels unclear</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                          <p className="text-terminal-red-secondary text-sm">Strengthen weak images with more vivid, absurd visualizations</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-terminal-red-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">4</div>
                          <p className="text-terminal-red-secondary text-sm">Repeat until explanation flows without hesitation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-terminal-red-muted" />
                  
                  <div>
                    <h3 className="font-semibold text-terminal-red-bright mb-3 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Why It Works
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-terminal-red-dark/20 rounded-lg text-center">
                        <Volume2 className="w-8 h-8 text-terminal-red-bright mx-auto mb-2" />
                        <h4 className="font-medium text-terminal-red-bright mb-1">Verbal Rehearsal</h4>
                        <p className="text-sm text-terminal-red-secondary">Activates auditory memory pathways alongside visual</p>
                      </div>
                      <div className="p-4 bg-terminal-red-dark/20 rounded-lg text-center">
                        <Search className="w-8 h-8 text-terminal-red-bright mx-auto mb-2" />
                        <h4 className="font-medium text-terminal-red-bright mb-1">Gap Detection</h4>
                        <p className="text-sm text-terminal-red-secondary">Forces confrontation with weak associations</p>
                      </div>
                      <div className="p-4 bg-terminal-red-dark/20 rounded-lg text-center">
                        <RefreshCw className="w-8 h-8 text-terminal-red-bright mx-auto mb-2" />
                        <h4 className="font-medium text-terminal-red-bright mb-1">Iterative Improvement</h4>
                        <p className="text-sm text-terminal-red-secondary">Self-correcting system strengthens over time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Tips */}
          <TabsContent value="advanced-tips" className="space-y-6">
            <div className="grid gap-6">
              <Card className="bg-card-bg border-terminal-red-muted">
                <CardHeader>
                  <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Advanced Mentalist Techniques
                  </CardTitle>
                  <CardDescription className="text-terminal-red-secondary">
                    Master-level strategies for memory palace construction and cognitive enhancement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-terminal-red-bright">Multi-Duck System</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Logic Duck</div>
                          <p className="text-sm text-terminal-red-secondary">For analytical reasoning and fact checking</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Creative Duck</div>
                          <p className="text-sm text-terminal-red-secondary">For generating vivid imagery and associations</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Skeptic Duck</div>
                          <p className="text-sm text-terminal-red-secondary">For challenging assumptions and bias detection</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-terminal-red-bright">Palace Architectures</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">DYOR Palace</div>
                          <p className="text-sm text-terminal-red-secondary">Each station holds arguments for AND against topics</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Martial Arts Palace</div>
                          <p className="text-sm text-terminal-red-secondary">Each station represents moves in kata/flow sequences</p>
                        </div>
                        <div className="p-3 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                          <div className="font-medium text-terminal-red-bright mb-1">Research Palace</div>
                          <p className="text-sm text-terminal-red-secondary">Dedicated to research notes with balanced thinking</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-terminal-red-muted" />
                  
                  <div>
                    <h3 className="font-semibold text-terminal-red-bright mb-4">Audio Enhancement Techniques</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                        <h4 className="font-medium text-terminal-red-bright mb-2 flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          Record Debugging Sessions
                        </h4>
                        <p className="text-sm text-terminal-red-secondary mb-2">
                          Create audio walkthroughs of your palace to reinforce pathways through multiple listening sessions.
                        </p>
                        <Badge className="bg-green-500/20 text-green-400">Recommended</Badge>
                      </div>
                      
                      <div className="p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                        <h4 className="font-medium text-terminal-red-bright mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Brainwave Synchronization
                        </h4>
                        <p className="text-sm text-terminal-red-secondary mb-2">
                          Use background frequencies (Alpha 8-12 Hz for learning, Theta 4-8 Hz for deep encoding) during palace construction.
                        </p>
                        <Badge className="bg-blue-500/20 text-blue-400">Advanced</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
                <Zap className="h-4 w-4" />
                <AlertTitle className="text-terminal-red-bright">Closing Ethos</AlertTitle>
                <AlertDescription className="text-terminal-red-secondary">
                  Every palace, every duck, every debug ends with: <strong className="text-terminal-red-bright">"Think for yourself. Question everything. DYOR."</strong>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}