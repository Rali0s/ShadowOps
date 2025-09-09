import { useState, useEffect } from "react";
import { SacredGeometryWheel } from "@/components/sacred-geometry-wheel";
import { TriggerAnchorSystem } from "@/components/trigger-anchor-system";
import { WorkedExamples } from "@/components/WorkedExamples";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OpsManual {
  id: string;
  title: string;
  schemaType: 'A' | 'B' | 'C';
  duration: '1hr' | '24hr' | '3day' | '1week';
  anchors: string[];
  triggers: string[];
  tiedownProtocol: string;
  content: string;
}

const opsManuals: OpsManual[] = [
  {
    id: 'frequency-neuro-programming',
    title: 'Academic Memorization Schema',
    schemaType: 'A',
    duration: '1hr',
    anchors: ['Audio entrainment tools', 'Schema logbooks', 'Light/sound/touch cues'],
    triggers: ['Pen tapping', 'Study frequency activation', 'Theta reinforcement'],
    tiedownProtocol: 'Structured debrief with reality grounding confirmation',
    content: `
ACADEMIC MEMORIZATION SCHEMA - WORKED EXAMPLE

OBJECTIVE: 50 contract law clauses memorization and triggered recall

MATERIALS REQUIRED:
• EEG devices for monitoring brainwave states
• Audio entrainment tools (binaural beats, isochronic tones)
• Schema logbooks for detailed documentation
• Anchors: light cues, sound triggers, tactile stimuli

SCHEMA DESIGN METHODOLOGY:
1. Define Objective: Precise memorization of 50 contract law clauses
2. Visualization: Vivid mental imagery of clause content and structure
3. Concentration: Enter theta focus state (4-8 Hz) using audio entrainment
4. Affirmation: "When I tap my pen, my memory releases the clauses"
5. Anchoring: Pair pen tapping with clause recall during theta state
6. Reinforcement: Rehearsal with 14 Hz beta (study), 6 Hz theta (consolidation)

FREQUENCY PROTOCOL:
• Study Phase: 14-18 Hz low-beta for active learning and encoding
• Encoding Phase: 6-8 Hz theta for deep memory consolidation 
• Recall Phase: Triggered activation via pen tapping anchor

SESSION STRUCTURE:
• Phase 1: Beta entrainment during initial learning (30 min)
• Phase 2: Theta induction for schema encoding (20 min)
• Phase 3: Anchor/trigger pairing and reinforcement (10 min)
• Phase 4: Tie-down protocol for cognitive integration

EXIT & TIE-DOWN PROTOCOL:
• FlowGate: Visual flashlight signal for controlled exit
• DropGate: Auditory cue for immediate disengagement
• Structured debrief to prevent disorientation
• Reality check and cognitive dissonance prevention

WARNING: Longer flow states increase cognitive dissonance risk. Monitor session duration carefully.
    `
  },
  {
    id: 'flow-state-ops',
    title: 'Flow State Operations Manual',
    schemaType: 'B',
    duration: '24hr',
    anchors: ['Hidden paper task', 'Location anchor', 'Completion signal'],
    triggers: ['Task processing initiation', 'Exit sequence trigger', 'Dead battery backup'],
    tiedownProtocol: 'Time-check sanity protocol - second person needed',
    content: `
FLOW STATE OPERATIONAL PROTOCOL

Task Processing Framework:
1. Locate hidden paper during window
2. Write hidden word as instructed
3. Place paper on designated table
4. Begin EXIT process sequence

Exit Protocol Processing:
1. Task identification
2. Task completion verification
3. Exit DROP schema activation
4. Enter TIE-down state immediately

Tie-Down State Purpose:
- Prevent cognitive dissonance fully
- Normalize subject back to reality
- Keep flow-state goals in memory cache
- Operation completed - present time grounding

Safety Protocols:
- Always have second person monitoring
- Dead battery backup systems ready
- Multiple exit triggers available
    `
  },
  {
    id: 'advanced-schema',
    title: 'Advanced Schema Operations',
    schemaType: 'C',
    duration: '1week',
    anchors: ['Ultrasonic suggestion', 'Pen & paper processing', 'Remote viewing'],
    triggers: ['Jason Bourne trigger activation', '1-3 stimuli anchors', 'Inception point'],
    tiedownProtocol: 'Extended debrief - magical thinking prevention',
    content: `
ADVANCED SCHEMA PROGRAMMING

WARNING: Suspect Zero movie level operations
Magical thinking issues and cognitive dissonance abnormalities possible
Danger level increases with duration

Theory Base:
- Ultrasonic sub-conscious suggestion
- Pen & paper processing integration
- Remote viewing capabilities (CAUTION)

Hypothesis Implementation:
"One can engage Jason Bourne-like trigger using MK-Ultra methodology
and 1-3 external/internal stimuli anchors as inception point to operate
in latent mental schema previously learned in THETA state during
conscious daily life"

Schema Mapping & Design:
- Different schema purposes A, B, C
- Implementation methodology unknown/missing
- Recording schema for THETA playback
- Professional hypnosis induction assistance

Extended Protocols:
- Week-long flow state management
- Complex trigger systems
- Advanced anchor methodologies
- Specialized tiedown procedures
    `
  }
];

