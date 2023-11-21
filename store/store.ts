import { Subscription } from "@/types/Subscription";
import { create } from "zustand";

export type LanguagesSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "hi"
  | "ja"
  | "la"
  | "ar"
  | "ru"
  | "zh";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ar: "Arabic",
  ru: "Russian",
  zh: "Chinese",
};

const LANGUAGES_IN_FREE_PLAN = 3;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    // if not pro, only first 3 languages are supported
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE_PLAN
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];

    // if not pro, only first 3 languages are supported
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE_PLAN
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
