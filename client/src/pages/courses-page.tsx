import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CourseCard } from "@/components/course-card";
import { 
  Code, 
  Home, 
  Terminal, 
  LogOut, 
  Shield, 
  Star, 
  Clock, 
  Award,
  Lock,
  CheckCircle
} from "lucide-react";

export default function CoursesPage() {
  const { user, logoutMutation } = useAuth();

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const { data: userProgress, isLoading: progressLoading } = useQuery({
    queryKey: ["/api/user/progress"],
    enabled: !!user,
  });

  const { data: certificates } = useQuery({
    queryKey: ["/api/user/certificates"],
    enabled: !!user,
  });

  if (!user) {
    return null; // ProtectedRoute will handle redirect
  }

  const getProgressForCourse = (courseId: string) => {
    if (!userProgress) return 0;
    const courseProgress = userProgress.filter(p => p.courseId === courseId);
    if (courseProgress.length === 0) return 0;
    return Math.round(courseProgress.reduce((sum, p) => sum + p.progress, 0) / courseProgress.length);
  };

  const canAccessCourse = (requiredTier: string) => {
    const tierLevels = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userLevel = tierLevels[user.subscriptionTier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
    return userLevel >= requiredLevel;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-card-bg/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-terminal-green rounded-lg flex items-center justify-center">
                <Shield className="text-terminal-bg text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-terminal-green font-mono">Training Modules</h1>
                <p className="text-xs text-gray-400">
                  User: {user.username} | Tier: {user.subscriptionTier?.toUpperCase() || 'NONE'}
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
        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Shield className="h-10 w-10 text-terminal-green mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Access Level</h3>
              <p className="text-terminal-green font-mono" data-testid="text-access-level">
                {user.subscriptionTier?.toUpperCase() || 'NONE'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Clock className="h-10 w-10 text-terminal-amber mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Courses Started</h3>
              <p className="text-terminal-amber font-mono text-xl" data-testid="text-courses-started">
                {userProgress?.length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-10 w-10 text-cyber-blue mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Modules Completed</h3>
              <p className="text-cyber-blue font-mono text-xl" data-testid="text-modules-completed">
                {userProgress?.filter(p => p.progress === 100).length || 0}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card-bg border-gray-700">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Certificates</h3>
              <p className="text-green-400 font-mono text-xl" data-testid="text-certificates">
                {certificates?.length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-terminal-green font-mono">Available Courses</h2>
            {user.subscriptionTier === 'none' && (
              <Link href="/subscribe" data-testid="button-upgrade">
                <Button className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber">
                  Upgrade Access
                </Button>
              </Link>
            )}
          </div>

          {coursesLoading ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="bg-card-bg border-gray-700 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded mb-4"></div>
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {courses?.map((course) => {
                const progress = getProgressForCourse(course.id);
                const hasAccess = canAccessCourse(course.requiredTier);
                const isCompleted = progress === 100;

                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={progress}
                    hasAccess={hasAccess}
                    isCompleted={isCompleted}
                  />
                );
              }) || (
                <div className="col-span-full text-center py-12">
                  <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No Courses Available</h3>
                  <p className="text-gray-500">Check back later for new training modules.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tier Upgrade CTA */}
        {user.subscriptionTier !== 'shadow' && (
          <Card className="bg-gradient-to-r from-terminal-green/10 to-cyber-blue/10 border-terminal-green/30">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-terminal-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Unlock Advanced Training</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Upgrade your access level to unlock additional courses, advanced scenarios, and exclusive content.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/subscribe?tier=operator" data-testid="button-upgrade-operator">
                  <Button className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber">
                    Upgrade to OPERATOR
                  </Button>
                </Link>
                <Link href="/subscribe?tier=shadow" data-testid="button-upgrade-shadow">
                  <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                    Request SHADOW Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
