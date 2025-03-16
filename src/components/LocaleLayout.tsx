'use client';

import { ReactNode } from 'react';

type LocaleLayoutProps = {
  children: ReactNode;
  locale: string;
};

export function LocaleLayout({ children, locale }: LocaleLayoutProps) {
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {children}
    </div>
  );
} 