'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('services'), href: '/services' },
    { name: t('about'), href: '/about' },
    { name: t('contact'), href: '/contact' },
    { name: t('corporate'), href: '/corporate' },
  ];

  const getLocalizedHref = (href: string) => {
    return href === '/' ? `/${locale}` : `/${locale}${href}`;
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="w-[100px] md:w-[150px] h-8 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="flex items-center space-x-8 mr-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
                ))}
              </div>
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex items-center md:hidden">
              <div className="w-32 h-8 bg-gray-200 animate-pulse rounded mr-2" />
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="block relative">
              <Image
                src="/bt-elevator-logo.png"
                alt="BT Elevator Logo"
                width={100}
                height={30}
                className="w-[60px] md:w-[100px] h-auto object-contain mt-1"
                priority
                suppressHydrationWarning
              />
            </Link>
          </div>
          {/* Desktop Navigation and Language Switcher */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-8 mr-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    pathname === getLocalizedHref(item.href) ? 'text-blue-600' : 'text-gray-700'
                  }`}
                  suppressHydrationWarning
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="w-32">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <div className="w-32 mr-2">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              suppressHydrationWarning
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={getLocalizedHref(item.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === getLocalizedHref(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  suppressHydrationWarning
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}