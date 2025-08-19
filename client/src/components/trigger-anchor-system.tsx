import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SacredGeometryWheel } from "./sacred-geometry-wheel";
import { Play, Square, Volume2, Brain, Target, Zap, Music, Power, Heart, Plus, X } from "lucide-react";

interface Anchor {
  id: string;
  type: 'visual' | 'audio' | 'tactile';
  name: string;
  description: string;
  isActive: boolean;
}

interface Trigger {
  id: string;
  name: string;
  stimulusType: 'external' | 'internal';
  description: string;
  isArmed: boolean;
}

interface AnchorWord {
  id: string;
  word: string;
  category: 'trigger' | 'anchor' | 'codeoff' | 'pleasure';
  frequency: number;
  duration: number;
  isActive: boolean;
}

interface SequenceStep {
  id: string;
  type: 'word' | 'music' | 'visual' | 'pause';
  content: string;
  duration: number;
  frequency?: number;
}

interface TriggerAnchorSystemProps {
  onTriggerActivated?: (triggerId: string) => void;
  onAnchorSet?: (anchorId: string) => void;
}

export function TriggerAnchorSystem({ onTriggerActivated, onAnchorSet }: TriggerAnchorSystemProps) {
  const [anchors, setAnchors] = useState<Anchor[]>([
    {
      id: 'visual-dial',
      type: 'visual',
      name: 'Internal Dial Recall',
      description: 'Revibe therapy dial visualization with physical attributes',
      isActive: false
    },
    {
      id: 'cisco-phone',
      type: 'audio',
      name: 'Cisco Phone Sound',
      description: 'Old 90s Cisco phone ring as external trigger',
      isActive: false
    },
    {
      id: 'flashlight',
      type: 'visual',
      name: 'Flashlight Indicator',
      description: 'Phone flashlight ON indicator for flow state',
      isActive: false
    }
  ]);

  const [triggers, setTriggers] = useState<Trigger[]>([
    {
      id: 'drop-gate-entrance',
      name: 'DropGate Processing Entrance',
      stimulusType: 'external',
      description: 'External trigger to enter latent hidden schema',
      isArmed: false
    },
    {
      id: 'flow-gate',
      name: 'FlowGate Processing',
      stimulusType: 'external',
      description: 'Flow state maintenance with flashlight indicator',
      isArmed: false
    },
    {
      id: 'exit-protocol',
      name: 'Exit Protocol Trigger',
      stimulusType: 'external',
      description: 'Coo-coo clock or unique timer sound',
      isArmed: false
    },
    {
      id: 'internal-off',
      name: 'Internal OFF Concept',
      stimulusType: 'internal',
      description: 'Prudent internal concept to avoid state recall issues',
      isArmed: false
    }
  ]);

  const [tiedownState, setTiedownState] = useState({
    active: false,
    protocol: 'standby',
    timeCheck: new Date().toISOString(),
    sanityCheck: 'normal'
  });

  // Anchor Words State
  const [anchorWords, setAnchorWords] = useState<AnchorWord[]>([
    { id: '1', word: 'FLOW', category: 'trigger', frequency: 6, duration: 5, isActive: false },
    { id: '2', word: 'ANCHOR', category: 'anchor', frequency: 8, duration: 3, isActive: false },
    { id: '3', word: 'EXIT', category: 'codeoff', frequency: 12, duration: 2, isActive: false },
    { id: '4', word: 'PEACE', category: 'pleasure', frequency: 10, duration: 4, isActive: false },
  ]);
  
  // New anchor word form state
  const [newWord, setNewWord] = useState('');
  const [newCategory, setNewCategory] = useState<'trigger' | 'anchor' | 'codeoff' | 'pleasure'>('anchor');
  const [newFrequency, setNewFrequency] = useState(8);
  const [newDuration, setNewDuration] = useState(3);

  // Sequence State
  const [codeOffSequence, setCodeOffSequence] = useState<SequenceStep[]>([]);
  const [pleasureSequence, setPleasureSequence] = useState<SequenceStep[]>([]);
  const [isSequenceRunning, setIsSequenceRunning] = useState(false);
  const [currentSequence, setCurrentSequence] = useState<'none' | 'codeoff' | 'pleasure'>('none');
  const [overlayWords, setOverlayWords] = useState<string[]>([]);
  const [currentMusicTrack, setCurrentMusicTrack] = useState('');

  // Music tracks for pleasure sequences
  const musicTracks = [
    'Binaural Beats - Deep Relaxation',
    'Nature Sounds - Ocean Waves',  
    'Classical - Bach Brandenburg Concerto',
    'Ambient - Brian Eno Music for Airports',
    'Meditation - Tibetan Singing Bowls',
    'ENDEL - Focus Enhancement',
    'Theta Waves - 6Hz Meditation',
    'Alpha Waves - 10Hz Creativity'
  ];

  const [customAnchor, setCustomAnchor] = useState({ name: '', description: '' });
  const [customTrigger, setCustomTrigger] = useState({ name: '', description: '' });
  const audioRef = useRef<HTMLAudioElement>(null);

  const activateAnchor = (anchorId: string) => {
    setAnchors(prev => prev.map(anchor => 
      anchor.id === anchorId 
        ? { ...anchor, isActive: !anchor.isActive }
        : anchor
    ));
    onAnchorSet?.(anchorId);
  };

  const armTrigger = (triggerId: string) => {
    setTriggers(prev => prev.map(trigger => 
      trigger.id === triggerId 
        ? { ...trigger, isArmed: !trigger.isArmed }
        : trigger
    ));
    
    if (triggers.find(t => t.id === triggerId)?.isArmed === false) {
      onTriggerActivated?.(triggerId);
    }
  };

  const initiateTiedown = () => {
    setTiedownState({
      active: true,
      protocol: 'debriefing',
      timeCheck: new Date().toISOString(),
      sanityCheck: 'processing'
    });

    // Simulate tiedown process
    setTimeout(() => {
      setTiedownState(prev => ({
        ...prev,
        protocol: 'normalizing',
        sanityCheck: 'grounding'
      }));
    }, 3000);

    setTimeout(() => {
      setTiedownState(prev => ({
        ...prev,
        protocol: 'complete',
        sanityCheck: 'normal',
        active: false
      }));
    }, 6000);
  };

  const addCustomAnchor = () => {
    if (customAnchor.name && customAnchor.description) {
      const newAnchor: Anchor = {
        id: `custom-${Date.now()}`,
        type: 'visual',
        name: customAnchor.name,
        description: customAnchor.description,
        isActive: false
      };
      setAnchors(prev => [...prev, newAnchor]);
      setCustomAnchor({ name: '', description: '' });
    }
  };

  const addCustomTrigger = () => {
    if (customTrigger.name && customTrigger.description) {
      const newTrigger: Trigger = {
        id: `custom-${Date.now()}`,
        name: customTrigger.name,
        stimulusType: 'external',
        description: customTrigger.description,
        isArmed: false
      };
      setTriggers(prev => [...prev, newTrigger]);
      setCustomTrigger({ name: '', description: '' });
    }
  };

  // Anchor Words Functions
  const addAnchorWord = () => {
    if (newWord.trim()) {
      const newAnchorWord: AnchorWord = {
        id: Date.now().toString(),
        word: newWord.toUpperCase(),
        category: newCategory,
        frequency: newFrequency,
        duration: newDuration,
        isActive: false
      };
      setAnchorWords(prev => [...prev, newAnchorWord]);
      setNewWord('');
    }
  };

  const removeAnchorWord = (id: string) => {
    setAnchorWords(prev => prev.filter(word => word.id !== id));
  };

  const toggleAnchorWord = (id: string) => {
    setAnchorWords(prev => prev.map(word => 
      word.id === id ? { ...word, isActive: !word.isActive } : word
    ));
  };

  // Sequence Functions
  const startCodeOffSequence = () => {
    const sequence: SequenceStep[] = [
      { id: '1', type: 'word', content: 'EXIT PROTOCOL INITIATED', duration: 2, frequency: 12 },
      { id: '2', type: 'visual', content: 'Sacred geometry deceleration', duration: 3, frequency: 8 },
      { id: '3', type: 'word', content: 'COGNITIVE DISSONANCE PREVENTION', duration: 2, frequency: 10 },
      { id: '4', type: 'pause', content: 'Reality grounding pause', duration: 1 },
      { id: '5', type: 'word', content: 'TIEDOWN COMPLETE', duration: 2, frequency: 12 }
    ];
    
    setCodeOffSequence(sequence);
    setCurrentSequence('codeoff');
    setIsSequenceRunning(true);
    runSequence(sequence);
  };

  const startPleasureSequence = () => {
    const sequence: SequenceStep[] = [
      { id: '1', type: 'word', content: 'PLEASURE PROTOCOL ACTIVE', duration: 2, frequency: 10 },
      { id: '2', type: 'visual', content: 'Sacred geometry enhancement', duration: 4, frequency: 6 },
      { id: '3', type: 'music', content: currentMusicTrack || musicTracks[0], duration: 8 },
      { id: '4', type: 'word', content: 'FLOW STATE OPTIMIZED', duration: 3, frequency: 8 }
    ];
    
    setPleasureSequence(sequence);
    setCurrentSequence('pleasure');
    setIsSequenceRunning(true);
    runSequence(sequence);
  };

  const runSequence = async (sequence: SequenceStep[]) => {
    for (const step of sequence) {
      if (step.type === 'word') {
        setOverlayWords([step.content]);
        if (step.frequency) {
          // Simulate frequency change for visual matrix
          setTimeout(() => setOverlayWords([]), step.duration * 1000);
        }
      } else if (step.type === 'music') {
        setCurrentMusicTrack(step.content);
      } else if (step.type === 'visual') {
        // Visual effects would be handled by the sacred geometry wheel
      }
      
      await new Promise(resolve => setTimeout(resolve, step.duration * 1000));
    }
    
    setIsSequenceRunning(false);
    setCurrentSequence('none');
    setOverlayWords([]);
  };

  const stopSequence = () => {
    setIsSequenceRunning(false);
    setCurrentSequence('none');
    setOverlayWords([]);
    setCurrentMusicTrack('');
  };

  return (
    <div className="space-y-6 p-6 bg-terminal-bg text-terminal-red-primary">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-terminal-red-bright mb-2">
          Trigger-Anchor-Knot System
        </h2>
        <p className="text-terminal-red-secondary">
          Jason Bourne-like trigger system for latent schema activation
        </p>
      </div>

      {/* Sacred Geometry State Indicator */}
      <div className="flex justify-center mb-6">
        <div className="bg-card-bg/20 border border-terminal-red-muted/30 rounded-lg p-4">
          <div className="text-center mb-2">
            <span className="text-sm text-terminal-red-secondary">
              System State: {tiedownState.active ? 'TIEDOWN ACTIVE' : 'STANDBY'}
            </span>
          </div>
          <SacredGeometryWheel 
            size={120}
            speed={tiedownState.active ? 0.5 : 2}
            brainwaveFrequency={tiedownState.active ? 4 : 6}
            intensity={0.6}
            overlayWords={overlayWords}
            showMusicIndicator={!!currentMusicTrack}
            currentTrack={currentMusicTrack}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Anchor System */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright">Anchor System</CardTitle>
            <p className="text-sm text-terminal-red-secondary">
              Visual, audio, and tactile anchors for schema recall
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {anchors.map(anchor => (
              <div 
                key={anchor.id}
                className={`p-4 rounded border transition-colors ${
                  anchor.isActive 
                    ? 'bg-terminal-red-dark/20 border-terminal-red-primary' 
                    : 'bg-black/20 border-terminal-red-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      anchor.isActive ? 'bg-terminal-red-bright animate-pulse' : 'bg-terminal-red-muted'
                    }`} />
                    <h4 className="font-semibold text-terminal-red-secondary">
                      {anchor.name}
                    </h4>
                    <span className="text-xs bg-terminal-red-dark px-2 py-1 rounded">
                      {anchor.type}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={anchor.isActive ? "default" : "outline"}
                    onClick={() => activateAnchor(anchor.id)}
                    className={
                      anchor.isActive 
                        ? "bg-terminal-red-primary text-black"
                        : "border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark"
                    }
                  >
                    {anchor.isActive ? 'Active' : 'Set'}
                  </Button>
                </div>
                <p className="text-sm text-terminal-red-muted">{anchor.description}</p>
              </div>
            ))}
            
            {/* Add Custom Anchor */}
            <div className="p-4 border border-terminal-red-muted/30 rounded bg-black/10">
              <h4 className="font-semibold text-terminal-red-secondary mb-3">Add Custom Anchor</h4>
              <div className="space-y-2">
                <Input
                  placeholder="Anchor name"
                  value={customAnchor.name}
                  onChange={(e) => setCustomAnchor(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                />
                <Textarea
                  placeholder="Anchor description"
                  value={customAnchor.description}
                  onChange={(e) => setCustomAnchor(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                  rows={2}
                />
                <Button 
                  size="sm" 
                  onClick={addCustomAnchor}
                  className="bg-terminal-red-dark hover:bg-terminal-red-primary text-terminal-red-bright"
                >
                  Add Anchor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trigger System */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright">Trigger System</CardTitle>
            <p className="text-sm text-terminal-red-secondary">
              External and internal triggers for schema activation
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {triggers.map(trigger => (
              <div 
                key={trigger.id}
                className={`p-4 rounded border transition-colors ${
                  trigger.isArmed 
                    ? 'bg-terminal-red-dark/20 border-terminal-red-primary' 
                    : 'bg-black/20 border-terminal-red-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      trigger.isArmed ? 'bg-terminal-red-bright animate-pulse' : 'bg-terminal-red-muted'
                    }`} />
                    <h4 className="font-semibold text-terminal-red-secondary">
                      {trigger.name}
                    </h4>
                    <span className="text-xs bg-terminal-red-dark px-2 py-1 rounded">
                      {trigger.stimulusType}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant={trigger.isArmed ? "default" : "outline"}
                    onClick={() => armTrigger(trigger.id)}
                    className={
                      trigger.isArmed 
                        ? "bg-terminal-red-primary text-black"
                        : "border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark"
                    }
                  >
                    {trigger.isArmed ? 'Armed' : 'Arm'}
                  </Button>
                </div>
                <p className="text-sm text-terminal-red-muted">{trigger.description}</p>
              </div>
            ))}
            
            {/* Add Custom Trigger */}
            <div className="p-4 border border-terminal-red-muted/30 rounded bg-black/10">
              <h4 className="font-semibold text-terminal-red-secondary mb-3">Add Custom Trigger</h4>
              <div className="space-y-2">
                <Input
                  placeholder="Trigger name"
                  value={customTrigger.name}
                  onChange={(e) => setCustomTrigger(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                />
                <Textarea
                  placeholder="Trigger description"
                  value={customTrigger.description}
                  onChange={(e) => setCustomTrigger(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                  rows={2}
                />
                <Button 
                  size="sm" 
                  onClick={addCustomTrigger}
                  className="bg-terminal-red-dark hover:bg-terminal-red-primary text-terminal-red-bright"
                >
                  Add Trigger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tiedown Protocol */}
      <Card className="bg-card-bg border-terminal-red-primary">
        <CardHeader>
          <CardTitle className="text-terminal-red-bright">Tiedown Protocol</CardTitle>
          <p className="text-sm text-terminal-red-secondary">
            Prevent cognitive dissonance - normalize subject back to reality
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-mono text-terminal-red-bright">
                {tiedownState.active ? 'ACTIVE' : 'STANDBY'}
              </div>
              <div className="text-sm text-terminal-red-secondary">Status</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono text-terminal-red-bright">
                {tiedownState.protocol.toUpperCase()}
              </div>
              <div className="text-sm text-terminal-red-secondary">Protocol</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono text-terminal-red-bright">
                {new Date(tiedownState.timeCheck).toLocaleTimeString()}
              </div>
              <div className="text-sm text-terminal-red-secondary">Time Check</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-mono text-terminal-red-bright">
                {tiedownState.sanityCheck.toUpperCase()}
              </div>
              <div className="text-sm text-terminal-red-secondary">Sanity Check</div>
            </div>
          </div>
          
          <Button 
            onClick={initiateTiedown}
            disabled={tiedownState.active}
            className="w-full bg-terminal-red-primary hover:bg-terminal-red-bright text-black disabled:opacity-50"
          >
            {tiedownState.active ? 'Tiedown in Progress...' : 'Initiate Tiedown Protocol'}
          </Button>
          
          {tiedownState.active && (
            <div className="mt-4 p-4 bg-terminal-red-dark/20 border border-terminal-red-primary rounded">
              <p className="text-sm text-terminal-red-secondary text-center">
                ⚠ Debriefing and normalizing subject back to reality ⚠<br />
                Operation completion - grounding in present time and day
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Anchor Words System */}
      <Card className="bg-card-bg border-terminal-red-muted/30">
        <CardHeader>
          <CardTitle className="text-terminal-red-bright flex items-center gap-2">
            <Target className="h-5 w-5" />
            Anchor Words Matrix
          </CardTitle>
          <p className="text-sm text-terminal-red-secondary">
            Custom input fields for anchor word programming over visual matrix
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Anchor Word Form */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-terminal-red-muted/30 rounded bg-black/10">
            <div>
              <Label className="text-terminal-red-secondary text-sm">Word</Label>
              <Input
                placeholder="TRIGGER"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                data-testid="input-anchor-word"
              />
            </div>
            <div>
              <Label className="text-terminal-red-secondary text-sm">Category</Label>
              <Select value={newCategory} onValueChange={(value: 'trigger' | 'anchor' | 'codeoff' | 'pleasure') => setNewCategory(value)}>
                <SelectTrigger className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black border-terminal-red-muted/30">
                  <SelectItem value="trigger">Trigger</SelectItem>
                  <SelectItem value="anchor">Anchor</SelectItem>
                  <SelectItem value="codeoff">Code-Off</SelectItem>
                  <SelectItem value="pleasure">Pleasure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-terminal-red-secondary text-sm">Frequency (Hz)</Label>
              <Input
                type="number"
                min="4"
                max="40"
                value={newFrequency}
                onChange={(e) => setNewFrequency(Number(e.target.value))}
                className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                data-testid="input-frequency"
              />
            </div>
            <div>
              <Label className="text-terminal-red-secondary text-sm">Duration (sec)</Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary"
                data-testid="input-duration"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addAnchorWord}
                className="bg-terminal-red-dark hover:bg-terminal-red-primary text-terminal-red-bright"
                data-testid="button-add-anchor"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Anchor Words Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anchorWords.map(word => (
              <div 
                key={word.id}
                className={`p-4 rounded border transition-all ${
                  word.isActive 
                    ? 'bg-terminal-red-dark/30 border-terminal-red-primary shadow-lg' 
                    : 'bg-black/20 border-terminal-red-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      word.isActive ? 'bg-terminal-red-bright animate-pulse' : 'bg-terminal-red-muted'
                    }`} />
                    <span className="font-bold text-lg text-terminal-red-bright">
                      {word.word}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        word.category === 'trigger' ? 'border-yellow-600 text-yellow-400' :
                        word.category === 'anchor' ? 'border-blue-600 text-blue-400' :
                        word.category === 'codeoff' ? 'border-red-600 text-red-400' :
                        'border-green-600 text-green-400'
                      }`}
                    >
                      {word.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={word.isActive ? "default" : "outline"}
                      onClick={() => toggleAnchorWord(word.id)}
                      className={
                        word.isActive 
                          ? "bg-terminal-red-primary text-black"
                          : "border-terminal-red-muted text-terminal-red-secondary hover:bg-terminal-red-dark"
                      }
                      data-testid={`button-toggle-${word.id}`}
                    >
                      {word.isActive ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeAnchorWord(word.id)}
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                      data-testid={`button-remove-${word.id}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-terminal-red-muted">
                  {word.frequency}Hz • {word.duration}sec duration
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code-Off and Pleasure Sequences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code-Off Sequence */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright flex items-center gap-2">
              <Power className="h-5 w-5" />
              Code-Off Sequence
            </CardTitle>
            <p className="text-sm text-terminal-red-secondary">
              Exit protocol with tiedown mechanisms
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentSequence === 'codeoff' && (
              <div className="p-3 bg-terminal-red-dark/20 border border-terminal-red-primary rounded">
                <div className="text-sm text-terminal-red-bright text-center">
                  CODE-OFF SEQUENCE RUNNING
                </div>
                <div className="text-xs text-terminal-red-muted text-center mt-1">
                  Reality grounding in progress...
                </div>
              </div>
            )}
            
            <Button
              onClick={startCodeOffSequence}
              disabled={isSequenceRunning}
              className="w-full bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
              data-testid="button-codeoff"
            >
              {currentSequence === 'codeoff' ? 'Code-Off Running...' : 'Start Code-Off Sequence'}
            </Button>
            
            <div className="text-xs text-terminal-red-muted space-y-1">
              <div>• Exit protocol initiation</div>
              <div>• Sacred geometry deceleration</div>
              <div>• Cognitive dissonance prevention</div>
              <div>• Reality grounding pause</div>
              <div>• Tiedown completion</div>
            </div>
          </CardContent>
        </Card>

        {/* Pleasure Sequence */}
        <Card className="bg-card-bg border-terminal-red-muted/30">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Pleasure Sequence
            </CardTitle>
            <p className="text-sm text-terminal-red-secondary">
              Enhanced flow state with music integration
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Music Selection */}
            <div>
              <Label className="text-terminal-red-secondary text-sm">Music Track</Label>
              <Select value={currentMusicTrack} onValueChange={setCurrentMusicTrack}>
                <SelectTrigger className="bg-transparent border-terminal-red-muted/30 text-terminal-red-primary">
                  <SelectValue placeholder="Select music track" />
                </SelectTrigger>
                <SelectContent className="bg-black border-terminal-red-muted/30">
                  {musicTracks.map(track => (
                    <SelectItem key={track} value={track}>
                      {track}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {currentSequence === 'pleasure' && (
              <div className="p-3 bg-green-900/20 border border-green-600 rounded">
                <div className="text-sm text-green-400 text-center">
                  PLEASURE SEQUENCE ACTIVE
                </div>
                <div className="text-xs text-green-300 text-center mt-1">
                  Flow state optimization in progress...
                </div>
              </div>
            )}
            
            <Button
              onClick={startPleasureSequence}
              disabled={isSequenceRunning || !currentMusicTrack}
              className="w-full bg-green-600 hover:bg-green-500 text-white disabled:opacity-50"
              data-testid="button-pleasure"
            >
              {currentSequence === 'pleasure' ? 'Pleasure Running...' : 'Start Pleasure Sequence'}
            </Button>
            
            <div className="text-xs text-terminal-red-muted space-y-1">
              <div>• Pleasure protocol activation</div>
              <div>• Sacred geometry enhancement</div>
              <div>• Music synchronization</div>
              <div>• Flow state optimization</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sequence Controls */}
      {isSequenceRunning && (
        <Card className="bg-yellow-950/30 border-yellow-600/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-yellow-200 font-semibold">
                  {currentSequence === 'codeoff' ? 'CODE-OFF' : 'PLEASURE'} SEQUENCE ACTIVE
                </span>
              </div>
              <Button
                onClick={stopSequence}
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
                data-testid="button-stop-sequence"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Sequence
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}