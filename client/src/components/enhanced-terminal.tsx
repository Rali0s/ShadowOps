import { useState, useEffect, useRef } from "react";
import type { User, Course, UserProgress } from "@shared/schema";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";

interface EnhancedTerminalProps {
  user: User;
  courses: Course[];
  userProgress: UserProgress[];
}

export function EnhancedTerminal({ user, courses, userProgress }: EnhancedTerminalProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      "[SYSTEM] BlackRaven OS v2.0.1 - CLASSIFIED",
      "[BOOT] Initializing PsychProject training environment...",
      `[AUTH] User authenticated: ${user.username.toUpperCase()}_${user.id.slice(-4)}`,
      `[INFO] Access level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
      "[INFO] Welcome to advanced cybersecurity training",
      "",
      "Type 'help' to see available commands.",
      ""
    ];
    setOutput(bootSequence);
  }, [user]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const canAccessCourse = (requiredTier: string) => {
    const tierLevels = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userLevel = tierLevels[user.subscriptionTier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
    return userLevel >= requiredLevel;
  };

  const processCommand = (command: string) => {
    const trimmed = command.trim();
    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    // Add command to output
    const newOutput = [...output, `${user.username}@psychproject:~$ ${command}`];

    switch (cmd) {
      case 'help':
        newOutput.push(
          "Available Commands:",
          "  help          - Display this help message",
          "  modules       - List available training modules",
          "  progress      - Show your training progress",
          "  scenario [id] - Start a training scenario",
          "  cert [course] - Generate completion certificate",
          "  whoami        - Display user information",
          "  clear         - Clear terminal screen",
          "  exit          - Terminate session"
        );
        break;

      case 'whoami':
        newOutput.push(
          `Username: ${user.username}`,
          `Access Level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
          `User ID: ${user.id}`,
          `Status: ACTIVE`
        );
        break;

      case 'modules':
        if (courses.length === 0) {
          newOutput.push("No training modules available.");
        } else {
          newOutput.push("Available Training Modules:");
          courses.forEach((course, index) => {
            const requiredTier = course.requiredTier.toUpperCase();
            const hasAccess = canAccessCourse(course.requiredTier);
            const status = hasAccess ? '[ACCESSIBLE]' : '[LOCKED]';
            newOutput.push(`  ${index + 1}. ${course.title} - ${requiredTier} ${status}`);
          });
        }
        break;

      case 'progress':
        if (userProgress.length === 0) {
          newOutput.push("No training progress recorded.");
        } else {
          newOutput.push("Training Progress Report:", "────────────────────────────────────");
          
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
              newOutput.push(`${course.title}: [${progressBar}] ${avgProgress}%`);
            }
          });
        }
        break;

      case 'scenario':
        if (args.length < 2) {
          newOutput.push("Usage: scenario [module_id]", "Use 'modules' command to see available scenarios.");
        } else {
          const moduleId = parseInt(args[1] || '0') - 1;
          if (moduleId >= 0 && moduleId < courses.length) {
            const course = courses[moduleId];
            if (canAccessCourse(course.requiredTier)) {
              newOutput.push(
                `Starting scenario: ${course.title}`,
                "────────────────────────────────────",
                `[SCENARIO] ${course.description}`,
                "[TASK] Complete the objectives to progress.",
                "[INFO] This is a simulated training environment."
              );
            } else {
              newOutput.push(`Access denied. Required tier: ${course.requiredTier.toUpperCase()}`);
            }
          } else {
            newOutput.push("Invalid module ID. Use 'modules' to see available options.");
          }
        }
        break;

      case 'cert':
        if (args.length < 2) {
          newOutput.push("Usage: cert [course_name]");
        } else {
          const courseName = args.slice(1).join(' ');
          const course = courses.find(c => c.title.toLowerCase().includes(courseName.toLowerCase()));
          if (course) {
            const courseProgress = userProgress.filter(p => p.courseId === course.id);
            const avgProgress = courseProgress.length > 0 ? 
              Math.round(courseProgress.reduce((sum, p) => sum + (p.progress || 0), 0) / courseProgress.length) : 0;
            
            if (avgProgress >= 100) {
              newOutput.push(
                "Certificate Generation Request Submitted",
                "────────────────────────────────────",
                `Course: ${course.title}`,
                `Completion: ${avgProgress}%`,
                `Certificate ID: CERT_${Date.now().toString(36).toUpperCase()}`,
                "Certificate will be available in your dashboard."
              );
            } else {
              newOutput.push(`Course not completed. Current progress: ${avgProgress}%`);
            }
          } else {
            newOutput.push("Course not found.");
          }
        }
        break;

      case 'clear':
        setOutput([]);
        return;

      case 'exit':
        newOutput.push("Terminating session...", "Connection closed.");
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        break;

      case '':
        // Empty command, just show prompt again
        break;

      default:
        newOutput.push(`Command not found: ${cmd}`, "Type 'help' for available commands.");
        break;
    }

    newOutput.push(""); // Empty line after command
    setOutput(newOutput);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      processCommand(currentInput);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  return (
    <div className="h-full bg-black rounded-lg border border-gray-700 overflow-hidden">
      {/* Terminal Header */}
      <div className="bg-terminal-wine px-4 py-2 flex items-center justify-between border-b border-terminal-red-muted">
        <div className="flex items-center space-x-2">
          <StatusIndicator status="error" size="sm" />
          <StatusIndicator status="warning" size="sm" />
          <StatusIndicator status="online" size="sm" />
          <span className="ml-4 text-terminal-red-bright text-sm font-mono font-bold">BlackRaven OS Terminal v2.0.1</span>
        </div>
        <div className="flex items-center space-x-2">
          <AccessibilitySymbol 
            type={user.subscriptionTier === 'shadow' ? 'Shadow' : 
                  user.subscriptionTier === 'operator' ? 'Operator' : 
                  user.subscriptionTier === 'operative' ? 'Operative' : 'Recruit'} 
            className="w-4 h-4" 
          />
          <span className="text-xs text-terminal-red-secondary font-mono font-bold">
            {user.username}@psychproject | {user.subscriptionTier?.toUpperCase() || 'GUEST'}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm" data-testid="enhanced-terminal">
        {output.map((line, index) => (
          <div key={index} className={
            line.startsWith('[SYSTEM]') || line.startsWith('[BOOT]') ? 'text-terminal-red-primary' :
            line.startsWith('[AUTH]') || line.startsWith('[INFO]') ? 'text-terminal-red-secondary' :
            line.includes('Command not found') || line.includes('Access denied') ? 'text-terminal-scarlet' :
            line.includes('[ACCESSIBLE]') ? 'text-terminal-red-bright' :
            line.includes('[LOCKED]') ? 'text-terminal-red-muted' :
            line.startsWith('[') ? 'text-terminal-crimson' :
            'text-terminal-red-bright'
          }>
            {line.includes('[ACCESSIBLE]') && (
              <AccessibilitySymbol type="Accessible" className="inline w-3 h-3 mr-1" />
            )}
            {line.includes('[LOCKED]') && (
              <AccessibilitySymbol type="Classified" className="inline w-3 h-3 mr-1" />
            )}
            {line}
          </div>
        ))}
        
        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <AccessibilitySymbol type="Command" className="inline w-3 h-3 mr-1" />
          <span className="text-terminal-red-primary mr-2 font-bold">{user.username}@psychproject:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-red-bright font-mono"
            autoComplete="off"
            autoFocus
            data-testid="terminal-input"
          />
        </form>
      </div>
    </div>
  );
}