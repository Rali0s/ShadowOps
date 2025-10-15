import { useTranslation } from 'react-i18next';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, TrendingUp, Users } from 'lucide-react';

export function TranslationDisclaimer() {
  const { t, i18n } = useTranslation('common');

  // Only show for non-English languages
  if (i18n.language === 'en') {
    return null;
  }

  return (
    <Alert className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 mb-6" data-testid="translation-disclaimer">
      <Info className="h-5 w-5 text-blue-400" />
      <AlertTitle className="text-blue-300 font-semibold mb-2">
        {t('translation.disclaimer.title')}
      </AlertTitle>
      <AlertDescription className="text-gray-300 space-y-2">
        <p className="flex items-start">
          <Users className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
          {t('translation.disclaimer.aiPhase')}
        </p>
        <p className="text-sm text-yellow-300 font-medium ml-6">
          {t('translation.disclaimer.currentStatus')}
        </p>
        <p className="mt-3">
          <span className="text-sm font-semibold text-green-300">As we Grow:</span>
        </p>
        <p className="flex items-start">
          <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-green-400" />
          <span className="text-sm">
            <strong>{t('translation.disclaimer.upgradePhase1')}</strong>
            <br />
            <strong>{t('translation.disclaimer.upgradePhase2')}</strong>
          </span>
        </p>
        <p className="text-sm text-gray-400 mt-3">
          💡 {t('translation.disclaimer.feedback')}
        </p>
        <p className="text-sm text-blue-300 font-medium">
          {t('translation.disclaimer.thankYou')}
        </p>
      </AlertDescription>
    </Alert>
  );
}
