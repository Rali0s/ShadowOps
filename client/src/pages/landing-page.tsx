import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CountdownTimer } from '@/components/countdown-timer';
import { Mobile, Desktop, ShowAbove, ShowBelow } from '@/hooks/use-responsive';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { TranslationDisclaimer } from '@/components/translation-disclaimer';
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
  const { t, i18n } = useTranslation('landing');
  const { user, isLoading, isSubscribed, isAuthorized, betaStatus, loginWithDiscord } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const betaLaunchDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000); // 45 days from now
  
  // Language state
  const [language, setLanguage] = useState(i18n.language || 'en');
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  // Beta expiration handling
  const handleBetaComplete = () => {
    toast({
      title: t('toasts.beta_complete.title'),
      description: t('toasts.beta_complete.description'),
      variant: "destructive",
    });
  };

  const handleBetaExpired = () => {
    if (isSubscribed) {
      toast({
        title: t('toasts.beta_ended_premium.title'),
        description: t('toasts.beta_ended_premium.description'),
      });
      return;
    }

    if (user?.discordVerified) {
      toast({
        title: t('toasts.beta_access_expired.title'),
        description: t('toasts.beta_access_expired.description'),
        variant: "destructive",
      });
      
      // Redirect Discord-verified users to subscription page
      setTimeout(() => {
        setLocation("/subscribe");
      }, 2000);
    } else {
      toast({
        title: t('toasts.beta_period_ended.title'),
        description: t('toasts.beta_period_ended.description'),
        variant: "destructive",
      });
    }
  };

  // Helper functions to determine CTA state
  const getPrimaryCTA = () => {
    if (isLoading) {
      return {
        text: t('cta.primary.loading.text'),
        subText: t('cta.primary.loading.subtext'),
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
        text: t('cta.primary.access_dashboard.text'),
        subText: t('cta.primary.access_dashboard.subtext'),
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
        text: t('cta.primary.upgrade_elite.text'),
        subText: t('cta.primary.upgrade_elite.subtext'),
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
        text: t('cta.primary.access_training.text'),
        subText: t('cta.primary.access_training.subtext'),
        icon: Play,
        action: undefined,
        href: "/home",
        variant: "default" as const,
        disabled: false
      };
    }

    // Not authenticated or no Discord - join community first
    return {
      text: t('cta.primary.join_discord.text'),
      subText: t('cta.primary.join_discord.subtext'),
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
        text: t('cta.secondary.join_discord.text'),
        subText: t('cta.secondary.join_discord.subtext'),
        icon: SiDiscord,
        action: () => window.open("https://discord.gg/3PfFZ6aC", "_blank"),
        href: null,
        variant: "outline" as const
      };
    }

    // For Discord users (verified or beta expired) - show subscription
    if (user?.discordVerified) {
      return {
        text: t('cta.secondary.lock_beta_price.text'),
        subText: t('cta.secondary.lock_beta_price.subtext'),
        icon: Lock,
        action: undefined,
        href: "/subscribe",
        variant: "outline" as const
      };
    }

    // For non-Discord users - show Discord login as secondary
    return {
      text: t('cta.secondary.discord_login.text'),
      subText: t('cta.secondary.discord_login.subtext'), 
      icon: SiDiscord,
      action: loginWithDiscord,
      href: null,
      variant: "outline" as const
    };
  };

  const getHeaderCTA = () => {
    if (isLoading) return { text: t('header.cta.loading'), href: "/subscribe", disabled: true };
    if (isSubscribed) return { text: t('header.cta.dashboard'), href: "/home", disabled: false };
    if (user?.discordVerified && !betaStatus?.expired) return { text: t('header.cta.enter'), href: "/home", disabled: false };
    if (user?.discordVerified && betaStatus?.expired) return { text: t('header.cta.subscribe'), href: "/subscribe", disabled: false };
    return { text: t('header.cta.join_beta'), href: "/subscribe", disabled: false };
  };

  const primaryCTA = getPrimaryCTA();
  const secondaryCTA = getSecondaryCTA();
  const headerCTA = getHeaderCTA();

  const mainGoals = [
    {
      icon: BookOpen,
      title: t('goals.items.0.title'),
      description: t('goals.items.0.description'),
      color: "text-cyan-400"
    },
    {
      icon: FlaskConical,
      title: t('goals.items.1.title'),
      description: t('goals.items.1.description'),
      color: "text-green-400"
    },
    {
      icon: Gift,
      title: t('goals.items.2.title'),
      description: t('goals.items.2.description'),
      color: "text-yellow-400"
    }
  ];

  const betaFeatures = [
    t('features.list.0'),
    t('features.list.1'),
    t('features.list.2'),
    t('features.list.3'),
    t('features.list.4'),
    t('features.list.5'),
    t('features.list.6'),
    t('features.list.7')
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Beta Launch Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-2 text-center animate-pulse">
        <p className="text-xs sm:text-sm font-bold leading-tight">
          {isSubscribed ? (
            <>
              <span className="hidden xs:inline">{t('alerts.elite_active.desktop')}</span>
              <span className="xs:hidden">{t('alerts.elite_active.mobile')}</span>
            </>
          ) : user?.discordVerified && !betaStatus?.expired ? (
            <>
              <span className="hidden xs:inline">{t('alerts.discord_verified.desktop')}</span>
              <span className="xs:hidden">{t('alerts.discord_verified.mobile')}</span>
            </>
          ) : user?.discordVerified && betaStatus?.expired ? (
            <>
              <span className="hidden xs:inline">{t('alerts.beta_expired.desktop')}</span>
              <span className="xs:hidden">{t('alerts.beta_expired.mobile')}</span>
            </>
          ) : (
            <>
              <span className="hidden xs:inline">{t('alerts.join_discord.desktop')}</span>
              <span className="xs:hidden">{t('alerts.join_discord.mobile')}</span>
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
                <h1 className="text-lg sm:text-xl font-bold text-red-400 font-mono">{t('header.app_name')}</h1>
                <p className="text-xs text-gray-400 -mt-1 hidden xs:block">{t('header.tagline')}</p>
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
            <ShowAbove breakpoint="sm">{t('hero.badge.desktop')}</ShowAbove>
            <ShowBelow breakpoint="sm">{t('hero.badge.mobile')}</ShowBelow>
          </Badge>
          
          {/* Language Selection */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <RadioGroup 
              value={language} 
              onValueChange={handleLanguageChange}
              className="flex flex-row gap-6"
              data-testid="radio-language"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="en" 
                  id="lang-en" 
                  className="border-red-500 text-red-500 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                  data-testid="radio-lang-en"
                />
                <Label 
                  htmlFor="lang-en" 
                  className="text-base sm:text-lg font-medium cursor-pointer hover:text-red-400 transition-colors"
                >
                  {t('hero.language.english')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem 
                  value="ja" 
                  id="lang-ja"
                  className="border-red-500 text-red-500 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600"
                  data-testid="radio-lang-ja"
                />
                <Label 
                  htmlFor="lang-ja" 
                  className="text-base sm:text-lg font-medium cursor-pointer hover:text-red-400 transition-colors"
                >
                  {t('hero.language.japanese')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">
              <ShowAbove breakpoint="sm">{t('hero.headline.line1_desktop')}</ShowAbove>
              <ShowBelow breakpoint="sm">{t('hero.headline.line1_mobile')}</ShowBelow>
            </span>
            <span className="block text-red-400 mt-1 sm:mt-2">{t('hero.headline.line2')}</span>
          </h1>
          
          {/* Subheadline with Main Goals */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-2 leading-relaxed">
            <ShowAbove breakpoint="md">{t('hero.subheadline.intro_desktop')}</ShowAbove><strong className="text-cyan-400">{t('hero.subheadline.platform')}</strong>
            <ShowAbove breakpoint="sm">{t('hero.subheadline.description_desktop')}</ShowAbove>
            <ShowBelow breakpoint="sm">{t('hero.subheadline.description_mobile')}</ShowBelow>
            <strong className="text-green-400">{t('hero.subheadline.action')}</strong>.
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

          {/* Translation Disclaimer */}
          <div className="max-w-3xl mx-auto px-2 mb-6">
            <TranslationDisclaimer />
          </div>

          {/* Conditional Status Message */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 sm:p-4 max-w-2xl mx-auto" data-testid="status-message">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 inline mr-2" />
            <span className="text-yellow-200 text-xs sm:text-sm leading-tight">
              {isSubscribed ? (
                <>
                  <ShowAbove breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.elite_active.desktop') }} /></ShowAbove>
                  <ShowBelow breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.elite_active.mobile') }} /></ShowBelow>
                </>
              ) : user?.discordVerified && !betaStatus?.expired ? (
                <>
                  <ShowAbove breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.discord_beta.desktop') }} /></ShowAbove>
                  <ShowBelow breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.discord_beta.mobile') }} /></ShowBelow>
                </>
              ) : user?.discordVerified && betaStatus?.expired ? (
                <>
                  <ShowAbove breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.beta_expired_upgrade.desktop') }} /></ShowAbove>
                  <ShowBelow breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.beta_expired_upgrade.mobile') }} /></ShowBelow>
                </>
              ) : (
                <>
                  <ShowAbove breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.join_discord_flow.desktop') }} /></ShowAbove>
                  <ShowBelow breakpoint="md"><span dangerouslySetInnerHTML={{ __html: t('hero.status_messages.join_discord_flow.mobile') }} /></ShowBelow>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('goals.title').replace('<highlight>', '<span class="text-red-400">').replace('</highlight>', '</span>') }}>
            </h2>
            <p className="text-xl text-gray-400">
              {t('goals.subtitle')}
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('tiers.title').replace('<highlight>', '<span class="text-red-400">').replace('</highlight>', '</span>') }}>
            </h2>
            <p className="text-xl text-gray-400">
              {t('tiers.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tier 1: Discord Access */}
            <Card className="bg-gradient-to-b from-blue-900/20 to-black border-blue-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600/20 border-blue-500 text-blue-400">{t('tiers.tier1.badge')}</Badge>
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white mt-4">{t('tiers.tier1.title')}</CardTitle>
                <p className="text-gray-400 text-sm mt-2">{t('tiers.tier1.subtitle')}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier1.features.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier1.features.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier1.features.2')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier1.features.3')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tier 2: Elite Access */}
            <Card className="bg-gradient-to-b from-purple-900/20 to-black border-purple-500/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-600/20 border-purple-500 text-purple-400">{t('tiers.tier2.badge')}</Badge>
                  <Crown className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-white mt-4">{t('tiers.tier2.title')}</CardTitle>
                <p className="text-gray-400 text-sm mt-2">{t('tiers.tier2.subtitle')}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier2.features.0')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier2.features.1')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier2.features.2')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{t('tiers.tier2.features.3')}</span>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('pricing.title').replace('<highlight>', '<span class="text-red-400">').replace('</highlight>', '</span>') }}>
            </h2>
            <p className="text-xl text-gray-400">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-gradient-to-b from-red-900/20 to-black border-red-500/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-700"></div>
              
              <CardHeader className="text-center pb-4">
                <Badge className="mb-4 bg-red-600 text-white">{t('pricing.badge')}</Badge>
                <CardTitle className="text-2xl text-white mb-2">{t('pricing.card_title')}</CardTitle>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-4">
                    <div>
                      <span className="text-5xl font-bold text-red-400">{t('pricing.price')}</span>
                      <span className="text-gray-400">{t('pricing.period')}</span>
                      <p className="text-green-400 text-sm mt-1">{t('pricing.locked_text')}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500 line-through">{t('pricing.original_price')}</p>
                      <p className="text-xs text-gray-400">{t('pricing.original_label')}</p>
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
                    {t('pricing.button')}
                    <Lock className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  {t('pricing.fine_print')}
                </p>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-3 mt-4">
                  <p className="text-xs text-yellow-200 text-center">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    {t('pricing.spots_remaining', { count: Math.floor(Math.random() * 50) + 100 })}
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: t('system.title').replace('<highlight>', '<span class="text-red-400">').replace('</highlight>', '</span>') }}>
            </h2>
            <p className="text-xl text-gray-400">
              {t('system.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Brain className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('system.features.0.title')}</h3>
                <p className="text-gray-400 text-sm">{t('system.features.0.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Zap className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('system.features.1.title')}</h3>
                <p className="text-gray-400 text-sm">{t('system.features.1.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('system.features.2.title')}</h3>
                <p className="text-gray-400 text-sm">{t('system.features.2.description')}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{t('system.features.3.title')}</h3>
                <p className="text-gray-400 text-sm">{t('system.features.3.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-red-900/10 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: t('final_cta.title').replace('<highlight>', '<span class="text-red-400">').replace('</highlight>', '</span>') }}>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('final_cta.subtitle')}
            <br />
            <span className="text-yellow-400">{t('final_cta.warning')}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/subscribe">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg px-8 py-6">
                <Lock className="w-5 h-5 mr-2" />
                {t('final_cta.button')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            {t('final_cta.fine_print')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-gray-600 text-xs mt-2">
            {t('footer.tagline')}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            {t('footer.email_label')} {t('footer.email')}
          </p>
          <div className="mt-4">
            <a href="mailto:premise@directivestyles.com?subject=Japanese%20Language%20Support" data-testid="button-email-jp">
              <Button variant="outline" size="sm" className="text-xs border-red-600 text-red-400 hover:bg-red-950/30">
                {t('footer.contact_japanese')}
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}