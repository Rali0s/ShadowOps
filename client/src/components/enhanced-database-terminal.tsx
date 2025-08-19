import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { User, DbDocument } from "@shared/schema";
import type { TerminalBuffers } from "./terminal-switches";
import { StatusIndicator, AccessibilitySymbol } from "./terminal-symbols";

interface EnhancedDatabaseTerminalProps {
  user: User;
  buffers: TerminalBuffers;
}

export function EnhancedDatabaseTerminal({ user, buffers }: EnhancedDatabaseTerminalProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'offline' | 'connecting' | 'online'>('offline');
  const [selectedDocument, setSelectedDocument] = useState<DbDocument | null>(null);
  const [lastAccessTime, setLastAccessTime] = useState<string>("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // React Query for database documents - connected to real API
  const { data: documents = [], refetch: refetchDocuments } = useQuery<DbDocument[]>({
    queryKey: ['/api/db-documents'],
    enabled: isConnected,
    refetchInterval: buffers.asyncMode ? 5000 : false, // Auto-refresh in async mode
  });

  // Mutation for document search with real API connection
  const searchMutation = useMutation({
    mutationFn: async (searchTerm: string) => {
      const response = await apiRequest('POST', '/api/db-documents/search', { searchTerm });
      return await response.json();
    },
    onSuccess: (results: DbDocument[]) => {
      if (results.length === 0) {
        addToOutput([`[SEARCH] No documents found matching search criteria`]);
      } else {
        addToOutput([
          `[SEARCH] Found ${results.length} document(s):`,
          ...results.map(doc => `  ${doc.documentId} - ${doc.title} [${doc.accessLevel.toUpperCase()}]`)
        ]);
      }
    },
    onError: (error) => {
      addToOutput([`[ERROR] Search failed: ${error.message}`]);
    }
  });

  // Mutation for individual document retrieval
  const getDocumentMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const response = await apiRequest('GET', `/api/db-documents/${documentId}`);
      return await response.json();
    },
    onSuccess: (document: DbDocument) => {
      setSelectedDocument(document);
      setLastAccessTime(new Date().toISOString());
      addToOutput([
        `[ACCESS] Document ${document.documentId} retrieved`,
        `Title: ${document.title}`,
        `Classification: ${document.classification}`,
        `File Size: ${document.fileSize} bytes`,
        "────────────────────────────────────",
        ...document.content.split('\n'),
        "────────────────────────────────────",
        `[INFO] Document accessed at ${new Date().toLocaleString()}`,
        buffers.logEnabled ? `[LOG] Access logged for user: ${user.username}` : ""
      ].filter(Boolean));
    },
    onError: (error: any) => {
      if (error.message.includes('403')) {
        const errorData = JSON.parse(error.message);
        addToOutput([
          `[ACCESS DENIED] Document requires ${errorData.requiredTier.toUpperCase()} clearance`,
          `[INFO] Your current clearance: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
          `[SYSTEM] Upgrade subscription to access this document`
        ]);
      } else if (error.message.includes('404')) {
        addToOutput([`[ERROR] Document not found in database`]);
      } else {
        addToOutput([`[ERROR] Failed to retrieve document: ${error.message}`]);
      }
    }
  });

  // Boot sequence with buffer integration and useState operations
  useEffect(() => {
    const bootSequence = [
      "[SYSTEM] BlackRaven OS v2.1.0 - Enhanced Database Terminal",
      `[INIT] React useState operations: ACTIVE`,
      `[INIT] TanStack Query integration: ENABLED`,
      `[AUTH] User: ${user.username}@blackraven.sys`,
      `[CLEARANCE] Tier: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`,
      `[BUFFER] Session: ${buffers.sessionId}`,
      `[CONFIG] Async Mode: ${buffers.asyncMode ? 'ENABLED' : 'DISABLED'}`,
      `[CONFIG] Secure Mode: ${buffers.secureMode ? 'ENFORCED' : 'STANDARD'}`,
      `[CONFIG] Debug: ${buffers.debugMode ? 'ON' : 'OFF'} | Logging: ${buffers.logEnabled ? 'ON' : 'OFF'}`,
      "",
      "Enhanced Commands: db-connect, db-list, db-read, db-search, db-status, db-refresh",
      "Terminal Commands: help, clear, exit, buffers, connection-test",
      "React State: useState operations linked to database queries",
      ""
    ];
    setOutput(bootSequence);
  }, [user, buffers]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addToOutput = (newLines: string[]) => {
    setOutput(prev => [...prev, ...newLines]);
  };

  // Enhanced database connection with real useState operations
  const connectToDatabase = async () => {
    setConnectionStatus('connecting');
    const connectOutput = [...output];
    
    connectOutput.push(
      `${user.username}@blackraven:~$ db-connect`,
      "[DB] Initiating secure database connection...",
      `[STATE] React useState: connectionStatus -> 'connecting'`,
      `[QUERY] TanStack Query cache: initializing`,
      `[AUTH] Verifying clearance level: ${user.subscriptionTier?.toUpperCase() || 'NONE'}`
    );

    // Simulate realistic connection process with useState updates
    for (let i = 0; i < 3; i++) {
      connectOutput.push(`[DB] Connection attempt ${i + 1}/3...`);
      setOutput([...connectOutput]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      // Real API call to test connection
      await queryClient.prefetchQuery({
        queryKey: ['/api/db-documents'],
        queryFn: async () => {
          const response = await apiRequest('GET', '/api/db-documents');
          return await response.json();
        }
      });

      setIsConnected(true);
      setConnectionStatus('online');
      
      connectOutput.push(
        "[DB] ✓ Database connection established",
        `[STATE] React useState: isConnected -> true`,
        `[STATE] React useState: connectionStatus -> 'online'`,
        `[QUERY] Document cache populated: ${documents.length} documents available`,
        "[SYSTEM] Enhanced terminal ready for operations",
        buffers.logEnabled ? `[LOG] Connection established by ${user.username}` : ""
      );
    } catch (error) {
      setConnectionStatus('offline');
      connectOutput.push(
        "[DB] ✗ Connection failed",
        `[STATE] React useState: connectionStatus -> 'offline'`,
        `[ERROR] ${error}`,
        "[SYSTEM] Check authentication and try again"
      );
    }

    setOutput(connectOutput);
  };

  const processCommand = async (cmd: string) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();

    addToOutput([`${user.username}@blackraven:~$ ${cmd}`]);

    switch (command) {
      case 'help':
        addToOutput([
          "BlackRaven Enhanced Database Terminal Commands:",
          "",
          "Database Operations:",
          "  db-connect     - Establish secure database connection",
          "  db-list        - List accessible documents (React Query)",
          "  db-read [ID]   - Read document content (useState mutation)",
          "  db-search [term] - Search documents (async mutation)",
          "  db-status      - Show connection and state status",
          "  db-refresh     - Manually refresh document cache",
          "",
          "Terminal Commands:",
          "  help           - Show this help message",
          "  clear          - Clear terminal output",
          "  buffers        - Display React state and buffer values",
          "  connection-test - Test database connectivity",
          "  exit           - Close database session",
          ""
        ]);
        break;

      case 'db-connect':
        await connectToDatabase();
        break;

      case 'db-list':
        if (!isConnected) {
          addToOutput(["[ERROR] Database not connected. Use 'db-connect' first."]);
        } else {
          addToOutput([
            "[LIST] Fetching documents via React Query...",
            `[STATE] Documents in cache: ${documents.length}`,
            `[ACCESS] Available documents for ${user.subscriptionTier?.toUpperCase() || 'NONE'} clearance:`,
            ""
          ]);
          
          if (documents.length === 0) {
            addToOutput(["[INFO] No documents available for your clearance level"]);
          } else {
            documents.forEach(doc => {
              addToOutput([
                `  ${doc.documentId} - ${doc.title}`,
                `    Classification: ${doc.classification}`,
                `    Access Level: ${doc.accessLevel.toUpperCase()}`,
                `    Size: ${doc.fileSize} bytes`,
                ""
              ]);
            });
          }
        }
        break;

      case 'db-read':
        if (!isConnected) {
          addToOutput(["[ERROR] Database not connected. Use 'db-connect' first."]);
        } else if (args.length < 2) {
          addToOutput(["[ERROR] Usage: db-read [document_id]"]);
        } else {
          const docId = args[1].toUpperCase();
          addToOutput([
            `[READ] Retrieving document ${docId} via useState mutation...`,
            `[STATE] Executing getDocumentMutation.mutate('${docId}')`
          ]);
          getDocumentMutation.mutate(docId);
        }
        break;

      case 'db-search':
        if (!isConnected) {
          addToOutput(["[ERROR] Database not connected. Use 'db-connect' first."]);
        } else if (args.length < 2) {
          addToOutput(["[ERROR] Usage: db-search [search_term]"]);
        } else {
          const searchTerm = args.slice(1).join(' ');
          addToOutput([
            `[SEARCH] Executing search mutation for: "${searchTerm}"`,
            `[STATE] searchMutation.mutate('${searchTerm}')`
          ]);
          searchMutation.mutate(searchTerm);
        }
        break;

      case 'db-status':
        addToOutput([
          "Database Connection Status:",
          `  Connection: ${connectionStatus.toUpperCase()}`,
          `  Connected: ${isConnected}`,
          `  Documents Cached: ${documents.length}`,
          `  Last Document Access: ${lastAccessTime || 'None'}`,
          `  Selected Document: ${selectedDocument?.documentId || 'None'}`,
          "",
          "React State Values:",
          `  isConnected: ${isConnected}`,
          `  connectionStatus: '${connectionStatus}'`,
          `  selectedDocument: ${selectedDocument ? 'Set' : 'null'}`,
          `  Query Status: ${documents.length > 0 ? 'Cached' : 'Empty'}`,
          ""
        ]);
        break;

      case 'db-refresh':
        if (!isConnected) {
          addToOutput(["[ERROR] Database not connected. Use 'db-connect' first."]);
        } else {
          addToOutput([
            "[REFRESH] Invalidating React Query cache...",
            "[STATE] queryClient.invalidateQueries(['/api/db-documents'])"
          ]);
          await queryClient.invalidateQueries({ queryKey: ['/api/db-documents'] });
          await refetchDocuments();
          addToOutput([
            `[REFRESH] Cache refreshed - ${documents.length} documents available`
          ]);
        }
        break;

      case 'connection-test':
        addToOutput([
          "[TEST] Testing database connectivity...",
          `[STATE] Current connection state: ${connectionStatus}`
        ]);
        try {
          const response = await apiRequest('GET', '/api/db-documents');
          addToOutput([
            "[TEST] ✓ API endpoint responding",
            `[TEST] Response status: ${response.status}`,
            "[TEST] Database connectivity confirmed"
          ]);
        } catch (error) {
          addToOutput([
            "[TEST] ✗ Connection test failed",
            `[ERROR] ${error}`
          ]);
        }
        break;

      case 'buffers':
        addToOutput([
          "React State & Buffer Values:",
          "",
          "React useState States:",
          `  isConnected: ${isConnected}`,
          `  connectionStatus: '${connectionStatus}'`,
          `  selectedDocument: ${selectedDocument ? selectedDocument.documentId : 'null'}`,
          `  lastAccessTime: '${lastAccessTime}'`,
          `  output.length: ${output.length}`,
          `  commandHistory.length: ${commandHistory.length}`,
          "",
          "Terminal Buffers:",
          `  DEBUG_MODE: ${buffers.debugMode}`,
          `  SECURE_MODE: ${buffers.secureMode}`,
          `  LOG_ENABLED: ${buffers.logEnabled}`,
          `  ASYNC_MODE: ${buffers.asyncMode}`,
          `  DB_CONNECTED: ${buffers.dbConnected}`,
          "",
          "Query Cache Status:",
          `  Documents Query: ${documents.length > 0 ? 'Cached' : 'Empty'}`,
          `  Search Mutation: ${searchMutation.isPending ? 'Pending' : 'Idle'}`,
          `  Document Mutation: ${getDocumentMutation.isPending ? 'Pending' : 'Idle'}`,
          ""
        ]);
        break;

      case 'clear':
        setOutput([]);
        break;

      case 'exit':
        addToOutput([
          "[SYSTEM] Closing database session...",
          `[STATE] Setting isConnected -> false`,
          `[QUERY] Clearing React Query cache`
        ]);
        setIsConnected(false);
        setConnectionStatus('offline');
        setSelectedDocument(null);
        queryClient.clear();
        addToOutput(["[SYSTEM] Session terminated"]);
        break;

      default:
        if (cmd.trim()) {
          addToOutput([
            `Command not found: ${command}`,
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
    <div className="h-full bg-black rounded-lg border border-gray-700 overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-2 sm:px-4 py-1 sm:py-2 flex items-center justify-between border-b border-gray-600">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 sm:ml-4 text-gray-400 text-xs hidden sm:inline">BlackRaven Enhanced DB Terminal</span>
          <span className="ml-2 text-gray-400 text-xs sm:hidden">DB Terminal</span>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-gray-400">
          <StatusIndicator status={connectionStatus === 'online' ? 'online' : connectionStatus === 'connecting' ? 'processing' : 'offline'} />
          <AccessibilitySymbol type="Database" />
          <span className="text-terminal-red-muted hidden sm:inline">React Query: {documents.length}</span>
          <span className="text-terminal-red-muted sm:hidden">RQ: {documents.length}</span>
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
            <span className="hidden sm:inline">{user.username}@blackraven:~$</span>
            <span className="sm:hidden">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-terminal-red-primary text-xs sm:text-sm"
            data-testid="input-terminal-command"
            autoComplete="off"
            placeholder="Enter command..."
          />
        </form>
      </div>
    </div>
  );
}