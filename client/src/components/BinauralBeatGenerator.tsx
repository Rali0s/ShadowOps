import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Download, Volume2, Brain, Timer, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Binaural beat presets from the provided data
const BINAURAL_PRESETS = [
  {
    id: 'calm-focus',
    goal: 'Calm Focus / Flow',
    targetFreq: '12–15 Hz',
    leftEarHz: 220,
    rightEarHz: 232,
    beatFreq: 12,
    durationMin: 30,
    ramp: '5-min 10→12 Hz, hold',
    description: 'SMR band for stable focus and flow states'
  },
  {
    id: 'deep-focus',
    goal: 'Deep Focus / Study',
    targetFreq: '14–18 Hz',
    leftEarHz: 220,
    rightEarHz: 236,
    beatFreq: 16,
    durationMin: 40,
    ramp: '3-min ramp to 14 Hz, hold',
    description: 'Low-beta for sustained concentration'
  },
  {
    id: 'memory-boost',
    goal: 'Memory Encoding Boost',
    targetFreq: '6 ↔ 10 Hz',
    leftEarHz: 200,
    rightEarHz: 210,
    beatFreq: 10,
    durationMin: 20,
    ramp: 'Cycle 10 min 10 Hz, 10 min 6 Hz',
    description: 'Theta-Alpha cross for enhanced encoding'
  },
  {
    id: 'pre-sleep',
    goal: 'Pre-sleep Downshift',
    targetFreq: '10 → 6 Hz',
    leftEarHz: 210,
    rightEarHz: 220,
    beatFreq: 10,
    durationMin: 30,
    ramp: '10 min 10 Hz → 20 min 6 Hz',
    description: 'Alpha to Theta transition for sleep prep'
  },
  {
    id: 'deep-sleep',
    goal: 'Deep Sleep Induction',
    targetFreq: '1–3 Hz',
    leftEarHz: 200,
    rightEarHz: 202,
    beatFreq: 2,
    durationMin: 40,
    ramp: '5 min 6→3 Hz, hold',
    description: 'Delta induction with carrier tones'
  },
  {
    id: 'lucid-dream',
    goal: 'Lucid Dream (adjunct)',
    targetFreq: '6 Hz (theta sim)',
    leftEarHz: 200,
    rightEarHz: 206,
    beatFreq: 6,
    durationMin: 20,
    ramp: 'Hold during REM nap session',
    description: 'Theta simulation for lucid dreaming'
  },
  {
    id: 'mood-lift',
    goal: 'Mood Lift / Positivity',
    targetFreq: '6 or 10 Hz',
    leftEarHz: 200,
    rightEarHz: 210,
    beatFreq: 10,
    durationMin: 30,
    ramp: 'Gentle fade in/out',
    description: 'Alpha/Theta for mood enhancement'
  },
  {
    id: 'anxiety-relief',
    goal: 'Anxiety De-arousal',
    targetFreq: '8–10 / 12–15 Hz',
    leftEarHz: 210,
    rightEarHz: 220,
    beatFreq: 10,
    durationMin: 20,
    ramp: '15–25 min hold',
    description: 'Alpha/SMR for anxiety reduction'
  }
];

interface BinauralBeatGeneratorProps {
  className?: string;
  onFrequencyChange?: (leftFreq: number, rightFreq: number, beatFreq: number) => void;
}

