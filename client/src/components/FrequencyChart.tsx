import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

// Comprehensive frequency chart based on scientific evidence
const FREQUENCY_DATA = [
  {
    band: 'Delta',
    range: '0.5-4 Hz',
    color: 'purple',
    mentalState: 'Deep, dreamless sleep or unconscious states',
    studying: 'Not present in effective study - delta while awake implies micro-sleeps',
    memory: 'Essential for memory consolidation during deep sleep',
    lucidDream: 'Not involved in REM or lucid dreams',
    mood: 'Associated with feeling rejuvenated upon waking',
    focus: 'No conscious awareness in this state',
    evidence: 'Strong - well-documented in sleep research',
    applications: ['Deep sleep', 'Tissue healing', 'Immune function', 'Memory consolidation'],
    notes: 'Dominant in slow-wave (NREM stage 3) sleep. Critical for physical restoration.'
  },
  {
    band: 'Theta',
    range: '4-8 Hz',
    color: 'blue',
    mentalState: 'Drowsy, dreamy, or meditative state',
    studying: 'Not ideal during active study - can lead to mind-wandering or drowsiness',
    memory: 'Crucial for memory processing, especially consolidation',
    lucidDream: 'Core of REM dreams - theta dominance during REM sleep',
    mood: 'Associated with internal focus, intuition, and creative insight',
    focus: 'Internal focus, "autopilot mode", reduced external awareness',
    evidence: 'Strong - hippocampal theta rhythms well-documented',
    applications: ['Meditation', 'Creative insight', 'Memory processing', 'REM sleep'],
    notes: 'Arises during light sleep onset, deep relaxation, daydreaming. Brief theta bursts may aid creative learning.'
  },
  {
    band: 'Alpha',
    range: '8-12 Hz',
    color: 'red',
    mentalState: 'Relaxed but alert wakefulness ("calm focus")',
    studying: 'Beneficial for learning if maintaining relaxed concentration',
    memory: 'Promotes memory retention through alert-yet-relaxed encoding',
    lucidDream: 'May play role in transitions, but not primary lucid dreaming band',
    mood: 'Associated with calm, pleasant mood and low stress',
    focus: 'Calm focus, creative thought, reduced anxiety',
    evidence: 'Strong - extensively studied in neurofeedback',
    applications: ['Relaxed focus', 'Stress reduction', 'Creative thinking', 'Learning optimization'],
    notes: 'Seen in waking rest, meditation, creative thought. Alpha around 8-10 Hz linked to enhanced learning capacity.'
  },
  {
    band: 'SMR',
    range: '12-15 Hz',
    color: 'orange',
    mentalState: 'Relaxed vigilance, stable attention',
    studying: 'Optimal for sustained focus and flow states',
    memory: 'Supports stable attention needed for effective encoding',
    lucidDream: 'May contribute to lucidity when combined with REM',
    mood: 'Promotes emotional stability and calm alertness',
    focus: 'Peak focus band - relaxed yet vigilant attention',
    evidence: 'Strong - SMR neurofeedback extensively validated',
    applications: ['Flow states', 'Stable attention', 'Emotional regulation', 'Peak performance'],
    notes: 'Sensorimotor Rhythm - straddles alpha/beta for optimal cognitive performance.'
  },
  {
    band: 'Beta',
    range: '13-30 Hz',
    color: 'cyan',
    mentalState: 'Normal active wakefulness - alert, engaged thinking',
    studying: 'Essential for study - reflects active focus and cognitive processing',
    memory: 'Facilitates active memory encoding and working memory',
    lucidDream: 'Contributes to lucidity when combined with REM theta/gamma',
    mood: 'Normal alertness, but excessive beta can indicate stress/anxiety',
    focus: 'Active concentration, problem-solving, outward focus',
    evidence: 'Strong - fundamental to cognitive neuroscience',
    applications: ['Active learning', 'Problem-solving', 'Working memory', 'Alert cognition'],
    notes: 'Mid-beta (14-20 Hz) optimal for sustained concentration. Avoid >25 Hz to prevent anxiety.'
  },
  {
    band: 'Gamma',
    range: '30-100+ Hz',
    color: 'green',
    mentalState: 'Peak cognitive performance, heightened perception',
    studying: 'May enhance insight and "aha" moments during learning',
    memory: 'Associated with memory binding and conscious recollection',
    lucidDream: 'Critical for lucid dreaming - 25-40 Hz linked to self-awareness',
    mood: 'Associated with positive mood states and peak experiences',
    focus: 'Heightened awareness, conscious binding, peak performance',
    evidence: 'Moderate - emerging research on consciousness and binding',
    applications: ['Peak awareness', 'Insight moments', 'Conscious binding', 'Self-awareness'],
    notes: 'Highest measurable brainwave frequency. Associated with moments of insight and heightened consciousness.'
  }
];

