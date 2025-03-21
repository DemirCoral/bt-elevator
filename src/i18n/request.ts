import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './settings';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale;

  try {
    // Load all necessary message files for the locale
    const messages = {
      ...(await import(`../messages/${validLocale}/index.json`)).default,
      ...(await import(`../messages/${validLocale}/navigation.json`)).default,
      About: (await import(`../messages/${validLocale}/about.json`)).default,
      Products: (await import(`../messages/${validLocale}/products.json`)).default,
      Services: (await import(`../messages/${validLocale}/services.json`)).default
    };

    return {
      messages,
      timeZone: 'Europe/Istanbul',
      now: new Date(),
      locale: validLocale
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validLocale}`, error);
    
    // Fallback to default locale if message loading fails
    const messages = {
      ...(await import(`../messages/${defaultLocale}/index.json`)).default,
      ...(await import(`../messages/${defaultLocale}/navigation.json`)).default,
      About: (await import(`../messages/${defaultLocale}/about.json`)).default,
      Products: (await import(`../messages/${defaultLocale}/products.json`)).default,
      Services: (await import(`../messages/${defaultLocale}/services.json`)).default
    };

    return {
      messages,
      timeZone: 'Europe/Istanbul',
      now: new Date(),
      locale: defaultLocale
    };
  }
}); 