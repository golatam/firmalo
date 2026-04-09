export const locales = ["es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

export const localeNames: Record<Locale, string> = {
  es: "Español",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  es: "🇪🇸",
  pt: "🇧🇷",
};
