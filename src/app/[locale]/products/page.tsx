import { getTranslations } from 'next-intl/server';
import { getMessages } from '@/i18n/getMessages';
import ProductsClient from './ProductsClient';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import PageLayout from '@/components/PageLayout';
import Header from '@/components/Header';

type Locale = typeof locales[number];

interface Hero {
  title: string;
  description: string;
}

interface CTA {
  title: string;
  description: string;
  button: string;
  learnMore: string;
}

interface Product {
  key: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function ProductsPage({ params: { locale } }: PageProps) {
  // Using destructuring directly in the function parameters to properly handle async params

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations('Products.default');
  const isRTL = locale === 'ar';

  const hero: Hero = {
    title: t('hero.title'),
    description: t('hero.description')
  };

  const cta: CTA = {
    title: t('cta.title'),
    description: t('cta.description'),
    button: t('cta.button'),
    learnMore: t('cta.learnMore')
  };

  // Convert the features from the translation file to string arrays manually
  const passengerFeatures = [];
  const freightFeatures = [];
  
  // Get the number of features from the translation file
  for (let i = 0; i < 4; i++) {
    try {
      passengerFeatures.push(t(`products.passenger.features.${i}`));
    } catch (e) {
      // Stop if we've reached the end of the features
      break;
    }
  }
  
  for (let i = 0; i < 4; i++) {
    try {
      freightFeatures.push(t(`products.freight.features.${i}`));
    } catch (e) {
      // Stop if we've reached the end of the features
      break;
    }
  }
  
  const products: Product[] = [
    {
      key: 'passenger',
      title: t('products.passenger.title'),
      description: t('products.passenger.description'),
      features: passengerFeatures,
      image: '/images/passenger-elevator.jpg'
    },
    {
      key: 'freight',
      title: t('products.freight.title'),
      description: t('products.freight.description'),
      features: freightFeatures,
      image: '/images/cargo-elevator.jpg'
    }
  ];

  return (
    <div className="products-page">
      <PageLayout isRTL={isRTL}>
        <Header />
        <ProductsClient 
          products={products}
          hero={hero}
          cta={cta}
          locale={locale}
          messages={{} as any}
        />
      </PageLayout>
    </div>
  );
}