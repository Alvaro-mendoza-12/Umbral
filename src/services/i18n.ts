import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { StorageKeys } from '../utils/storage';
import type { Language } from '../types';
import { getProcedure } from '../content';

import esTranslation from '../locales/es/translation.json' with { type: 'json' };
import enTranslation from '../locales/en/translation.json' with { type: 'json' };

/** Resolve legal content explicitly; an unavailable country must never receive PE content. */
export function getTranslationResources(countryCode: string, procedureId: string) {
  const procedure = getProcedure(countryCode, procedureId);
  if (!procedure) return undefined;

  return {
    es: { translation: { ...esTranslation, ...procedure.translations.es } },
    en: { translation: { ...enTranslation, ...procedure.translations.en } },
  };
}

// Current routes are the first PE/CSE implementation. Future routes must resolve their own pair.
const resources = getTranslationResources('PE', 'cse');

export function normalizeLanguage(language?: string): Language {
  let value = language ?? 'es';
  // Accept preferences saved by both the detector and older JSON storage helpers.
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed === 'string') value = parsed;
  } catch {
    // The detector normally stores an unquoted language code.
  }
  return /^en(?:-|$)/i.test(value) ? 'en' : 'es';
}

i18n.on('languageChanged', language => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = normalizeLanguage(i18n.resolvedLanguage ?? language);
  }
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Spanish remains the default unless the visitor chooses another language.
      order: ['localStorage', 'querystring'],
      caches: ['localStorage'],
      lookupLocalStorage: StorageKeys.LANGUAGE,
      convertDetectedLanguage: normalizeLanguage,
    },
  });

export default i18n;
