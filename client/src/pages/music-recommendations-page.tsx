import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Brain,
  Zap,
  Waves,
  Target,
  Clock,
  Headphones,
  Star
} from "lucide-react";

interface MusicTrack {
  artist: string;
  category: string;
  genre?: string;
  description: string;
  brainwaveSync: string;
  duration: string;
  intensity: 'low' | 'medium' | 'high' | 'extreme';
  phase: 'pre-work' | 'post-work' | 'both';
}

interface MusicCategory {
  name: string;
  description: string;
  icon: React.ReactNode;
  tracks: MusicTrack[];
  color: string;
}

const MUSIC_RECOMMENDATIONS: MusicCategory[] = [
  {
    name: "Trance Legends",
    description: "High-energy trance for cognitive preparation and alpha wave entrainment",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-red-500",
    tracks: [
      {
        artist: "ASOT",
        category: "Trance Legends", 
        description: "A State of Trance - Premium trance selection for cognitive enhancement",
        brainwaveSync: "Alpha/Beta (10-20 Hz)",
        duration: "60-180 min",
        intensity: 'high',
        phase: 'pre-work'
      },
      {
        artist: "Tiesto",
        category: "Trance Legends",
        description: "Classic Tiesto tracks for mental preparation and focus building",
        brainwaveSync: "Beta/Gamma (15-40 Hz)", 
        duration: "45-120 min",
        intensity: 'high',
        phase: 'pre-work'
      },
      {
        artist: "Armin Van Buuren",
        category: "Trance Legends",
        description: "Uplifting trance for motivation and cognitive activation",
        brainwaveSync: "Alpha/Beta (12-25 Hz)",
        duration: "60-150 min", 
        intensity: 'high',
        phase: 'pre-work'
      },
      {
        artist: "Deadmau5",
        category: "Trance Legends",
        description: "Progressive house for sustained mental energy and flow states",
        brainwaveSync: "Beta (12-30 Hz)",
        duration: "45-90 min",
        intensity: 'medium',
        phase: 'both'
      }
    ]
  },
  {
    name: "Electronic Fusion",
    description: "Mixed electronic styles for dynamic cognitive states",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-red-600",
    tracks: [
      {
        artist: "DJ_Dave",
        category: "Electronic Fusion",
        description: "Custom DJ sets for psychological programming sessions",
        brainwaveSync: "Alpha/Theta (6-14 Hz)",
        duration: "30-90 min",
        intensity: 'medium',
        phase: 'both'
      },
      {
        artist: "Switch Angel", 
        category: "Electronic Fusion",
        description: "Angelic electronic for theta state induction",
        brainwaveSync: "Theta/Alpha (4-12 Hz)",
        duration: "20-60 min",
        intensity: 'low',
        phase: 'post-work'
      },
      {
        artist: "NERO",
        category: "Electronic Fusion",
        description: "Cinematic dubstep for intense cognitive challenges",
        brainwaveSync: "Beta/Gamma (20-45 Hz)",
        duration: "30-75 min",
        intensity: 'extreme',
        phase: 'pre-work'
      },
      {
        artist: "Skrillex",
        category: "Electronic Fusion", 
        description: "High-intensity dubstep for maximum alertness",
        brainwaveSync: "Gamma (30-100 Hz)",
        duration: "15-45 min",
        intensity: 'extreme',
        phase: 'pre-work'
      },
      {
        artist: "AfroJack",
        category: "Electronic Fusion",
        description: "Big room house for group sessions and motivation",
        brainwaveSync: "Beta (15-30 Hz)",
        duration: "45-120 min",
        intensity: 'high',
        phase: 'pre-work'
      }
    ]
  },
  {
    name: "Genre Mastery",
    description: "Pure genre experiences for specific brainwave targeting",
    icon: <Waves className="w-5 h-5" />,
    color: "bg-red-700",
    tracks: [
      {
        artist: "DubStep",
        category: "Genre Mastery",
        genre: "Dubstep",
        description: "Heavy dubstep for extreme beta/gamma activation",
        brainwaveSync: "Gamma (40-100+ Hz)",
        duration: "15-60 min",
        intensity: 'extreme',
        phase: 'pre-work'
      },
      {
        artist: "Hardstyle",
        category: "Genre Mastery", 
        genre: "Hardstyle",
        description: "Hardstyle for sustained high-intensity focus",
        brainwaveSync: "Beta/Gamma (25-60 Hz)",
        duration: "30-90 min",
        intensity: 'extreme',
        phase: 'pre-work'
      },
      {
        artist: "TechnoHouse",
        category: "Genre Mastery",
        genre: "Techno House", 
        description: "Rhythmic techno house for sustained concentration",
        brainwaveSync: "Beta (15-25 Hz)",
        duration: "60-180 min",
        intensity: 'high',
        phase: 'both'
      },
      {
        artist: "90 Classic House",
        category: "Genre Mastery",
        genre: "Classic House",
        description: "90s house classics for nostalgic focus and alpha states",
        brainwaveSync: "Alpha/Beta (10-20 Hz)",
        duration: "45-120 min",
        intensity: 'medium',
        phase: 'both'
      },
      {
        artist: "TropicalHouse", 
        category: "Genre Mastery",
        genre: "Tropical House",
        description: "Tropical house for relaxed alertness and creativity",
        brainwaveSync: "Alpha/Theta (6-12 Hz)",
        duration: "30-90 min",
        intensity: 'low',
        phase: 'post-work'
      }
    ]
  }
];

