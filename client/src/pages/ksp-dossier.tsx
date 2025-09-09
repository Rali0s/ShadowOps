import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SacredGeometryWheel } from "@/components/sacred-geometry-wheel";
import { FileText, Shield, AlertTriangle, Brain, Target, Lock } from "lucide-react";

interface DossierSection {
  id: string;
  title: string;
  classification: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
}

const dossierSections: DossierSection[] = [
  {
    id: 'overview',
    title: '1. Overview',
    classification: 'Internal / Restricted',
    riskLevel: 'medium',
    content: `Knot Solution Programming (KSP) is a theoretical system for conditioning, inducing, and controlling mental states through a fusion of:

• Brainwave entrainment (Alpha, Beta, Theta, Gamma dynamics)
• Operational schema design (anchoring, triggers, exit protocols)  
• Ops-style training methodology (flow states, mission protocols, exit "tie-downs")

The objective is not hypnosis, but the creation of programmable schemas — pre-fabricated mental models activated by controlled stimuli and stabilized by exit/debrief systems.`
  },
  {
    id: 'foundation',
    title: '2. Theoretical Foundation', 
    classification: 'Internal / Restricted',
    riskLevel: 'high',
    content: `BRAINWAVE STATES:
• Alpha (8–12 Hz): Relaxed alertness; creative visualization
• Beta (12–30 Hz): Analytical focus; vigilance; high beta risks anxiety  
• Theta (4–8 Hz): Subconscious access; memory integration; critical for schema programming
• Gamma (30–100+ Hz): Cognitive binding; insight; multi-schema integration

CONDITIONING HYPOTHESIS:
"One can engage in a Jason Bourne-like trigger by using protocols and 1–3 external/internal anchors as inception points to operate within a latent schema previously imprinted at Theta levels."`
  },
  {
    id: 'schema-design',
    title: '3. Schema Design',
    classification: 'Internal / Restricted', 
    riskLevel: 'extreme',
    content: `Schemas are MENTAL BLUEPRINTS — tightly constructed flow patterns of behavior, thought, or emotional state.

Each schema requires:
• Induction Method: Meditation, hypnosis, sound entrainment (Endel, EMOTIV EEG, InsiteTimer)
• Programmed Narrative: Mindset A/B/C with embedded triggers
• Trigger Mechanism: Auditory cue, tactile cue ( Flashlight On During Session or Suspect 0 Type Phase )
• Exit Protocol: External timer/sound or internal "off-switch"
• Tie-Down: Debriefing to prevent cognitive dissonance backlash`
  },
  {
    id: 'operational',
    title: '4. Operational Framework',
    classification: 'Internal / Restricted',
    riskLevel: 'high', 
    content: `FLOW DURATIONS: 1 week, 3 days, 24 hours, 1 hour

TASK PROCESSING: Mission embedded in schema → maintained until complete → exit protocol triggered

EXIT/TIE-DOWN: Flashlight indicator, DropGate auditory cue, structured debrief into present time

PHASE OPERATIONS:
• FlowGate Processing: Entrance and maintenance protocols
• DropGate Processing: Schema transition and exit sequences
• Task Processing: Mission execution within schema constraints
• Tie-Down State: Reality grounding and cognitive dissonance prevention`
  },
  {
    id: 'materials',
    title: '5. Materials & Tools',
    classification: 'Internal / Restricted',
    riskLevel: 'medium',
    content: `REQUIRED EQUIPMENT:
• EEG/ECG baselines (e.g., Emotiv Epoch) - APA Board Approval
• Entrainment apps (soundscapes inducing Alpha/Theta)
• Schema recordings (audio instructions for playback) 
• Anchor objects (physical or symbolic cues)

SUPPORTING INFRASTRUCTURE:
• Track book and log for session documentation
• Professional hypnosis assistance for induction
• Second party monitoring for safety protocols
• Dead battery backup systems for emergency exit`
  },
  {
    id: 'applications',
    title: '6. Applications',
    classification: 'Internal / Restricted',
    riskLevel: 'high',
    content: `RESEARCH APPLICATIONS:
• Controlled study of flow and schema transitions
• Brainwave entrainment effectiveness analysis
• Psychological programming methodology validation

OPS TRAINING (THEORETICAL):
• Rapid conditioning for performance enhancement
• Mission-specific schema pre-programming
• Trigger-based operational state activation

THERAPEUTIC EXPERIMENT:
• Trauma re-patterning (HIGH RISK) - PTSD TRIGGER - WARNING!
• Cognitive behavioral modification
• Memory integration protocols

COUNTER-OPS:
• Deprogramming and defensive schema work
• Psychological warfare countermeasures
• Schema disruption and neutralization`
  },
  {
    id: 'risks', 
    title: '7. Risks',
    classification: 'Internal / Restricted',
    riskLevel: 'extreme',
    content: `EXTREME RISK WARNING:

COGNITIVE DISSONANCE COLLAPSE:
• Longer flows = exponentially higher risk
• Reality dissociation potential
• Memory fragmentation dangers

FALSE MEMORIES / MAGICAL THINKING:
• Distorted perception of reality - +1 Week
• Paranormal belief integration
• Timeline confusion and false narratives

ANCHOR DEPENDENCY:
• Overreliance on external triggers
• Loss of autonomous decision making
• Psychological addiction to schema states

ETHICAL DANGERS:
• Violation of informed consent principles

OPERATIONAL SECURITY:
• Classified methodology exposure risk
• Unauthorized replication dangers`
  },
  {
    id: 'publishing',
    title: '8. Publishing Pathways',
    classification: 'Internal / Restricted',
    riskLevel: 'high',
    content: `PEER REVIEW CANDIDATES:
• PsychINFO - Primary academic database
• PsychDB - Specialized psychological research

POPULAR OUTLETS:
• Psychology Today - General audience publication
• Academic conferences and symposiums

PUBLICATION CONSIDERATIONS:
• Ethics review board approval required
• Peer review for validation and safety
• Potential classification restrictions
• Academic versus operational applications`
  },
  {
    id: 'Memorization',
    title: '9. Memorization',
    classification: 'Internal / Restricted',
    riskLevel: 'high',
    content: `METHODOLOGY:
  • Gaze Into Red or Grey Color & Shape Sphere Center
  • or Visualize the Shape of the Sphere On The Wall
  • Having Prepared your Mind Palace Recall Your Trigger Playing Card 
  • Duration 1 - 15 Minutes ( Think only of your Card )
  • Next Time You Enter Your Card - After Rest & Relaxation Session, Check Your Recall

  PUBLICATION CONSIDERATIONS:
  • Ethics review board approval required
  • Peer review for validation and safety
  • Potential classification restrictions
  • Academic versus operational applications`
  },
  {
    id: 'Schema Design',
    title: '10. Schema Design',
    classification: 'Internal / Restricted',
    riskLevel: 'high',
    content: `METHODOLOGY:
  • Read: Master Key System by Charles F. Haanel
  • Write Down Who You Are & What Makes You
  • ReWrite It Into Your Own Ideal Personality
  • Map All New Traits and What They Mean To You
  • Theory: Use of a Trigger Sound To Activatite Your New Schema`
  },
  {
    id: 'conclusion',
    title: '11. Conclusion',
    classification: 'Internal / Restricted',
    riskLevel: 'extreme', 
    content: `KSP represents a FUSION OF:
• Psychological research methodologies
• Declassified ops theory and applications  
• Brainwave entrainment technology
• Coherent experimental system design

CRITICAL WARNINGS:
⚠️ OPERATIONAL DEPLOYMENT PROHIBITED
⚠️ FOR ACADEMIC REVIEW ONLY
⚠️ EXTREME CAUTION REQUIRED

EVOLUTION STATUS:
Military-grade psychological programming techniques have been adapted and evolved into beneficial civilian cognitive enhancement systems. All operational deployment restrictions remain in effect.

CURRENT INTEGRATION:
Full methodology integrated into _Fq brainwave frequency training platform with appropriate safety protocols and beneficial applications only.`
  }
];

