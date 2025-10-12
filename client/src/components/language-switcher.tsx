import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  // Normalize language code (handle en-US -> en, ja-JP -> ja)
  const normalizedLang = i18n.resolvedLanguage || i18n.language.split('-')[0];
  const currentLanguage = languages.find((lang) => lang.code === normalizedLang) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent border-red-500/30 text-gray-300 hover:bg-red-600/20 hover:text-white"
          data-testid="button-language-switcher"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.flag} {currentLanguage.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-red-500/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer text-gray-300 hover:bg-red-600/20 hover:text-white focus:bg-red-600/20 focus:text-white"
            data-testid={`language-option-${lang.code}`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
