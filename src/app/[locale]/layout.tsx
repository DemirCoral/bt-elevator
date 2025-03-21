import '../globals.css';
import { AbstractIntlMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';
import { setRequestLocale } from 'next-intl/server';
import { poppins, tajawal } from '@/utils/fonts';
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';

// Move metadata types outside of component
type LocaleMetadata = {
  title: string;
  description: string;
  keywords: string[];
};

type MetadataByLocale = {
  [key in typeof locales[number]]: LocaleMetadata;
};

// Base metadata configuration
const baseMetadata = {
  title: {
    template: '%s | BT Elevator',
    default: 'BT Elevator - Modern Asansör Çözümleri',
  },
  description: 'Yüksek kaliteli, güvenilir asansör sistemleri ve bakım hizmetleri sunuyoruz.',
  keywords: ['asansör', 'elevator', 'BT Elevator', 'asansör bakımı', 'yük asansörü'],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
} as const;

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
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages(locale);

  // Language-specific metadata
  const metadataByLocale: MetadataByLocale = {
    en: {
      title: 'BT Elevator - Modern Elevator Solutions',
      description: 'We provide high quality, reliable elevator systems and maintenance services.',
      keywords: ['elevator', 'lift', 'BT Elevator', 'elevator maintenance', 'cargo lift'],
    },
    tr: {
      title: 'BT Elevator - Modern Asansör Çözümleri',
      description: 'Yüksek kaliteli, güvenilir asansör sistemleri ve bakım hizmetleri sunuyoruz.',
      keywords: ['asansör', 'BT Elevator', 'asansör bakımı', 'yük asansörü'],
    },
    ar: {
      title: 'بي تي إليفاتور - حلول المصاعد الحديثة',
      description: 'نقدم أنظمة مصاعد عالية الجودة وموثوقة وخدمات صيانة.',
      keywords: ['مصعد', 'بي تي إليفاتور', 'صيانة المصاعد', 'مصعد البضائع'],
    },
    de: {
      title: 'BT Elevator - Moderne Aufzugslösungen',
      description: 'Wir bieten hochwertige, zuverlässige Aufzugssysteme und Wartungsdienste an.',
      keywords: ['Aufzug', 'BT Elevator', 'Aufzugwartung', 'Lastaufzug'],
    },
    ru: {
      title: 'BT Elevator - Современные решения для лифтов',
      description: 'Мы предоставляем высококачественные, надежные лифтовые системы и услуги по обслуживанию.',
      keywords: ['лифт', 'БТ Элеватор', 'обслуживание лифтов', 'грузовой лифт'],
    },
  };
  
  const localeMetadata = metadataByLocale[locale as keyof MetadataByLocale] || metadataByLocale.en;
  
  return {
    ...baseMetadata,
    ...localeMetadata,
    title: messages?.Home?.title || localeMetadata.title || baseMetadata.title.default,
    description: messages?.Home?.description || localeMetadata.description || baseMetadata.description,
  };
}

import LoadingSpinner from '@/components/LoadingSpinner';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages(locale);
  const isRtl = locale === 'ar';

  // Ensure messages is an object to prevent hydration issues
  const safeMessages: AbstractIntlMessages = messages || {};

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
        <NextIntlClientProvider locale={locale} messages={safeMessages}>
          <Suspense fallback={<LoadingSpinner />}>
            <main className="page-transition">
              {children}
            </main>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}