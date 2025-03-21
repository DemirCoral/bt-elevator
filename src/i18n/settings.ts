export const locales = ['tr', 'en', 'ar', 'de', 'ru'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = (typeof locales)[number]; 