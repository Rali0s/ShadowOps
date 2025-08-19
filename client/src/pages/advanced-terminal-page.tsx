import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { EnhancedDatabaseTerminal } from "@/components/enhanced-database-terminal";
import { TerminalSwitches, type TerminalBuffers } from "@/components/terminal-switches";
import { EnhancedTerminal } from "@/components/enhanced-terminal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function AdvancedTerminalPage() {
  const { user } = useAuth();
  const [terminalBuffers, setTerminalBuffers] = useState<TerminalBuffers>({
    debugMode: false,
    secureMode: true,
    logEnabled: true,
    asyncMode: false,
    dbConnected: false,
    currentUser: "operative",
    sessionId: "",
    targetSystem: "psychproject",
    connectionTimeout: 5000,
    retryCount: 3,
    bufferSize: 1024,
    commandPrefix: "$",
    separator: "|",
    terminator: ";"
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-terminal-red-primary font-mono">Authenticating...</div>
      </div>
    );
  }

  const handleBufferChange = (buffers: TerminalBuffers) => {
    setTerminalBuffers(buffers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-terminal-bg via-black to-terminal-red-dark p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Header */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-terminal-red-primary font-mono tracking-wide">
                BLACKRAVEN ADVANCED TERMINAL
              </h1>
              <p className="text-terminal-red-secondary mt-1 sm:mt-2 font-mono text-xs sm:text-sm">
                Advanced cybersecurity training environment with database access
              </p>
            </div>
            <div className="text-center sm:text-right text-xs sm:text-sm font-mono text-terminal-red-secondary">
              <div className="flex flex-col gap-1">
                <div>User: <span className="text-terminal-red-bright">{user.username}</span></div>
                <div>Clearance: <span className="text-terminal-red-primary font-bold">{user.subscriptionTier?.toUpperCase() || 'NONE'}</span></div>
                <div>Session: <span className="text-terminal-scarlet">{terminalBuffers.sessionId || 'INITIALIZING'}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Stack vertically on small screens */}
        <div className="block lg:hidden space-y-4">
          <div className="bg-terminal-bg/90 rounded-lg border border-terminal-red-muted p-3 sm:p-4">
            <h3 className="text-terminal-red-primary font-mono text-sm font-bold mb-4 text-center">
              CONTROL PANEL
            </h3>
            <TerminalSwitches 
              onBufferChange={handleBufferChange}
              isConnected={true}
            />
          </div>

          <Tabs defaultValue="database" className="h-full">
            <TabsList className="grid w-full grid-cols-3 bg-terminal-red-dark border-terminal-red-muted text-xs">
              <TabsTrigger 
                value="standard" 
                className="font-mono data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary px-1 py-2"
                data-testid="tab-standard-terminal"
              >
                STD
              </TabsTrigger>
              <TabsTrigger 
                value="database" 
                className="font-mono data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary px-1 py-2"
                data-testid="tab-database-terminal"
              >
                DB
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="font-mono data-[state=active]:bg-terminal-green data-[state=active]:text-black px-1 py-2"
                data-testid="tab-analysis-terminal"
              >
                BUF
              </TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="mt-4">
              <div className="h-[400px] sm:h-[500px]">
                <EnhancedTerminal user={user} />
              </div>
            </TabsContent>

            <TabsContent value="database" className="mt-4">
              <div className="h-[400px] sm:h-[500px]">
                <EnhancedDatabaseTerminal 
                  user={user} 
                  buffers={terminalBuffers}
                />
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              <div className="h-[400px] sm:h-[500px] bg-black rounded-lg border border-gray-700 p-3 overflow-y-auto">
                <div className="font-mono text-xs">
                  <div className="text-terminal-green mb-4">
                    === REAL-TIME BUFFER ANALYSIS ===
                  </div>
                  <div className="space-y-2">
                    <div className="text-terminal-red-primary">Buffer States:</div>
                    <div className="pl-2 space-y-1 text-terminal-red-secondary">
                      <div>DEBUG: <span className={terminalBuffers.debugMode ? "text-green-500" : "text-red-500"}>{terminalBuffers.debugMode ? "ON" : "OFF"}</span></div>
                      <div>SECURE: <span className={terminalBuffers.secureMode ? "text-green-500" : "text-red-500"}>{terminalBuffers.secureMode ? "ON" : "OFF"}</span></div>
                      <div>LOG: <span className={terminalBuffers.logEnabled ? "text-green-500" : "text-red-500"}>{terminalBuffers.logEnabled ? "ON" : "OFF"}</span></div>
                      <div>ASYNC: <span className={terminalBuffers.asyncMode ? "text-yellow-500" : "text-gray-500"}>{terminalBuffers.asyncMode ? "PROC" : "IDLE"}</span></div>
                      <div>DB: <span className={terminalBuffers.dbConnected ? "text-green-500" : "text-red-500"}>{terminalBuffers.dbConnected ? "ONLINE" : "OFF"}</span></div>
                    </div>
                    
                    <div className="text-terminal-red-primary mt-3">System:</div>
                    <div className="pl-2 space-y-1 text-terminal-red-secondary">
                      <div>SESSION: {terminalBuffers.sessionId}</div>
                      <div>TARGET: {terminalBuffers.targetSystem}</div>
                      <div>TIMEOUT: {terminalBuffers.connectionTimeout}ms</div>
                      <div>BUFFER: {terminalBuffers.bufferSize}b</div>
                      <div>RETRY: {terminalBuffers.retryCount}</div>
                    </div>

                    <div className="text-terminal-green mt-3">
                      [BUFFER ANALYSIS COMPLETE]
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout - Side by side on large screens */}
        <div className="hidden lg:block">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
            <ResizablePanel defaultSize={25} minSize={20}>
              <div className="h-full pr-4">
                <TerminalSwitches 
                  onBufferChange={handleBufferChange}
                  isConnected={true}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75} minSize={50}>
              <div className="h-full">
                <Tabs defaultValue="database" className="h-full">
                  <TabsList className="grid w-full grid-cols-3 bg-terminal-red-dark border-terminal-red-muted">
                    <TabsTrigger 
                      value="standard" 
                      className="font-mono text-sm data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                      data-testid="tab-standard-terminal"
                    >
                      STANDARD TERMINAL
                    </TabsTrigger>
                    <TabsTrigger 
                      value="database" 
                      className="font-mono text-sm data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                      data-testid="tab-database-terminal"
                    >
                      DATABASE ACCESS
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analysis" 
                      className="font-mono text-sm data-[state=active]:bg-terminal-green data-[state=active]:text-black"
                      data-testid="tab-analysis-terminal"
                    >
                      BUFFER ANALYSIS
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="standard" className="h-full mt-4">
                    <div className="h-[600px]">
                      <EnhancedTerminal user={user} />
                    </div>
                  </TabsContent>

                  <TabsContent value="database" className="h-full mt-4">
                    <div className="h-[600px]">
                      <EnhancedDatabaseTerminal 
                        user={user} 
                        buffers={terminalBuffers}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="h-full mt-4">
                    <div className="h-[600px] bg-black rounded-lg border border-gray-700 p-4 overflow-y-auto">
                      <div className="font-mono text-sm">
                        <div className="text-terminal-green mb-4">
                          === REAL-TIME BUFFER ANALYSIS ===
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-terminal-red-primary mb-2">Buffer States:</div>
                            <div className="pl-4 space-y-1 text-terminal-red-secondary">
                              <div>DEBUG_MODE: <span className={terminalBuffers.debugMode ? "text-green-500" : "text-red-500"}>{terminalBuffers.debugMode ? "ACTIVE" : "INACTIVE"}</span></div>
                              <div>SECURE_MODE: <span className={terminalBuffers.secureMode ? "text-green-500" : "text-red-500"}>{terminalBuffers.secureMode ? "ENFORCED" : "DISABLED"}</span></div>
                              <div>LOG_ENABLED: <span className={terminalBuffers.logEnabled ? "text-green-500" : "text-red-500"}>{terminalBuffers.logEnabled ? "ON" : "OFF"}</span></div>
                              <div>ASYNC_MODE: <span className={terminalBuffers.asyncMode ? "text-yellow-500" : "text-gray-500"}>{terminalBuffers.asyncMode ? "PROCESSING" : "IDLE"}</span></div>
                              <div>DB_CONNECTED: <span className={terminalBuffers.dbConnected ? "text-green-500" : "text-red-500"}>{terminalBuffers.dbConnected ? "ONLINE" : "OFFLINE"}</span></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-terminal-red-primary mb-2">System Variables:</div>
                            <div className="pl-4 space-y-1 text-terminal-red-secondary">
                              <div>SESSION_ID: {terminalBuffers.sessionId}</div>
                              <div>TARGET_SYSTEM: {terminalBuffers.targetSystem}</div>
                              <div>CONNECTION_TIMEOUT: {terminalBuffers.connectionTimeout}ms</div>
                              <div>BUFFER_SIZE: {terminalBuffers.bufferSize} bytes</div>
                              <div>RETRY_COUNT: {terminalBuffers.retryCount}</div>
                            </div>
                          </div>

                          <div>
                            <div className="text-terminal-red-primary mb-2">Command Parser:</div>
                            <div className="pl-4 space-y-1 text-terminal-red-secondary">
                              <div>PREFIX: "{terminalBuffers.commandPrefix}"</div>
                              <div>SEPARATOR: "{terminalBuffers.separator}"</div>
                              <div>TERMINATOR: "{terminalBuffers.terminator}"</div>
                            </div>
                          </div>

                          <div className="text-terminal-green mt-4">
                            [BUFFER ANALYSIS COMPLETE]
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Footer Status - Responsive */}
        <div className="mt-4 sm:mt-6 text-xs font-mono text-gray-500 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <span>BlackRaven OS Advanced Terminal</span>
            <span>Status: {terminalBuffers.asyncMode ? 'PROCESSING' : 'READY'}</span>
            <span>Security: {terminalBuffers.secureMode ? 'ENABLED' : 'DISABLED'}</span>
            <span>DB: {terminalBuffers.dbConnected ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}