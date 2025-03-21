'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { locales } from '@/i18n/settings';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const flagMap = {
  en: '/images/gb.svg',
  de: '/images/de.svg',
  tr: '/images/tr.svg',
  ar: '/images/ae.svg',
  ru: '/images/ru.svg'
};

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('');

  useEffect(() => {
    // Extract current locale from pathname
    if (pathname) {
      const segments = pathname.split('/');
      if (segments.length > 1 && locales.includes(segments[1] as any)) {
        setCurrentLocale(segments[1]);
      } else {
        setCurrentLocale('tr'); // Default locale
      }
    }
  }, [pathname]);

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="relative">
      {/* Current language with dropdown toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer shadow-sm"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="p-1 rounded-full bg-white dark:bg-gray-600 shadow-sm">
          <Image 
            src={flagMap[currentLocale as keyof typeof flagMap] || flagMap.tr}
            alt={currentLocale.toUpperCase()}
            className="w-6 h-6 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            width={24}
            height={24}
          />
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
          onBlur={() => setIsOpen(false)}
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={redirectedPathName(locale)}
              className={`flex items-center gap-2 px-4 py-2 text-sm ${currentLocale === locale ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src={flagMap[locale as keyof typeof flagMap]}
                alt={locale.toUpperCase()}
                className="w-5 h-5 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                width={20}
                height={20}
              />
              <span>{locale.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}