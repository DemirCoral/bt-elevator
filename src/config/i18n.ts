export const locales = ['en', 'tr', 'ar'] as const;
export type Locale = (typeof locales)[number]; 