'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Messages = {
  [key: string]: any;
};

type ClientProviderProps = {
  children: ReactNode;
  locale: string;
  messages: Messages;
};

export function ClientProvider({ children, locale, messages }: ClientProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Istanbul">
      {children}
    </NextIntlClientProvider>
  );
} 