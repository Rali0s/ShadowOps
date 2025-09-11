import { useState, useEffect } from "react";
import { SacredGeometryWheel } from "@/components/sacred-geometry-wheel";
import { TriggerAnchorSystem } from "@/components/trigger-anchor-system";
import { WorkedExamples } from "@/components/WorkedExamples";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  BookOpen, 
  Brain, 
  Zap, 
  Shield, 
  AlertTriangle,
  Lock,
  Target,
  FileText
} from 'lucide-react';

export default function OpsManualPage() {
  const [brainwaveFreq, setBrainwaveFreq] = useState(10);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const interval = setInterval(() => {
      setBrainwaveFreq(prev => 4 + Math.random() * 26);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <BookOpen className="h-8 w-8 text-red-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-red-400">
              SHADOWFANG COMPREHENSIVE TRAINING MANUAL
            </h1>
            <BookOpen className="h-8 w-8 text-red-400" />
          </div>
          <p className="text-gray-400 mb-2">
            All-In-One Neurohacker Training Protocol
          </p>
          <Badge className="bg-red-600/20 border-red-500 text-red-400">
            VERSION 1.0 • BETA RELEASE
          </Badge>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 border-yellow-500/50 bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-200">
            <strong>DISCLAIMER:</strong> This manual contains experimental relaxation research techniques 
            designed to help people study. All protocols are derived from public sources and academic research. 
            Use at your own discretion. Always maintain cognitive safety protocols.
          </AlertDescription>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-900/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600/20">
              Overview
            </TabsTrigger>
            <TabsTrigger value="protocols" className="data-[state=active]:bg-red-600/20">
              Protocols
            </TabsTrigger>
            <TabsTrigger value="frequencies" className="data-[state=active]:bg-red-600/20">
              Frequencies
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:bg-red-600/20">
              Safety
            </TabsTrigger>
            <TabsTrigger value="practice" className="data-[state=active]:bg-red-600/20">
              Practice
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Brain className="w-6 h-6 mr-2" />
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Core Mission</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/50 p-4 rounded border border-cyan-500/30">
                      <h4 className="text-cyan-400 font-semibold mb-2">HELP PEOPLE STUDY</h4>
                      <p className="text-gray-400 text-sm">Advanced memorization and learning techniques using frequency entrainment</p>
                    </div>
                    <div className="bg-black/50 p-4 rounded border border-green-500/30">
                      <h4 className="text-green-400 font-semibold mb-2">EXPERIMENTAL RELAXATION</h4>
                      <p className="text-gray-400 text-sm">Cutting-edge research into cognitive enhancement through relaxation states</p>
                    </div>
                    <div className="bg-black/50 p-4 rounded border border-yellow-500/30">
                      <h4 className="text-yellow-400 font-semibold mb-2">BONUS PROGRAMS</h4>
                      <p className="text-gray-400 text-sm">Additional neurohacker tools and advanced cognitive protocols</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Training Components</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <Zap className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                      <span><strong>Frequency Entrainment:</strong> Binaural beats synchronized with brainwave states</span>
                    </li>
                    <li className="flex items-start">
                      <Target className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                      <span><strong>HUMINT Protocols:</strong> Declassified training techniques for cognitive enhancement</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                      <span><strong>Safety Systems:</strong> Tie-down protocols and cognitive dissonance prevention</span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
                      <span><strong>Sacred Geometry:</strong> Visual programming with frequency synchronization</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
                  <p className="text-red-300 text-sm">
                    <strong>Note:</strong> This comprehensive manual replaces all previous training documents. 
                    It contains everything you need for the complete ShadowFang training experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Protocols Tab */}
          <TabsContent value="protocols">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Training Protocols
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Universal Training Protocol</h3>
                  <div className="bg-black/50 p-6 rounded border border-red-500/20 font-mono text-sm">
                    <pre className="text-gray-300 whitespace-pre-wrap">
{`SHADOWFANG UNIVERSAL PROTOCOL v1.0

OBJECTIVE: Enhanced cognitive performance through frequency-guided training

SESSION STRUCTURE:
Phase 1: Preparation (5 min)
  - Environment setup
  - Breathing regulation
  - Frequency selection
  
Phase 2: Induction (10 min)
  - Alpha state (10 Hz) baseline
  - Visual focus on sacred geometry
  - Anchor word establishment
  
Phase 3: Training (20-30 min)
  - Content-specific protocols
  - Frequency modulation based on task
  - Trigger-anchor reinforcement
  
Phase 4: Integration (10 min)
  - Theta consolidation (6 Hz)
  - Memory encoding
  - Schema formation
  
Phase 5: Exit & Tie-Down (5 min)
  - Gradual frequency normalization
  - Reality grounding
  - Cognitive integration

ANCHOR SYSTEM:
Primary: Visual (sacred geometry)
Secondary: Auditory (frequency tone)
Tertiary: Kinesthetic (pen tap/touch)

TRIGGER ACTIVATION:
- Study Mode: 14 Hz Beta + pen tap
- Memory Recall: 10 Hz Alpha + visual cue
- Deep Focus: 6 Hz Theta + breath pattern
- Integration: 3 Hz Delta + anchor word

EXIT PROTOCOLS:
FlowGate: Gradual visual fade
DropGate: Immediate audio cue
Emergency: Physical movement + light`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Application Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/50 p-4 rounded border border-cyan-500/20">
                      <h4 className="text-cyan-400 font-semibold mb-2">Academic Study</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• 50-item memorization protocols</li>
                        <li>• Contract law clause retention</li>
                        <li>• Language learning acceleration</li>
                        <li>• Mathematical formula encoding</li>
                      </ul>
                    </div>
                    <div className="bg-black/50 p-4 rounded border border-green-500/20">
                      <h4 className="text-green-400 font-semibold mb-2">Professional Development</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Presentation preparation</li>
                        <li>• Code pattern recognition</li>
                        <li>• Strategic planning states</li>
                        <li>• Creative problem solving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Frequencies Tab */}
          <TabsContent value="frequencies">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Frequency Protocols
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-6">
                  <SacredGeometryWheel 
                    size={200}
                    speed={1.5}
                    brainwaveFrequency={brainwaveFreq}
                    intensity={0.8}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Brainwave Frequency Guide</h3>
                  <div className="space-y-4">
                    <div className="bg-black/50 p-4 rounded border border-purple-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-purple-400 font-semibold">DELTA (0.5-4 Hz)</h4>
                        <Badge className="bg-purple-600/20 text-purple-400">Deep Integration</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">Deep sleep, healing, unconscious processing. Used for anchor compression and long-term storage.</p>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-blue-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-blue-400 font-semibold">THETA (4-8 Hz)</h4>
                        <Badge className="bg-blue-600/20 text-blue-400">Memory Encoding</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">REM sleep, meditation, creativity. Optimal for deep encoding and schema formation.</p>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-green-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-green-400 font-semibold">ALPHA (8-12 Hz)</h4>
                        <Badge className="bg-green-600/20 text-green-400">Relaxed Focus</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">Relaxed awareness, light meditation. Perfect for surface learning and memorization.</p>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-yellow-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-yellow-400 font-semibold">BETA (12-30 Hz)</h4>
                        <Badge className="bg-yellow-600/20 text-yellow-400">Active Learning</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">Normal waking consciousness, active thinking. Best for comprehension and analysis.</p>
                    </div>

                    <div className="bg-black/50 p-4 rounded border border-red-500/20">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-red-400 font-semibold">GAMMA (30-100 Hz)</h4>
                        <Badge className="bg-red-600/20 text-red-400">Peak Performance</Badge>
                      </div>
                      <p className="text-gray-400 text-sm">High-level cognitive processing, insight. Advanced practitioners only.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-gray-400">
                  <p>Current Frequency: <span className="text-2xl font-mono text-cyan-400">{brainwaveFreq.toFixed(1)} Hz</span></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Tab */}
          <TabsContent value="safety">
            <Card className="bg-gray-900/50 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-red-400 flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Safety Protocols
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-red-500/50 bg-red-900/20">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">
                    <strong>CRITICAL:</strong> Always follow tie-down protocols. Never exceed recommended session durations. 
                    Have a safety partner for extended sessions.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tie-Down Protocol</h3>
                  <div className="bg-black/50 p-4 rounded border border-red-500/20">
                    <ol className="space-y-2 text-gray-300">
                      <li><strong>1. Recognition:</strong> Acknowledge session completion</li>
                      <li><strong>2. Grounding:</strong> Physical movement and environmental awareness</li>
                      <li><strong>3. Time Check:</strong> Verify actual time elapsed vs perceived</li>
                      <li><strong>4. Reality Testing:</strong> Confirm current location and date</li>
                      <li><strong>5. Integration:</strong> Brief review of session goals and outcomes</li>
                      <li><strong>6. Normalization:</strong> Return to baseline frequency (10-14 Hz)</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Warning Signs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30">
                      <h4 className="text-yellow-400 font-semibold mb-2">Cognitive Dissonance</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Time perception distortion</li>
                        <li>• Reality confusion</li>
                        <li>• Magical thinking patterns</li>
                        <li>• Memory fragmentation</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                      <h4 className="text-red-400 font-semibold mb-2">Emergency Exit Triggers</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Physical discomfort</li>
                        <li>• Anxiety or panic</li>
                        <li>• Loss of anchor awareness</li>
                        <li>• External interruption</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Session Duration Limits</h3>
                  <div className="bg-black/50 p-4 rounded border border-green-500/20">
                    <ul className="space-y-2 text-gray-300">
                      <li><strong>Beginner:</strong> 15-30 minutes maximum</li>
                      <li><strong>Intermediate:</strong> 30-60 minutes with breaks</li>
                      <li><strong>Advanced:</strong> 60-90 minutes with safety partner</li>
                      <li><strong>Never exceed:</strong> 2 hours continuous session</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice">
            <div className="space-y-8">
              <Card className="bg-gray-900/50 border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-400 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Interactive Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-6">
                    Practice your training with interactive tools and worked examples.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                      onClick={() => window.location.href = '/shadowfang-training'}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Launch Training Tool
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
                      onClick={() => window.location.href = '/frequency-generator'}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Frequency Generator
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <TriggerAnchorSystem />
              <WorkedExamples />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>ShadowFang Comprehensive Training Manual v1.0</p>
          <p className="mt-2">© 2025 _Fq Neurohacker Platform • Beta Release</p>
        </div>
      </div>
    </div>
  );
}