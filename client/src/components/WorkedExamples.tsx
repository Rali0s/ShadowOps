import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Shield, Moon, Book } from 'lucide-react';

// Worked examples from the comprehensive framework
const WORKED_EXAMPLES = [
  {
    id: 'academic-memorization',
    title: 'Academic Memorization Schema',
    icon: Book,
    category: 'Academic',
    object: '50 contract law clauses',
    trigger: 'Pen tapping',
    frequencies: '14 Hz beta (study), 6 Hz theta (reinforcement)',
    affirmation: 'When I tap my pen, my memory releases the clauses',
    protocol: [
      'Enter 14-18 Hz beta state for active learning',
      'Study contract law clauses with focused attention',
      'Transition to 6 Hz theta for deep encoding',
      'Pair pen tapping with clause visualization',
      'Reinforce anchor through repetition',
      'Test triggered recall in normal consciousness'
    ]
  },
  {
    id: 'martial-defense',
    title: 'Martial Defense Schema',
    icon: Shield,
    category: 'Physical',
    object: 'Automatic defense stance',
    trigger: 'Sound of breaking glass',
    frequencies: '6 Hz theta with auditory cue',
    affirmation: 'At the sound, my body moves with clarity and power',
    protocol: [
      'Enter theta state (6 Hz) using audio entrainment',
      'Visualize defensive movements and stance',
      'Practice physical movements while in theta',
      'Pair breaking glass sound with defensive response',
      'Encode automatic body positioning',
      'Test schema activation with controlled audio cues'
    ]
  },
  {
    id: 'stress-release',
    title: 'Nightly Stress Release Schema', 
    icon: Moon,
    category: 'Wellness',
    object: 'Nightly stress release',
    trigger: 'Flashlight click',
    frequencies: '2 Hz delta layered with noise',
    affirmation: 'At the end of the day, I release what does not serve me',
    protocol: [
      'Establish nightly routine at consistent time',
      'Enter 2-3 Hz delta state with background noise',
      'Practice mental dump - review day events',
      'Pair flashlight click with stress release visualization',
      'Release maladaptive thought patterns',
      'Complete tie-down protocol before sleep'
    ]
  }
];

export function WorkedExamples() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
          <Brain className="w-8 h-8 text-red-400" />
          <span>Worked Schema Examples</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Practical implementations of frequency-based neuro-programming protocols with detailed methodologies and real-world applications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {WORKED_EXAMPLES.map((example) => {
          const IconComponent = example.icon;
          
          return (
            <Card key={example.id} className="bg-black/50 border-gray-700 hover:border-red-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5 text-red-400" />
                    <Badge variant="outline" className="text-xs">
                      {example.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-white">{example.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Schema Details */}
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-blue-400">Object:</span>
                    <div className="text-gray-300 mt-1">{example.object}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-green-400">Trigger:</span>
                    <div className="text-gray-300 mt-1">{example.trigger}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-400">Frequencies:</span>
                    <div className="text-gray-300 mt-1 font-mono text-xs">{example.frequencies}</div>
                  </div>
                </div>

                {/* Affirmation */}
                <div className="bg-gray-900/50 rounded p-3 border-l-4 border-cyan-500">
                  <div className="text-xs font-semibold text-cyan-400 mb-1">Affirmation:</div>
                  <div className="text-sm text-cyan-200 italic">"{example.affirmation}"</div>
                </div>

                {/* Protocol Steps */}
                <div>
                  <div className="text-sm font-semibold text-gray-300 mb-2">Implementation Protocol:</div>
                  <div className="space-y-1">
                    {example.protocol.map((step, idx) => (
                      <div key={idx} className="text-xs text-gray-400 flex items-start space-x-2">
                        <span className="text-red-400 font-mono text-xs mt-0.5">{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Implementation Notes */}
      <div className="mt-8 p-6 bg-yellow-600/10 border border-yellow-500/30 rounded-lg">
        <h3 className="text-lg font-bold text-yellow-200 mb-3">Implementation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-100">
          <div>
            <h4 className="font-semibold mb-2">Session Management:</h4>
            <ul className="space-y-1 text-yellow-200">
              <li>• Flow State Durations: 1 hr, 24 hr, 3 days, 1 week</li>
              <li>• Always include proper exit protocols</li>
              <li>• Monitor cognitive dissonance risk</li>
              <li>• Maintain detailed session logs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Safety Protocols:</h4>
            <ul className="space-y-1 text-yellow-200">
              <li>• FlowGate: Visual flashlight signals</li>
              <li>• DropGate: Auditory exit cues</li>
              <li>• Tie-Down: Structured debrief required</li>
              <li>• Reality grounding confirmation essential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}