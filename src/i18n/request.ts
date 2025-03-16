import { getRequestConfig } from 'next-intl/server';
import { locales } from './settings';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as any)) {
    locale = 'tr';
  }

  const messages = (await import(`../messages/${locale}/index.json`)).default;

  return {
    locale: locale as 'tr' | 'en' | 'de' | 'ru' | 'ar',
    messages,
    timeZone: 'Europe/Istanbul'
  };
}); 