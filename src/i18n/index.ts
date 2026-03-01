export const SUPPORTED_LOCALES = [
  "en",
  "ur",
  "ar",
  "hi",
  "zh",
  "es",
  "fr",
  "de",
  "ja",
  "ko",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const RTL_LOCALES: Locale[] = ["ur", "ar"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ur: "اردو",
  ar: "العربية",
  hi: "हिन्दी",
  zh: "中文",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ko: "한국어",
};

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const browserLang = navigator.language.split("-")[0];
  if (SUPPORTED_LOCALES.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }
  return "en";
}

export type TranslationKeys = {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    viewProjects: string;
    contactMe: string;
  };
  about: {
    title: string;
    description: string;
    skills: string;
    education: string;
    educationDetail: string;
    categories: {
      languages: string;
      backend: string;
      frontend: string;
      databases: string;
      devops: string;
      aiml: string;
      tools: string;
    };
  };
  experience: {
    title: string;
    present: string;
    remote: string;
    jobs: {
      role: string;
      description: string;
      achievements: string[];
    }[];
  };
  projects: {
    title: string;
    viewCode: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
  theme: {
    dark: string;
    light: string;
  };
};
