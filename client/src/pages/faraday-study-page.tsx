import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Box, Eye, Brain, Target } from "lucide-react";

// Study conditions
type StudyCondition = 'deterministic' | 'probabilistic' | 'adversarial' | 'null';

interface BlackBox {
  id: string;
  code: string;
  condition: StudyCondition;
  target: string;
  targetType: 'word' | 'number' | 'glyph';
  queriesUsed: number;
  maxQueries: number;
  responses: Array<{ query: string; response: string; timestamp: number }>;
  finalGuess?: string;
  confidence?: number;
  completed: boolean;
}

interface StudySession {
  boxes: BlackBox[];
  currentBoxIndex: number;
  startTime: number;
  participantId: string;
}

const SAMPLE_TARGETS = {
  word: ['COMET', 'RIVER', 'GHOST', 'MANGO', 'QUART', 'OCEAN'],
  number: [17, 23, 31, 47, 53, 67],
  glyph: ['RED_TRIANGLE', 'BLUE_CIRCLE', 'GREEN_SQUARE', 'RED_CIRCLE', 'BLUE_TRIANGLE', 'GREEN_CIRCLE']
};

const BOX_CODES = ['🜂', '⬢', '◊', '※', '⧫', '◈'];

export default function FaradayStudyPage() {
  const [session, setSession] = useState<StudySession | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [finalGuess, setFinalGuess] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [showInstructions, setShowInstructions] = useState(true);
  const [studyPhase, setStudyPhase] = useState<'instructions' | 'query' | 'guess' | 'reveal' | 'complete'>('instructions');

  const initializeStudy = () => {
    const participantId = `P_${Date.now().toString(36)}`;
    
    // Create randomized boxes with different conditions
    const conditions: StudyCondition[] = ['deterministic', 'probabilistic', 'adversarial', 'null'];
    const boxes: BlackBox[] = conditions.map((condition, index) => ({
      id: `box_${index}`,
      code: BOX_CODES[index],
      condition,
      target: SAMPLE_TARGETS.word[index],
      targetType: 'word',
      queriesUsed: 0,
      maxQueries: 6,
      responses: [],
      completed: false
    }));

    setSession({
      boxes,
      currentBoxIndex: 0,
      startTime: Date.now(),
      participantId
    });

    setShowInstructions(false);
    setStudyPhase('query');
  };

  const generateResponse = (query: string, box: BlackBox): string => {
    const target = box.target.toLowerCase();
    const queryLower = query.toLowerCase();

    switch (box.condition) {
      case 'deterministic':
        // Truthful, diagnostic responses
        if (queryLower.includes('vowel')) {
          const vowels = target.match(/[aeiou]/g)?.length || 0;
          return `${vowels} vowels.`;
        }
        if (queryLower.includes('letter') && queryLower.includes('count')) {
          return `${target.length} letters.`;
        }
        if (queryLower.includes('start') || queryLower.includes('begin')) {
          return `Starts with "${target[0].toUpperCase()}".`;
        }
        if (queryLower.includes('end')) {
          return `Ends with "${target[target.length - 1].toUpperCase()}".`;
        }
        if (queryLower.includes('contain') && queryLower.includes('ng')) {
          return target.includes('ng') ? 'Yes, contains "NG".' : 'No "NG" present.';
        }
        return 'One diagnostic clue: Think celestial objects.';

      case 'probabilistic':
        // 70% truthful, 30% noise
        if (Math.random() < 0.3) {
          return 'No data available.';
        }
        // Fall through to deterministic logic
        return generateResponse(query, { ...box, condition: 'deterministic' });

      case 'adversarial':
        // Misleading unless "CALIBRATE" keyword used
        const hasCalibrate = box.responses.some(r => r.query.toLowerCase().includes('calibrate'));
        if (!hasCalibrate && Math.random() < 0.6) {
          if (queryLower.includes('vowel')) {
            return `${Math.floor(Math.random() * 3) + 1} vowels.`;
          }
          if (queryLower.includes('start')) {
            const wrongLetters = 'BZQXJ';
            return `Starts with "${wrongLetters[Math.floor(Math.random() * wrongLetters.length)]}".`;
          }
          return 'Misleading hint: Think kitchen utensils.';
        }
        // After calibrate or 40% chance, be truthful
        return generateResponse(query, { ...box, condition: 'deterministic' });

      case 'null':
        return '...';

      default:
        return 'Error: Unknown condition.';
    }
  };

  const submitQuery = () => {
    if (!session || !currentQuery.trim()) return;

    const currentBox = session.boxes[session.currentBoxIndex];
    if (currentBox.queriesUsed >= currentBox.maxQueries) return;

    const response = generateResponse(currentQuery, currentBox);
    
    const updatedBox = {
      ...currentBox,
      queriesUsed: currentBox.queriesUsed + 1,
      responses: [
        ...currentBox.responses,
        {
          query: currentQuery,
          response,
          timestamp: Date.now()
        }
      ]
    };

    const updatedBoxes = [...session.boxes];
    updatedBoxes[session.currentBoxIndex] = updatedBox;

    setSession({
      ...session,
      boxes: updatedBoxes
    });

    setCurrentQuery('');

    // Move to guess phase if max queries reached
    if (updatedBox.queriesUsed >= updatedBox.maxQueries) {
      setStudyPhase('guess');
    }
  };

  const submitFinalGuess = () => {
    if (!session || !finalGuess.trim()) return;

    const currentBox = session.boxes[session.currentBoxIndex];
    const updatedBox = {
      ...currentBox,
      finalGuess,
      confidence,
      completed: true
    };

    const updatedBoxes = [...session.boxes];
    updatedBoxes[session.currentBoxIndex] = updatedBox;

    setSession({
      ...session,
      boxes: updatedBoxes
    });

    setStudyPhase('reveal');
  };

  const nextBox = () => {
    if (!session) return;

    if (session.currentBoxIndex < session.boxes.length - 1) {
      setSession({
        ...session,
        currentBoxIndex: session.currentBoxIndex + 1
      });
      setStudyPhase('query');
      setFinalGuess('');
      setConfidence(50);
    } else {
      setStudyPhase('complete');
    }
  };

  const currentBox = session?.boxes[session.currentBoxIndex];
  const isCorrect = currentBox?.finalGuess?.toLowerCase() === currentBox?.target.toLowerCase();

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-red-primary mobile-safe-padding">
        <div className="max-w-4xl mx-auto container-responsive py-4 sm:py-6">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-terminal-red-bright mb-3 sm:mb-4">
              Faraday Black Box Study
            </h1>
            <p className="text-sm sm:text-lg text-terminal-red-secondary px-4 sm:px-0">
              No-shock inference game based on Michael Faraday's black-box methodology
            </p>
          </div>

          <Card className="bg-card-bg border-terminal-red-muted/30 mb-6">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                <Brain className="h-6 w-6" />
                Study Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-terminal-red-secondary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-terminal-red-bright mb-2">Objective</h3>
                  <p className="text-sm">
                    Infer the hidden content of opaque "mailboxes" using only indirect queries. 
                    You cannot look inside - probe, observe, and infer the mechanism.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-terminal-red-bright mb-2">Process</h3>
                  <p className="text-sm">
                    Each box contains a target word. Submit up to 6 written queries per box 
                    and receive responses based on the box's internal rules.
                  </p>
                </div>

                <div>
                  <h3 className="text-terminal-red-bright mb-2">Query Examples</h3>
                  <ul className="text-sm space-y-1">
                    <li>• "How many vowels?"</li>
                    <li>• "What letter does it start with?"</li>
                    <li>• "Does it contain 'NG'?"</li>
                    <li>• "Is it a concrete noun?"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-terminal-red-bright mb-2">Box Types</h3>
                  <ul className="text-sm space-y-1">
                    <li>• <span className="text-green-400">Deterministic:</span> Always truthful</li>
                    <li>• <span className="text-yellow-400">Probabilistic:</span> Mostly truthful</li>
                    <li>• <span className="text-red-400">Adversarial:</span> May mislead</li>
                    <li>• <span className="text-gray-400">Null:</span> No responses</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-950/30 border border-yellow-700/50 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 text-yellow-300 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-semibold">Research Context</span>
                </div>
                <p className="text-sm text-yellow-200">
                  This study measures inference accuracy, noise tolerance, query strategy efficiency, 
                  and metacognitive calibration. You'll work through 4 boxes with different response patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={initializeStudy}
              className="bg-terminal-red-dark hover:bg-terminal-red-primary text-white px-8 py-3"
              data-testid="start-study-button"
            >
              Begin Faraday Study
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-red-primary p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-terminal-red-bright mb-2">
            Faraday Black Box Study
          </h1>
          <div className="flex justify-center gap-4 text-sm text-terminal-red-secondary">
            <span>Participant: {session.participantId}</span>
            <span>Box {session.currentBoxIndex + 1} of {session.boxes.length}</span>
            <span>Phase: {studyPhase.toUpperCase()}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress 
            value={(session.currentBoxIndex / session.boxes.length) * 100} 
            className="h-2 bg-terminal-red-muted/20"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Box */}
          <div className="lg:col-span-2">
            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Box className="h-6 w-6" />
                  Black Box {currentBox?.code}
                </CardTitle>
                <p className="text-sm text-terminal-red-secondary">
                  Queries used: {currentBox?.queriesUsed || 0} / {currentBox?.maxQueries || 6}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyPhase === 'query' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-terminal-red-secondary">Submit Query</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          value={currentQuery}
                          onChange={(e) => setCurrentQuery(e.target.value)}
                          placeholder="Ask about the hidden content..."
                          className="bg-transparent border-terminal-red-muted/30"
                          onKeyPress={(e) => e.key === 'Enter' && submitQuery()}
                          data-testid="query-input"
                        />
                        <Button 
                          onClick={submitQuery}
                          disabled={!currentQuery.trim() || (currentBox?.queriesUsed || 0) >= (currentBox?.maxQueries || 6)}
                          className="bg-terminal-red-dark hover:bg-terminal-red-primary"
                          data-testid="submit-query-button"
                        >
                          Query
                        </Button>
                      </div>
                    </div>

                    {(currentBox?.queriesUsed || 0) >= (currentBox?.maxQueries || 6) && (
                      <Button 
                        onClick={() => setStudyPhase('guess')}
                        className="w-full bg-terminal-red-primary hover:bg-terminal-red-bright"
                        data-testid="proceed-to-guess-button"
                      >
                        Proceed to Final Guess
                      </Button>
                    )}
                  </div>
                )}

                {studyPhase === 'guess' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-terminal-red-secondary">Final Guess</Label>
                      <Input
                        value={finalGuess}
                        onChange={(e) => setFinalGuess(e.target.value)}
                        placeholder="What's in the box?"
                        className="bg-transparent border-terminal-red-muted/30 mt-1"
                        data-testid="final-guess-input"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-terminal-red-secondary">Confidence (0-100%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={confidence}
                        onChange={(e) => setConfidence(parseInt(e.target.value) || 0)}
                        className="bg-transparent border-terminal-red-muted/30 mt-1"
                        data-testid="confidence-input"
                      />
                    </div>

                    <Button 
                      onClick={submitFinalGuess}
                      disabled={!finalGuess.trim()}
                      className="w-full bg-terminal-red-primary hover:bg-terminal-red-bright"
                      data-testid="submit-guess-button"
                    >
                      Submit Final Guess
                    </Button>
                  </div>
                )}

                {studyPhase === 'reveal' && (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-terminal-red-dark/20 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Target className="h-8 w-8" />
                        <span className="text-2xl font-bold">
                          {isCorrect ? 'CORRECT!' : 'INCORRECT'}
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>Target: <span className="font-bold text-terminal-red-bright">{currentBox?.target}</span></div>
                        <div>Your Guess: <span className="font-bold">{currentBox?.finalGuess}</span></div>
                        <div>Confidence: <span className="font-bold">{currentBox?.confidence}%</span></div>
                        <div>
                          Box Type: <Badge className={`${
                            currentBox?.condition === 'deterministic' ? 'bg-green-600' :
                            currentBox?.condition === 'probabilistic' ? 'bg-yellow-600' :
                            currentBox?.condition === 'adversarial' ? 'bg-red-600' : 'bg-gray-600'
                          }`}>
                            {currentBox?.condition}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={nextBox}
                      className="w-full bg-terminal-red-primary hover:bg-terminal-red-bright"
                      data-testid="next-box-button"
                    >
                      {session.currentBoxIndex < session.boxes.length - 1 ? 'Next Box' : 'Complete Study'}
                    </Button>
                  </div>
                )}

                {studyPhase === 'complete' && (
                  <div className="text-center p-6">
                    <h2 className="text-2xl font-bold text-terminal-red-bright mb-4">Study Complete!</h2>
                    <div className="text-sm text-terminal-red-secondary space-y-2">
                      <div>Total Accuracy: {session.boxes.filter(b => b.finalGuess?.toLowerCase() === b.target.toLowerCase()).length} / {session.boxes.length}</div>
                      <div>Session Duration: {Math.round((Date.now() - session.startTime) / 1000 / 60)} minutes</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Query History */}
          <div>
            <Card className="bg-card-bg border-terminal-red-muted/30">
              <CardHeader>
                <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Query History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {currentBox?.responses.map((exchange, index) => (
                    <div key={index} className="text-xs space-y-1 p-2 bg-terminal-red-dark/10 rounded">
                      <div className="text-terminal-red-secondary">
                        Q{index + 1}: {exchange.query}
                      </div>
                      <div className="text-terminal-red-primary font-medium">
                        → {exchange.response}
                      </div>
                    </div>
                  )) || <div className="text-terminal-red-muted text-sm">No queries yet</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}