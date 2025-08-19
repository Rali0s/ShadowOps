import { useState } from "react";
import { EnhancedDatabaseTerminal } from "@/components/enhanced-database-terminal";
import { TerminalSwitches, type TerminalBuffers } from "@/components/terminal-switches";
import { EnhancedTerminal } from "@/components/enhanced-terminal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { SacredGeometryWheel } from "@/components/sacred-geometry-wheel";

export default function AdvancedTerminalPage() {
  const [terminalBuffers, setTerminalBuffers] = useState<TerminalBuffers>({
    debugMode: false,
    secureMode: true,
    logEnabled: true,
    asyncMode: false,
    dbConnected: false,
    currentUser: "operative",
    sessionId: "",
    targetSystem: "fq_system",
    connectionTimeout: 5000,
    retryCount: 3,
    bufferSize: 1024,
    commandPrefix: "$",
    separator: "|",
    terminator: ";"
  });

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
                _FQ ADVANCED TERMINAL
              </h1>
              <p className="text-terminal-red-secondary mt-1 sm:mt-2 font-mono text-xs sm:text-sm">
                Advanced brainwave frequency training environment with database access
              </p>
            </div>
            <div className="text-center sm:text-right text-xs sm:text-sm font-mono text-terminal-red-secondary">
              <div className="flex flex-col gap-1">
                <div>Open Access Mode</div>
                <div className="text-terminal-green">All Frequencies Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Geometry Visualization */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <div className="bg-card-bg/50 border border-terminal-red-muted/30 rounded-lg p-4">
            <SacredGeometryWheel 
              size={180}
              speed={2}
              brainwaveFrequency={25}
              intensity={1}
            />
          </div>
        </div>

        {/* Terminal Switches Panel */}
        <div className="mb-4 sm:mb-6">
          <TerminalSwitches 
            onBufferChange={handleBufferChange} 
            isConnected={false}
          />
        </div>

        {/* Main Terminal Interface */}
        <div className="bg-terminal-bg/50 backdrop-blur-sm rounded-lg border border-terminal-red-muted overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="min-h-[600px] sm:min-h-[700px]">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full">
                <Tabs defaultValue="main" className="h-full flex flex-col">
                  <TabsList className="bg-terminal-red-dark/20 border-b border-terminal-red-muted shrink-0">
                    <TabsTrigger 
                      value="main" 
                      className="data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    >
                      Main Terminal
                    </TabsTrigger>
                    <TabsTrigger 
                      value="frequency" 
                      className="data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    >
                      Frequency Analysis
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="main" className="flex-1 mt-0">
                    <EnhancedTerminal />
                  </TabsContent>
                  
                  <TabsContent value="frequency" className="flex-1 mt-0">
                    <EnhancedTerminal />
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle className="bg-terminal-red-muted hover:bg-terminal-red-primary transition-colors" />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full">
                <Tabs defaultValue="database" className="h-full flex flex-col">
                  <TabsList className="bg-terminal-red-dark/20 border-b border-terminal-red-muted shrink-0">
                    <TabsTrigger 
                      value="database" 
                      className="data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    >
                      Database Terminal
                    </TabsTrigger>
                    <TabsTrigger 
                      value="monitoring" 
                      className="data-[state=active]:bg-terminal-red-primary data-[state=active]:text-white text-terminal-red-secondary"
                    >
                      System Monitor
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="database" className="flex-1 mt-0">
                    <EnhancedDatabaseTerminal buffers={terminalBuffers} />
                  </TabsContent>
                  
                  <TabsContent value="monitoring" className="flex-1 mt-0">
                    <EnhancedDatabaseTerminal buffers={terminalBuffers} />
                  </TabsContent>
                </Tabs>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Status Bar */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-terminal-red-dark/10 border border-terminal-red-muted rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 font-mono text-xs text-terminal-red-secondary">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span>STATUS: <span className="text-terminal-green">OPERATIONAL</span></span>
              <span>MODE: <span className="text-terminal-amber">ADVANCED</span></span>
              <span>ACCESS: <span className="text-terminal-green">OPEN</span></span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-right">
              <span>UPTIME: <span className="text-white">∞</span></span>
              <span>USERS: <span className="text-terminal-green">UNLIMITED</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}