export default function KSPDossier() {
  const [activeSection, setActiveSection] = useState('overview');
  const [clearanceVerified, setClearanceVerified] = useState(false);
  const [dossierFreq, setDossierFreq] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setDossierFreq(prev => {
        if (prev >= 8) return 4;
        return prev + 0.3;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-terminal-green text-black';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'high': return 'bg-orange-600 text-white'; 
      case 'extreme': return 'bg-terminal-red-primary text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  const currentSection = dossierSections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-black text-terminal-red-primary p-4">
      {/* Header with Agency Seal */}
      <div className="mb-8 text-center">
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="relative">
            <SacredGeometryWheel 
              size={80}
              speed={2}
              brainwaveFrequency={dossierFreq}
              intensity={0.9}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-terminal-red-bright rounded-full flex items-center justify-center bg-black/70">
                <div className="text-xs font-bold text-terminal-red-bright">KSP</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-terminal-red-bright mb-2">
              🌀 KNOT SOLUTION PROGRAMMING
            </h1>
            <p className="text-terminal-red-secondary">
              Psychological Conditioning & Brainwave Schema Programming
            </p>
            <Badge className="bg-terminal-red-dark text-terminal-red-bright mt-2">
              Internal / Restricted
            </Badge>
          </div>
        </div>

        <div className="bg-terminal-red-dark/20 border border-terminal-red-primary rounded p-4 max-w-2xl mx-auto">
          <p className="text-terminal-red-bright font-semibold">
            ⚠ DISCLAIMER: PRODUCT OF A MAD MAN ⚠
          </p>
          <p className="text-sm text-terminal-red-secondary mt-1">
            For experimental/academic reference only. Not cleared for operational deployment without ethics review.
          </p>
          <p className="text-xs text-terminal-red-muted mt-2 italic">
            Psychology Degree Minus Math Prerequisites
          </p>
        </div>
      </div>

      {/* Clearance Verification */}
      {!clearanceVerified && (
        <Card className="bg-card-bg border-terminal-red-primary mb-8 max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security Clearance Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-terminal-red-secondary mb-4">
              This dossier contains classified psychological programming methodologies. 
              Verify clearance to access full documentation.
            </p>
            <Button 
              onClick={() => setClearanceVerified(true)}
              className="bg-terminal-red-primary hover:bg-terminal-red-bright text-black"
            >
              Verify Clearance
            </Button>
          </CardContent>
        </Card>
      )}

      {clearanceVerified && (
        <>
          {/* Frequency Synchronization Status */}
          <div className="mb-8 flex justify-center">
            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="text-center">
                  <div className="text-sm text-terminal-red-secondary">
                    Theta State Synchronization
                  </div>
                  <div className="text-lg font-mono text-terminal-red-bright">
                    {dossierFreq.toFixed(1)} Hz
                  </div>
                </div>
                <SacredGeometryWheel 
                  size={60}
                  speed={1.5}
                  brainwaveFrequency={dossierFreq}
                  intensity={0.7}
                />
                <div className="text-center">
                  <div className="text-sm text-terminal-red-secondary">
                    Schema Programming Active
                  </div>
                  <div className="text-xs text-terminal-red-muted">
                    Memory Integration Mode
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dossier Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            {dossierSections.map(section => (
              <Button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? "default" : "outline"}
                size="sm"
                className={`text-xs p-2 h-auto flex flex-col gap-1 ${
                  activeSection === section.id 
                    ? 'bg-terminal-red-primary text-black' 
                    : 'border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark/20'
                }`}
              >
                <span className="font-semibold">{section.title.split('.')[0]}</span>
                <span className="text-xs opacity-75">{section.title.split('.')[1]?.trim()}</span>
                <Badge className={`${getRiskColor(section.riskLevel)} text-xs px-1 py-0`}>
                  {section.riskLevel.toUpperCase()}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Active Section Display */}
          {currentSection && (
            <Card className="bg-card-bg border-terminal-red-muted/30 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-terminal-red-bright">
                    {currentSection.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-terminal-red-dark text-terminal-red-bright">
                      {currentSection.classification}
                    </Badge>
                    <Badge className={getRiskColor(currentSection.riskLevel)}>
                      {currentSection.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-terminal-red-secondary whitespace-pre-wrap bg-black/50 p-6 rounded border border-terminal-red-muted/20 font-mono leading-relaxed">
                  {currentSection.content}
                </pre>
              </CardContent>
            </Card>
          )}

          {/* Quick Reference Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Brainwave States
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Alpha:</span>
                  <span className="text-terminal-red-bright">8-12 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Beta:</span>
                  <span className="text-terminal-red-bright">12-30 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Theta:</span>
                  <span className="text-terminal-red-bright">4-8 Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Gamma:</span>
                  <span className="text-terminal-red-bright">30-100+ Hz</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Schema Types
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Type A:</span>
                  <span className="text-terminal-red-bright">1 hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Type B:</span>
                  <span className="text-terminal-red-bright">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-terminal-red-secondary">Type C:</span>
                  <span className="text-terminal-red-bright">1 week</span>
                </div>
                <div className="text-xs text-terminal-red-muted mt-3">
                  Advanced schemas require extended protocols
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-bg border-terminal-red-primary">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="text-terminal-red-bright font-semibold">EXTREME CAUTION:</div>
                <ul className="text-terminal-red-secondary space-y-1 text-xs">
                  <li>• Cognitive dissonance risk</li>
                  <li>• Magical thinking potential</li>
                  <li>• Anchor dependency danger</li>
                  <li>• Ethical parallels</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Classification Footer */}
          <div className="mt-8 p-6 bg-terminal-red-dark/20 border border-terminal-red-primary rounded">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-terminal-red-bright mb-2">
                END OF CLASSIFIED DOSSIER
              </h3>
              <p className="text-terminal-red-secondary">
                KSP represents a fusion of psych research, declassified ops theory, and brainwave entrainment
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-terminal-red-bright mb-2">Publishing Status:</h4>
                <ul className="text-terminal-red-secondary space-y-1">
                  <li>• Peer review candidates: PsychINFO, PsychDB</li>
                  <li>• Popular outlets: Psychology Today</li>
                  <li>• Confidential option: Restricted circulation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-terminal-red-bright mb-2">Current Status:</h4>
                <ul className="text-terminal-red-secondary space-y-1">
                  <li>• Operational deployment prohibited</li>
                  <li>• Academic review and narrative only</li>
                  <li>• Integrated into civilian platform with safety protocols</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}