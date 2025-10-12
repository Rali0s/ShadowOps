import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { 
  Brain, 
  Lightbulb, 
  BookOpen, 
  FlaskConical,
  Zap,
  Target,
  ArrowLeft,
  FileText,
  Activity,
  Eye,
  Headphones,
  Clock,
  CheckCircle
} from 'lucide-react';

export default function ResearchFoundationPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Terminal
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-400 mb-4">
              Research Foundation
            </h1>
            <p className="text-gray-300 text-lg">
              Scientific Evidence for Frequency-Enhanced Learning
            </p>
            <Badge className="mt-4 bg-red-600/20 text-red-300 border-red-500/50">
              <FlaskConical className="w-4 h-4 mr-2" />
              Peer-Reviewed Research
            </Badge>
          </div>
        </div>

        {/* Research Tabs */}
        <Tabs defaultValue="visual-augmentation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
            <TabsTrigger value="visual-augmentation" className="data-[state=active]:bg-red-600/20">
              Visual Entrainment
            </TabsTrigger>
            <TabsTrigger value="study-method" className="data-[state=active]:bg-red-600/20">
              Study Protocols
            </TabsTrigger>
            <TabsTrigger value="mental-rehearsal" className="data-[state=active]:bg-red-600/20">
              Mental Rehearsal
            </TabsTrigger>
          </TabsList>

          {/* Visual Augmentation Research */}
          <TabsContent value="visual-augmentation" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Eye className="w-6 h-6 mr-3" />
                  Visual Augmentation & Frequency Entrainment Study
                </CardTitle>
                <Badge className="w-fit bg-green-600/20 text-green-400 border-green-500/50">
                  Published Research
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Study Overview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Study Overview</h3>
                  <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                    <p className="text-gray-300 mb-3">
                      <strong>Objective:</strong> Investigate whether visual augmentation combined with auditory frequency entrainment 
                      (6 Hz theta binaural beats) enhances memory encoding compared to traditional study methods.
                    </p>
                    <p className="text-gray-300">
                      <strong>Participants:</strong> 60 undergraduate students (M age = 22.3 years) randomly assigned to three conditions.
                    </p>
                  </div>
                </div>

                {/* Key Findings */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Key Findings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-black/50 border-green-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Activity className="w-5 h-5 text-green-400 mr-2" />
                          <h4 className="font-semibold text-green-400">Immediate Recall</h4>
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">38.2 vs 31.5</p>
                        <p className="text-sm text-gray-400">
                          Multimodal vs Control (p &lt; .001)
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-blue-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Brain className="w-5 h-5 text-blue-400 mr-2" />
                          <h4 className="font-semibold text-blue-400">Theta Power Increase</h4>
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">+47%</p>
                        <p className="text-sm text-gray-400">
                          EEG confirmed theta enhancement
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-purple-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Clock className="w-5 h-5 text-purple-400 mr-2" />
                          <h4 className="font-semibold text-purple-400">7-Day Retention</h4>
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">32.1 vs 24.8</p>
                        <p className="text-sm text-gray-400">
                          Multimodal vs Control (d = 1.34)
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-orange-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Zap className="w-5 h-5 text-orange-400 mr-2" />
                          <h4 className="font-semibold text-orange-400">Effect Size</h4>
                        </div>
                        <p className="text-3xl font-bold text-white mb-2">η² = .304</p>
                        <p className="text-sm text-gray-400">
                          Large effect size for learning
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Implementation */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Platform Implementation</h3>
                  <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 p-6 rounded-lg border border-red-500/30">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Sacred Geometry Wheel:</strong> Implements 6 Hz visual entrainment with synchronized pulsing
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Binaural Beat Generator:</strong> Produces precise theta frequencies (4-8 Hz) for memory consolidation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Multimodal Synchronization:</strong> Combines visual and auditory stimuli for maximum effect
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Method Research */}
          <TabsContent value="study-method" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  The Frequency-Enhanced Study Method
                </CardTitle>
                <Badge className="w-fit bg-blue-600/20 text-blue-400 border-blue-500/50">
                  Practical Protocol
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Study Cycle */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">The Three-Phase Study Cycle</h3>
                  
                  <div className="space-y-3">
                    <Card className="bg-black/50 border-yellow-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                          <h4 className="font-semibold text-yellow-400">Phase 1: Active Learning (Beta 14-18 Hz)</h4>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Focused reading, note-taking, problem-solving
                        </p>
                        <p className="text-sm text-gray-400">Duration: 25-45 minute blocks</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-green-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Lightbulb className="w-5 h-5 text-green-400 mr-2" />
                          <h4 className="font-semibold text-green-400">Phase 2: Integration (Alpha 8-12 Hz)</h4>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Reviewing, connecting concepts, creative thinking
                        </p>
                        <p className="text-sm text-gray-400">Duration: 10-15 minutes between blocks</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-purple-500/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-3">
                          <Brain className="w-5 h-5 text-purple-400 mr-2" />
                          <h4 className="font-semibold text-purple-400">Phase 3: Consolidation (Theta 4-8 Hz)</h4>
                        </div>
                        <p className="text-gray-300 mb-2">
                          Memory processing during rest and sleep
                        </p>
                        <p className="text-sm text-gray-400">Duration: Pre-sleep review + full night's sleep</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Frequency Recipes */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Task-Specific Frequency Protocols</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-semibold text-cyan-400 mb-3">Memorization Tasks</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• 30 min @ 14-16 Hz: Active memorization</li>
                        <li>• 10 min @ 10 Hz: Mental rehearsal</li>
                        <li>• 30 min @ 14-16 Hz: Self-testing</li>
                        <li>• 10 min @ 6 Hz: Relaxed review</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-semibold text-orange-400 mb-3">Problem-Solving</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• 40 min @ 16-18 Hz: Active problem work</li>
                        <li>• 10 min @ 10 Hz: Strategy review</li>
                        <li>• 40 min @ 16-18 Hz: Difficult problems</li>
                        <li>• 15 min @ 12 Hz: Method summary</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-semibold text-green-400 mb-3">Reading Comprehension</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• 35 min @ 14 Hz: Active reading</li>
                        <li>• 10 min @ 10 Hz: Summarization</li>
                        <li>• 25 min @ 12 Hz: Create connections</li>
                        <li>• 10 min @ 8 Hz: Reflective review</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <h4 className="font-semibold text-purple-400 mb-3">Creative Work</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• 20 min @ 10 Hz: Brainstorming</li>
                        <li>• 30 min @ 14 Hz: Organize ideas</li>
                        <li>• 40 min @ 16 Hz: Execute/create</li>
                        <li>• 15 min @ 8 Hz: Evaluation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Pre-Sleep Protocol */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Pre-Sleep Encoding Boost</h3>
                  <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-400 mb-3">15-20 Minutes Before Bed:</h4>
                    <ol className="space-y-3 text-gray-300">
                      <li>1. <strong>Light Review (5 min):</strong> Skim key concepts without deep thinking</li>
                      <li>2. <strong>Theta Transition (10-15 min):</strong> Use 6 Hz theta beats, lie down, eyes closed</li>
                      <li>3. <strong>Mental Drift:</strong> Let concepts flow through your mind naturally</li>
                      <li>4. <strong>Direct to Sleep:</strong> Brain continues processing during sleep phases</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mental Rehearsal Research */}
          <TabsContent value="mental-rehearsal" className="space-y-6">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Target className="w-6 h-6 mr-3" />
                  Enhanced Skill Acquisition Through Mental Rehearsal
                </CardTitle>
                <Badge className="w-fit bg-purple-600/20 text-purple-400 border-purple-500/50">
                  Research Proposal
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theoretical Framework */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Theoretical Framework</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-black/50 border-blue-500/30">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-blue-400 mb-2">Dual-Process Theory</h4>
                        <p className="text-sm text-gray-300">
                          Optimizing transition between System 1 (automatic) and System 2 (deliberate) processing
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-green-500/30">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-green-400 mb-2">Chunking Theory</h4>
                        <p className="text-sm text-gray-300">
                          Creating efficient cognitive chunks through structured rehearsal
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-black/50 border-purple-500/30">
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-purple-400 mb-2">Context-Dependent Memory</h4>
                        <p className="text-sm text-gray-300">
                          Environmental anchors enhance recall and execution
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* The Anchor Method */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">The Anchor Method</h3>
                  <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-6 rounded-lg border border-orange-500/30">
                    <p className="text-gray-300 mb-4">
                      Pair specific environmental cues with information to improve recall and trigger task-specific cognitive schemas.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="text-orange-400 font-bold mr-3">1.</span>
                        <div>
                          <strong className="text-orange-400">Choose Anchor:</strong>
                          <span className="text-gray-300 ml-2">Sound, action, or object (pen clicking, specific music, scent)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-400 font-bold mr-3">2.</span>
                        <div>
                          <strong className="text-orange-400">Consistent Pairing:</strong>
                          <span className="text-gray-300 ml-2">Use same anchor during study sessions</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-400 font-bold mr-3">3.</span>
                        <div>
                          <strong className="text-orange-400">Test Recall:</strong>
                          <span className="text-gray-300 ml-2">Use anchor when remembering information</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-orange-400 font-bold mr-3">4.</span>
                        <div>
                          <strong className="text-orange-400">Application:</strong>
                          <span className="text-gray-300 ml-2">Bring anchor to exam or performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integration with Platform */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-200">Platform Integration</h3>
                  <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
                    <h4 className="font-semibold text-cyan-400 mb-4">How This Research Enhances ShadowFang AIO:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Headphones className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Frequency Anchoring:</strong> Use specific frequencies as environmental triggers for different cognitive states
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Eye className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Visual Cues:</strong> Sacred geometry patterns serve as visual anchors for memory consolidation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Brain className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>Mental Rehearsal Protocols:</strong> Structured visualization exercises for skill automaticity
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Target className="w-5 h-5 text-cyan-400 mr-3 mt-0.5" />
                        <span className="text-gray-300">
                          <strong>State-Dependent Learning:</strong> Match study and performance states for optimal recall
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="mt-8 bg-gradient-to-r from-red-900/20 to-purple-900/20 border-red-500/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                Apply Research-Backed Methods
              </h2>
              <p className="text-gray-300 mb-6">
                Experience the scientifically-proven benefits of frequency-enhanced learning
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/frequency-generator">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Try Frequency Generator
                  </Button>
                </Link>
                <Link href="/shadowfang-training">
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-600/20">
                    <Brain className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                </Link>
                <Link href="/self-report">
                  <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-600/20">
                    <FileText className="w-4 h-4 mr-2" />
                    Learn Methodology
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}