import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Link, Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Home, 
  LogOut, 
  Users, 
  Database, 
  Terminal, 
  Activity,
  DollarSign,
  Award,
  Shield,
  Edit,
  UserX
} from "lucide-react";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();

  // Redirect if not admin
  if (!user?.isAdmin) {
    return <Redirect to="/" />;
  }

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const mockUsers = [
    { 
      id: '1', 
      name: 'John Doe', 
      username: 'john_doe',
      email: 'john@example.com',
      subscriptionTier: 'operator',
      isActive: true 
    },
    { 
      id: '2', 
      name: 'Alex Smith', 
      username: 'alex_smith',
      email: 'alex@example.com', 
      subscriptionTier: 'shadow',
      isActive: true 
    },
    { 
      id: '3', 
      name: 'Sarah Wilson', 
      username: 'sarah_w',
      email: 'sarah@example.com',
      subscriptionTier: 'recruit',
      isActive: false 
    },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-card-bg/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-400 font-mono">Admin Control Panel</h1>
                <p className="text-xs text-gray-400">
                  Administrator: {user.username} | CLASSIFIED ACCESS
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/" data-testid="button-home">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-terminal-green">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/terminal" data-testid="button-terminal">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-terminal-green">
                  <Terminal className="h-4 w-4 mr-2" />
                  Terminal
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-400"
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* System Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Users className="h-10 w-10 text-terminal-green mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Active Users</h3>
              <p className="text-terminal-green font-mono text-2xl" data-testid="text-active-users">
                {statsLoading ? '...' : stats?.activeUsers || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Activity className="h-10 w-10 text-terminal-amber mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Completed Modules</h3>
              <p className="text-terminal-amber font-mono text-2xl" data-testid="text-completed-modules">
                {statsLoading ? '...' : stats?.completedModules || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-cyber-blue mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Certificates Issued</h3>
              <p className="text-cyber-blue font-mono text-2xl" data-testid="text-certificates-issued">
                {statsLoading ? '...' : stats?.certificates || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-10 w-10 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Monthly Revenue</h3>
              <p className="text-green-400 font-mono text-2xl" data-testid="text-monthly-revenue">
                {statsLoading ? '...' : `$${stats?.revenue?.toLocaleString() || 0}`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Management */}
          <Card className="bg-card-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-terminal-green flex items-center">
                <Users className="mr-2 h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.subscriptionTier === 'shadow' ? 'bg-red-600' :
                        user.subscriptionTier === 'operator' ? 'bg-terminal-green' : 
                        'bg-terminal-amber'
                      } text-terminal-bg`}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-semibold" data-testid={`text-user-name-${user.id}`}>
                          {user.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-xs ${
                            user.subscriptionTier === 'shadow' ? 'border-red-400 text-red-400' :
                            user.subscriptionTier === 'operator' ? 'border-terminal-green text-terminal-green' :
                            'border-terminal-amber text-terminal-amber'
                          }`}>
                            {user.subscriptionTier?.toUpperCase()}
                          </Badge>
                          <Badge variant={user.isActive ? "default" : "destructive"} className="text-xs">
                            {user.isActive ? 'ACTIVE' : 'SUSPENDED'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber"
                        data-testid={`button-edit-user-${user.id}`}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        data-testid={`button-suspend-user-${user.id}`}
                      >
                        <UserX className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Commands */}
          <Card className="bg-card-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <Terminal className="mr-2 h-5 w-5" />
                System Commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-lg p-4 font-mono text-sm h-64 overflow-y-auto">
                <div className="text-terminal-green">
                  <p className="text-red-400">admin@blackraven:~$ sudo systemctl status psychproject</p>
                  <p className="text-terminal-green">● psychproject.service - PsychProject Training Platform</p>
                  <p className="text-gray-300">   Loaded: loaded (/etc/systemd/system/psychproject.service; enabled)</p>
                  <p className="text-gray-300">   Active: active (running) since Mon 2024-01-15 10:30:22 UTC; 2h 15min ago</p>
                  <p className="text-gray-300">   Memory: 2.1G</p>
                  <p className="text-terminal-green">   Status: "Training platform operational - {stats?.activeUsers || 0} active sessions"</p>
                  <p className="text-red-400 mt-2">admin@blackraven:~$ sudo tail -f /var/log/psychproject.log</p>
                  <p className="text-gray-300">[INFO] User authentication successful - user_7739</p>
                  <p className="text-gray-300">[INFO] Terminal session started - session_4421</p>
                  <p className="text-terminal-amber">[WARN] High memory usage detected - 85%</p>
                  <p className="text-terminal-green">[INFO] Certificate generated - cert_9871</p>
                  <p className="text-red-400 mt-2">admin@blackraven:~$ <span className="animate-pulse">_</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Analytics */}
          <Card className="bg-card-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-terminal-amber flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Database Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Users</span>
                  <span className="text-terminal-green font-mono text-lg" data-testid="text-total-users">
                    {stats?.activeUsers || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Database Size</span>
                  <span className="text-terminal-amber font-mono text-lg">2.4 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Daily Queries</span>
                  <span className="text-cyber-blue font-mono text-lg">45,231</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Cache Hit Rate</span>
                  <span className="text-green-400 font-mono text-lg">94.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Avg Response Time</span>
                  <span className="text-terminal-green font-mono text-lg">12ms</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-card-bg border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber"
                  data-testid="button-backup-system"
                >
                  Backup System
                </Button>
                <Button 
                  className="bg-cyber-blue text-terminal-bg hover:bg-blue-600"
                  data-testid="button-generate-reports"
                >
                  Generate Reports
                </Button>
                <Button 
                  className="bg-terminal-amber text-terminal-bg hover:bg-yellow-600"
                  data-testid="button-maintenance-mode"
                >
                  Maintenance Mode
                </Button>
                <Button 
                  variant="destructive"
                  data-testid="button-emergency-shutdown"
                >
                  Emergency Shutdown
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
