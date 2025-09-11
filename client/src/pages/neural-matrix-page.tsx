import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SacredGeometryWheel } from "@/components/sacred-geometry-wheel";
import { Eye, FileText, Shield, Lock, Unlock } from "lucide-react";

interface ClassifiedDocument {
  id: string;
  title: string;
  classification: 'TOP SECRET' | 'SECRET' | 'CONFIDENTIAL' | 'DECLASSIFIED';
  source: 'NEURAL-MATRIX' | 'TREADSTONE' | 'OUTCOME';
  dateAcquired: string;
  content: string;
  isUnlocked: boolean;
}

const classifiedDocs: ClassifiedDocument[] = [
  {
    id: 'freq-neuro-manual',
    title: 'Frequency-Based Neuro-Programming Research Manual',
    classification: 'DECLASSIFIED',
    source: 'NEURAL-MATRIX',
    dateAcquired: 'Academic Research Phase',
    content: `COMPREHENSIVE RESEARCH FRAMEWORK FOR COGNITIVE ENHANCEMENT
    
Subject: Frequency-Based Neuro-Programming for Memory & Cognition Enhancement
Classification: ACADEMIC RESEARCH - DECLASSIFIED

ABSTRACT:
Comprehensive research and experimental framework for memory and cognition enhancement using frequency-based entrainment as an ethical, replicable alternative to historical pharmacological methods. Building upon declassified MK-Ultra documents and schema-based psychological theory, it formalizes a dual-process model of cognition and proposes intentional design of schemas.

HISTORICAL CONTEXT:
The CIA's MK-Ultra program attempted cognitive manipulation using chemical and behavioral methods. A 1963 Inspector General memorandum admitted no effective "truth serum" was found. Chemical manipulation proved inconsistent, risky, and ethically indefensible.

THEORETICAL FRAMEWORK:

LONG VS. SHORT THINKING:
• Long Thinking: deliberate, reflective reasoning used to build schemas
• Short Thinking: rapid, automatic responses triggered by encoded schemas
• Jason Bourne Effect: intentional design of triggers to activate Short Thinking when needed

SCHEMA AND TRIGGER DESIGN:
Schemas are mental programs binding Objects (knowledge, skills) to Triggers (sensory cues). Encoded in theta states, reinforced by entrainment, they enable automatic action.

FREQUENCY ENTRAINMENT AS PSYCHOACTIVE ANALOGUE:
• LSD analogue: 6–10 Hz theta-alpha crossover
• Cannabis analogue: 8–12 Hz alpha relaxation
• Opioid analogue: 1–3 Hz delta with noise

HYPOTHESIS:
Through frequency entrainment and schema anchoring, individuals can encode latent mental programs in theta states and trigger their automatic activation in response to designed stimuli.

CURRENT STATUS: Research framework integrated into neurohacking platform for ethical cognitive enhancement applications.`,
    isUnlocked: false
  },
  {
    id: 'methodology-protocol',
    title: 'Schema Creation & Implementation Methodology',
    classification: 'DECLASSIFIED',
    source: 'NEURAL-MATRIX',
    dateAcquired: 'Research Development Phase',
    content: `COMPREHENSIVE METHODOLOGY & IMPLEMENTATION PROTOCOLS
    
Subject: Schema Creation and Frequency-Based Implementation
Classification: ACADEMIC RESEARCH - DECLASSIFIED

MATERIALS REQUIRED:
• EEG devices for monitoring brainwave states
• Audio entrainment tools (binaural beats, isochronic tones)
• Schema logbooks for detailed session documentation
• Anchors: light cues, sound triggers, tactile stimuli

SETTING THE OBJECT:
The Object is the precise unit of knowledge or behavior chosen for encoding.
• Must be clear, contextual, and trigger-able
• Examples: "recall contract law clauses", "defensive stance when glass breaks", "release stress at 10 PM"

SCHEMA CREATION (THOUGHT PATTERN PROGRAMMING):
1. Define Objective - Clear, specific, measurable goal
2. Visualization - Vivid mental imagery of desired outcome
3. Concentration - Enter theta focus state (4-8 Hz) using audio entrainment
4. Affirmation - Spoken or recorded phrase reinforcing schema
5. Anchoring - Pair sensory stimulus with schema activation
6. Reinforcement - Rehearsal with frequency entrainment protocols

FLOW STATE DURATIONS:
• 1 hour: Basic skill encoding
• 24 hours: Complex behavior integration
• 3 days: Deep pattern establishment
• 1 week: Long-term schema consolidation

EXIT & TIE-DOWN PROTOCOLS:
• FlowGate: Visual flashlight signal for controlled exit
• DropGate: Auditory signal for immediate disengagement  
• Tie-Down: Structured debrief to prevent disorientation

NIGHTLY RECALL ("Mental Dump"):
10 minutes of theta-state review to reinforce Objects and release maladaptive thought loops.`,
    isUnlocked: false
  },
  {
    id: 'bb-003',
    title: 'Outcome Program Enhancement Protocols',
    classification: 'DECLASSIFIED', 
    source: 'OUTCOME',
    dateAcquired: 'Final Extraction',
    content: `OUTCOME PROGRAM DOCUMENTATION
    
Subject: Cognitive Enhancement Through Frequency Manipulation
Classification: FORMERLY TOP SECRET - NOW DECLASSIFIED

FINAL PHASE ACQUISITION:
Last documents acquired during final extraction phase. Outcome program's cognitive enhancement protocols now form foundation of civilian brainwave frequency training.

BRAINWAVE INTEGRATION:
- Alpha (8-12 Hz): Relaxed awareness enhancement
- Beta (12-30 Hz): Active cognitive processing
- Theta (4-8 Hz): Deep programming states
- Gamma (30-100+ Hz): Advanced neural synchronization

SACRED GEOMETRY INTEGRATION:
Outcome program's visual stimulation protocols adapted into sacred geometry wheel system. 13 alternating circles with elliptical patterns designed for safe civilian use.

EVOLUTION: Military psychological programming evolved into beneficial cognitive training platform.

STATUS: Full integration complete. All former classified techniques now serve beneficial civilian purposes.`,
    isUnlocked: false
  }
];

