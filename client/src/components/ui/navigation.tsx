import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Code, Terminal, Shield, Eye, FileText, Box, FlaskConical, Music, BookOpen, Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 border-b border-terminal-red-muted bg-card-bg/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-terminal-red-primary rounded-lg flex items-center justify-center">
              <Code className="text-white text-sm font-bold" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-terminal-red-bright font-mono">_Fq</h1>
              <p className="text-xs text-terminal-red-secondary -mt-1 hidden sm:block">Is This A Simulation</p>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-terminal-red-secondary hover:text-terminal-red-bright"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card-bg border-terminal-red-muted">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-terminal-red-primary rounded-lg flex items-center justify-center">
                        <Code className="text-white text-sm font-bold" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-terminal-red-bright font-mono">_Fq</h2>
                        <p className="text-xs text-terminal-red-secondary -mt-1">Is This A Simulation</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href="/ops-manual">
                      <Button 
                        variant={isActive("/ops-manual") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/ops-manual") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4 mr-3" />
                        Ops Manual
                      </Button>
                    </Link>

                    <Link href="/neural-matrix">
                      <Button 
                        variant={isActive("/neural-matrix") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/neural-matrix") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Eye className="w-4 h-4 mr-3" />
                        Neural Matrix
                      </Button>
                    </Link>

                    <Link href="/ksp-dossier">
                      <Button 
                        variant={isActive("/ksp-dossier") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/ksp-dossier") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FileText className="w-4 h-4 mr-3" />
                        KSP Dossier
                      </Button>
                    </Link>



                    <Link href="/scientific-method">
                      <Button 
                        variant={isActive("/scientific-method") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/scientific-method") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FlaskConical className="w-4 h-4 mr-3" />
                        Scientific Method
                      </Button>
                    </Link>

                    <Link href="/music">
                      <Button 
                        variant={isActive("/music") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/music") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Music className="w-4 h-4 mr-3" />
                        Music
                      </Button>
                    </Link>

                    <Link href="/education">
                      <Button 
                        variant={isActive("/education") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/education") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <BookOpen className="w-4 h-4 mr-3" />
                        Education
                      </Button>
                    </Link>

                    <Link href="/methodology">
                      <Button 
                        variant={isActive("/methodology") ? "default" : "ghost"}
                        className={`
                          w-full justify-start
                          ${isActive("/methodology") 
                            ? "bg-terminal-red-primary text-white" 
                            : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                          }
                        `}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FileText className="w-4 h-4 mr-3" />
                        Methodology
                      </Button>
                    </Link>




                  </div>

                  <div className="pt-4 border-t border-terminal-red-muted">
                    <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-terminal-red-dark/30 rounded-lg border border-terminal-red-muted">
                      <div className="w-2 h-2 bg-terminal-green rounded-full"></div>
                      <span className="text-xs font-mono text-terminal-green uppercase font-bold">
                        Open Access
                      </span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation - Open Access */}
          <nav className="hidden md:flex items-center space-x-1">


            <Link href="/ops-manual">
              <Button 
                variant={isActive("/ops-manual") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/ops-manual") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Shield className="w-4 h-4 mr-2" />
                Ops Manual
              </Button>
            </Link>

            <Link href="/neural-matrix">
              <Button 
                variant={isActive("/neural-matrix") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/neural-matrix") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Eye className="w-4 h-4 mr-2" />
                Neural Matrix
              </Button>
            </Link>

            <Link href="/ksp-dossier">
              <Button 
                variant={isActive("/ksp-dossier") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/ksp-dossier") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <FileText className="w-4 h-4 mr-2" />
                KSP Dossier
              </Button>
            </Link>



            <Link href="/scientific-method">
              <Button 
                variant={isActive("/scientific-method") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/scientific-method") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                Scientific Method
              </Button>
            </Link>

            <Link href="/music">
              <Button 
                variant={isActive("/music") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/music") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <Music className="w-4 h-4 mr-2" />
                Music
              </Button>
            </Link>

            <Link href="/education">
              <Button 
                variant={isActive("/education") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/education") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Education
              </Button>
            </Link>

            <Link href="/methodology">
              <Button 
                variant={isActive("/methodology") ? "default" : "ghost"}
                size="sm"
                className={`
                  ${isActive("/methodology") 
                    ? "bg-terminal-red-primary text-white" 
                    : "text-terminal-red-secondary hover:text-terminal-red-bright hover:bg-terminal-red-dark/20"
                  }
                  font-medium transition-colors
                `}
              >
                <FileText className="w-4 h-4 mr-2" />
                Methodology
              </Button>
            </Link>




          </nav>

          {/* Desktop Open Access Badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-terminal-red-dark/30 rounded-lg border border-terminal-red-muted">
            <div className="w-2 h-2 bg-terminal-green rounded-full"></div>
            <span className="text-xs font-mono text-terminal-green uppercase font-bold">
              Open Access
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;