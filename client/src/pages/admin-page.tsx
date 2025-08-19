import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Home, 
  Users, 
  Database, 
  Terminal, 
  Activity,
  Award,
  Shield,
  Brain,
  Zap
} from "lucide-react";

export default function AdminPage() {

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => ({
      totalSessions: 1247,
      activeUsers: 89,
      totalFrequencyAnalyses: 5634,
      systemUptime: "99.9%",
      averageSessionLength: "45 minutes",
      popularFrequencies: {
        alpha: 34,
        beta: 28,
        theta: 25,
        gamma: 13
      }
    })
  });

  const mockBrainwaveData = [
    { 
      id: '1', 
      frequency: 'Alpha (8-12 Hz)', 
      sessions: 342,
      avgDuration: '38 min',
      effectivenessScore: 94 
    },
    { 
      id: '2', 
      frequency: 'Beta (12-30 Hz)', 
      sessions: 289,
      avgDuration: '42 min', 
      effectivenessScore: 87 
    },
    { 
      id: '3', 
      frequency: 'Theta (4-8 Hz)', 
      sessions: 256,
      avgDuration: '51 min',
      effectivenessScore: 91 
    },
    { 
      id: '4', 
      frequency: 'Gamma (30-100+ Hz)', 
      sessions: 134,
      avgDuration: '29 min',
      effectivenessScore: 96 
    }
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-terminal-red-muted bg-card-bg/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-terminal-red-primary rounded-lg flex items-center justify-center">
                <Shield className="text-white text-sm sm:text-lg" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-terminal-red-bright font-mono">_Fq Admin Dashboard</h1>
                <p className="text-xs text-gray-400">
                  Brainwave Frequency System Administration
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2 px-3 py-1 bg-terminal-red-primary/20 rounded-lg border border-terminal-red-primary/30">
                <div className="w-2 h-2 bg-terminal-red-primary rounded-full"></div>
                <span className="text-xs font-mono text-terminal-red-bright font-bold">ADMIN</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-red-bright font-mono text-sm flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Active Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {statsLoading ? '...' : stats?.activeUsers}
              </div>
              <p className="text-xs text-gray-400">Currently training</p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-red-bright font-mono text-sm flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Total Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {statsLoading ? '...' : stats?.totalSessions}
              </div>
              <p className="text-xs text-gray-400">All time</p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-red-bright font-mono text-sm flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Frequency Analyses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">
                {statsLoading ? '...' : stats?.totalFrequencyAnalyses}
              </div>
              <p className="text-xs text-gray-400">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-terminal-red-bright font-mono text-sm flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                System Uptime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-terminal-green mb-1">
                {statsLoading ? '...' : stats?.systemUptime}
              </div>
              <p className="text-xs text-gray-400">Reliability</p>
            </CardContent>
          </Card>
        </div>

        {/* Brainwave Frequency Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright font-mono flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Frequency Band Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBrainwaveData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-terminal-red-dark/20 rounded-lg">
                    <div className="flex-1">
                      <div className="font-mono text-white text-sm">{item.frequency}</div>
                      <div className="text-xs text-gray-400">{item.sessions} sessions • {item.avgDuration} avg</div>
                    </div>
                    <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">
                      {item.effectivenessScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-terminal-red-muted">
            <CardHeader>
              <CardTitle className="text-terminal-red-bright font-mono flex items-center">
                <Terminal className="w-5 h-5 mr-2" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono text-sm">Terminal Access</span>
                  <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">Open</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono text-sm">Database Status</span>
                  <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono text-sm">Authentication</span>
                  <Badge className="bg-terminal-amber/20 text-terminal-amber border-terminal-amber/30">Disabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono text-sm">Frequency Bands</span>
                  <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">All Available</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-mono text-sm">Training Mode</span>
                  <Badge className="bg-terminal-red-primary/20 text-terminal-red-bright border-terminal-red-primary/30">Advanced</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card-bg border-terminal-red-muted">
          <CardHeader>
            <CardTitle className="text-terminal-red-bright font-mono flex items-center">
              <Code className="w-5 h-5 mr-2" />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/terminal">
                <Button className="w-full bg-terminal-red-primary text-white hover:bg-terminal-red-secondary">
                  <Terminal className="w-4 h-4 mr-2" />
                  Access Terminal
                </Button>
              </Link>
              <Link href="/advanced-terminal">
                <Button className="w-full bg-terminal-red-primary text-white hover:bg-terminal-red-secondary">
                  <Database className="w-4 h-4 mr-2" />
                  Advanced Terminal
                </Button>
              </Link>
              <Button className="w-full bg-terminal-amber text-terminal-bg hover:bg-terminal-amber/90">
                <Activity className="w-4 h-4 mr-2" />
                System Monitor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}