import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Eye, 
  Volume2, 
  Brain,
  Target,
  Flashlight,
  RadioIcon,
  Zap,
  Timer
} from 'lucide-react';
import { BinauralBeatGenerator } from './BinauralBeatGenerator';
import { SacredGeometryWheel } from './sacred-geometry-wheel';

// Default Blackbriar Training Module (JSON-compatible structure)
const DEFAULT_BLACKBRIAR_MODULE: TrainingModule = {
  id: 'blackbriar-core',
  title: 'Blackbriar Core HUMINT Protocol',
  description: 'Foundational HUMINT training from classified Blackbriar manuals',
  totalDuration: 95,
  sections: [
  {
    id: 'core-traits',
    title: 'Core Traits',
    keywords: ['Alertness', 'Patience', 'Credibility', 'Objectivity', 'Adaptability', 'Perseverance', 'Appearance', 'Initiative'],
    mnemonic: 'All People Can Operate And Persevere In Adversity',
    anchor: 'Visualize agent gearing up - each trait becomes a piece of equipment',
    narration: 'Stay alert to every cue. Be patient but in control. Project credibility. Remain objective. Adapt quickly. Persevere under pressure. Maintain professional appearance. Act with initiative.',
    frequency: '10 Hz Alpha',
    duration: 20,
    glyph: '◉',
    timing: [
      { time: 0, text: 'ALERTNESS', cue: 'flashlight', type: 'keyword' },
      { time: 5, text: 'Stay alert to every cue. Notice micro-expressions.', type: 'narration' },
      { time: 10, text: 'PATIENCE', cue: 'breath', type: 'keyword' },
      { time: 15, text: 'Be patient but in control. Build rapport slowly.', type: 'narration' }
    ]
  },
  {
    id: 'five-phases',
    title: 'Five Phases of HUMINT',
    keywords: ['Planning', 'Approach', 'Questioning', 'Termination', 'Reporting'],
    mnemonic: 'Plan Ahead Quickly To Report',
    anchor: 'Flashlight blink = restart at Phase 1',
    narration: 'Plan before action. Approach with rapport. Question with intent. Terminate cleanly. Report completely.',
    frequency: '14 Hz Low-Beta',
    duration: 15,
    glyph: '⬟',
    timing: [
      { time: 0, text: 'PLANNING', cue: 'flashlight_blink', type: 'keyword' },
      { time: 3, text: 'Research mission. Know your target.', type: 'narration' },
      { time: 6, text: 'APPROACH', cue: 'wrist_tap', type: 'keyword' },
      { time: 9, text: 'Establish rapport. Build trust.', type: 'narration' },
      { time: 12, text: 'QUESTIONING', cue: 'pen_tap', type: 'keyword' }
    ]
  },
  {
    id: 'humint-activities',
    title: 'HUMINT Activities',
    keywords: ['Immediate', 'Cooperative', 'Long-Term', 'Material'],
    mnemonic: 'Tactical/Screening → Debrief/Liaison → SCO → DOCEX/CEE',
    anchor: 'Wrist tap → recall pyramid: base (Immediate), middle (Cooperative), top (Long-Term), capstone (Material)',
    narration: 'Immediate questioning brings fast answers. Cooperative sources offer depth. Long-term contacts build networks. Material exploitation reveals hidden truth.',
    frequency: '10 Hz Alpha',
    duration: 15,
    glyph: '△',
    timing: [
      { time: 0, text: 'IMMEDIATE', cue: 'wrist_tap', type: 'keyword' },
      { time: 4, text: 'Tactical questioning. Fast intel.', type: 'narration' },
      { time: 8, text: 'COOPERATIVE', cue: 'pen_tap', type: 'keyword' },
      { time: 12, text: 'Debrief willing sources.', type: 'narration' }
    ]
  },
  {
    id: 'knowledge-areas',
    title: 'Knowledge Areas',
    keywords: ['Culture', 'Threat', 'Law', 'Requirements', 'Language', 'Behavior'],
    mnemonic: 'CTL-LRB',
    anchor: 'Whisper phrase "Context First." Visualize six-point web.',
    narration: 'Culture drives behavior. Threat defines urgency. Law shapes limits. Requirements focus collection. Language enables control. Behavior exposes the truth.',
    frequency: '10 Hz Alpha → 6 Hz Theta',
    duration: 20,
    glyph: '⬢',
    timing: [
      { time: 0, text: 'CULTURE', cue: 'whisper', type: 'keyword' },
      { time: 5, text: 'Context First. Understand cultural drivers.', type: 'narration' },
      { time: 10, text: 'THREAT', cue: 'visual_web', type: 'keyword' },
      { time: 15, text: 'Threat defines urgency.', type: 'narration' }
    ]
  },
  {
    id: 'capabilities-limitations',
    title: 'Capabilities vs Limitations',
    keywords: ['Cross-cue', 'Detail', 'Deployability', 'Unique Intel', 'Language', 'Culture', 'Time', 'Law'],
    mnemonic: 'Strengths vs Constraints',
    anchor: 'Visualize a balance scale - strengths on the left, constraints on the right',
    narration: 'HUMINT excels in detail and adaptability. Yet language, culture, time, and law bind its limits.',
    frequency: '8 Hz Theta',
    duration: 15,
    glyph: '⚖',
    timing: [
      { time: 0, text: 'CAPABILITIES', cue: 'balance_left', type: 'keyword' },
      { time: 7, text: 'LIMITATIONS', cue: 'balance_right', type: 'keyword' },
      { time: 12, text: 'Balance strengths with constraints.', type: 'narration' }
    ]
  },
  {
    id: 'compression-drill',
    title: 'Compression Drill (Chalice/Delta)',
    keywords: ['Process', 'Execution', 'CONTROL'],
    mnemonic: 'Traits + Phases → Activities + Knowledge → CONTROL',
    anchor: 'Say CONTROL. Visualize it pulsing in your mind. Let CONTROL expand upward into full schema.',
    narration: 'Traits and Phases form Process. Activities and Knowledge form Execution. Together, they compress into one anchor: CONTROL.',
    frequency: '3 Hz Delta',
    duration: 10,
    glyph: '◈',
    timing: [
      { time: 0, text: 'CONTROL', cue: 'delta_pulse', type: 'anchor' },
      { time: 3, text: 'Process + Execution = CONTROL', type: 'compression' },
      { time: 6, text: 'Feel CONTROL expand into full schema.', type: 'visualization' }
    ]
  }
  ]
};

