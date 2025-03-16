'use client';

import { ReactNode } from 'react';

type LocaleContentProps = {
  children: ReactNode;
  locale: string;
};

export function LocaleContent({ children, locale }: LocaleContentProps) {
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
      {children}
    </div>
  );
} 