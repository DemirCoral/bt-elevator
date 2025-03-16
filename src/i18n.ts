import {getRequestConfig} from 'next-intl/server';
import {locales} from './i18n/settings';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    return {
      locale,
      messages: {},
      timeZone: 'Europe/Istanbul',
      now: new Date()
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}/index.json`)).default,
    timeZone: 'Europe/Istanbul',
    now: new Date()
  };
}); 