// Current training module (can be loaded from JSON)
let CURRENT_MODULE = DEFAULT_BLACKBRIAR_MODULE;
const HUMINT_SECTIONS = CURRENT_MODULE.sections;

// Frequency protocols for different phases
const FREQUENCY_PROTOCOLS = {
  'surface': { freq: 10, type: 'Alpha', description: 'Surface learning and keyword memorization' },
  'study': { freq: 14, type: 'Low-Beta', description: 'Active learning and comprehension' },
  'encode': { freq: 6, type: 'Theta', description: 'Deep encoding and schema formation' },
  'anchor': { freq: 3, type: 'Delta', description: 'Anchor compression and long-term storage' }
};

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  totalDuration: number;
  sections: TrainingSection[];
}

interface TrainingSection {
  id: string;
  title: string;
  keywords: string[];
  mnemonic: string;
  anchor: string;
  narration: string;
  frequency: string;
  duration: number;
  glyph: string;
  timing: TimingCue[];
}

interface TimingCue {
  time: number;
  text: string;
  cue?: string;
  type: 'keyword' | 'narration' | 'anchor' | 'compression' | 'visualization';
}

interface TrainingSession {
  currentSection: number;
  isRunning: boolean;
  sessionTime: number;
  sectionTime: number;
  currentPhase: string;
  frequency: number;
  showVisuals: boolean;
  showTeleprompter: boolean;
  audioPlaying: boolean;
  onboardingMode: boolean;
  onboardingTime: number;
  visualMode: 'onboarding' | 'glyphs' | 'blackgrey';
}

