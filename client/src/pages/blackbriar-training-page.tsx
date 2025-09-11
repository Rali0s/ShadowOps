import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HumintTrainingTool } from '@/components/HumintTrainingTool';
import { 
  Brain, 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle,
  RadioIcon,
  FileText,
  Target
} from 'lucide-react';

export default function ShadowFangTrainingPage() {
  const [securityClearance, setSecurityClearance] = useState(false);

  const handleClearanceAccept = () => {
    setSecurityClearance(true);
  };

  if (!securityClearance) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Security Warning */}
            <Card className="bg-red-900/20 border-red-500/50 mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Lock className="w-8 h-8 text-red-400" />
                  <div>
                    <CardTitle className="text-2xl text-red-400">CLASSIFIED ACCESS</CardTitle>
                    <p className="text-red-300">ShadowFang Training Enhancement Protocol</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-yellow-500/50 bg-yellow-900/20">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <AlertDescription className="text-yellow-200">
                    <strong>SECURITY NOTICE:</strong> This training system contains declassified HUMINT methodologies 
                    adapted from FM 2-22.3 and enhanced with frequency-based neuro-programming techniques. 
                    Content is derived from publicly available sources and academic research.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">Training System Overview:</h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>AIO (All-In-One) HUMINT Training Tool with teleprompter integration</li>
                    <li>Frequency entrainment protocols for cognitive enhancement</li>
                    <li>Visual glyph system with sacred geometry synchronization</li>
                    <li>Chalice/Cone Adaptive Learning Model™ implementation</li>
                    <li>6-section training protocol based on declassified manuals</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-white">Content Sources:</h3>
                  <ul className="space-y-2 list-disc list-inside text-sm">
                    <li>FM 2-22.3 Human Intelligence Collector Operations (Declassified)</li>
                    <li>Frequency-based neuro-programming research framework</li>
                    <li>Historical MK-Ultra document analysis (publicly available)</li>
                    <li>Academic studies on cognitive enhancement and memory formation</li>
                  </ul>

                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded">
                    <p className="text-blue-200 text-sm">
                      <strong>Educational Purpose:</strong> This system is designed for academic study of 
                      intelligence methodologies and cognitive enhancement techniques. All content is 
                      derived from public sources and presented for educational research purposes.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button 
                    onClick={handleClearanceAccept}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Accept and Enter Training System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-none overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Brain className="w-12 h-12 text-red-400" />
              <div>
                <h1 className="text-4xl font-bold text-red-400">BLACKBRIAR TRAINING</h1>
                <p className="text-gray-400 text-lg">Enhanced HUMINT Intelligence Training System</p>
              </div>
              <Target className="w-12 h-12 text-red-400" />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="outline" className="text-yellow-400 border-yellow-500">
                AIO TRAINING TOOL
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500">
                CHALICE/CONE ADAPTIVE LEARNING
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                FM 2-22.3 ENHANCED
              </Badge>
            </div>
          </div>

          {/* Training System Tabs */}
          <Tabs defaultValue="aio-tool" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="aio-tool">AIO Tool</TabsTrigger>
              <TabsTrigger value="manual-ref">Manual Ref</TabsTrigger>
              <TabsTrigger value="protocols">Protocols</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            {/* AIO Training Tool */}
            <TabsContent value="aio-tool">
              <HumintTrainingTool />
            </TabsContent>

            {/* Manual Reference */}
            <TabsContent value="manual-ref" className="space-y-6">
              <Card className="bg-black/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span>HUMINT Manual Reference</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Core Components (FM 2-22.3)</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• <strong>Traits:</strong> Alertness, Patience, Credibility, Objectivity, Adaptability, Perseverance, Appearance, Initiative</li>
                        <li>• <strong>Phases:</strong> Planning, Approach, Questioning, Termination, Reporting</li>
                        <li>• <strong>Activities:</strong> Tactical Questioning, Screening, Interrogation, Debriefing, Liaison, SCO, DOCEX/CEE</li>
                        <li>• <strong>Knowledge Areas:</strong> Culture, Threat, Law, Requirements, Language, Behavior</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Enhancement Methods</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• <strong>Method 1:</strong> Keyword Highlight (List Memorization)</li>
                        <li>• <strong>Method 2:</strong> Full System Read (Top-Down Immersion)</li>
                        <li>• <strong>Method 3:</strong> Recall & Deep Dive (Layered Re-Read)</li>
                        <li>• <strong>Frequency Protocols:</strong> Alpha/Beta/Theta/Delta entrainment</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan-600/10 border border-cyan-500/30 rounded">
                    <h4 className="font-semibold text-cyan-400 mb-2">Chalice/Cone Compression Model</h4>
                    <p className="text-sm text-cyan-200">
                      Advanced compression protocol that reduces all 6 HUMINT sections into a single 
                      Delta anchor: <strong>CONTROL</strong>. This anchor expands upward into the full schema 
                      when triggered, enabling rapid access to complete operational knowledge.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Protocols */}
            <TabsContent value="protocols" className="space-y-6">
              <Card className="bg-black/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <RadioIcon className="w-5 h-5 text-green-400" />
                    <span>Frequency Entrainment Protocols</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Single Session Protocol (90-120 min)</h3>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-blue-400">Phase 1: Core Traits (20 min)</div>
                          <div className="text-gray-300">10 Hz Alpha • Surface learning • Keyword memorization</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-green-400">Phase 2: Five Phases (15 min)</div>
                          <div className="text-gray-300">14 Hz Low-Beta • Structured cycle • Active learning</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-purple-400">Phase 3: Activities (15 min)</div>
                          <div className="text-gray-300">10 Hz Alpha • Categorization • Pattern recognition</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-cyan-400">Phase 4: Knowledge (20 min)</div>
                          <div className="text-gray-300">10 Hz → 6 Hz Alpha to Theta • Deep encoding</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-yellow-400">Phase 5: Capabilities (15 min)</div>
                          <div className="text-gray-300">8 Hz Theta • Balance integration</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-red-400">Phase 6: Compression (10 min)</div>
                          <div className="text-gray-300">3 Hz Delta • Anchor compression • CONTROL</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Anchor Protocols</h3>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-gray-800/50 rounded">
                          <div className="font-semibold text-white mb-1">FlowGate Anchors</div>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Flashlight blink → Phase reset</li>
                            <li>• Wrist tap → Activity recall</li>
                            <li>• Pen tap → Keyword trigger</li>
                            <li>• Whisper "Context First" → Knowledge web</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-gray-800/50 rounded">
                          <div className="font-semibold text-white mb-1">DropGate Protocols</div>
                          <ul className="text-gray-300 space-y-1">
                            <li>• Visual flashlight signal → Controlled exit</li>
                            <li>• Auditory cue → Immediate disengagement</li>
                            <li>• Delta pulse → Deep anchor activation</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded">
                          <div className="font-semibold text-red-400 mb-1">Tie-Down Required</div>
                          <div className="text-red-200">Structured debrief and reality grounding confirmation essential after each session.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Scenarios */}
            <TabsContent value="scenarios" className="space-y-6">
              <Card className="bg-black/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-400" />
                    <span>Situational Training Scenarios</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-orange-500/50 bg-orange-900/20">
                    <Eye className="h-4 w-4 text-orange-400" />
                    <AlertDescription className="text-orange-200">
                      <strong>ADAPTIVE LEARNING:</strong> Advanced situational scenarios will be activated 
                      based on individual progress through the 6-section training protocol and Chalice/Cone 
                      adaptive learning model performance metrics.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Scenario Categories</h3>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-cyan-400">Tactical Questioning</div>
                          <div>Rapid intel extraction scenarios with time pressure</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-green-400">Cooperative Debriefing</div>
                          <div>Building rapport with willing sources</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-purple-400">Long-term SCO</div>
                          <div>Source cultivation and network building</div>
                        </div>
                        <div className="p-3 border border-gray-600 rounded">
                          <div className="font-semibold text-yellow-400">Cultural Navigation</div>
                          <div>Cross-cultural intelligence operations</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-white">Implementation Status</h3>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-yellow-600/10 border border-yellow-500/30 rounded">
                          <div className="font-semibold text-yellow-400 mb-2">Development Phase</div>
                          <p className="text-yellow-200">
                            Situational scenarios are currently in development phase. Implementation will 
                            follow completion of core AIO training tool validation and user progress tracking systems.
                          </p>
                        </div>
                        <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded">
                          <div className="font-semibold text-blue-400 mb-2">Adaptive Triggers</div>
                          <p className="text-blue-200">
                            Scenarios will be triggered based on mastery of individual HUMINT sections, 
                            frequency entrainment response patterns, and anchor recall effectiveness.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
}