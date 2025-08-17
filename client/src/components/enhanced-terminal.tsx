import { useState, useEffect } from "react";
// @ts-ignore - react-console-emulator doesn't have TypeScript definitions
import Terminal from "react-console-emulator";
import type { User, Course, UserProgress } from "@shared/schema";

interface EnhancedTerminalProps {
  user: User;
  courses: Course[];
  userProgress: UserProgress[];
}

export function EnhancedTerminal({ user, courses, userProgress }: EnhancedTerminalProps) {
  const [terminal, setTerminal] = useState<any>(null);

  const canAccessCourse = (requiredTier: string) => {
    const tierLevels = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userLevel = tierLevels[user.subscriptionTier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
    return userLevel >= requiredLevel;
  };

  const commands = {
    help: {
      description: 'Display available commands',
      usage: 'help',
      fn: () => {
        return [
          "Available Commands:",
          "  help          - Display this help message",
          "  modules       - List available training modules",
          "  progress      - Show your training progress",
          "  scenario [id] - Start a training scenario",
          "  cert [course] - Generate completion certificate",
          "  whoami        - Display user information",
          "  clear         - Clear terminal screen",
          "  exit          - Terminate session",
        ];
      }
    },
    whoami: {
      description: 'Display user information',
      usage: 'whoami',
      fn: () => {
        return [
          `Username: ${user.username}`,
          `Access Level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
          `User ID: ${user.id}`,
          `Status: ACTIVE`,
        ];
      }
    },
    modules: {
      description: 'List available training modules',
      usage: 'modules',
      fn: () => {
        if (courses.length === 0) {
          return ["No training modules available."];
        }
        
        const result = ["Available Training Modules:"];
        courses.forEach((course, index) => {
          const requiredTier = course.requiredTier.toUpperCase();
          const hasAccess = canAccessCourse(course.requiredTier);
          const status = hasAccess ? '[ACCESSIBLE]' : '[LOCKED]';
          result.push(`  ${index + 1}. ${course.title} - ${requiredTier} ${status}`);
        });
        return result;
      }
    },
    progress: {
      description: 'Show your training progress',
      usage: 'progress',
      fn: () => {
        if (userProgress.length === 0) {
          return ["No training progress recorded."];
        }
        
        const result = [
          "Training Progress Report:",
          "────────────────────────────────────"
        ];
        
        const courseProgress = new Map<string, number[]>();
        userProgress.forEach(p => {
          if (!courseProgress.has(p.courseId)) {
            courseProgress.set(p.courseId, []);
          }
          courseProgress.get(p.courseId)!.push(p.progress || 0);
        });

        courseProgress.forEach((progresses, courseId) => {
          const course = courses.find(c => c.id === courseId);
          if (course) {
            const avgProgress = Math.round(progresses.reduce((sum, p) => sum + p, 0) / progresses.length);
            const progressBar = '█'.repeat(Math.floor(avgProgress / 10)) + '░'.repeat(10 - Math.floor(avgProgress / 10));
            result.push(`${course.title}: [${progressBar}] ${avgProgress}%`);
          }
        });
        
        return result;
      }
    },
    scenario: {
      description: 'Start a training scenario',
      usage: 'scenario [module_id]',
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return [
            "Usage: scenario [module_id]",
            "Use 'modules' command to see available scenarios."
          ];
        }
        
        const moduleId = parseInt(args[0] || '0') - 1;
        if (moduleId >= 0 && moduleId < courses.length) {
          const course = courses[moduleId];
          if (canAccessCourse(course.requiredTier)) {
            return [
              `Starting scenario: ${course.title}`,
              "────────────────────────────────────",
              `[SCENARIO] ${course.description}`,
              "[TASK] Complete the objectives to progress.",
              "[INFO] This is a simulated training environment."
            ];
          } else {
            return [`Access denied. Required tier: ${course.requiredTier.toUpperCase()}`];
          }
        } else {
          return ["Invalid module ID. Use 'modules' to see available options."];
        }
      }
    },
    cert: {
      description: 'Generate completion certificate',
      usage: 'cert [course_name]',
      fn: (...args: string[]) => {
        if (args.length === 0) {
          return ["Usage: cert [course_name]"];
        }
        
        const courseName = args.join(' ');
        const course = courses.find(c => c.title.toLowerCase().includes(courseName.toLowerCase()));
        if (course) {
          const courseProgress = userProgress.filter(p => p.courseId === course.id);
          const avgProgress = courseProgress.length > 0 ? 
            Math.round(courseProgress.reduce((sum, p) => sum + (p.progress || 0), 0) / courseProgress.length) : 0;
          
          if (avgProgress >= 100) {
            return [
              "Certificate Generation Request Submitted",
              "────────────────────────────────────",
              `Course: ${course.title}`,
              `Completion: ${avgProgress}%`,
              `Certificate ID: CERT_${Date.now().toString(36).toUpperCase()}`,
              "Certificate will be available in your dashboard."
            ];
          } else {
            return [`Course not completed. Current progress: ${avgProgress}%`];
          }
        } else {
          return ["Course not found."];
        }
      }
    },
    exit: {
      description: 'Terminate session',
      usage: 'exit',
      fn: () => {
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        return [
          "Terminating session...",
          "Connection closed."
        ];
      }
    }
  };

  const welcomeMessage = [
    "[SYSTEM] BlackRaven OS v2.0.1 - CLASSIFIED",
    "[BOOT] Initializing PsychProject training environment...",
    `[AUTH] User authenticated: ${user.username.toUpperCase()}_${user.id.slice(-4)}`,
    `[INFO] Access level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
    "[INFO] Welcome to advanced cybersecurity training",
    "",
    "Type 'help' to see available commands.",
    ""
  ];

  const terminalStyle = {
    backgroundColor: '#000000',
    minHeight: '400px',
    maxHeight: '600px',
    overflow: 'auto',
    fontFamily: 'Monaco, "Lucida Console", monospace',
    fontSize: '14px',
  };

  const promptLabel = `${user.username}@psychproject:~$`;

  return (
    <div className="h-full bg-black rounded-lg border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-sm font-mono">BlackRaven OS Terminal v2.0.1</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          {user.username}@psychproject | {user.subscriptionTier?.toUpperCase() || 'GUEST'}
        </div>
      </div>

      {/* Terminal */}
      <div className="p-4" data-testid="enhanced-terminal">
        <Terminal
          ref={setTerminal}
          commands={commands}
          welcomeMessage={welcomeMessage}
          promptLabel={promptLabel}
          style={terminalStyle}
          noAutomaticStdout={false}
          noHistory={false}
          noHelp={true}
          className="terminal-content"
        />
      </div>
    </div>
  );
}