export default function NeuralMatrixPage() {
  const [documents, setDocuments] = useState(classifiedDocs);
  const [selectedDoc, setSelectedDoc] = useState<ClassifiedDocument | null>(null);
  const [clearanceLevel, setClearanceLevel] = useState(0);
  const [backstoryFreq, setBackstoryFreq] = useState(6); // Theta for memory recall

  useEffect(() => {
    // Cycle through theta frequencies for memory recall
    const interval = setInterval(() => {
      setBackstoryFreq(prev => {
        if (prev >= 8) return 4;
        return prev + 0.2;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const unlockDocument = (docId: string) => {
    if (clearanceLevel >= 3) {
      setDocuments(prev => prev.map(doc => 
        doc.id === docId ? { ...doc, isUnlocked: true } : doc
      ));
    }
  };

  const increaseClearance = () => {
    if (clearanceLevel < 3) {
      setClearanceLevel(prev => prev + 1);
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'bg-terminal-red-primary text-black';
      case 'SECRET': return 'bg-terminal-red-dark text-terminal-red-bright';
      case 'CONFIDENTIAL': return 'bg-terminal-red-muted text-terminal-red-secondary';
      case 'DECLASSIFIED': return 'bg-terminal-green text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-terminal-red-primary p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <Eye className="h-8 w-8 text-terminal-red-bright" />
          <h1 className="text-3xl font-bold text-terminal-red-bright">
            SHADOWFANG INFILTRATION ARCHIVES
          </h1>
          <Eye className="h-8 w-8 text-terminal-red-bright" />
        </div>
        <p className="text-terminal-red-secondary mb-2">
          Classified Documents Acquired Through Deep Cover Operations
        </p>
        <p className="text-sm text-terminal-red-muted">
          Subject infiltrated ShadowFang by falsifying age documentation - Learned program before public release
        </p>
      </div>

      {/* Clearance Status */}
      <div className="mb-8 flex justify-center">
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-terminal-red-bright">
              Memory Recall Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className="text-sm text-terminal-red-secondary mb-2">
                Theta State: {backstoryFreq.toFixed(1)} Hz - Memory Access Active
              </div>
              <SacredGeometryWheel 
                size={140}
                speed={1.2}
                brainwaveFrequency={backstoryFreq}
                intensity={0.7}
              />
            </div>
            <div className="text-center">
              <div className="text-lg font-mono text-terminal-red-bright">
                CLEARANCE LEVEL: {clearanceLevel}/3
              </div>
              <Button 
                onClick={increaseClearance}
                disabled={clearanceLevel >= 3}
                className="mt-2 bg-terminal-red-dark hover:bg-terminal-red-primary text-terminal-red-bright disabled:opacity-50"
              >
                {clearanceLevel >= 3 ? 'FULL ACCESS GRANTED' : 'INCREASE CLEARANCE'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Archive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {documents.map(doc => (
          <Card 
            key={doc.id} 
            className={`bg-card-bg border transition-all duration-300 hover:scale-105 cursor-pointer ${
              doc.isUnlocked || clearanceLevel >= 3 
                ? 'border-terminal-green shadow-lg shadow-terminal-green/20' 
                : 'border-terminal-red-muted/30'
            }`}
            onClick={() => doc.isUnlocked || clearanceLevel >= 3 ? setSelectedDoc(doc) : unlockDocument(doc.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {doc.isUnlocked || clearanceLevel >= 3 ? (
                  <Unlock className="h-5 w-5 text-terminal-green" />
                ) : (
                  <Lock className="h-5 w-5 text-terminal-red-muted" />
                )}
                <Badge className={getClassificationColor(doc.classification)}>
                  {doc.classification}
                </Badge>
              </div>
              <CardTitle className="text-terminal-red-bright text-lg">
                {doc.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-terminal-red-secondary" />
                  <span className="text-terminal-red-secondary">Source: {doc.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-terminal-red-secondary" />
                  <span className="text-terminal-red-secondary">Acquired: {doc.dateAcquired}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  size="sm" 
                  className={`w-full ${
                    doc.isUnlocked || clearanceLevel >= 3
                      ? 'bg-terminal-green text-black hover:bg-terminal-green/80'
                      : 'bg-terminal-red-dark text-terminal-red-muted'
                  }`}
                  disabled={!(doc.isUnlocked || clearanceLevel >= 3)}
                >
                  {doc.isUnlocked || clearanceLevel >= 3 ? 'ACCESS DOCUMENT' : 'CLASSIFIED'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Document Viewer */}
      {selectedDoc && (
        <Card className="bg-card-bg border-terminal-green shadow-lg shadow-terminal-green/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-terminal-red-bright">
                {selectedDoc.title}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDoc(null)}
                className="border-terminal-red-muted text-terminal-red-secondary"
              >
                Close
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getClassificationColor(selectedDoc.classification)}>
                {selectedDoc.classification}
              </Badge>
              <Badge className="bg-terminal-red-dark text-terminal-red-bright">
                {selectedDoc.source}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-terminal-red-secondary whitespace-pre-wrap bg-black/50 p-6 rounded border border-terminal-red-muted/20 font-mono">
              {selectedDoc.content}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Infiltration Story Footer */}
      <div className="mt-8 p-6 bg-terminal-red-dark/20 border border-terminal-red-primary rounded">
        <h3 className="text-xl font-bold text-terminal-red-bright mb-4 text-center">
          THE INFILTRATION STORY
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-terminal-red-secondary">
          <div className="text-center">
            <h4 className="font-semibold text-terminal-red-bright mb-2">Phase 1: False Documentation</h4>
            <p>Age falsification enabled access to restricted Blackbriar training facility. Identity bypass successful.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-terminal-red-bright mb-2">Phase 2: Deep Learning</h4>
            <p>Acquired classified psychological programming manuals during pre-public release. Complete methodology absorbed.</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-terminal-red-bright mb-2">Phase 3: Evolution</h4>
            <p>Military-grade techniques evolved into beneficial civilian cognitive enhancement platform. Mission complete.</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-terminal-red-muted italic">
            "What was once classified psychological warfare has become a tool for human cognitive evolution."
          </p>
        </div>
      </div>
    </div>
  );
}