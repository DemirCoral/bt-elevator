import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';
import { setRequestLocale } from 'next-intl/server';
import { poppins, tajawal } from '@/utils/fonts';

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Await the params object itself
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  // Validate locale before using it
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(locale);
  
  return {
    title: messages?.Home?.title || 'BT Elevator',
    description: messages?.Home?.description || 'High quality elevator solutions',
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params object itself
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages(locale);

  // Check if the current locale is RTL
  const isRtl = locale === 'ar';

  return (
    <html 
      lang={locale} 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`${poppins.variable} ${tajawal.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body 
        className={`${isRtl ? 'font-tajawal' : 'font-poppins'}`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Istanbul"
          now={new Date()}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 