export default function OpsManualPage() {
  const [selectedManual, setSelectedManual] = useState<OpsManual | null>(null);
  const [isVisualizationActive, setVisualizationActive] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(6); // Theta frequency

  useEffect(() => {
    // Cycle through theta frequencies for ops manual context
    const interval = setInterval(() => {
      setCurrentFrequency(prev => {
        if (prev >= 8) return 4; // Theta range 4-8 Hz
        return prev + 0.5;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const activateVisualization = (manual: OpsManual) => {
    setSelectedManual(manual);
    setVisualizationActive(true);
    
    // Set frequency based on manual type
    const frequencies = { 'A': 6, 'B': 7, 'C': 5 };
    setCurrentFrequency(frequencies[manual.schemaType]);
  };

  return (
    <div className="min-h-screen bg-black text-terminal-red-primary p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-terminal-red-bright mb-2">
          Frequency-Based Neuro-Programming Manual
        </h1>
        <p className="text-terminal-red-secondary">
          Comprehensive framework for memory & cognition enhancement
        </p>
        <div className="mt-4 p-3 bg-yellow-600/10 border border-yellow-500/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-yellow-200 text-sm">
            <strong>Academic Research Framework:</strong> Evidence-based approaches to cognitive enhancement using frequency entrainment as an ethical alternative to historical pharmacological methods.
          </p>
        </div>
      </div>

      {/* Sacred Geometry Visualization for Theta State */}
      <div className="mb-8 flex justify-center">
        <div className="bg-card-bg/20 border border-terminal-red-muted/30 rounded-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-terminal-red-bright">
              Theta State Synchronization
            </h3>
            <p className="text-sm text-terminal-red-secondary">
              {currentFrequency.toFixed(1)} Hz - Schema Programming Active
            </p>
          </div>
          <SacredGeometryWheel 
            size={200}
            speed={1.5}
            brainwaveFrequency={currentFrequency}
            intensity={0.8}
          />
        </div>
      </div>

      {/* Operations Manuals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {opsManuals.map(manual => (
          <Card key={manual.id} className="bg-card-bg border-terminal-red-muted/30 hover:border-terminal-red-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright text-lg">
                {manual.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-terminal-red-secondary">
                <span className="bg-terminal-red-dark px-2 py-1 rounded">
                  Schema {manual.schemaType}
                </span>
                <span className="bg-terminal-red-dark px-2 py-1 rounded">
                  {manual.duration}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-terminal-red-secondary mb-2">Anchors:</h4>
                <ul className="text-sm space-y-1">
                  {manual.anchors.map((anchor, idx) => (
                    <li key={idx} className="text-terminal-red-muted">• {anchor}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-terminal-red-secondary mb-2">Triggers:</h4>
                <ul className="text-sm space-y-1">
                  {manual.triggers.map((trigger, idx) => (
                    <li key={idx} className="text-terminal-red-muted">• {trigger}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-terminal-red-secondary mb-2">Tiedown Protocol:</h4>
                <p className="text-sm text-terminal-red-muted">{manual.tiedownProtocol}</p>
              </div>
              
              <Button 
                onClick={() => activateVisualization(manual)}
                className="w-full bg-terminal-red-dark hover:bg-terminal-red-primary text-terminal-red-bright"
              >
                Activate Schema {manual.schemaType}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Manual View */}
      {selectedManual && (
        <Card className="bg-card-bg border-terminal-red-primary">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright text-xl">
              {selectedManual.title} - Detailed Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="content">Manual Content</TabsTrigger>
                <TabsTrigger value="examples">Worked Examples</TabsTrigger>
                <TabsTrigger value="anchors">Anchor System</TabsTrigger>
                <TabsTrigger value="triggers">Trigger Protocols</TabsTrigger>
                <TabsTrigger value="tiedown">Tiedown Process</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="mt-6">
                <pre className="text-sm text-terminal-red-secondary whitespace-pre-wrap bg-black/50 p-4 rounded border border-terminal-red-muted/20">
                  {selectedManual.content}
                </pre>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-6">
                <WorkedExamples />
              </TabsContent>
              
              <TabsContent value="anchors" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-terminal-red-bright">Anchor Configuration</h3>
                  {selectedManual.anchors.map((anchor, idx) => (
                    <div key={idx} className="bg-terminal-red-dark/20 p-4 rounded border border-terminal-red-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-terminal-red-secondary">Anchor #{idx + 1}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark"
                        >
                          Set Anchor
                        </Button>
                      </div>
                      <p className="text-terminal-red-primary mt-2">{anchor}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="triggers" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-terminal-red-bright">Trigger System</h3>
                  {selectedManual.triggers.map((trigger, idx) => (
                    <div key={idx} className="bg-terminal-red-dark/20 p-4 rounded border border-terminal-red-muted/30">
                      <div className="flex items-center justify-between">
                        <span className="text-terminal-red-secondary">Trigger #{idx + 1}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark"
                        >
                          Test Trigger
                        </Button>
                      </div>
                      <p className="text-terminal-red-primary mt-2">{trigger}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tiedown" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-terminal-red-bright">Tiedown Protocol</h3>
                  <div className="bg-terminal-red-dark/20 p-6 rounded border border-terminal-red-muted/30">
                    <p className="text-terminal-red-primary mb-4">{selectedManual.tiedownProtocol}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-terminal-red-secondary mb-2">Safety Checks:</h4>
                        <ul className="text-sm space-y-1 text-terminal-red-muted">
                          <li>• Time-check verification</li>
                          <li>• Sanity check protocol</li>
                          <li>• Reality grounding confirmation</li>
                          <li>• Cognitive dissonance prevention</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-terminal-red-secondary mb-2">Required Personnel:</h4>
                        <ul className="text-sm space-y-1 text-terminal-red-muted">
                          <li>• Second party monitor</li>
                          <li>• Experiment persona (knowledge)</li>
                          <li>• Dead battery backup operator</li>
                          <li>• Exit sequence coordinator</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 bg-terminal-red-primary hover:bg-terminal-red-bright text-black"
                      onClick={() => setVisualizationActive(false)}
                    >
                      Initiate Tiedown Protocol
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Warning Footer */}
      <div className="mt-8 p-4 bg-terminal-red-dark/20 border border-terminal-red-primary rounded">
        <p className="text-terminal-red-bright font-semibold mb-2">⚠ DISCLAIMER: PRODUCT OF A MAD MAN ⚠</p>
        <p className="text-terminal-red-secondary text-sm">
          Psychology Degree Minus Prerequisite Math - Submit to peers for review when completed.
          Caution: Complete - Publish - Theft Possible. Magical thinking issues and cognitive dissonance abnormalities may occur. Danger level increases with extended use.
        </p>
      </div>
    </div>
  );
}