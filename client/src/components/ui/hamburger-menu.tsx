import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { 
  Menu, 
  Brain, 
  Target, 
  BookOpen, 
  Settings, 
  Zap, 
  FileText, 
  Users,
  Lock,
  Home,
  Compass,
  Crown
} from 'lucide-react';

interface HamburgerMenuProps {
  userCount?: string;
  showAuthButton?: boolean;
}

export function HamburgerMenu({ userCount = "2,847", showAuthButton = true }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);
  const { isSubscribed } = useAuth();

  // Free tier menu items - only 4 core items for simplicity
  const freeMenuItems = [
    { href: '/shadowfang-training', label: 'ShadowFang Training', icon: Target, description: 'HUMINT protocols' },
    { href: '/ops-manual', label: 'Ops Manual', icon: BookOpen, description: 'Operational guides' },
    { href: '/neural-matrix', label: 'Neural Matrix', icon: Brain, description: 'Core system' },
    { href: '/frequency-generator', label: 'Frequency Generator', icon: Zap, description: 'Binaural beats' },
  ];

  // Tier 2 paid menu items - locked for non-subscribers
  const paidMenuItems = [
    { href: '/ksp-dossier', label: 'KSP Dossier', icon: FileText, description: 'Classified docs' },
    { href: '/grounding-methods', label: 'Grounding Methods', icon: Compass, description: 'Reality anchoring' },
    { href: '/scientific-method', label: 'Scientific Method', icon: Settings, description: 'Research protocols' },
    { href: '/education', label: 'Education', icon: BookOpen, description: 'Learning materials' },
    { href: '/methodology', label: 'Methodology', icon: FileText, description: 'Self-report system' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-red-600/20 hover:text-red-400"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 bg-gray-900/95 border-red-500/30 backdrop-blur-sm">
        <SheetHeader className="border-b border-red-500/20 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <Brain className="text-white w-5 h-5" />
            </div>
            <div>
              <SheetTitle className="text-red-400 font-mono">_Fq Neural Matrix</SheetTitle>
              <p className="text-xs text-gray-400 -mt-1">Cognitive Enhancement Platform</p>
            </div>
          </div>
        </SheetHeader>

        {/* Status Indicator */}
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-400 text-sm font-mono">Network Status:</span>
            <Badge className="bg-green-600/20 border-green-500 text-green-400">ONLINE</Badge>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Users className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-mono">{userCount}</span>
            <span className="text-gray-400">active users</span>
          </div>
        </div>

        {/* Free Tier Navigation */}
        <nav className="space-y-2 mb-6">
          {freeMenuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center space-x-3 px-3 py-[5px] rounded-lg hover:bg-red-600/10 hover:border-red-500/30 border border-transparent transition-all text-left group"
                data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <item.icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium group-hover:text-red-400">{item.label}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-400 truncate">{item.description}</div>
                </div>
              </button>
            </Link>
          ))}
        </nav>

        {/* Tier 2 Paid Section */}
        {!isSubscribed && (
          <>
            <Separator className="bg-gray-700 mb-4" />
            <div className="mb-4 p-3 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500 text-sm font-semibold">Researcher Tier</span>
              </div>
              <p className="text-xs text-gray-400">Subscribe to unlock advanced tools</p>
            </div>
          </>
        )}

        {/* Tier 2 Menu Items - Locked or Unlocked */}
        <nav className="space-y-2 mb-6">
          {paidMenuItems.map((item, index) => (
            isSubscribed ? (
              <Link key={index} href={item.href}>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center space-x-3 px-3 py-[5px] rounded-lg hover:bg-red-600/10 hover:border-red-500/30 border border-transparent transition-all text-left group"
                  data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium group-hover:text-red-400">{item.label}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400 truncate">{item.description}</div>
                  </div>
                </button>
              </Link>
            ) : (
              <div key={index} className="relative">
                <button
                  disabled
                  className="w-full flex items-center space-x-3 px-3 py-[5px] rounded-lg border border-gray-700/50 bg-gray-800/30 text-left opacity-50 cursor-not-allowed"
                  data-testid={`menu-locked-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-500 text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-gray-600 truncate">{item.description}</div>
                  </div>
                  <Lock className="w-4 h-4 text-gray-600 flex-shrink-0" />
                </button>
              </div>
            )
          ))}
        </nav>

        {/* Bottom Actions */}
        {showAuthButton && !isSubscribed && (
          <>
            <Separator className="bg-gray-700 mb-4" />
            <div className="space-y-3">
              <Link href="/subscribe">
                <Button 
                  onClick={() => setOpen(false)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800"
                  data-testid="button-unlock-researcher-tier"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Unlock Researcher Tier
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  $5.89/month • Cancel anytime
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}