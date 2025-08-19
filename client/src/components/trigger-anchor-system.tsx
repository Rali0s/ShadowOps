import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SacredGeometryWheel } from "./sacred-geometry-wheel";

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
    </div>
  );
}