export function HumintTrainingTool() {
  const [trainingModule, setTrainingModule] = useState<TrainingModule>(DEFAULT_BLACKBRIAR_MODULE);
  const [session, setSession] = useState<TrainingSession>({
    currentSection: 0,
    isRunning: false,
    sessionTime: 0,
    sectionTime: 0,
    currentPhase: 'surface',
    frequency: 10,
    showVisuals: true,
    showTeleprompter: true,
    audioPlaying: false,
    onboardingMode: true,
    onboardingTime: 0,
    visualMode: 'onboarding'
  });

  const [currentTiming, setCurrentTiming] = useState(0);
  const sessionTimer = useRef<NodeJS.Timeout>();
  const sectionTimer = useRef<NodeJS.Timeout>();
  
  // Audio management refs
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentSection = trainingModule.sections[session.currentSection];
  const totalDuration = trainingModule.totalDuration;

  // Audio management functions
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const startAudio = () => {
    try {
      const audioContext = initAudioContext();
      
      // Stop any existing audio first
      stopAudio();
      
      // Create stereo setup with separate oscillators for each ear
      const leftOscillator = audioContext.createOscillator();
      const rightOscillator = audioContext.createOscillator();
      const leftGain = audioContext.createGain();
      const rightGain = audioContext.createGain();
      const merger = audioContext.createChannelMerger(2);
      
      // Configure oscillators based on current frequency
      leftOscillator.type = 'sine';
      rightOscillator.type = 'sine';
      leftOscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      rightOscillator.frequency.setValueAtTime(200 + session.frequency, audioContext.currentTime);
      
      // Configure gains (moderate volume)
      const gainValue = 0.3;
      leftGain.gain.setValueAtTime(gainValue, audioContext.currentTime);
      rightGain.gain.setValueAtTime(gainValue, audioContext.currentTime);
      
      // Create stereo separation
      leftOscillator.connect(leftGain);
      rightOscillator.connect(rightGain);
      leftGain.connect(merger, 0, 0);  // Left channel
      rightGain.connect(merger, 0, 1); // Right channel
      merger.connect(audioContext.destination);
      
      // Start oscillators
      leftOscillator.start();
      rightOscillator.start();
      
      // Store references
      leftOscillatorRef.current = leftOscillator;
      rightOscillatorRef.current = rightOscillator;
      leftGainRef.current = leftGain;
      rightGainRef.current = rightGain;
      
      setSession(prev => ({ ...prev, audioPlaying: true }));
    } catch (error) {
      console.error('Failed to start audio:', error);
    }
  };

  const stopAudio = () => {
    if (leftOscillatorRef.current) {
      leftOscillatorRef.current.stop();
      leftOscillatorRef.current.disconnect();
      leftOscillatorRef.current = null;
    }
    if (rightOscillatorRef.current) {
      rightOscillatorRef.current.stop();
      rightOscillatorRef.current.disconnect();
      rightOscillatorRef.current = null;
    }
    if (leftGainRef.current) {
      leftGainRef.current.disconnect();
      leftGainRef.current = null;
    }
    if (rightGainRef.current) {
      rightGainRef.current.disconnect();
      rightGainRef.current = null;
    }
    setSession(prev => ({ ...prev, audioPlaying: false }));
  };

  const updateAudioFrequency = (newFreq: number) => {
    if (audioContextRef.current && rightOscillatorRef.current) {
      rightOscillatorRef.current.frequency.setValueAtTime(
        200 + newFreq, 
        audioContextRef.current.currentTime
      );
    }
  };

  // Module loading function
  const loadTrainingModule = (moduleJson: string) => {
    try {
      const newModule: TrainingModule = JSON.parse(moduleJson);
      
      // Validate required fields
      if (!newModule.id || !newModule.title || !newModule.sections || newModule.sections.length === 0) {
        throw new Error('Invalid module format: missing required fields');
      }

      // Validate sections have required fields
      for (const section of newModule.sections) {
        if (!section.id || !section.title || !section.timing) {
          throw new Error(`Invalid section format in section: ${section.id || 'unknown'}`);
        }
      }

      setTrainingModule(newModule);
      // Reset session when new module is loaded
      resetSession();
      
      // Success feedback
      alert(`✅ Module loaded successfully: ${newModule.title}\nSections: ${newModule.sections.length}\nDuration: ${newModule.totalDuration || 'Unknown'} minutes`);
      
    } catch (error) {
      console.error('Failed to load training module:', error);
      alert(`❌ Failed to load module: ${error instanceof Error ? error.message : 'Invalid JSON format'}`);
    }
  };

  // Session control functions
  const startSession = () => {
    setSession(prev => ({ ...prev, isRunning: true }));
    startAudio(); // Start audio when session starts
    
    sessionTimer.current = setInterval(() => {
      setSession(prev => ({ 
        ...prev, 
        sessionTime: prev.sessionTime + 1,
        onboardingTime: prev.onboardingMode ? prev.onboardingTime + 1 : prev.onboardingTime
      }));
    }, 1000);

    sectionTimer.current = setInterval(() => {
      setSession(prev => {
        // Handle onboarding phase (15 minutes = 900 seconds)
        if (prev.onboardingMode && prev.onboardingTime >= 900) {
          return {
            ...prev,
            onboardingMode: false,
            visualMode: 'glyphs'
          };
        }

        const newSectionTime = prev.sectionTime + 1;
        if (newSectionTime >= currentSection.duration * 60) {
          // Move to next section
          const nextSection = prev.currentSection + 1;
          if (nextSection < trainingModule.sections.length) {
            const newSection = trainingModule.sections[nextSection];
            const newFreq = parseInt(newSection.frequency.split(' ')[0]);
            updateAudioFrequency(newFreq); // Update audio frequency for new section
            return {
              ...prev,
              currentSection: nextSection,
              sectionTime: 0,
              frequency: newFreq
            };
          } else {
            // Session complete
            stopAudio();
            return { ...prev, isRunning: false };
          }
        }
        return { ...prev, sectionTime: newSectionTime };
      });
    }, 1000);
  };

  const pauseSession = () => {
    setSession(prev => ({ ...prev, isRunning: false }));
    // Don't stop audio on pause - keep it playing
    if (sessionTimer.current) clearInterval(sessionTimer.current);
    if (sectionTimer.current) clearInterval(sectionTimer.current);
  };

  const resetSession = () => {
    stopAudio(); // Stop audio on reset
    setSession({
      currentSection: 0,
      isRunning: false,
      sessionTime: 0,
      sectionTime: 0,
      currentPhase: 'surface',
      frequency: 10,
      showVisuals: true,
      showTeleprompter: true,
      audioPlaying: false,
      onboardingMode: true,
      onboardingTime: 0,
      visualMode: 'onboarding'
    });
    setCurrentTiming(0);
    if (sessionTimer.current) clearInterval(sessionTimer.current);
    if (sectionTimer.current) clearInterval(sectionTimer.current);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current timing cue
  const getCurrentTimingCue = () => {
    const sectionTimeInSec = session.sectionTime;
    const timingPoint = currentSection.timing.find((timing, index) => {
      const nextTiming = currentSection.timing[index + 1];
      return sectionTimeInSec >= timing.time && (!nextTiming || sectionTimeInSec < nextTiming.time);
    });
    return timingPoint;
  };

  const currentCue = getCurrentTimingCue();

  useEffect(() => {
    return () => {
      stopAudio(); // Clean up audio on component unmount
      if (sessionTimer.current) clearInterval(sessionTimer.current);
      if (sectionTimer.current) clearInterval(sectionTimer.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <Card className="bg-black/50 border-red-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-red-400" />
              <div>
                <CardTitle className="text-2xl text-red-400">HUMINT AIO Training Tool</CardTitle>
                <p className="text-gray-400">Blackbriar Enhanced • Chalice/Cone Adaptive Learning Model™</p>
                <p className="text-xs text-cyan-400">{trainingModule.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-yellow-400 border-yellow-500">
                {session.onboardingMode ? 'ONBOARDING PHASE' : 'CLASSIFIED SECTION TRAINING'}
              </Badge>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      loadTrainingModule(content);
                    };
                    reader.onerror = () => {
                      alert('❌ Failed to read file');
                    };
                    reader.readAsText(file);
                  }
                  // Reset the input so the same file can be loaded again
                  e.target.value = '';
                }}
                className="hidden"
                id="module-upload"
              />
              <label htmlFor="module-upload">
                <Button variant="outline" size="sm" className="cursor-pointer" data-testid="load-module-button">
                  📁 Load Module
                </Button>
              </label>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Session Controls */}
      <Card className="bg-black/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="text-gray-400">Session Time</div>
                <div className="text-xl font-mono text-green-400">{formatTime(session.sessionTime)}</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-sm">
                <div className="text-gray-400">Section Time</div>
                <div className="text-xl font-mono text-blue-400">{formatTime(session.sectionTime)}</div>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-sm">
                <div className="text-gray-400">Current Phase</div>
                <div className="text-lg text-purple-400">{session.currentPhase}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!session.isRunning ? (
                <Button onClick={startSession} className="bg-green-600 hover:bg-green-700">
                  <Play className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              ) : (
                <Button onClick={pauseSession} className="bg-yellow-600 hover:bg-yellow-700">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={resetSession} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Session Progress</span>
              <span>{Math.round((session.sessionTime / (totalDuration * 60)) * 100)}%</span>
            </div>
            <Progress value={(session.sessionTime / (totalDuration * 60)) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Main Training Interface */}
      <Tabs defaultValue="teleprompter" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="teleprompter">Teleprompter</TabsTrigger>
          <TabsTrigger value="visuals">Visual Glyphs</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
          <TabsTrigger value="scenario">Scenarios</TabsTrigger>
        </TabsList>

        {/* Teleprompter Tab */}
        <TabsContent value="teleprompter" className="space-y-4">
          <Card className="bg-black/70 border-cyan-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyan-400">
                  Section {session.currentSection + 1}: {currentSection.title}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-purple-400">
                    {currentSection.frequency}
                  </Badge>
                  <Badge variant="outline" className="text-green-400">
                    {currentSection.duration}min
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Live Teleprompter Display */}
              <div className="space-y-4">
                {/* Simple Top Bar Prompting */}
                {currentCue && (
                  <div className="p-2 bg-cyan-600/10 border border-cyan-500/30 rounded flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-3 h-3 text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-mono">
                        [{formatTime(currentCue.time)}]
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {currentCue.type}
                      </Badge>
                    </div>
                    <div className={`text-sm font-medium ${
                      currentCue.type === 'keyword' ? 'text-white' :
                      currentCue.type === 'anchor' ? 'text-red-400' :
                      currentCue.type === 'compression' ? 'text-purple-400' :
                      currentCue.type === 'visualization' ? 'text-blue-400' :
                      'text-gray-300'
                    }`}>
                      {currentCue.text}
                    </div>
                  </div>
                )}

                {/* Comprehensive Training Content Scroll */}
                <div className="p-4 bg-black/50 border border-gray-600 rounded-lg max-h-96 overflow-y-auto">
                  <div className="space-y-4">
                    
                    {/* Section Overview */}
                    <div className="mb-4 p-3 bg-gray-800/50 rounded border border-gray-600">
                      <h4 className="text-sm font-bold text-white mb-2">TRAINING SPECIFICATION: {currentSection.title}</h4>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div><span className="text-cyan-400">Duration:</span> {currentSection.duration} minutes</div>
                        <div><span className="text-cyan-400">Frequency:</span> {currentSection.frequency}</div>
                        <div><span className="text-cyan-400">Objective:</span> {currentSection.narration}</div>
                      </div>
                    </div>

                    {/* Live Timeline */}
                    <div className="border-l-2 border-gray-600 pl-4 space-y-3">
                      {currentSection.timing.map((timing, index) => {
                        const isPast = session.sectionTime > timing.time;
                        const isCurrent = currentCue?.time === timing.time;
                        const isUpcoming = session.sectionTime < timing.time;
                        
                        return (
                          <div 
                            key={index}
                            className={`p-3 rounded transition-all duration-300 border-l-4 ${
                              isCurrent ? 'bg-cyan-600/20 border-cyan-400' :
                              isPast ? 'bg-gray-700/30 border-gray-500 opacity-60' :
                              isUpcoming ? 'bg-gray-800/50 border-gray-600' : ''
                            }`}
                          >
                            {/* Timing Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`font-mono text-xs px-2 py-1 rounded ${
                                  isCurrent ? 'bg-cyan-500 text-black' :
                                  isPast ? 'bg-gray-600 text-gray-300' :
                                  'bg-gray-700 text-gray-400'
                                }`}>
                                  {formatTime(timing.time)}
                                </span>
                                <Badge variant="outline" className={`text-xs ${
                                  isCurrent ? 'border-cyan-400 text-cyan-300' : ''
                                }`}>
                                  {timing.type}
                                </Badge>
                                {timing.cue && (
                                  <Badge variant="outline" className="text-xs text-yellow-400">
                                    {timing.cue}
                                  </Badge>
                                )}
                              </div>
                              {isCurrent && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
                            </div>

                            {/* Main Content */}
                            <div className={`text-sm mb-2 ${
                              timing.type === 'keyword' ? 'font-bold text-white' :
                              timing.type === 'anchor' ? 'text-red-300 font-semibold' :
                              timing.type === 'compression' ? 'text-purple-300 font-semibold' :
                              timing.type === 'visualization' ? 'text-blue-300 italic' :
                              'text-gray-300'
                            }`}>
                              {timing.text}
                            </div>

                            {/* Associated Training Content */}
                            {timing.type === 'keyword' && (
                              <div className="text-xs text-gray-400 mt-2 p-2 bg-gray-800/50 rounded">
                                <span className="text-yellow-400">Training Note:</span> Focus on neural pathway reinforcement. Repeat keyword mentally while maintaining alpha/beta frequency entrainment.
                              </div>
                            )}
                            
                            {timing.type === 'anchor' && (
                              <div className="text-xs text-gray-400 mt-2 p-2 bg-red-900/20 rounded border border-red-800/30">
                                <span className="text-red-400">Anchor Protocol:</span> Establish deep psychological marker. Utilize Chalice compression technique for long-term retention. Visualize anchor embedding at Delta frequency.
                              </div>
                            )}

                            {timing.type === 'compression' && (
                              <div className="text-xs text-gray-400 mt-2 p-2 bg-purple-900/20 rounded border border-purple-800/30">
                                <span className="text-purple-400">Cone Compression:</span> Compress all section data into single cognitive unit. Utilize theta state for schema formation and integration.
                              </div>
                            )}

                            {timing.type === 'visualization' && (
                              <div className="text-xs text-gray-400 mt-2 p-2 bg-blue-900/20 rounded border border-blue-800/30">
                                <span className="text-blue-400">Visual Protocol:</span> Engage spatial memory centers. Coordinate with sacred geometry patterns. Enhance with binaural entrainment for optimal encoding.
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2">KEYWORDS:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSection.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-white">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Mnemonic */}
              <div className="p-3 bg-green-600/10 border border-green-500/30 rounded">
                <div className="text-sm font-semibold text-green-400 mb-1">MNEMONIC:</div>
                <div className="text-green-200 font-mono">"{currentSection.mnemonic}"</div>
              </div>

              {/* Narration Flow */}
              <div className="p-3 bg-blue-600/10 border border-blue-500/30 rounded">
                <div className="text-sm font-semibold text-blue-400 mb-1">NARRATION FLOW:</div>
                <div className="text-blue-200 italic">{currentSection.narration}</div>
              </div>

              {/* Anchor */}
              <div className="p-3 bg-red-600/10 border border-red-500/30 rounded">
                <div className="text-sm font-semibold text-red-400 mb-1">ANCHOR:</div>
                <div className="text-red-200">{currentSection.anchor}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visual Glyphs Tab */}
        <TabsContent value="visuals" className="space-y-4">
          {/* Visual Mode Controls */}
          <Card className="bg-black/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">Visual Mode:</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={session.visualMode === 'onboarding' ? 'default' : 'outline'}
                      onClick={() => setSession(prev => ({ ...prev, visualMode: 'onboarding' }))}
                    >
                      Onboarding
                    </Button>
                    <Button
                      size="sm"
                      variant={session.visualMode === 'glyphs' ? 'default' : 'outline'}
                      onClick={() => setSession(prev => ({ ...prev, visualMode: 'glyphs' }))}
                    >
                      Glyphs
                    </Button>
                    <Button
                      size="sm"
                      variant={session.visualMode === 'blackgrey' ? 'default' : 'outline'}
                      onClick={() => setSession(prev => ({ ...prev, visualMode: 'blackgrey' }))}
                    >
                      Black & Grey
                    </Button>
                  </div>
                </div>
                {session.onboardingMode && (
                  <div className="text-sm text-cyan-400">
                    Onboarding: {Math.floor(session.onboardingTime / 60)}:{(session.onboardingTime % 60).toString().padStart(2, '0')} / 15:00
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Sacred Geometry or Onboarding */}
            <Card className="bg-black/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <span>
                    {session.visualMode === 'onboarding' ? 'Onboarding Visualization' : 'Sacred Geometry Wheel'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {session.visualMode === 'onboarding' ? (
                  <div className="text-center space-y-4">
                    <div className="text-6xl text-cyan-400 animate-pulse">◉</div>
                    <div className="space-y-2">
                      <div className="text-lg text-white">Focus Phase</div>
                      <div className="text-sm text-gray-400">
                        Establishing baseline frequency entrainment
                      </div>
                      <Progress 
                        value={(session.onboardingTime / 900) * 100} 
                        className="h-2 mt-4"
                      />
                      <div className="text-xs text-cyan-400">
                        {session.onboardingTime < 300 ? 'Alpha Wave Preparation' :
                         session.onboardingTime < 600 ? 'Beta Wave Activation' :
                         'Theta Wave Integration'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <SacredGeometryWheel 
                      brainwaveFrequency={session.frequency}
                      size={300}
                      speed={session.isRunning ? 1 : 0}
                      intensity={session.isRunning ? 0.8 : 0.3}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Panel - HUMINT Glyphs or Black & Grey Model */}
            <Card className="bg-black/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>
                    {session.visualMode === 'blackgrey' ? 'Tactical Display' : 'HUMINT Glyphs'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {session.visualMode === 'blackgrey' ? (
                  <div className="space-y-4">
                    {/* Black & Grey Model with Teleprompter Integration */}
                    <div className="bg-gray-900 border border-gray-600 p-4 rounded text-center">
                      <div className="text-4xl text-gray-400 mb-2">{currentSection.glyph}</div>
                      <div className="text-sm text-gray-500">{currentSection.title}</div>
                    </div>
                    
                    {/* Current keyword display */}
                    {getCurrentTimingCue() && (
                      <div className="bg-black border border-gray-700 p-3 rounded">
                        <div className="text-xs text-gray-500 mb-1">ACTIVE KEYWORD</div>
                        <div className="text-lg text-gray-300 font-mono">
                          {getCurrentTimingCue()?.text}
                        </div>
                      </div>
                    )}
                    
                    {/* Keyword matrix */}
                    <div className="grid grid-cols-2 gap-2">
                      {currentSection.keywords.map((keyword, index) => (
                        <div 
                          key={index}
                          className="bg-gray-800 border border-gray-600 p-2 rounded text-center"
                        >
                          <div className="text-xs text-gray-400">{keyword}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-6xl text-cyan-400 mb-2">{currentSection.glyph}</div>
                      <div className="text-sm text-gray-400">{currentSection.title}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {trainingModule.sections.map((section, index) => (
                        <div 
                          key={section.id}
                          className={`p-3 rounded border ${
                            index === session.currentSection 
                              ? 'border-cyan-500 bg-cyan-600/10' 
                              : 'border-gray-600 bg-gray-800/20'
                          }`}
                        >
                          <div className="text-2xl mb-1">{section.glyph}</div>
                          <div className="text-xs text-gray-400">{section.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Frequency Tab */}
        <TabsContent value="frequency" className="space-y-4">
          <Card className="bg-black/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-green-400" />
                <span>Frequency Entrainment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-white mb-2">
                    Current Frequency: {session.frequency} Hz ({currentSection.frequency})
                  </div>
                  <div className="text-sm text-gray-400">
                    Phase: {FREQUENCY_PROTOCOLS[session.currentPhase as keyof typeof FREQUENCY_PROTOCOLS]?.description}
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-4">
                    <div className={`w-3 h-3 rounded-full ${session.audioPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></div>
                    <span className="text-sm">
                      Audio: {session.audioPlaying ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                  <h4 className="font-semibold text-white mb-3">Binaural Beat Generator</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>Left Ear: 200 Hz</div>
                    <div>Right Ear: {200 + session.frequency} Hz</div>
                    <div>Beat Frequency: {session.frequency} Hz</div>
                    <div>Entrainment Target: {currentSection.frequency}</div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      onClick={session.audioPlaying ? stopAudio : startAudio}
                      className={session.audioPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      {session.audioPlaying ? 'Stop Audio' : 'Start Audio'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenario" className="space-y-4">
          <Card className="bg-black/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Situational Training Scenarios</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-yellow-400 mb-4">
                  <Flashlight className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl text-white mb-2">Advanced Scenarios</h3>
                <p className="text-gray-400">
                  Situational training scenarios will be activated based on section progress and Chalice/Cone adaptive learning model.
                </p>
                <Badge variant="outline" className="mt-4 text-orange-400">
                  COMING SOON
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}