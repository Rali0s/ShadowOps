import { FrequencyGenerator } from '@/components/FrequencyGenerator';
import { Link } from 'wouter';
import { ArrowLeft, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FrequencyGeneratorPage() {
  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Terminal
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Brain className="w-6 h-6 text-red-400" />
              <h1 className="text-2xl font-bold text-white font-mono">Neural Frequency Lab</h1>
            </div>
            <p className="text-gray-400 text-sm">Precision brainwave frequency synthesis</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Main Generator */}
        <div className="max-w-2xl mx-auto">
          <FrequencyGenerator />
        </div>

        {/* Quick Presets */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Brainwave Presets</h3>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <PresetButton freq={0.5} name="Delta" color="purple" desc="Deep Sleep" />
            <PresetButton freq={6} name="Theta" color="blue" desc="Meditation" />
            <PresetButton freq={10} name="Alpha" color="red" desc="Relaxation" />
            <PresetButton freq={20} name="Beta" color="cyan" desc="Focus" />
            <PresetButton freq={40} name="Gamma" color="green" desc="Awareness" />
          </div>
        </div>

        {/* Usage Guide */}
        <div className="max-w-3xl mx-auto mt-12 bg-black/30 border border-gray-700 rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4">Usage Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h5 className="font-semibold text-red-400 mb-2">Frequency Ranges:</h5>
              <ul className="space-y-1">
                <li><span className="text-purple-400">Delta (0.5-4 Hz):</span> Deep sleep, healing</li>
                <li><span className="text-blue-400">Theta (4-8 Hz):</span> Deep meditation, creativity</li>
                <li><span className="text-red-400">Alpha (8-12 Hz):</span> Relaxed awareness, learning</li>
                <li><span className="text-cyan-400">Beta (12-30 Hz):</span> Active thinking, focus</li>
                <li><span className="text-green-400">Gamma (30+ Hz):</span> Peak awareness, insight</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-red-400 mb-2">Tips:</h5>
              <ul className="space-y-1">
                <li>• Start with low volume (10-20%)</li>
                <li>• Use headphones for best results</li>
                <li>• Sessions: 10-30 minutes recommended</li>
                <li>• Sine waves are most comfortable</li>
                <li>• Export tones for offline training</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PresetButtonProps {
  freq: number;
  name: string;
  color: string;
  desc: string;
}

function PresetButton({ freq, name, color, desc }: PresetButtonProps) {
  const colorClasses = {
    purple: 'border-purple-500/50 text-purple-400 hover:bg-purple-600/20',
    blue: 'border-blue-500/50 text-blue-400 hover:bg-blue-600/20',
    red: 'border-red-500/50 text-red-400 hover:bg-red-600/20',
    cyan: 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-600/20',
    green: 'border-green-500/50 text-green-400 hover:bg-green-600/20'
  };

  const handlePresetClick = () => {
    // This would ideally communicate with the FrequencyGenerator component
    // For now, we'll just scroll back to the generator
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Dispatch custom event that the generator can listen for
    window.dispatchEvent(new CustomEvent('setFrequencyPreset', { 
      detail: { frequency: freq } 
    }));
  };

  return (
    <Button
      variant="outline"
      onClick={handlePresetClick}
      className={`
        bg-black/50 ${colorClasses[color as keyof typeof colorClasses]} 
        h-20 flex flex-col items-center justify-center space-y-1
      `}
      data-testid={`preset-${name.toLowerCase()}`}
    >
      <div className="font-bold">{name}</div>
      <div className="text-xs opacity-75">{freq} Hz</div>
      <div className="text-xs opacity-60">{desc}</div>
    </Button>
  );
}