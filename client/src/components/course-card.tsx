import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Course } from "@shared/schema";
import { 
  Shield, 
  Search, 
  Lock, 
  Star, 
  Clock, 
  Play,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface CourseCardProps {
  course: Course;
  progress: number;
  hasAccess: boolean;
  isCompleted: boolean;
}

export function CourseCard({ course, progress, hasAccess, isCompleted }: CourseCardProps) {
  const getIconByTitle = (title: string) => {
    if (title.toLowerCase().includes('network')) return Shield;
    if (title.toLowerCase().includes('forensics')) return Search;
    if (title.toLowerCase().includes('social')) return AlertTriangle;
    return Shield;
  };

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'recruit': return 'text-terminal-amber border-terminal-amber';
      case 'operator': return 'text-terminal-green border-terminal-green';
      case 'shadow': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCourseColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'recruit': return 'terminal-amber';
      case 'operator': return 'terminal-green';
      case 'shadow': return 'red-400';
      default: return 'gray-400';
    }
  };

  const Icon = getIconByTitle(course.title);
  const tierColorClass = getTierColor(course.requiredTier);
  const courseColor = getCourseColor(course.requiredTier);

  return (
    <Card className={`bg-card-bg rounded-xl glass-effect hover:scale-105 transition-all group ${
      !hasAccess ? 'border border-gray-600 opacity-75' : 'border border-gray-700'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 ${hasAccess ? `bg-${courseColor}` : 'bg-gray-600'} rounded-lg flex items-center justify-center mr-4`}>
            {hasAccess ? (
              <Icon className="text-terminal-bg text-xl" />
            ) : (
              <Lock className="text-gray-400 text-xl" />
            )}
          </div>
          <div>
            <h3 className={`text-xl font-bold ${hasAccess ? 'text-white' : 'text-gray-400'}`} data-testid={`text-course-title-${course.id}`}>
              {course.title}
            </h3>
            <Badge variant="outline" className={`text-sm ${tierColorClass}`}>
              {course.requiredTier.toUpperCase()} LEVEL
            </Badge>
          </div>
        </div>
        
        <p className={`${hasAccess ? 'text-gray-300' : 'text-gray-500'} mb-4`} data-testid={`text-course-description-${course.id}`}>
          {course.description}
        </p>
        
        <div className="space-y-3 mb-6">
          {hasAccess && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className={`text-${courseColor}`} data-testid={`text-course-progress-${course.id}`}>
                {progress}%
              </span>
            </div>
          )}
          
          {hasAccess && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={`bg-${courseColor} h-2 rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          <div className="flex justify-between text-sm">
            <span className={hasAccess ? 'text-gray-400' : 'text-gray-500'}>Duration</span>
            <span className={hasAccess ? 'text-white' : 'text-gray-500'} data-testid={`text-course-duration-${course.id}`}>
              {course.duration} hours
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className={hasAccess ? 'text-gray-400' : 'text-gray-500'}>Difficulty</span>
            <div className="flex" data-testid={`stars-course-difficulty-${course.id}`}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < course.difficulty 
                      ? hasAccess ? 'text-terminal-amber' : 'text-gray-500'
                      : 'text-gray-600'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>

          {!hasAccess && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Requirements</span>
              <span className="text-red-400">
                {course.requiredTier.toUpperCase()} Access
              </span>
            </div>
          )}
        </div>
        
        {hasAccess ? (
          isCompleted ? (
            <Button 
              className={`w-full py-3 bg-${courseColor} text-terminal-bg rounded-lg font-semibold hover:bg-terminal-green transition-colors flex items-center justify-center`}
              data-testid={`button-course-completed-${course.id}`}
            >
              <CheckCircle className="mr-2 w-4 h-4" />
              Completed
            </Button>
          ) : progress > 0 ? (
            <Link href="/terminal" data-testid={`link-continue-course-${course.id}`}>
              <Button className={`w-full py-3 bg-${courseColor} text-terminal-bg rounded-lg font-semibold hover:bg-terminal-amber transition-colors`}>
                Continue Training
              </Button>
            </Link>
          ) : (
            <Link href="/terminal" data-testid={`link-start-course-${course.id}`}>
              <Button className={`w-full py-3 bg-${courseColor} text-terminal-bg rounded-lg font-semibold hover:bg-terminal-amber transition-colors flex items-center justify-center`}>
                <Play className="mr-2 w-4 h-4" />
                Start Course
              </Button>
            </Link>
          )
        ) : (
          <Link href="/subscribe" data-testid={`link-upgrade-for-course-${course.id}`}>
            <Button 
              className="w-full py-3 bg-gray-600 text-gray-400 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
            >
              Upgrade Required
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
