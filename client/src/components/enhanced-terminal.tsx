import { useState, useEffect, useRef } from "react";
import type { User } from "@shared/schema";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";

interface EnhancedTerminalProps {
  user: User;
}

export function EnhancedTerminal({ user }: EnhancedTerminalProps) {
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

  const addToOutput = (lines: string[]) => {
    setOutput(prev => [...prev, ...lines]);
  };

  const processCommand = (command: string) => {
    const trimmed = command.trim();
    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    // Add command to output
    addToOutput([`${user.username}@psychproject:~$ ${command}`]);

    switch (cmd) {
      case 'help':
        addToOutput([
          "Available Commands:",
          "  help          - Display this help message",
          "  training      - Access training environment",
          "  tier          - Show subscription tier information",
          "  whoami        - Display user information",
          "  clear         - Clear terminal screen",
          "  exit          - Terminate session"
        ]);
        break;

      case 'whoami':
        addToOutput([
          `Username: ${user.username}`,
          `Access Level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
          `User ID: ${user.id}`,
          `Status: ACTIVE`
        ]);
        break;

      case 'training':
        const userTier = user.subscriptionTier || "none";
        addToOutput([
          "Training Environment Access:",
          `Current tier: ${userTier.toUpperCase()}`,
          "",
          "Available environments based on your tier:",
          ...(userTier === "shadow" ? ["• All training environments unlocked"] :
          userTier === "operator" ? ["• Advanced penetration testing"] :
          userTier === "operative" ? ["• Intermediate security scenarios"] :
          userTier === "recruit" ? ["• Basic cybersecurity training"] :
          ["• No training access - please upgrade subscription"])
        ]);
        break;

      case 'tier':
        const tier = user.subscriptionTier || "none";
        addToOutput([
          "Subscription Tier Information:",
          `Current tier: ${tier.toUpperCase()}`,
          "",
          "Available tiers:",
          "• NONE - Basic access only",
          "• RECRUIT - Basic cybersecurity training",
          "• OPERATIVE - Intermediate security scenarios", 
          "• OPERATOR - Advanced penetration testing",
          "• SHADOW - Complete access to all environments"
        ]);
        break;

      case 'clear':
        setOutput([]);
        break;

      case 'exit':
        addToOutput([
          "Terminating session...",
          "Connection closed."
        ]);
        break;

      default:
        if (trimmed) {
          addToOutput([
            `Command not found: ${cmd}`,
            "Type 'help' for available commands."
          ]);
        }
        break;
    }

    addToOutput([""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory(prev => [...prev, currentInput]);
      processCommand(currentInput);
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
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
    <div className="h-full bg-black rounded-lg border border-gray-700 overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-xs">BlackRaven Terminal - Enhanced Mode</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <StatusIndicator status="online" />
          <AccessibilitySymbol type="Classified" />
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-2 sm:p-4 h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)] overflow-y-auto bg-black text-terminal-red-primary text-xs sm:text-sm"
      >
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-1 sm:mt-2">
          <span className="text-terminal-red-bright mr-1 sm:mr-2 text-xs sm:text-sm">
            <span className="hidden sm:inline">{user.username}@psychproject:~$</span>
            <span className="sm:hidden">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-red-primary caret-terminal-red-bright text-xs sm:text-sm"
            autoFocus
            placeholder="Enter command..."
          />
        </form>
      </div>
    </div>
  );
}