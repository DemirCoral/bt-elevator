'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

const languages = [
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Remove the locale prefix from the pathname
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
  const basePathname = pathnameWithoutLocale || '/';

  const isRTL = locale === 'ar';

  return (
    <div className={`relative inline-block text-left w-full ${isRTL ? 'direction-rtl' : ''}`}>
      <select
        value={locale}
        onChange={(e) => {
          const newLocale = e.target.value;
          window.location.href = `/${newLocale}${basePathname}`;
        }}
        className={`
          block w-full rounded-md border-0 py-1.5 px-3
          text-gray-900 ring-1 ring-inset ring-gray-300 
          focus:ring-2 focus:ring-blue-600 
          text-sm leading-6
          ${isRTL ? 'text-right font-arabic' : 'text-left'}
        `}
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            dir={lang.dir}
            className={lang.dir === 'rtl' ? 'font-arabic text-right' : ''}
          >
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
} 