import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Eye, Brain, Target, TrendingUp, Clock, Award } from 'lucide-react';

interface RvProgress {
  currentClass: string;
  classCAccuracy: number;
  classCSessionsCompleted: number;
  classBAccuracy: number;
  classBSessionsCompleted: number;
  classAAccuracy: number;
  classASessionsCompleted: number;
  totalSessions: number;
  totalAccuratePerceptions: number;
  highestStageReached: number;
}

interface RvSession {
  sessionId: string;
  trainingClass: string;
  target?: {
    targetId: string;
    name?: string;
    description?: string;
    category: string;
  };
  currentStage: number;
}

interface RvPerception {
  perceptionId: string;
  perceptionText: string;
  feedback?: string;
  stage: number;
}

const PERCEPTION_STAGES = [
  { stage: 1, name: 'Major Gestalt', description: 'Overall impression, basic form' },
  { stage: 2, name: 'Sensory Contact', description: 'Colors, textures, sounds, temperatures' },
  { stage: 3, name: 'Dimension/Motion', description: 'Size, movement, spatial relationships' },
  { stage: 4, name: 'Quantitative', description: 'Measurements, quantities, numbers' },
  { stage: 5, name: 'Qualitative', description: 'Emotional qualities, purpose, function' },
  { stage: 6, name: 'Analytical', description: 'Detailed analysis and interpretation' }
];