const EVIDENCE_LEVELS = {
  'Strong': { color: 'text-green-400', icon: CheckCircle, bg: 'bg-green-600/10 border-green-500/30' },
  'Moderate': { color: 'text-yellow-400', icon: HelpCircle, bg: 'bg-yellow-600/10 border-yellow-500/30' },
  'Weak': { color: 'text-red-400', icon: AlertTriangle, bg: 'bg-red-600/10 border-red-500/30' }
};

const BAND_COLORS = {
  purple: 'border-purple-500/50 text-purple-400',
  blue: 'border-blue-500/50 text-blue-400',
  red: 'border-red-500/50 text-red-400',
  orange: 'border-orange-500/50 text-orange-400',
  cyan: 'border-cyan-500/50 text-cyan-400',
  green: 'border-green-500/50 text-green-400'
};

export function FrequencyChart() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
          <Brain className="w-8 h-8 text-red-400" />
          <span>Brainwave Frequency Chart</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Comprehensive guide to brainwave bands, their effects, and evidence-based applications for cognitive enhancement.
        </p>
      </div>

      {/* Frequency Bands Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {FREQUENCY_DATA.map((band, index) => {
          const evidenceLevel = band.evidence.split(' - ')[0];
          const EvidenceIcon = EVIDENCE_LEVELS[evidenceLevel as keyof typeof EVIDENCE_LEVELS]?.icon || HelpCircle;
          
          return (
            <Card key={index} className="bg-black/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={`${BAND_COLORS[band.color as keyof typeof BAND_COLORS]} bg-transparent font-mono`}>
                      {band.band}
                    </Badge>
                    <span className="text-white font-mono text-lg">{band.range}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${EVIDENCE_LEVELS[evidenceLevel as keyof typeof EVIDENCE_LEVELS]?.color}`}>
                    <EvidenceIcon className="w-4 h-4" />
                    <span className="text-xs">{evidenceLevel}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-300">{band.mentalState}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Applications */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Primary Applications:</h4>
                  <div className="flex flex-wrap gap-1">
                    {band.applications.map((app, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-gray-800/50 text-gray-400">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cognitive Effects Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-semibold text-cyan-400">Study/Learning:</div>
                    <div className="text-gray-300">{band.studying}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-blue-400">Memory:</div>
                    <div className="text-gray-300">{band.memory}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-purple-400">Focus:</div>
                    <div className="text-gray-300">{band.focus}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-green-400">Mood:</div>
                    <div className="text-gray-300">{band.mood}</div>
                  </div>
                </div>

                {/* Notes */}
                <div className="text-xs text-gray-400 bg-gray-900/50 rounded p-2">
                  <strong>Notes:</strong> {band.notes}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Scientific Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-600/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-200">
            <strong>Evidence-Based Approach:</strong> This chart reflects current scientific understanding. 
            Binaural/isochronic beats show mixed evidence and should be used as cognitive support, not "drug-like" control. 
            Individual responses vary significantly. Use as part of a comprehensive approach to cognitive enhancement.
          </div>
        </div>
      </div>
    </div>
  );
}