import { useState, useEffect, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { User } from "@shared/schema";
import type { TerminalBuffers } from "./terminal-switches";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";

interface DatabaseTerminalProps {
  user: User;
  buffers: TerminalBuffers;
}

interface DatabaseDocument {
  id: string;
  title: string;
  content: string;
  classification: string;
  accessLevel: string;
}

export function DatabaseTerminal({ user, buffers }: DatabaseTerminalProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnecting, setIsConnecting] = useState(false);
  const [dbDocuments, setDbDocuments] = useState<DatabaseDocument[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence with buffer integration
  useEffect(() => {
    const bootSequence = [
      "[SYSTEM] BlackRaven OS v2.0.1 - Database Terminal",
      `[BOOT] Initializing database connection... ${buffers.dbConnected ? '[OK]' : '[PENDING]'}`,
      `[AUTH] User: ${buffers.currentUser}@${buffers.targetSystem}`,
      `[BUFFER] Session: ${buffers.sessionId}`,
      `[CONFIG] Timeout: ${buffers.connectionTimeout}ms | Retries: ${buffers.retryCount}`,
      `[SECURITY] Mode: ${buffers.secureMode ? 'SECURE' : 'STANDARD'} | Debug: ${buffers.debugMode ? 'ON' : 'OFF'}`,
      "",
      "Database Commands: db-connect, db-list, db-read, db-search, db-status, db-logs",
      "Terminal Commands: help, clear, exit, buffers",
      ""
    ];
    setOutput(bootSequence);
  }, [buffers]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Simulated database connection
  const connectToDatabase = async () => {
    setIsConnecting(true);
    const connectOutput = [...output];
    
    connectOutput.push(
      `${buffers.currentUser}@${buffers.targetSystem}:~${buffers.commandPrefix} db-connect`,
      "[DB] Initiating secure connection...",
      `[DB] Timeout set to ${buffers.connectionTimeout}ms`,
      `[DB] Retry attempts: ${buffers.retryCount}`
    );

    // Simulate connection delay
    for (let i = 0; i < 3; i++) {
      connectOutput.push(`[DB] Attempting connection... [${i + 1}/${buffers.retryCount}]`);
      setOutput([...connectOutput]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (buffers.dbConnected) {
      connectOutput.push(
        "[DB] Connection established successfully",
        "[DB] Loading document index...",
        "[DB] Access granted to classified documents"
      );

      // Load sample documents
      const sampleDocs: DatabaseDocument[] = [
        {
          id: "DOC_001",
          title: "Project Treadstone - Phase I",
          content: "Classified psychological conditioning protocols for operative training. Memory reconstruction techniques and trigger implantation procedures.",
          classification: "TOP SECRET",
          accessLevel: "SHADOW"
        },
        {
          id: "DOC_002", 
          title: "BlackRaven Training Manual",
          content: "Comprehensive cybersecurity training methodology. Social engineering countermeasures and digital forensics protocols.",
          classification: "SECRET",
          accessLevel: "OPERATOR"
        },
        {
          id: "DOC_003",
          title: "Operative Assessment Criteria",
          content: "Psychological evaluation metrics for determining operative readiness. Stress response testing and loyalty verification procedures.",
          classification: "CONFIDENTIAL",
          accessLevel: "RECRUIT"
        }
      ];
      
      setDbDocuments(sampleDocs);
      connectOutput.push(`[DB] Loaded ${sampleDocs.length} documents from archive`);
    } else {
      connectOutput.push(
        "[DB] Connection failed - Database offline",
        "[DB] Enable DB_CONNECTED switch to establish connection"
      );
    }

    setOutput([...connectOutput, ""]);
    setIsConnecting(false);
  };

  const processCommand = async (command: string) => {
    const trimmed = command.trim();
    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    const newOutput = [
      ...output, 
      `${buffers.currentUser}@${buffers.targetSystem}:~${buffers.commandPrefix} ${command}`
    ];

    switch (cmd) {
      case 'help':
        newOutput.push(
          "Database Terminal Commands:",
          "  db-connect    - Connect to document database",
          "  db-list       - List available documents",
          "  db-read [id]  - Read document by ID",
          "  db-search [term] - Search documents",
          "  db-status     - Show database status",
          "  db-logs       - Show access logs",
          "  buffers       - Display current buffer values",
          "  clear         - Clear terminal",
          "  exit          - Return to main terminal"
        );
        break;

      case 'db-connect':
        await connectToDatabase();
        return;

      case 'db-status':
        newOutput.push(
          "Database Status Report:",
          `Connection: ${buffers.dbConnected ? 'ACTIVE' : 'INACTIVE'}`,
          `Documents: ${dbDocuments.length} loaded`,
          `Security Mode: ${buffers.secureMode ? 'ENABLED' : 'DISABLED'}`,
          `Buffer Size: ${buffers.bufferSize} bytes`,
          `Session: ${buffers.sessionId}`
        );
        break;

      case 'db-list':
        if (!buffers.dbConnected) {
          newOutput.push("[ERROR] Database not connected. Use 'db-connect' first.");
        } else if (dbDocuments.length === 0) {
          newOutput.push("[INFO] No documents available.");
        } else {
          newOutput.push("Available Documents:");
          dbDocuments.forEach(doc => {
            const hasAccess = canAccessDocument(doc.accessLevel);
            const status = hasAccess ? '[ACCESSIBLE]' : '[CLASSIFIED]';
            newOutput.push(`  ${doc.id} - ${doc.title} - ${doc.classification} ${status}`);
          });
        }
        break;

      case 'db-read':
        if (!buffers.dbConnected) {
          newOutput.push("[ERROR] Database not connected. Use 'db-connect' first.");
        } else if (args.length < 2) {
          newOutput.push("[ERROR] Usage: db-read [document_id]");
        } else {
          const docId = args[1].toUpperCase();
          const document = dbDocuments.find(doc => doc.id === docId);
          
          if (!document) {
            newOutput.push(`[ERROR] Document ${docId} not found.`);
          } else if (!canAccessDocument(document.accessLevel)) {
            newOutput.push(
              `[ACCESS DENIED] Document ${docId} requires ${document.accessLevel} clearance.`,
              `Your current level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`
            );
          } else {
            newOutput.push(
              `Document: ${document.id}`,
              `Title: ${document.title}`,
              `Classification: ${document.classification}`,
              "────────────────────────────────────",
              document.content,
              "────────────────────────────────────",
              "[END OF DOCUMENT]"
            );
            
            if (buffers.logEnabled) {
              newOutput.push(`[LOG] Document ${docId} accessed by ${buffers.currentUser}`);
            }
          }
        }
        break;

      case 'db-search':
        if (!buffers.dbConnected) {
          newOutput.push("[ERROR] Database not connected. Use 'db-connect' first.");
        } else if (args.length < 2) {
          newOutput.push("[ERROR] Usage: db-search [search_term]");
        } else {
          const searchTerm = args.slice(1).join(' ').toLowerCase();
          const results = dbDocuments.filter(doc => 
            canAccessDocument(doc.accessLevel) && 
            (doc.title.toLowerCase().includes(searchTerm) || 
             doc.content.toLowerCase().includes(searchTerm))
          );
          
          if (results.length === 0) {
            newOutput.push(`[INFO] No accessible documents found matching: ${searchTerm}`);
          } else {
            newOutput.push(`Search Results for: ${searchTerm}`);
            results.forEach(doc => {
              newOutput.push(`  ${doc.id} - ${doc.title}`);
            });
          }
        }
        break;

      case 'db-logs':
        if (!buffers.dbConnected) {
          newOutput.push("[ERROR] Database not connected. Use 'db-connect' first.");
        } else if (!buffers.logEnabled) {
          newOutput.push("[INFO] Logging is disabled. Enable LOG_ENABLED switch.");
        } else {
          newOutput.push(
            "Recent Access Logs:",
            `[${new Date().toISOString()}] ${buffers.currentUser} - Session started`,
            `[${new Date().toISOString()}] ${buffers.currentUser} - Database connected`,
            `[${new Date().toISOString()}] ${buffers.currentUser} - Document access logged`
          );
        }
        break;

      case 'buffers':
        newOutput.push(
          "Current Buffer Values:",
          `Boolean Switches:`,
          `  DEBUG_MODE: ${buffers.debugMode}`,
          `  SECURE_MODE: ${buffers.secureMode}`,
          `  LOG_ENABLED: ${buffers.logEnabled}`,
          `  ASYNC_MODE: ${buffers.asyncMode}`,
          `  DB_CONNECTED: ${buffers.dbConnected}`,
          `Variable Buffers:`,
          `  CURRENT_USER: ${buffers.currentUser}`,
          `  SESSION_ID: ${buffers.sessionId}`,
          `  TARGET_SYSTEM: ${buffers.targetSystem}`,
          `Integer Buffers:`,
          `  CONNECTION_TIMEOUT: ${buffers.connectionTimeout}`,
          `  RETRY_COUNT: ${buffers.retryCount}`,
          `  BUFFER_SIZE: ${buffers.bufferSize}`,
          `Character Buffers:`,
          `  COMMAND_PREFIX: ${buffers.commandPrefix}`,
          `  SEPARATOR: ${buffers.separator}`,
          `  TERMINATOR: ${buffers.terminator}`
        );
        break;

      case 'clear':
        setOutput([]);
        return;

      case 'exit':
        newOutput.push("Returning to main terminal...");
        setTimeout(() => {
          window.location.href = '/terminal';
        }, 1000);
        break;

      case '':
        break;

      default:
        newOutput.push(
          `Command not found: ${cmd}`,
          "Type 'help' for available commands."
        );
        break;
    }

    newOutput.push("");
    setOutput(newOutput);
  };

  const canAccessDocument = (requiredLevel: string) => {
    const tierLevels = { none: 0, recruit: 1, operator: 2, shadow: 3 };
    const userLevel = tierLevels[user.subscriptionTier as keyof typeof tierLevels] || 0;
    const requiredTierLevel = tierLevels[requiredLevel.toLowerCase() as keyof typeof tierLevels] || 0;
    return userLevel >= requiredTierLevel;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() && !isConnecting) {
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
      <div className="bg-terminal-burgundy px-4 py-2 flex items-center justify-between border-b border-terminal-red-muted">
        <div className="flex items-center space-x-2">
          <StatusIndicator status="error" size="sm" />
          <StatusIndicator status="warning" size="sm" />
          <StatusIndicator status={buffers.dbConnected ? "online" : "offline"} size="sm" />
          <AccessibilitySymbol type="Database" className="w-4 h-4 ml-2" />
          <span className="ml-2 text-terminal-red-bright text-sm font-mono">Database Terminal v2.0.1</span>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIndicator status={buffers.dbConnected ? "online" : "offline"} size="sm" />
          <span className="text-xs text-terminal-red-secondary font-mono">
            {buffers.currentUser}@{buffers.targetSystem} | DB: {buffers.dbConnected ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm" data-testid="database-terminal">
        {output.map((line, index) => (
          <div key={index} className={
            line.startsWith('[SYSTEM]') || line.startsWith('[BOOT]') ? 'text-terminal-red-primary' :
            line.includes('[ERROR]') || line.includes('[ACCESS DENIED]') ? 'text-terminal-scarlet' :
            line.includes('[DB]') ? 'text-terminal-red-secondary' :
            line.includes('[LOG]') ? 'text-terminal-amber' :
            line.includes('[ACCESSIBLE]') ? 'text-terminal-red-bright' :
            line.includes('[CLASSIFIED]') ? 'text-terminal-red-muted' :
            line.startsWith('[') ? 'text-terminal-orange' :
            'text-gray-300'
          }>
            {line.includes('[ACCESSIBLE]') && (
              <AccessibilitySymbol type="Accessible" className="inline w-3 h-3 mr-1" />
            )}
            {line.includes('[CLASSIFIED]') && (
              <AccessibilitySymbol type="Classified" className="inline w-3 h-3 mr-1" />
            )}
            {line.includes('[ERROR]') && (
              <AccessibilitySymbol type="Error" className="inline w-3 h-3 mr-1" />
            )}
            {line.includes('[DB]') && (
              <AccessibilitySymbol type="Database" className="inline w-3 h-3 mr-1" />
            )}
            {line}
          </div>
        ))}
        
        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <AccessibilitySymbol type="Command" className="inline w-3 h-3 mr-1" />
          <span className="text-terminal-red-primary mr-2">
            {buffers.currentUser}@{buffers.targetSystem}:~{buffers.commandPrefix}
          </span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isConnecting}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono disabled:opacity-50"
            autoComplete="off"
            autoFocus
            data-testid="database-terminal-input"
          />
          {isConnecting && (
            <span className="text-yellow-400 ml-2">CONNECTING...</span>
          )}
        </form>
      </div>
    </div>
  );
}