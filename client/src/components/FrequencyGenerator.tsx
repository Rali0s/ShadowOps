import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Download, Volume2 } from 'lucide-react';

type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

interface FrequencyGeneratorProps {
  className?: string;
}

export function FrequencyGenerator({ className = '' }: FrequencyGeneratorProps) {
  const [frequency, setFrequency] = useState(432);
  const [volume, setVolume] = useState([50]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<WaveformType>('sine');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const startTone = useCallback(() => {
    try {
      const audioContext = initAudioContext();
      
      // Create oscillator and gain nodes
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Configure oscillator
      oscillator.type = waveform;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      // Configure gain (volume)
      gainNode.gain.setValueAtTime(volume[0] / 100, audioContext.currentTime);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start oscillator
      oscillator.start();
      
      // Store references
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
      
      setIsPlaying(true);
    } catch (error) {
      console.error('Failed to start audio:', error);
    }
  }, [frequency, volume, waveform, initAudioContext]);

  const stopTone = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const togglePlayback = () => {
    if (isPlaying) {
      stopTone();
    } else {
      startTone();
    }
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFreq = parseFloat(e.target.value) || 0;
    setFrequency(Math.max(1, Math.min(20000, newFreq)));
    
    // Update frequency if playing
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        newFreq, 
        audioContextRef.current.currentTime
      );
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    
    // Update volume if playing
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        newVolume[0] / 100,
        audioContextRef.current.currentTime
      );
    }
  };

  const downloadTone = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const duration = 10; // 10 seconds
      const sampleRate = 44100;
      const length = sampleRate * duration;
      
      const buffer = audioContext.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);
      
      // Generate waveform data
      for (let i = 0; i < length; i++) {
        const t = i / sampleRate;
        const phase = 2 * Math.PI * frequency * t;
        
        switch (waveform) {
          case 'sine':
            data[i] = Math.sin(phase) * (volume[0] / 100);
            break;
          case 'square':
            data[i] = (Math.sin(phase) >= 0 ? 1 : -1) * (volume[0] / 100);
            break;
          case 'sawtooth':
            data[i] = (2 * (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.5))) * (volume[0] / 100);
            break;
          case 'triangle':
            data[i] = (2 * Math.abs(2 * (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.5))) - 1) * (volume[0] / 100);
            break;
        }
      }
      
      // Convert to WAV and download
      const wav = audioBufferToWav(buffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${frequency}Hz_${waveform}_tone.wav`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate download:', error);
    }
  };

  const getFrequencyCategory = (freq: number) => {
    if (freq >= 0.5 && freq <= 4) return { name: 'Delta', color: 'text-purple-400', desc: 'Deep Sleep' };
    if (freq > 4 && freq <= 8) return { name: 'Theta', color: 'text-blue-400', desc: 'Meditation' };
    if (freq > 8 && freq <= 12) return { name: 'Alpha', color: 'text-red-400', desc: 'Relaxation' };
    if (freq > 12 && freq <= 30) return { name: 'Beta', color: 'text-cyan-400', desc: 'Focus' };
    if (freq > 30) return { name: 'Gamma', color: 'text-green-400', desc: 'Awareness' };
    return { name: 'Custom', color: 'text-gray-400', desc: 'Audio Range' };
  };

  const category = getFrequencyCategory(frequency);

  // Listen for preset frequency changes
  useEffect(() => {
    const handlePresetChange = (event: CustomEvent) => {
      const { frequency: newFreq } = event.detail;
      setFrequency(newFreq);
    };

    window.addEventListener('setFrequencyPreset', handlePresetChange as EventListener);
    return () => {
      window.removeEventListener('setFrequencyPreset', handlePresetChange as EventListener);
    };
  }, []);

  return (
    <Card className={`bg-black/50 border-red-700/30 ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white font-mono">
          Neural Frequency Generator
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Precise brainwave frequency synthesis for cognitive enhancement
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Frequency Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Frequency (Hz)</label>
            <div className={`text-sm font-semibold ${category.color}`}>
              {category.name} - {category.desc}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              value={frequency}
              onChange={handleFrequencyChange}
              min="0.1"
              max="20000"
              step="0.1"
              className="bg-gray-900 border-gray-600 text-white font-mono text-lg text-center"
              data-testid="input-frequency"
            />
            <span className="text-gray-400 text-sm font-mono">Hz</span>
          </div>
        </div>

        {/* Waveform Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Waveform</label>
          <div className="grid grid-cols-4 gap-2">
            {(['sine', 'square', 'sawtooth', 'triangle'] as WaveformType[]).map((type) => (
              <Button
                key={type}
                variant={waveform === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setWaveform(type)}
                className={`
                  ${waveform === type 
                    ? 'bg-red-600 text-white border-red-500' 
                    : 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-800'
                  }
                  font-mono text-xs
                `}
                data-testid={`button-waveform-${type}`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">Volume</label>
            <span className="text-sm text-gray-400 font-mono">{volume[0]}%</span>
          </div>
          <div className="flex items-center space-x-3">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="flex-1"
              data-testid="slider-volume"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button
            onClick={togglePlayback}
            size="lg"
            className={`
              ${isPlaying 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
              }
              font-semibold px-8
            `}
            data-testid="button-playback"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Play
              </>
            )}
          </Button>
          
          <Button
            onClick={downloadTone}
            variant="outline"
            size="lg"
            className="bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-800"
            data-testid="button-download"
          >
            <Download className="w-5 h-5 mr-2" />
            Save WAV
          </Button>
        </div>

        {/* Safety Warning */}
        <div className="text-xs text-gray-500 text-center bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          ⚠️ Always start with low volume to protect your hearing and equipment
        </div>
      </CardContent>
    </Card>
  );
}

// WAV file conversion utility
function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const length = buffer.length;
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);
  
  // Convert audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return arrayBuffer;
}