import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CountdownTimer } from '@/components/countdown-timer';
import { Mobile, Desktop, ShowAbove, ShowBelow } from '@/hooks/use-responsive';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  Check, 
  Lock,
  Star,
  Users,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Gift,
  AlertCircle,
  Timer,
  Crown,
  MessageCircle,
  Play,
  Settings
} from 'lucide-react';
import { SiDiscord } from 'react-icons/si';

export default function LandingPage() {
  const { user, isLoading, isSubscribed, isAuthorized, betaStatus, loginWithDiscord } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const betaLaunchDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000); // 45 days from now

  // Beta expiration handling
  const handleBetaComplete = () => {
    toast({
      title: "Beta Period Ended",
      description: "The beta access countdown has reached zero. Time to upgrade!",
      variant: "destructive",
    });
  };

  const handleBetaExpired = () => {
    if (isSubscribed) {
      toast({
        title: "Beta Ended - Premium Access Active",
        description: "Your subscription ensures continued access to all features.",
      });
      return;
    }

    if (user?.discordVerified) {
      toast({
        title: "Beta Access Expired",
        description: "Subscribe now to continue your neurohacker journey!",
        variant: "destructive",
      });
      
      // Redirect Discord-verified users to subscription page
      setTimeout(() => {
        setLocation("/subscribe");
      }, 2000);
    } else {
      toast({
        title: "Beta Period Ended",
        description: "Join Discord and subscribe to unlock full access!",
        variant: "destructive",
      });
    }
  };

  // Helper functions to determine CTA state
  const getPrimaryCTA = () => {
    if (isLoading) {
      return {
        text: "Loading...",
        subText: "Please wait",
        icon: Settings,
        action: () => {},
        href: null,
        variant: "default" as const,
        disabled: true
      };
    }

    // Subscribed users - highest priority
    if (isSubscribed) {
      return {
        text: "Access Dashboard",
        subText: "Continue Training",
        icon: Play,
        action: undefined,
        href: "/home",
        variant: "default" as const,
        disabled: false
      };
    }

    // Discord verified but beta expired - upgrade prompt
    if (user?.discordVerified && betaStatus?.expired) {
      return {
        text: "Upgrade to Elite",
        subText: "Beta Expired - Subscribe",
        icon: Crown,
        action: undefined,
        href: "/subscribe",
        variant: "default" as const,
        disabled: false
      };
    }

    // Discord verified with active beta - enter platform
    if (user?.discordVerified && !betaStatus?.expired) {
      return {
        text: "Access Training",
        subText: "Enter Platform",
        icon: Play,
        action: undefined,
        href: "/home",
        variant: "default" as const,
        disabled: false
      };
    }

    // Not authenticated or no Discord - join community first
    return {
      text: "Join Discord Community",
      subText: "Required for Access",
      icon: SiDiscord,
      action: () => window.open("https://discord.gg/3PfFZ6aC", "_blank"),
      href: null,
      variant: "default" as const,
      disabled: false
    };
  };

  const getSecondaryCTA = () => {
    if (isLoading) {
      return null;
    }

    // For subscribed users - show Discord community
    if (isSubscribed) {
      return {
        text: "Join Discord",
        subText: "Community Access",
        icon: SiDiscord,
        action: () => window.open("https://discord.gg/3PfFZ6aC", "_blank"),
        href: null,
        variant: "outline" as const
      };
    }

    // For Discord users (verified or beta expired) - show subscription
    if (user?.discordVerified) {
      return {
        text: "Lock In Beta Price",
        subText: "$5.89/mo Forever",
        icon: Lock,
        action: undefined,
        href: "/subscribe",
        variant: "outline" as const
      };
    }

    // For non-Discord users - show Discord login as secondary
    return {
      text: "Discord Login",
      subText: "After Joining Server", 
      icon: SiDiscord,
      action: loginWithDiscord,
      href: null,
      variant: "outline" as const
    };
  };

  const getHeaderCTA = () => {
    if (isLoading) return { text: "Loading...", href: "/subscribe", disabled: true };
    if (isSubscribed) return { text: "Dashboard", href: "/home", disabled: false };
    if (user?.discordVerified && !betaStatus?.expired) return { text: "Enter", href: "/home", disabled: false };
    if (user?.discordVerified && betaStatus?.expired) return { text: "Subscribe", href: "/subscribe", disabled: false };
    return { text: "Join Beta", href: "/subscribe", disabled: false };
  };

  const primaryCTA = getPrimaryCTA();
  const secondaryCTA = getSecondaryCTA();
  const headerCTA = getHeaderCTA();

  const mainGoals = [
    {
      icon: BookOpen,
      title: "HELP PEOPLE STUDY",
      description: "Advanced learning techniques using declassified military training protocols",
      color: "text-cyan-400"
    },
    {
      icon: FlaskConical,
      title: "EXPERIMENTAL RELAXATION RESEARCH",
      description: "Cutting-edge frequency entrainment for deep cognitive states",
      color: "text-green-400"
    },
    {
      icon: Gift,
      title: "BONUS PROGRAMS",
      description: "Exclusive access to advanced neurohacker tools and methods",
      color: "text-yellow-400"
    }
  ];

  const betaFeatures = [
    "ShadowFang AIO Training System",
    "1 Comprehensive Training Manual",
    "Binaural Frequency Generator",
    "Sacred Geometry Visualizations",
    "Mobile Optimized (iOS/Android)",
    "Private Discord Community",
    "Elite Member Priority Access",
    "Weekly Live Sessions"
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Cognitive Neuroscientist",
      content: "Revolutionary approach to cognitive enhancement. The ShadowFang system delivers real results.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "Former Intelligence Analyst", 
      content: "Finally, professional-grade training tools accessible to serious practitioners.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "Biohacker",
      content: "The experimental relaxation protocols are unlike anything else available.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Beta Launch Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-2 text-center animate-pulse">
        <p className="text-xs sm:text-sm font-bold leading-tight">
          {isSubscribed ? (
            <>
              <span className="hidden xs:inline">✅ ELITE MEMBER ACTIVE • FULL PLATFORM ACCESS • WELCOME BACK ✅</span>
              <span className="xs:hidden">✅ ELITE ACTIVE • WELCOME ✅</span>
            </>
          ) : user?.discordVerified && !betaStatus?.expired ? (
            <>
              <span className="hidden xs:inline">🎯 DISCORD VERIFIED • BETA ACCESS GRANTED • ENTER PLATFORM 🎯</span>
              <span className="xs:hidden">🎯 VERIFIED • ENTER PLATFORM 🎯</span>
            </>
          ) : user?.discordVerified && betaStatus?.expired ? (
            <>
              <span className="hidden xs:inline">⏰ BETA EXPIRED • ELITE UPGRADE AVAILABLE • LIMITED TIME ⏰</span>
              <span className="xs:hidden">⏰ BETA EXPIRED • UPGRADE NOW ⏰</span>
            </>
          ) : (
            <>
              <span className="hidden xs:inline">🚀 JOIN DISCORD FIRST • GET VERIFIED • UNLOCK BETA ACCESS 🚀</span>
              <span className="xs:hidden">🚀 DISCORD FIRST • BETA ACCESS 🚀</span>
            </>
          )}
        </p>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-red-500/20 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Brain className="text-white w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-red-400 font-mono">_Fq</h1>
                <p className="text-xs text-gray-400 -mt-1 hidden xs:block">Is This A Simulation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href={headerCTA.href}>
                <Button 
                  size="sm" 
                  disabled={headerCTA.disabled}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-3 py-2 text-xs sm:text-sm"
                  data-testid="button-header-cta"
                >
                  <Timer className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden xs:inline">{headerCTA.text}</span>
                  <span className="xs:hidden">{headerCTA.text.split(' ')[0]}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Countdown */}
      <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 px-3 sm:px-6">
        <div className="container mx-auto text-center max-w-6xl">
          {/* Beta Badge */}
          <Badge className="mb-4 sm:mb-6 bg-yellow-600/20 border-yellow-500 text-yellow-400 text-sm sm:text-lg px-3 sm:px-4 py-1 sm:py-2">
            <ShowAbove breakpoint="sm">⚡ BETA PRE-RELEASE • PHASE ONE ⚡</ShowAbove>
            <ShowBelow breakpoint="sm">⚡ BETA PHASE ONE ⚡</ShowBelow>
          </Badge>
          
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">
              <ShowAbove breakpoint="sm">Transform Your Mind With</ShowAbove>
              <ShowBelow breakpoint="sm">Transform Your Mind</ShowBelow>
            </span>
            <span className="block text-red-400 mt-1 sm:mt-2">ShadowFang Training</span>
          </h1>
          
          {/* Subheadline with Main Goals */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-2 leading-relaxed">
            <ShowAbove breakpoint="md">The world's first </ShowAbove><strong className="text-cyan-400">neurohacker membership platform</strong>
            <ShowAbove breakpoint="sm"> combining experimental relaxation research with declassified training protocols to</ShowAbove>
            <ShowBelow breakpoint="sm"> to</ShowBelow>
            <strong className="text-green-400"> help you study, focus, and evolve</strong>.
          </p>

          {/* Countdown Timer */}
          <div className="max-w-2xl mx-auto mb-12">
            <CountdownTimer 
              targetDate={betaLaunchDate}
              onComplete={handleBetaComplete}
              onExpired={handleBetaExpired}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
            {/* Primary CTA */}
            {primaryCTA.href ? (
              <Link href={primaryCTA.href}>
                <Button 
                  size="lg" 
                  variant={primaryCTA.variant}
                  disabled={primaryCTA.disabled}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-6 w-full sm:w-auto data-testid-button-primary"
                  data-testid="button-primary-cta"
                >
                  <primaryCTA.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="flex flex-col items-center sm:block">
                    <ShowAbove breakpoint="sm">{primaryCTA.text}</ShowAbove>
                    <ShowBelow breakpoint="sm">{primaryCTA.text.split(' ')[0]} {primaryCTA.text.split(' ')[1] || ''}</ShowBelow>
                    {primaryCTA.subText && (
                      <span className="text-xs opacity-75 hidden sm:inline">• {primaryCTA.subText}</span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                variant={primaryCTA.variant}
                onClick={primaryCTA.action || undefined}
                disabled={primaryCTA.disabled}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-6 w-full sm:w-auto"
                data-testid="button-primary-cta"
              >
                <primaryCTA.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="flex flex-col items-center sm:block">
                  <ShowAbove breakpoint="sm">{primaryCTA.text}</ShowAbove>
                  <ShowBelow breakpoint="sm">{primaryCTA.text.split(' ')[0]} {primaryCTA.text.split(' ')[1] || ''}</ShowBelow>
                  {primaryCTA.subText && (
                    <span className="text-xs opacity-75 hidden sm:inline">• {primaryCTA.subText}</span>
                  )}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            )}

            {/* Secondary CTA */}
            {secondaryCTA && (
              secondaryCTA.href ? (
                <Link href={secondaryCTA.href}>
                  <Button 
                    size="lg" 
                    variant={secondaryCTA.variant}
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-600/20 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-6 w-full sm:w-auto"
                    data-testid="button-secondary-cta"
                  >
                    <secondaryCTA.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="flex flex-col items-center sm:block">
                      <ShowAbove breakpoint="sm">{secondaryCTA.text}</ShowAbove>
                      <ShowBelow breakpoint="sm">{secondaryCTA.text.split(' ')[0]} {secondaryCTA.text.split(' ')[1] || ''}</ShowBelow>
                      {secondaryCTA.subText && (
                        <span className="text-xs opacity-75 hidden sm:inline">• {secondaryCTA.subText}</span>
                      )}
                    </span>
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  variant={secondaryCTA.variant}
                  onClick={secondaryCTA.action || undefined}
                  className="border-cyan-500 text-cyan-400 hover:bg-cyan-600/20 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-6 w-full sm:w-auto"
                  data-testid="button-secondary-cta"
                >
                  <secondaryCTA.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="flex flex-col items-center sm:block">
                    <ShowAbove breakpoint="sm">{secondaryCTA.text}</ShowAbove>
                    <ShowBelow breakpoint="sm">{secondaryCTA.text.split(' ')[0]} {secondaryCTA.text.split(' ')[1] || ''}</ShowBelow>
                    {secondaryCTA.subText && (
                      <span className="text-xs opacity-75 hidden sm:inline">• {secondaryCTA.subText}</span>
                    )}
                  </span>
                </Button>
              )
            )}
          </div>

          {/* Conditional Status Message */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto" data-testid="status-message">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 inline mr-2" />
            <span className="text-yellow-200 text-xs sm:text-sm leading-tight">
              {isSubscribed ? (
                <>
                  <ShowAbove breakpoint="md">✅ <strong className="text-green-400">Elite Member Active</strong> • Access all training modules and premium features</ShowAbove>
                  <ShowBelow breakpoint="md">✅ <strong className="text-green-400">Elite Active</strong> • Full Access</ShowBelow>
                </>
              ) : user?.discordVerified && !betaStatus?.expired ? (
                <>
                  <ShowAbove breakpoint="md">🎯 <strong className="text-cyan-400">Discord Beta Access</strong> • Community verified • Platform access granted</ShowAbove>
                  <ShowBelow breakpoint="md">🎯 <strong className="text-cyan-400">Beta Access</strong> • Verified</ShowBelow>
                </>
              ) : user?.discordVerified && betaStatus?.expired ? (
                <>
                  <ShowAbove breakpoint="md">⏰ <strong className="text-yellow-400">Beta Expired</strong> • Upgrade to Elite for <strong className="text-red-400">$5.89/mo</strong> (limited time)</ShowAbove>
                  <ShowBelow breakpoint="md">⏰ <strong className="text-yellow-400">Beta Expired</strong> • Upgrade Available</ShowBelow>
                </>
              ) : (
                <>
                  <ShowAbove breakpoint="md">🚀 <strong className="text-cyan-400">Join Discord First</strong> • Get verified → Beta access → Lock in <strong className="text-green-400">$5.89/mo forever</strong></ShowAbove>
                  <ShowBelow breakpoint="md">🚀 <strong className="text-cyan-400">Discord First</strong> • Then Beta</ShowBelow>
                </>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Main Goals Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our <span className="text-red-400">Core Mission</span>
            </h2>
            <p className="text-xl text-gray-400">
              Three pillars of cognitive enhancement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainGoals.map((goal, index) => (
              <Card key={index} className="bg-black/50 border-gray-700 hover:border-red-500/50 transition-all">
                <CardContent className="p-6 text-center">
                  <goal.icon className={`w-12 h-12 ${goal.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-bold text-white mb-3">{goal.title}</h3>
                  <p className="text-gray-400 text-sm">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beta Access Tiers */}
      <section id="beta-access" className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Beta Access <span className="text-red-400">Tiers</span>
            </h2>
            <p className="text-xl text-gray-400">
              Progressive access system for beta members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1: Discord Access */}
            <Card className="bg-gradient-to-b from-blue-900/20 to-black border-blue-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600/20 border-blue-500 text-blue-400">TIER 1</Badge>
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white mt-4">Private Discord Access</CardTitle>
                <p className="text-gray-400 text-sm mt-2">Pre-countdown exclusive</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Direct access to development team</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Beta testing participation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Weekly group sessions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Community-driven research</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tier 2: Elite Access */}
            <Card className="bg-gradient-to-b from-purple-900/20 to-black border-purple-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-600/20 border-purple-500 text-purple-400">TIER 2</Badge>
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-white mt-4">Elite Member Access</CardTitle>
                <p className="text-gray-400 text-sm mt-2">During public window</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Everything in Tier 1</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Priority platform access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">Advanced training modules</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">1-on-1 guidance sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-red-900/10 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Beta Member <span className="text-red-400">Pricing</span>
            </h2>
            <p className="text-xl text-gray-400">
              Lock in your rate before public launch
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-b from-red-900/20 to-black border-red-500/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700"></div>
              
              <CardHeader className="text-center pb-4">
                <Badge className="mb-4 bg-red-600 text-white">BETA PRICING - LIMITED TIME</Badge>
                <CardTitle className="text-2xl text-white mb-2">ShadowFang Beta Access</CardTitle>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <span className="text-5xl font-bold text-red-400">$5.89</span>
                      <span className="text-gray-400">/month</span>
                      <p className="text-green-400 text-sm mt-1">Locked in forever</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500 line-through">$20.00/mo</p>
                      <p className="text-xs text-gray-400">Future price</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {betaFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href="/subscribe">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg py-6 mt-6">
                    Secure Beta Access Now
                    <Lock className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  Cancel anytime • Instant access • Secure payment
                </p>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 mt-4">
                  <p className="text-xs text-yellow-200 text-center">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    Only {Math.floor(Math.random() * 50) + 100} beta spots remaining
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The <span className="text-red-400">ShadowFang</span> System
            </h2>
            <p className="text-xl text-gray-400">
              All-In-One neurohacker training platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">AIO Training</h3>
                <p className="text-gray-400 text-sm">Comprehensive HUMINT protocols with teleprompter system</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Zap className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Frequency Generator</h3>
                <p className="text-gray-400 text-sm">Advanced binaural beats for cognitive enhancement</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Safety Protocols</h3>
                <p className="text-gray-400 text-sm">Military-grade psychological safety measures</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">Sacred Geometry</h3>
                <p className="text-gray-400 text-sm">Visual programming with frequency synchronization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 bg-gray-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Beta Tester <span className="text-red-400">Feedback</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-red-900/10 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="text-red-400">Transform Your Mind</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the beta program and lock in your membership at just $5.89/month forever.
            <br />
            <span className="text-yellow-400">Limited spots available • Price increases to $20/mo after beta</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg px-8 py-6">
                <Lock className="w-5 h-5 mr-2" />
                Join Beta Program Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            By joining, you agree to our terms of service. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 _Fq Neurohacker Platform • ShadowFang Training System
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Is This A Simulation?
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Email: directive@ghz.life
          </p>
        </div>
      </footer>
    </div>
  );
}