import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // Always use path-based routing
  localePrefix: 'always',

  // Add locale detection
  localeDetection: true
});

export const config = {
  // Match all routes
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)']
}; 