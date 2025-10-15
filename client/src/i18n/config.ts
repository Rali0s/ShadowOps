import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly to avoid Vite build issues
import enCommon from '../locales/en/common.json';
import enTerminal from '../locales/en/terminal.json';
import enResearch from '../locales/en/research.json';
import enTraining from '../locales/en/training.json';
import enAuth from '../locales/en/auth.json';
import enLanding from '../locales/en/landing.json';

import jaCommon from '../locales/ja/common.json';
import jaTerminal from '../locales/ja/terminal.json';
import jaResearch from '../locales/ja/research.json';
import jaTraining from '../locales/ja/training.json';
import jaAuth from '../locales/ja/auth.json';
import jaLanding from '../locales/ja/landing.json';

import esCommon from '../locales/es/common.json';
import esTerminal from '../locales/es/terminal.json';
import esResearch from '../locales/es/research.json';
import esTraining from '../locales/es/training.json';
import esAuth from '../locales/es/auth.json';
import esLanding from '../locales/es/landing.json';

const resources = {
  en: {
    common: enCommon,
    terminal: enTerminal,
    research: enResearch,
    training: enTraining,
    auth: enAuth,
    landing: enLanding,
  },
  ja: {
    common: jaCommon,
    terminal: jaTerminal,
    research: jaResearch,
    training: jaTraining,
    auth: jaAuth,
    landing: jaLanding,
  },
  es: {
    common: esCommon,
    terminal: esTerminal,
    research: esResearch,
    training: esTraining,
    auth: esAuth,
    landing: esLanding,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    ns: ['common', 'terminal', 'research', 'training', 'auth', 'landing'],
    defaultNS: 'common',
  });

export default i18n;