const INTENSITY_COLORS = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400", 
  high: "bg-orange-500/20 text-orange-400",
  extreme: "bg-red-500/20 text-red-400"
};

const PHASE_COLORS = {
  'pre-work': "bg-blue-500/20 text-blue-400",
  'post-work': "bg-purple-500/20 text-purple-400", 
  'both': "bg-gray-500/20 text-gray-400"
};

export default function MusicRecommendationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'pre-work' | 'post-work'>("all");
  const [selectedIntensity, setSelectedIntensity] = useState<'all' | 'low' | 'medium' | 'high' | 'extreme'>("all");

  const getFilteredTracks = () => {
    let tracks: MusicTrack[] = [];
    
    MUSIC_RECOMMENDATIONS.forEach(category => {
      if (selectedCategory === "all" || selectedCategory === category.name) {
        tracks = [...tracks, ...category.tracks];
      }
    });

    if (selectedPhase !== "all") {
      tracks = tracks.filter(track => track.phase === selectedPhase || track.phase === 'both');
    }

    if (selectedIntensity !== "all") {
      tracks = tracks.filter(track => track.intensity === selectedIntensity);
    }

    return tracks;
  };

  const getBrainwaveRecommendation = (phase: 'pre-work' | 'post-work') => {
    const recommendations = {
      'pre-work': {
        title: "Pre-Work Activation Protocol",
        description: "Prepare your mind for intensive cognitive work and psychological programming",
        frequencies: [
          "Beta (15-30 Hz) - Alert focus and analytical thinking",
          "Gamma (30-100+ Hz) - Peak cognitive performance", 
          "High Alpha (10-12 Hz) - Relaxed awareness with readiness"
        ],
        tracks: getFilteredTracks().filter(t => t.phase === 'pre-work' || t.phase === 'both'),
        icon: <Target className="w-6 h-6" />
      },
      'post-work': {
        title: "Post-Work Integration Protocol", 
        description: "Consolidate learning and transition to relaxed states",
        frequencies: [
          "Alpha (8-12 Hz) - Relaxed awareness and memory consolidation",
          "Theta (4-8 Hz) - Deep processing and integration",
          "Low Beta (12-15 Hz) - Calm alertness"
        ],
        tracks: getFilteredTracks().filter(t => t.phase === 'post-work' || t.phase === 'both'),
        icon: <Waves className="w-6 h-6" />
      }
    };
    
    return recommendations[phase];
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100 mobile-safe-padding">
      <div className="max-w-7xl mx-auto container-responsive py-4 sm:py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-terminal-red-primary rounded-lg">
              <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-terminal-red-bright font-mono">Pre-Work & Post-Work Music</h1>
              <p className="text-terminal-red-secondary">Curated music recommendations for optimal brainwave entrainment</p>
            </div>
          </div>

          <Alert className="border-terminal-red-primary bg-terminal-red-primary/10">
            <Headphones className="h-4 w-4" />
            <AlertTitle className="text-terminal-red-bright">No Connections Required</AlertTitle>
            <AlertDescription className="text-terminal-red-secondary">
              All recommendations are for manual track selection. No streaming integrations or automatic playback.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full bg-terminal-red-dark">
            <TabsTrigger value="recommendations" className="text-terminal-red-secondary data-[state=active]:text-white">
              All Recommendations
            </TabsTrigger>
            <TabsTrigger value="pre-work" className="text-terminal-red-secondary data-[state=active]:text-white">
              Pre-Work Protocol
            </TabsTrigger>
            <TabsTrigger value="post-work" className="text-terminal-red-secondary data-[state=active]:text-white">
              Post-Work Protocol
            </TabsTrigger>
          </TabsList>

          {/* All Recommendations */}
          <TabsContent value="recommendations" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-terminal-red-bright font-semibold">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-terminal-red-dark border border-terminal-red-muted rounded px-3 py-1 text-gray-100"
                >
                  <option value="all">All Categories</option>
                  {MUSIC_RECOMMENDATIONS.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-terminal-red-bright font-semibold">Phase:</span>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value as any)}
                  className="bg-terminal-red-dark border border-terminal-red-muted rounded px-3 py-1 text-gray-100"
                >
                  <option value="all">All Phases</option>
                  <option value="pre-work">Pre-Work</option>
                  <option value="post-work">Post-Work</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-terminal-red-bright font-semibold">Intensity:</span>
                <select
                  value={selectedIntensity}
                  onChange={(e) => setSelectedIntensity(e.target.value as any)}
                  className="bg-terminal-red-dark border border-terminal-red-muted rounded px-3 py-1 text-gray-100"
                >
                  <option value="all">All Intensities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
            </div>

            {/* Music Categories */}
            <div className="grid gap-6">
              {MUSIC_RECOMMENDATIONS.map((category) => (
                <Card key={category.name} className="bg-card-bg border-terminal-red-muted">
                  <CardHeader>
                    <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-terminal-red-secondary">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {category.tracks
                        .filter(track => 
                          (selectedPhase === "all" || track.phase === selectedPhase || track.phase === 'both') &&
                          (selectedIntensity === "all" || track.intensity === selectedIntensity)
                        )
                        .map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted hover:border-terminal-red-secondary transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-terminal-red-bright">{track.artist}</h3>
                              {track.genre && (
                                <Badge variant="outline" className="border-terminal-red-muted text-terminal-red-secondary">
                                  {track.genre}
                                </Badge>
                              )}
                            </div>
                            <p className="text-terminal-red-secondary mb-2">{track.description}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-terminal-red-bright">
                                <Brain className="w-4 h-4 inline mr-1" />
                                {track.brainwaveSync}
                              </span>
                              <span className="text-terminal-red-bright">
                                <Clock className="w-4 h-4 inline mr-1" />
                                {track.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge className={INTENSITY_COLORS[track.intensity]}>
                              {track.intensity.toUpperCase()}
                            </Badge>
                            <Badge className={PHASE_COLORS[track.phase]}>
                              {track.phase === 'both' ? 'BOTH PHASES' : track.phase.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pre-Work Protocol */}
          <TabsContent value="pre-work" className="space-y-6">
            {(() => {
              const protocol = getBrainwaveRecommendation('pre-work');
              return (
                <div>
                  <Card className="bg-card-bg border-terminal-red-muted mb-6">
                    <CardHeader>
                      <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                        {protocol.icon}
                        {protocol.title}
                      </CardTitle>
                      <CardDescription className="text-terminal-red-secondary">
                        {protocol.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-terminal-red-bright">Optimal Brainwave Frequencies:</h3>
                        {protocol.frequencies.map((freq, index) => (
                          <div key={index} className="flex items-center gap-2 text-terminal-red-secondary">
                            <div className="w-2 h-2 bg-terminal-red-primary rounded-full"></div>
                            {freq}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    {protocol.tracks.map((track, index) => (
                      <div key={index} className="p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-terminal-red-bright mb-1">{track.artist}</h3>
                            <p className="text-terminal-red-secondary text-sm mb-2">{track.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-terminal-red-bright">{track.brainwaveSync}</span>
                              <span className="text-terminal-red-bright">{track.duration}</span>
                            </div>
                          </div>
                          <Badge className={INTENSITY_COLORS[track.intensity]}>
                            {track.intensity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </TabsContent>

          {/* Post-Work Protocol */}
          <TabsContent value="post-work" className="space-y-6">
            {(() => {
              const protocol = getBrainwaveRecommendation('post-work');
              return (
                <div>
                  <Card className="bg-card-bg border-terminal-red-muted mb-6">
                    <CardHeader>
                      <CardTitle className="text-terminal-red-bright flex items-center gap-2">
                        {protocol.icon}
                        {protocol.title}
                      </CardTitle>
                      <CardDescription className="text-terminal-red-secondary">
                        {protocol.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-terminal-red-bright">Optimal Brainwave Frequencies:</h3>
                        {protocol.frequencies.map((freq, index) => (
                          <div key={index} className="flex items-center gap-2 text-terminal-red-secondary">
                            <div className="w-2 h-2 bg-terminal-red-primary rounded-full"></div>
                            {freq}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    {protocol.tracks.map((track, index) => (
                      <div key={index} className="p-4 bg-terminal-red-dark/20 rounded-lg border border-terminal-red-muted">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-terminal-red-bright mb-1">{track.artist}</h3>
                            <p className="text-terminal-red-secondary text-sm mb-2">{track.description}</p>
                            <div className="flex items-center gap-4 text-xs">
                              <span className="text-terminal-red-bright">{track.brainwaveSync}</span>
                              <span className="text-terminal-red-bright">{track.duration}</span>
                            </div>
                          </div>
                          <Badge className={INTENSITY_COLORS[track.intensity]}>
                            {track.intensity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </TabsContent>
        </Tabs>

        {/* Additional Notes */}
        <Card className="bg-card-bg border-terminal-red-muted mt-8">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright flex items-center gap-2">
              <Star className="w-5 h-5" />
              Usage Notes & Future Expansion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-terminal-red-bright mb-2">Current Status:</h3>
              <p className="text-terminal-red-secondary text-sm">
                All tracks are manual selection recommendations. No streaming connections or automatic playback functionality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-terminal-red-bright mb-2">Future Additions:</h3>
              <p className="text-terminal-red-secondary text-sm">
                More artists and genres will be added to expand the recommendation database for enhanced brainwave entrainment options.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-terminal-red-bright mb-2">Brainwave Synchronization:</h3>
              <p className="text-terminal-red-secondary text-sm">
                Each recommendation includes optimal brainwave frequency ranges for maximum cognitive enhancement during psychological programming sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}