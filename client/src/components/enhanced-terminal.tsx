import { useState, useEffect, useRef } from "react";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";
import { FrequencyCommandVisualizer } from "./frequency-command-visualizer";

interface EnhancedTerminalProps {}

export function EnhancedTerminal({}: EnhancedTerminalProps = {}) {
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFrequencyViz, setShowFrequencyViz] = useState(false);
  const [currentFrequency, setCurrentFrequency] = useState(10);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    const bootSequence = [
      "[SYSTEM] _Fq Brainwave System v3.0.0 - OPEN ACCESS",
      "[BOOT] Initializing frequency training environment...",
      "[ACCESS] Open Access Mode - All frequencies available",
      "[INFO] Welcome to brainwave frequency training",
      "[FREQ] Alpha (8-12Hz) | Beta (12-30Hz) | Theta (4-8Hz) | Gamma (30-100+Hz)",
      "",
      "Type 'help' to see available commands.",
      ""
    ];
    setOutput(bootSequence);
  }, []);

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
    addToOutput([`operative@fq_system:~$ ${command}`]);

    switch (cmd) {
      case 'help':
        addToOutput([
          "Available Commands:",
          "  help          - Display this help message",
          "  frequencies   - Show brainwave frequency bands",
          "  alpha         - Access Alpha wave training (8-12 Hz)",
          "  beta          - Access Beta wave training (12-30 Hz)", 
          "  theta         - Access Theta wave training (4-8 Hz)",
          "  gamma         - Access Gamma wave training (30-100+ Hz)",
          "  sacred        - Activate sacred geometry wheel visualization",
          "  geomatry      - Alternative sacred geometry command",
          "  wheel [freq]  - Show frequency wheel at specific Hz",
          "  elliptic      - High-speed elliptical pattern warning mode",
          "  status        - Show system status",
          "  clear         - Clear terminal screen",
          "  exit          - Terminate session"
        ]);
        break;

      case 'status':
        addToOutput([
          "System Status:",
          "Access Level: OPEN ACCESS",
          "Available Frequencies: ALL",
          "Session: ACTIVE",
          "Mode: TRAINING READY"
        ]);
        break;

      case 'frequencies':
        addToOutput([
          "Brainwave Frequency Bands - All Available:",
          "",
          "Alpha (8-12 Hz)  - Relaxed wakefulness, creative flow",
          "Beta (12-30 Hz)  - Alert thinking, problem solving", 
          "Theta (4-8 Hz)   - Deep processing, creative insights",
          "Gamma (30-100+Hz)- Peak performance, consciousness",
          "",
          "Use: alpha, beta, theta, or gamma commands to access training"
        ]);
        break;

      case 'alpha':
        addToOutput([
          "═══ ALPHA WAVE TRAINING (8-12 Hz) ═══",
          "",
          "Alpha waves promote relaxed wakefulness and creative flow states.",
          "Perfect for meditation, creative work, and stress reduction.",
          "",
          "Training modules:",
          "• Mindfulness meditation protocols",
          "• Creative visualization exercises", 
          "• Stress reduction techniques",
          "• Flow state induction",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'beta':
        addToOutput([
          "═══ BETA WAVE TRAINING (12-30 Hz) ═══",
          "",
          "Beta waves enhance alert thinking and analytical processing.",
          "Ideal for focus, concentration, and problem-solving tasks.",
          "",
          "Training modules:",
          "• Concentration enhancement protocols",
          "• Problem-solving methodologies",
          "• Analytical thinking exercises",
          "• Cognitive performance optimization",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'theta':
        addToOutput([
          "═══ THETA WAVE TRAINING (4-8 Hz) ═══",
          "",
          "Theta waves facilitate deep processing and creative insights.",
          "Associated with deep meditation and subconscious access.",
          "",
          "Training modules:",
          "• Deep meditation techniques",
          "• Memory consolidation protocols",
          "• Creative breakthrough exercises",
          "• Subconscious programming methods",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        break;

      case 'gamma':
        addToOutput([
          "═══ GAMMA WAVE TRAINING (30-100+ Hz) ═══",
          "",
          "Gamma waves represent peak cognitive performance and consciousness.",
          "Associated with heightened awareness and cognitive binding.",
          "",
          "Training modules:",
          "• Peak performance protocols",
          "• Consciousness expansion exercises", 
          "• Cognitive enhancement techniques",
          "• Advanced awareness training",
          "",
          "Status: AVAILABLE - Open Access"
        ]);
        setCurrentFrequency(50);
        setShowFrequencyViz(true);
        break;

      case 'sacred':
      case 'geomatry':
        addToOutput([
          "⚠ ACTIVATING SACRED GEOMETRY WHEEL ⚠",
          "",
          "Initializing 13-circle elliptical pattern...",
          "Complex triangular formations loading...",
          "Cross-sectional shape vectors active...",
          "",
          "WARNING: High-speed rotation with elliptical warning mode enabled",
          "Sacred geometry synchronization with brainwave frequencies active."
        ]);
        setCurrentFrequency(25);
        setShowFrequencyViz(true);
        break;

      case 'wheel':
        const freq = args[1] ? parseFloat(args[1]) : 15;
        if (isNaN(freq) || freq < 1 || freq > 100) {
          addToOutput(["Error: Invalid frequency. Use: wheel [1-100]"]);
        } else {
          addToOutput([
            `Activating frequency wheel at ${freq.toFixed(1)} Hz`,
            "Sacred geometry patterns synchronized to brainwave frequency",
            "13 alternating circles with complex triangular shapes active"
          ]);
          setCurrentFrequency(freq);
          setShowFrequencyViz(true);
        }
        break;

      case 'elliptic':
        addToOutput([
          "🔴 HIGH-SPEED ELLIPTICAL WARNING MODE ACTIVATED 🔴",
          "",
          "Elliptical distortion: 1.2x horizontal, 0.8x vertical",
          "13 circles alternating with complex directional triangles",
          "Cross-sectional broader shapes between intersections",
          "Rotation speed: MAXIMUM",
          "",
          "⚠ WARNING: Intense visual stimulation active ⚠",
          "Self-programming geometry goals will be computed..."
        ]);
        setCurrentFrequency(75);
        setShowFrequencyViz(true);
        break;

      case 'tier':
        addToOutput([
          "Access Level Information:",
          "Current access: OPEN ACCESS",
          "",
          "All brainwave frequency training available:",
          "• Alpha (8-12 Hz) - Relaxed awareness",
          "• Beta (12-30 Hz) - Alert thinking",
          "• Theta (4-8 Hz) - Deep processing", 
          "• Gamma (30-100+ Hz) - Peak performance",
          "",
          "Sacred geometry visualization: ENABLED"
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
          <span className="ml-4 text-gray-400 text-xs">_Fq Brainwave Terminal - Enhanced Mode</span>
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
            <span className="hidden sm:inline">operative@fq_system:~$</span>
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

      {/* Sacred Geometry Frequency Visualizer */}
      <FrequencyCommandVisualizer
        isVisible={showFrequencyViz}
        frequency={currentFrequency}
        duration={5000}
        onComplete={() => setShowFrequencyViz(false)}
      />
    </div>
  );
}