export function BinauralBeatGenerator({ className = '', onFrequencyChange }: BinauralBeatGeneratorProps) {
  const [leftFreq, setLeftFreq] = useState(200);
  const [rightFreq, setRightFreq] = useState(210);
  const [volume, setVolume] = useState([30]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [sessionTime, setSessionTime] = useState(0);
  const [duration, setDuration] = useState(20);
  
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const beatFrequency = Math.abs(rightFreq - leftFreq);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const startBinauralBeat = useCallback(() => {
    try {
      const audioContext = initAudioContext();
      
      // Create stereo setup with separate oscillators for each ear
      const leftOscillator = audioContext.createOscillator();
      const rightOscillator = audioContext.createOscillator();
      const leftGain = audioContext.createGain();
      const rightGain = audioContext.createGain();
      const merger = audioContext.createChannelMerger(2);
      
      // Configure oscillators
      leftOscillator.type = 'sine';
      rightOscillator.type = 'sine';
      leftOscillator.frequency.setValueAtTime(leftFreq, audioContext.currentTime);
      rightOscillator.frequency.setValueAtTime(rightFreq, audioContext.currentTime);
      
      // Configure gains
      const gainValue = volume[0] / 100;
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
      
      // Start session timer
      setSessionTime(0);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start binaural beat:', error);
    }
  }, [leftFreq, rightFreq, volume, initAudioContext]);

  const stopBinauralBeat = useCallback(() => {
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
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      stopBinauralBeat();
    } else {
      startBinauralBeat();
    }
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = BINAURAL_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setLeftFreq(preset.leftEarHz);
      setRightFreq(preset.rightEarHz);
      setDuration(preset.durationMin);
      setSelectedPreset(presetId);
      
      // Notify parent component
      onFrequencyChange?.(preset.leftEarHz, preset.rightEarHz, preset.beatFreq);
    }
  };

  const handleFrequencyChange = (type: 'left' | 'right', value: number) => {
    const clampedValue = Math.max(20, Math.min(2000, value));
    
    if (type === 'left') {
      setLeftFreq(clampedValue);
      onFrequencyChange?.(clampedValue, rightFreq, Math.abs(rightFreq - clampedValue));
    } else {
      setRightFreq(clampedValue);
      onFrequencyChange?.(leftFreq, clampedValue, Math.abs(clampedValue - leftFreq));
    }
    
    // Update frequencies if playing
    if (isPlaying && audioContextRef.current) {
      if (type === 'left' && leftOscillatorRef.current) {
        leftOscillatorRef.current.frequency.setValueAtTime(
          clampedValue, 
          audioContextRef.current.currentTime
        );
      } else if (type === 'right' && rightOscillatorRef.current) {
        rightOscillatorRef.current.frequency.setValueAtTime(
          clampedValue, 
          audioContextRef.current.currentTime
        );
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    
    // Update volume if playing
    if (isPlaying && audioContextRef.current) {
      const gainValue = newVolume[0] / 100;
      if (leftGainRef.current) {
        leftGainRef.current.gain.setValueAtTime(gainValue, audioContextRef.current.currentTime);
      }
      if (rightGainRef.current) {
        rightGainRef.current.gain.setValueAtTime(gainValue, audioContextRef.current.currentTime);
      }
    }
  };

  const getBeatCategory = (beatFreq: number) => {
    if (beatFreq <= 4) return { name: 'Delta', color: 'text-purple-400', desc: 'Deep Sleep' };
    if (beatFreq <= 8) return { name: 'Theta', color: 'text-blue-400', desc: 'Meditation' };
    if (beatFreq <= 12) return { name: 'Alpha', color: 'text-red-400', desc: 'Relaxation' };
    if (beatFreq <= 30) return { name: 'Beta', color: 'text-cyan-400', desc: 'Focus' };
    return { name: 'Gamma', color: 'text-green-400', desc: 'Awareness' };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const category = getBeatCategory(beatFrequency);
  const selectedPresetData = BINAURAL_PRESETS.find(p => p.id === selectedPreset);

  return (
    <Card className={`bg-black/50 border-cyan-700/30 ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white font-mono flex items-center justify-center space-x-2">
          <Zap className="w-6 h-6 text-cyan-400" />
          <span>Binaural Beat Generator</span>
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Dual-tone cognitive enhancement with scientific presets
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preset Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Preset Programs</label>
          <Select value={selectedPreset} onValueChange={handlePresetSelect}>
            <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
              <SelectValue placeholder="Choose a preset..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-600">
              {BINAURAL_PRESETS.map((preset) => (
                <SelectItem key={preset.id} value={preset.id} className="text-white hover:bg-gray-800">
                  <div className="flex flex-col">
                    <span className="font-semibold">{preset.goal}</span>
                    <span className="text-xs text-gray-400">{preset.targetFreq} • {preset.durationMin}min</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedPresetData && (
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-300 mb-2">{selectedPresetData.description}</div>
              <div className="text-xs text-gray-400">Ramp: {selectedPresetData.ramp}</div>
            </div>
          )}
        </div>

        {/* Beat Frequency Display */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <Badge className={`${category.color} bg-transparent border-current`}>
              {category.name} Band
            </Badge>
            <div className="text-2xl font-bold text-white font-mono">
              {beatFrequency.toFixed(1)} Hz
            </div>
          </div>
          <div className="text-sm text-gray-400">{category.desc} • Beat Frequency</div>
        </div>

        {/* Frequency Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-red-400">Left Ear (Hz)</label>
            <Input
              type="number"
              value={leftFreq}
              onChange={(e) => handleFrequencyChange('left', parseFloat(e.target.value) || 0)}
              min="20"
              max="2000"
              step="1"
              className="bg-gray-900 border-gray-600 text-white font-mono text-center"
              data-testid="input-left-freq"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-cyan-400">Right Ear (Hz)</label>
            <Input
              type="number"
              value={rightFreq}
              onChange={(e) => handleFrequencyChange('right', parseFloat(e.target.value) || 0)}
              min="20"
              max="2000"
              step="1"
              className="bg-gray-900 border-gray-600 text-white font-mono text-center"
              data-testid="input-right-freq"
            />
          </div>
        </div>

        {/* Session Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Volume</label>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <Slider
                value={volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
                data-testid="slider-volume"
              />
              <span className="text-sm text-gray-400 font-mono w-8">{volume[0]}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Duration (min)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 20)}
              min="1"
              max="120"
              className="bg-gray-900 border-gray-600 text-white font-mono text-center"
            />
          </div>
        </div>

        {/* Session Timer */}
        {isPlaying && (
          <div className="text-center bg-green-600/10 border border-green-600/30 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Timer className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-mono text-lg">{formatTime(sessionTime)}</span>
            </div>
            <div className="text-xs text-gray-400">
              Target: {duration} minutes • Stereo headphones recommended
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button
            onClick={togglePlayback}
            size="lg"
            className={`
              ${isPlaying 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }
              font-semibold px-8
            `}
            data-testid="button-binaural-playback"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Stop Session
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Session
              </>
            )}
          </Button>
        </div>

        {/* Usage Tips */}
        <div className="text-xs text-gray-500 text-center bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <Brain className="w-4 h-4 inline mr-1" />
          <strong>Best Results:</strong> Use stereo headphones • Start with low volume • Find comfortable listening level
        </div>
      </CardContent>
    </Card>
  );
}