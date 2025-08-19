import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TerminalSwitchesProps {
  onBufferChange: (buffers: TerminalBuffers) => void;
  isConnected: boolean;
}

export interface TerminalBuffers {
  // Boolean switches
  debugMode: boolean;
  secureMode: boolean;
  logEnabled: boolean;
  asyncMode: boolean;
  dbConnected: boolean;
  
  // Variable buffers
  currentUser: string;
  sessionId: string;
  targetSystem: string;
  
  // Integer buffers
  connectionTimeout: number;
  retryCount: number;
  bufferSize: number;
  
  // Character buffers
  commandPrefix: string;
  separator: string;
  terminator: string;
}

export function TerminalSwitches({ onBufferChange, isConnected }: TerminalSwitchesProps) {
  const [buffers, setBuffers] = useState<TerminalBuffers>({
    // Boolean switches - default operational state
    debugMode: false,
    secureMode: true,
    logEnabled: true,
    asyncMode: true,
    dbConnected: false,
    
    // Variable buffers
    currentUser: "operative",
    sessionId: "",
    targetSystem: "psychproject",
    
    // Integer buffers
    connectionTimeout: 5000,
    retryCount: 3,
    bufferSize: 1024,
    
    // Character buffers
    commandPrefix: "$",
    separator: "|",
    terminator: ";"
  });

  // Generate session ID on mount
  useEffect(() => {
    const sessionId = `SESS_${Date.now().toString(36).toUpperCase()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    updateBuffer('sessionId', sessionId);
  }, []);

  // Auto-detect database connection
  useEffect(() => {
    if (isConnected) {
      updateBuffer('dbConnected', true);
    }
  }, [isConnected]);

  const updateBuffer = useCallback((key: keyof TerminalBuffers, value: any) => {
    setBuffers(prev => ({ ...prev, [key]: value }));
  }, []);

  // Update parent when buffers change
  useEffect(() => {
    onBufferChange(buffers);
  }, [buffers, onBufferChange]);

  const handleAsyncToggle = async (key: keyof TerminalBuffers, value: boolean) => {
    // Simulate async operation for critical switches
    if (key === 'secureMode' || key === 'dbConnected') {
      updateBuffer('asyncMode', true);
      
      // Simulate async delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateBuffer(key, value);
      updateBuffer('asyncMode', false);
    } else {
      updateBuffer(key, value);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-terminal-bg/90 rounded-lg border border-terminal-red-muted">
      <div className="text-center">
        <h3 className="text-terminal-red-primary font-mono text-xs sm:text-sm font-bold">
          TERMINAL BUFFER CONTROL SYSTEM
        </h3>
        <div className="text-xs text-gray-400 mt-1 truncate">
          Session: {buffers.sessionId || 'INITIALIZING...'}
        </div>
      </div>

      {/* Boolean Switches */}
      <Card className="bg-terminal-burgundy border-terminal-red-muted">
        <CardHeader className="pb-2 sm:pb-3">
          <CardTitle className="text-terminal-red-primary text-xs sm:text-sm font-mono">
            BOOLEAN SWITCHES
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="debug-mode"
                checked={buffers.debugMode}
                onCheckedChange={(checked) => handleAsyncToggle('debugMode', checked)}
                data-testid="switch-debug-mode"
              />
              <Label htmlFor="debug-mode" className="text-xs font-mono text-gray-300">
                DEBUG_MODE
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="secure-mode"
                checked={buffers.secureMode}
                onCheckedChange={(checked) => handleAsyncToggle('secureMode', checked)}
                data-testid="switch-secure-mode"
              />
              <Label htmlFor="secure-mode" className="text-xs font-mono text-gray-300">
                SECURE_MODE
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="log-enabled"
                checked={buffers.logEnabled}
                onCheckedChange={(checked) => updateBuffer('logEnabled', checked)}
                data-testid="switch-log-enabled"
              />
              <Label htmlFor="log-enabled" className="text-xs font-mono text-gray-300">
                LOG_ENABLED
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="async-mode"
                checked={buffers.asyncMode}
                disabled={true}
                data-testid="switch-async-mode"
              />
              <Label htmlFor="async-mode" className="text-xs font-mono text-gray-400">
                ASYNC_MODE
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 col-span-2">
              <Switch
                id="db-connected"
                checked={buffers.dbConnected}
                onCheckedChange={(checked) => handleAsyncToggle('dbConnected', checked)}
                data-testid="switch-db-connected"
              />
              <Label htmlFor="db-connected" className="text-xs font-mono text-gray-300">
                DB_CONNECTED
              </Label>
              <span className={`text-xs ml-2 ${buffers.dbConnected ? 'text-green-400' : 'text-red-400'}`}>
                [{buffers.dbConnected ? 'ONLINE' : 'OFFLINE'}]
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variable Buffers */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-terminal-green text-sm font-mono">
            VARIABLE BUFFERS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="current-user" className="text-xs font-mono text-gray-300">
              CURRENT_USER
            </Label>
            <Input
              id="current-user"
              value={buffers.currentUser}
              onChange={(e) => updateBuffer('currentUser', e.target.value)}
              className="bg-black border-gray-600 text-terminal-green font-mono text-sm"
              data-testid="input-current-user"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="target-system" className="text-xs font-mono text-gray-300">
              TARGET_SYSTEM
            </Label>
            <Input
              id="target-system"
              value={buffers.targetSystem}
              onChange={(e) => updateBuffer('targetSystem', e.target.value)}
              className="bg-black border-gray-600 text-terminal-green font-mono text-sm"
              data-testid="input-target-system"
            />
          </div>
        </CardContent>
      </Card>

      {/* Integer Buffers */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-terminal-green text-sm font-mono">
            INTEGER BUFFERS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label htmlFor="connection-timeout" className="text-xs font-mono text-gray-300">
                CONNECTION_TIMEOUT (ms)
              </Label>
              <Input
                id="connection-timeout"
                type="number"
                value={buffers.connectionTimeout}
                onChange={(e) => updateBuffer('connectionTimeout', parseInt(e.target.value) || 0)}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm"
                data-testid="input-connection-timeout"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retry-count" className="text-xs font-mono text-gray-300">
                RETRY_COUNT
              </Label>
              <Input
                id="retry-count"
                type="number"
                value={buffers.retryCount}
                onChange={(e) => updateBuffer('retryCount', parseInt(e.target.value) || 0)}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm"
                data-testid="input-retry-count"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buffer-size" className="text-xs font-mono text-gray-300">
                BUFFER_SIZE (bytes)
              </Label>
              <Input
                id="buffer-size"
                type="number"
                value={buffers.bufferSize}
                onChange={(e) => updateBuffer('bufferSize', parseInt(e.target.value) || 0)}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm"
                data-testid="input-buffer-size"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Character Buffers */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-terminal-green text-sm font-mono">
            CHARACTER BUFFERS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="command-prefix" className="text-xs font-mono text-gray-300">
                CMD_PREFIX
              </Label>
              <Input
                id="command-prefix"
                value={buffers.commandPrefix}
                onChange={(e) => updateBuffer('commandPrefix', e.target.value.substring(0, 1))}
                maxLength={1}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm text-center"
                data-testid="input-command-prefix"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="separator" className="text-xs font-mono text-gray-300">
                SEPARATOR
              </Label>
              <Input
                id="separator"
                value={buffers.separator}
                onChange={(e) => updateBuffer('separator', e.target.value.substring(0, 1))}
                maxLength={1}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm text-center"
                data-testid="input-separator"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="terminator" className="text-xs font-mono text-gray-300">
                TERMINATOR
              </Label>
              <Input
                id="terminator"
                value={buffers.terminator}
                onChange={(e) => updateBuffer('terminator', e.target.value.substring(0, 1))}
                maxLength={1}
                className="bg-black border-gray-600 text-terminal-green font-mono text-sm text-center"
                data-testid="input-terminator"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Display */}
      <div className="text-xs font-mono text-gray-400 text-center">
        Buffer Status: {buffers.asyncMode ? 'PROCESSING...' : 'READY'} | 
        Security: {buffers.secureMode ? 'ENABLED' : 'DISABLED'} | 
        Debug: {buffers.debugMode ? 'ON' : 'OFF'}
      </div>
    </div>
  );
}