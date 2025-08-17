import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { User, Course, UserProgress } from "@shared/schema";

interface TerminalEmulatorProps {
  user: User;
  courses: Course[];
  userProgress: UserProgress[];
}

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  timestamp?: Date;
}

export function TerminalEmulator({ user, courses, userProgress }: TerminalEmulatorProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      { text: "[SYSTEM] BlackRaven OS v2.0.1 - CLASSIFIED", type: 'system' as const },
      { text: "[BOOT] Initializing PsychProject training environment...", type: 'system' as const },
      { text: `[AUTH] User authenticated: ${user.username.toUpperCase()}_${user.id.slice(-4)}`, type: 'success' as const },
      { text: `[INFO] Access level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`, type: 'system' as const },
      { text: "[INFO] Welcome to advanced cybersecurity training", type: 'system' as const },
      { text: "", type: 'output' as const },
      { text: "Type 'help' to see available commands.", type: 'output' as const },
      { text: "", type: 'output' as const },
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, index * 300);
    });
  }, [user]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on click
  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };
    
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  const addLine = (text: string, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, { text, type, timestamp: new Date() }]);
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    addLine(`blackraven@psychproject:~$ ${command}`, 'input');
    
    const cmd = command.trim().toLowerCase();
    const args = cmd.split(' ');

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing

    switch (args[0]) {
      case 'help':
        addLine("Available Commands:", 'success');
        addLine("  help          - Display this help message", 'output');
        addLine("  modules       - List available training modules", 'output');
        addLine("  progress      - Show your training progress", 'output');
        addLine("  scenario [id] - Start a training scenario", 'output');
        addLine("  cert [course] - Generate completion certificate", 'output');
        addLine("  whoami        - Display user information", 'output');
        addLine("  clear         - Clear terminal screen", 'output');
        addLine("  exit          - Terminate session", 'output');
        break;

      case 'whoami':
        addLine(`Username: ${user.username}`, 'output');
        addLine(`Access Level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`, 'output');
        addLine(`User ID: ${user.id}`, 'output');
        addLine(`Status: ACTIVE`, 'success');
        break;

      case 'modules':
        if (courses.length === 0) {
          addLine("No training modules available.", 'error');
        } else {
          addLine("Available Training Modules:", 'success');
          courses.forEach((course, index) => {
            const requiredTier = course.requiredTier.toUpperCase();
            const hasAccess = canAccessCourse(course.requiredTier);
            const status = hasAccess ? '[ACCESSIBLE]' : '[LOCKED]';
            const color = hasAccess ? 'output' : 'error';
            addLine(`  ${index + 1}. ${course.title} - ${requiredTier} ${status}`, color);
          });
        }
        break;

      case 'progress':
        if (userProgress.length === 0) {
          addLine("No training progress recorded.", 'output');
        } else {
          addLine("Training Progress Report:", 'success');
          addLine("────────────────────────────────────", 'output');
          
          const courseProgress = new Map<string, number[]>();
          userProgress.forEach(p => {
            if (!courseProgress.has(p.courseId)) {
              courseProgress.set(p.courseId, []);
            }
            courseProgress.get(p.courseId)!.push(p.progress);
          });

          courseProgress.forEach((progresses, courseId) => {
            const course = courses.find(c => c.id === courseId);
            if (course) {
              const avgProgress = Math.round(progresses.reduce((sum, p) => sum + p, 0) / progresses.length);
              const progressBar = '█'.repeat(Math.floor(avgProgress / 10)) + '░'.repeat(10 - Math.floor(avgProgress / 10));
              addLine(`${course.title}: [${progressBar}] ${avgProgress}%`, avgProgress === 100 ? 'success' : 'output');
            }
          });
        }
        break;

      case 'scenario':
        if (args.length < 2) {
          addLine("Usage: scenario [module_id]", 'error');
          addLine("Use 'modules' command to see available scenarios.", 'output');
        } else {
          const moduleId = parseInt(args[1]) - 1;
          if (moduleId >= 0 && moduleId < courses.length) {
            const course = courses[moduleId];
            if (canAccessCourse(course.requiredTier)) {
              addLine(`Starting scenario: ${course.title}`, 'success');
              addLine("────────────────────────────────────", 'output');
              addLine(`[SCENARIO] ${course.description}`, 'output');
              addLine("[TASK] Complete the objectives to progress.", 'output');
              addLine("[INFO] This is a simulated training environment.", 'output');
            } else {
              addLine(`Access denied. Required tier: ${course.requiredTier.toUpperCase()}`, 'error');
            }
          } else {
            addLine("Invalid module ID. Use 'modules' to see available options.", 'error');
          }
        }
        break;

      case 'cert':
        if (args.length < 2) {
          addLine("Usage: cert [course_name]", 'error');
        } else {
          const courseName = args.slice(1).join(' ');
          const course = courses.find(c => c.title.toLowerCase().includes(courseName));
          if (course) {
            const courseProgress = userProgress.filter(p => p.courseId === course.id);
            const avgProgress = courseProgress.length > 0 ? 
              Math.round(courseProgress.reduce((sum, p) => sum + p.progress, 0) / courseProgress.length) : 0;
            
            if (avgProgress >= 100) {
              addLine("Certificate Generation Request Submitted", 'success');
              addLine("────────────────────────────────────", 'output');
              addLine(`Course: ${course.title}`, 'output');
              addLine(`Completion: ${avgProgress}%`, 'success');
              addLine(`Certificate ID: CERT_${Date.now().toString(36).toUpperCase()}`, 'output');
              addLine("Certificate will be available in your dashboard.", 'output');
            } else {
              addLine(`Course not completed. Current progress: ${avgProgress}%`, 'error');
            }
          } else {
            addLine("Course not found.", 'error');
          }
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
        addLine("Terminating session...", 'system');
        addLine("Connection closed.", 'system');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        break;

      case '':
        // Empty command, just show prompt again
        break;

      default:
        addLine(`Command not found: ${args[0]}`, 'error');
        addLine("Type 'help' for available commands.", 'output');
        break;
    }

    addLine("", 'output'); // Empty line after command
    setIsProcessing(false);
  };

  const canAccessCourse = (requiredTier: string) => {
    const tierLevels = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userLevel = tierLevels[user.subscriptionTier as keyof typeof tierLevels] || 0;
    const requiredLevel = tierLevels[requiredTier as keyof typeof tierLevels] || 0;
    return userLevel >= requiredLevel;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isProcessing) {
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

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-white';
      case 'system': return 'text-terminal-green';
      case 'success': return 'text-terminal-green';
      case 'error': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="h-full bg-black rounded-lg border border-gray-700 flex flex-col">
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

      {/* Terminal Content */}
      <div ref={terminalRef} className="flex-1 p-4 font-mono text-sm overflow-y-auto" data-testid="terminal-content">
        {lines.map((line, index) => (
          <div key={index} className={`${getLineColor(line.type)} whitespace-pre-wrap`}>
            {line.text}
          </div>
        ))}
        
        {/* Current prompt */}
        {!isProcessing && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-terminal-green mr-2">blackraven@psychproject:~$</span>
            <Input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none p-0 text-white focus:ring-0 focus:outline-none font-mono"
              placeholder=""
              autoComplete="off"
              disabled={isProcessing}
              data-testid="terminal-input"
            />
          </form>
        )}
        
        {isProcessing && (
          <div className="text-terminal-amber">
            blackraven@psychproject:~$ <span className="animate-pulse">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
}
