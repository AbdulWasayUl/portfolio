"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Locale,
  type TranslationKeys,
  SUPPORTED_LOCALES,
  isRTL,
  detectBrowserLocale,
} from "@/i18n";

import en from "@/i18n/locales/en.json";
import ur from "@/i18n/locales/ur.json";
import ar from "@/i18n/locales/ar.json";
import hi from "@/i18n/locales/hi.json";
import zh from "@/i18n/locales/zh.json";
import es from "@/i18n/locales/es.json";
import fr from "@/i18n/locales/fr.json";
import de from "@/i18n/locales/de.json";
import ja from "@/i18n/locales/ja.json";
import ko from "@/i18n/locales/ko.json";

const translations: Record<Locale, TranslationKeys> = {
  en: en as TranslationKeys,
  ur: ur as TranslationKeys,
  ar: ar as TranslationKeys,
  hi: hi as TranslationKeys,
  zh: zh as TranslationKeys,
  es: es as TranslationKeys,
  fr: fr as TranslationKeys,
  de: de as TranslationKeys,
  ja: ja as TranslationKeys,
  ko: ko as TranslationKeys,
};

interface I18nContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
  dir: "ltr",
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      setLocaleState(stored);
    } else {
      setLocaleState(detectBrowserLocale());
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir = isRTL(locale) ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const dir = isRTL(locale) ? "rtl" : "ltr";

  return (
    <I18nContext.Provider
      value={{ locale, t: translations[locale], setLocale, dir }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