export default function RVTraining() {
  const { toast } = useToast();
  const [activeSession, setActiveSession] = useState<RvSession | null>(null);
  const [currentPerception, setCurrentPerception] = useState('');
  const [sessionPerceptions, setSessionPerceptions] = useState<RvPerception[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [sessionResults, setSessionResults] = useState<any>(null);

  const { data: progress, isLoading: progressLoading } = useQuery<RvProgress>({
    queryKey: ['/api/rv/progress'],
  });

  const startSessionMutation = useMutation({
    mutationFn: async (data: { trainingClass?: string; difficulty?: string }) => {
      const res = await apiRequest('POST', '/api/rv/session/start', data);
      return await res.json();
    },
    onSuccess: (session) => {
      setActiveSession(session);
      setSessionPerceptions([]);
      setCurrentStage(1);
      setShowResults(false);
      setSessionResults(null);
      setStartTime(Date.now());
      toast({
        title: 'Session Started',
        description: `Training Class ${session.trainingClass} - Focus on your first impression`
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to start session',
        variant: 'destructive'
      });
    }
  });

  const submitPerceptionMutation = useMutation({
    mutationFn: async (data: { perceptionText: string; perceptionType: string; stage: number; responseTimeMs: number }) => {
      const res = await apiRequest('POST', `/api/rv/session/${activeSession?.sessionId}/perception`, data);
      return await res.json();
    },
    onSuccess: (perception) => {
      setSessionPerceptions(prev => [...prev, perception]);
      setCurrentPerception('');
      
      if (activeSession?.trainingClass === 'C' && perception.feedback) {
        const feedbackMap: Record<string, string> = {
          'C': 'Correct ✓',
          'PC': 'Partially Correct ~',
          'N': 'Neutral →',
          'S': 'Symbolic ○'
        };
        toast({
          title: feedbackMap[perception.feedback] || 'Feedback',
          description: `Stage ${perception.stage} perception recorded`
        });
      }
      
      setStartTime(Date.now());
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit perception',
        variant: 'destructive'
      });
    }
  });

  const completeSessionMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', `/api/rv/session/${activeSession?.sessionId}/complete`);
      return await res.json();
    },
    onSuccess: (results) => {
      setSessionResults(results);
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ['/api/rv/progress'] });
      toast({
        title: 'Session Complete',
        description: `Accuracy: ${results.accuracy}% (${results.accuratePerceptions}/${results.totalPerceptions})`
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to complete session',
        variant: 'destructive'
      });
    }
  });

  const handleSubmitPerception = () => {
    if (!currentPerception.trim() || !activeSession) return;
    
    const responseTime = startTime ? Date.now() - startTime : 0;
    const stageInfo = PERCEPTION_STAGES[currentStage - 1];
    
    submitPerceptionMutation.mutate({
      perceptionText: currentPerception,
      perceptionType: stageInfo.name.toLowerCase().replace(/\s+/g, '_'),
      stage: currentStage,
      responseTimeMs: responseTime
    });
  };

  const handleAdvanceStage = () => {
    if (currentStage < 6) {
      setCurrentStage(prev => prev + 1);
      toast({
        title: `Advancing to Stage ${currentStage + 1}`,
        description: PERCEPTION_STAGES[currentStage].description
      });
    } else {
      completeSessionMutation.mutate();
    }
  };

  const handleNewSession = () => {
    setActiveSession(null);
    setShowResults(false);
    setSessionResults(null);
    setSessionPerceptions([]);
    setCurrentPerception('');
    setCurrentStage(1);
    setStartTime(null);
  };

  if (progressLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 animate-pulse text-red-500" />
            <p className="text-muted-foreground">Loading RV Training Module...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && sessionResults) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-red-500" />
              Session Complete - Class {activeSession?.trainingClass}
            </CardTitle>
            <CardDescription>
              Remote Viewing Training Results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-500">{sessionResults.accuracy}%</div>
                  <p className="text-xs text-muted-foreground">
                    {sessionResults.accuratePerceptions} / {sessionResults.totalPerceptions} accurate
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Target</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">{sessionResults.target.name}</div>
                  <Badge variant="outline" className="mt-2">{sessionResults.target.category}</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{sessionResults.session.durationSeconds}s</div>
                  <p className="text-xs text-muted-foreground">Session time</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Target Information</h3>
              <p className="text-muted-foreground mb-4">{sessionResults.target.description}</p>
              <div className="flex flex-wrap gap-2">
                {(sessionResults.target.correctElements || []).map((element: string, idx: number) => (
                  <Badge key={idx} variant="secondary">{element}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Your Perceptions</h3>
              <div className="space-y-2">
                {sessionResults.perceptions.map((p: any, idx: number) => (
                  <Card key={idx} className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">Stage {p.stage}</Badge>
                        <p className="text-sm">{p.perceptionText}</p>
                      </div>
                      {p.feedback && (
                        <Badge className={
                          p.feedback === 'C' ? 'bg-green-500' :
                          p.feedback === 'PC' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        }>
                          {p.feedback}
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNewSession}
              className="w-full bg-red-600 hover:bg-red-700"
              data-testid="button-new-session"
            >
              Start New Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeSession) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6 text-red-500" />
                MailBox Card RV Training
              </CardTitle>
              <CardDescription>
                Authentic GRILL FLAME / SUN STREAK Protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Training Class System</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">C</Badge>
                    <span>Novice - Immediate feedback after each perception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">B</Badge>
                    <span>Intermediate - Feedback withdrawn, results at end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Badge variant="outline">A</Badge>
                    <span>Advanced - Double-blind operational conditions</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Six-Stage Perception Framework</h3>
                <div className="space-y-1 text-sm">
                  {PERCEPTION_STAGES.map((stage) => (
                    <div key={stage.stage} className="flex gap-2">
                      <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center p-0">
                        {stage.stage}
                      </Badge>
                      <div>
                        <div className="font-medium">{stage.name}</div>
                        <div className="text-xs text-muted-foreground">{stage.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-red-500" />
                Your Progress
              </CardTitle>
              <CardDescription>
                Training Statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Current Class</span>
                  <Badge className="bg-red-500">{progress?.currentClass || 'C'}</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total Sessions</span>
                  <span className="font-semibold">{progress?.totalSessions || 0}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Accurate Perceptions</span>
                  <span className="font-semibold">{progress?.totalAccuratePerceptions || 0}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class C</span>
                    <span className="text-xs text-muted-foreground">
                      {progress?.classCSessionsCompleted || 0} sessions • {progress?.classCAccuracy || 0}%
                    </span>
                  </div>
                  <Progress value={progress?.classCAccuracy || 0} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class B</span>
                    <span className="text-xs text-muted-foreground">
                      {progress?.classBSessionsCompleted || 0} sessions • {progress?.classBAccuracy || 0}%
                    </span>
                  </div>
                  <Progress value={progress?.classBAccuracy || 0} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class A</span>
                    <span className="text-xs text-muted-foreground">
                      {progress?.classASessionsCompleted || 0} sessions • {progress?.classAAccuracy || 0}%
                    </span>
                  </div>
                  <Progress value={progress?.classAAccuracy || 0} className="h-2" />
                </div>
              </div>

              <Button
                onClick={() => startSessionMutation.mutate({ trainingClass: progress?.currentClass || 'C' })}
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={startSessionMutation.isPending}
                data-testid="button-start-training"
              >
                {startSessionMutation.isPending ? 'Starting...' : 'Start Training Session'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStageInfo = PERCEPTION_STAGES[currentStage - 1];

  return (
    <div className="container mx-auto p-6">
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-red-500" />
              Class {activeSession.trainingClass} Training Session
            </span>
            <Badge variant="outline">
              Stage {currentStage} / 6
            </Badge>
          </CardTitle>
          <CardDescription>
            {currentStageInfo.name}: {currentStageInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="text-center">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Target Coordinates</span>
              <div className="text-3xl font-bold text-red-500 mt-2 font-mono tracking-wide" data-testid="text-coordinates">
                {activeSession.target?.targetId || 'CLASSIFIED'}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Focus on this coordinate for remote viewing
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Session Progress</span>
              <span className="text-xs text-muted-foreground">
                {sessionPerceptions.length} perceptions recorded
              </span>
            </div>
            <Progress value={(currentStage / 6) * 100} className="h-2" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Record your perception (quick-reaction response)
            </label>
            <Textarea
              value={currentPerception}
              onChange={(e) => setCurrentPerception(e.target.value)}
              placeholder={`Stage ${currentStage}: ${currentStageInfo.description}`}
              className="min-h-32 border-red-500/20 focus:border-red-500"
              data-testid="input-perception"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitPerception();
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to submit (Shift+Enter for new line)
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmitPerception}
              disabled={!currentPerception.trim() || submitPerceptionMutation.isPending}
              className="flex-1 bg-red-600 hover:bg-red-700"
              data-testid="button-submit-perception"
            >
              {submitPerceptionMutation.isPending ? 'Recording...' : 'Record Perception'}
            </Button>
            
            {sessionPerceptions.filter(p => p.stage === currentStage).length > 0 && (
              <Button
                onClick={handleAdvanceStage}
                variant="outline"
                className="border-red-500/20"
                data-testid="button-advance-stage"
              >
                {currentStage === 6 ? 'Complete Session' : `Next Stage →`}
              </Button>
            )}
          </div>

          {sessionPerceptions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Current Stage Perceptions</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {sessionPerceptions
                  .filter(p => p.stage === currentStage)
                  .map((perception, idx) => (
                    <Card key={idx} className="p-3 border-red-500/10">
                      <div className="flex items-start justify-between">
                        <p className="text-sm flex-1">{perception.perceptionText}</p>
                        {perception.feedback && activeSession.trainingClass === 'C' && (
                          <Badge className={
                            perception.feedback === 'C' ? 'bg-green-500' :
                            perception.feedback === 'PC' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }>
                            {perception.feedback}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
