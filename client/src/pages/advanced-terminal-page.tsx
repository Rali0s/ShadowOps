import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { DatabaseTerminal } from "@/components/database-terminal";
import { TerminalSwitches, type TerminalBuffers } from "@/components/terminal-switches";
import { EnhancedTerminal } from "@/components/enhanced-terminal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import type { Course } from "@shared/schema";

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

  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  // Progress tracking removed - access is tier-based only

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
    <div className="min-h-screen bg-gradient-to-br from-terminal-bg via-black to-terminal-red-dark p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-terminal-red-primary font-mono tracking-wide">
                BLACKRAVEN ADVANCED TERMINAL
              </h1>
              <p className="text-terminal-red-secondary mt-2 font-mono text-sm">
                Advanced cybersecurity training environment with database access
              </p>
            </div>
            <div className="text-right text-sm font-mono text-terminal-red-secondary">
              <div>User: <span className="text-terminal-red-bright">{user.username}</span></div>
              <div>Clearance: <span className="text-terminal-red-primary font-bold">{user.subscriptionTier?.toUpperCase() || 'NONE'}</span></div>
              <div>Session: <span className="text-terminal-scarlet">{terminalBuffers.sessionId || 'INITIALIZING'}</span></div>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <ResizablePanelGroup direction="horizontal" className="min-h-[600px]">
          {/* Control Panel */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full pr-4">
              <TerminalSwitches 
                onBufferChange={handleBufferChange}
                isConnected={true}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Terminal Interface */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full">
              <Tabs defaultValue="standard" className="h-full">
                <TabsList className="grid w-full grid-cols-3 bg-terminal-red-dark border-terminal-red-muted">
                  <TabsTrigger 
                    value="standard" 
                    className="font-mono text-xs data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    data-testid="tab-standard-terminal"
                  >
                    STANDARD TERMINAL
                  </TabsTrigger>
                  <TabsTrigger 
                    value="database" 
                    className="font-mono text-xs data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    data-testid="tab-database-terminal"
                  >
                    DATABASE ACCESS
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis" 
                    className="font-mono text-xs data-[state=active]:bg-terminal-green data-[state=active]:text-black"
                    data-testid="tab-analysis-terminal"
                  >
                    BUFFER ANALYSIS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="standard" className="h-full mt-4">
                  <div className="h-[500px]">
                    <EnhancedTerminal 
                      user={user} 
                      courses={courses} 
                      userProgress={userProgress}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="database" className="h-full mt-4">
                  <div className="h-[500px]">
                    <DatabaseTerminal 
                      user={user} 
                      courses={courses} 
                      userProgress={userProgress}
                      buffers={terminalBuffers}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="h-full mt-4">
                  <div className="h-[500px] bg-black rounded-lg border border-gray-700 p-4 overflow-y-auto">
                    <div className="font-mono text-sm">
                      {/* Real-time Buffer Analysis */}
                      <div className="text-terminal-green mb-4">
                        === REAL-TIME BUFFER ANALYSIS ===
                      </div>
                      
                      <div className="space-y-4 text-gray-300">
                        <div>
                          <div className="text-cyan-400 mb-2">System Status:</div>
                          <div className="ml-4 space-y-1">
                            <div>• Security Mode: <span className={terminalBuffers.secureMode ? 'text-green-400' : 'text-red-400'}>{terminalBuffers.secureMode ? 'ACTIVE' : 'DISABLED'}</span></div>
                            <div>• Debug Mode: <span className={terminalBuffers.debugMode ? 'text-yellow-400' : 'text-gray-500'}>{terminalBuffers.debugMode ? 'ENABLED' : 'DISABLED'}</span></div>
                            <div>• Database: <span className={terminalBuffers.dbConnected ? 'text-green-400' : 'text-red-400'}>{terminalBuffers.dbConnected ? 'CONNECTED' : 'OFFLINE'}</span></div>
                            <div>• Logging: <span className={terminalBuffers.logEnabled ? 'text-green-400' : 'text-gray-500'}>{terminalBuffers.logEnabled ? 'ACTIVE' : 'DISABLED'}</span></div>
                          </div>
                        </div>

                        <div>
                          <div className="text-cyan-400 mb-2">Connection Parameters:</div>
                          <div className="ml-4 space-y-1">
                            <div>• Timeout: {terminalBuffers.connectionTimeout}ms</div>
                            <div>• Retry Count: {terminalBuffers.retryCount}</div>
                            <div>• Buffer Size: {terminalBuffers.bufferSize} bytes</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-cyan-400 mb-2">Session Information:</div>
                          <div className="ml-4 space-y-1">
                            <div>• Current User: {terminalBuffers.currentUser}</div>
                            <div>• Target System: {terminalBuffers.targetSystem}</div>
                            <div>• Session ID: {terminalBuffers.sessionId || 'PENDING'}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-cyan-400 mb-2">Command Format:</div>
                          <div className="ml-4 space-y-1">
                            <div>• Prefix: "{terminalBuffers.commandPrefix}"</div>
                            <div>• Separator: "{terminalBuffers.separator}"</div>
                            <div>• Terminator: "{terminalBuffers.terminator}"</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-cyan-400 mb-2">Performance Metrics:</div>
                          <div className="ml-4 space-y-1">
                            <div>• Async Operations: <span className={terminalBuffers.asyncMode ? 'text-yellow-400' : 'text-green-400'}>{terminalBuffers.asyncMode ? 'PROCESSING' : 'IDLE'}</span></div>
                            <div>• Memory Usage: {Math.round((terminalBuffers.bufferSize / 1024) * 100)}% of 1KB</div>
                            <div>• Security Level: {terminalBuffers.secureMode ? 'MAXIMUM' : 'STANDARD'}</div>
                          </div>
                        </div>

                        {terminalBuffers.debugMode && (
                          <div>
                            <div className="text-yellow-400 mb-2">Debug Information:</div>
                            <div className="ml-4 text-xs bg-gray-800 p-2 rounded">
                              <pre>{JSON.stringify(terminalBuffers, null, 2)}</pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Footer Status */}
        <div className="mt-6 text-xs font-mono text-gray-500 text-center">
          BlackRaven OS Advanced Terminal | Status: {terminalBuffers.asyncMode ? 'PROCESSING' : 'READY'} | 
          Security: {terminalBuffers.secureMode ? 'ENABLED' : 'DISABLED'} | 
          DB: {terminalBuffers.dbConnected ? 'ONLINE' : 'OFFLINE'}
        </div>
      </div>
    </div>
  );
}