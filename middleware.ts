import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/settings';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en|ar|de|ru)/:path*']
}; 