import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { getMessages } from '@/i18n/getMessages';
import ProductsClient from './ProductsClient';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import PageLayout from '@/components/PageLayout';
import Header from '@/components/Header';
import { Metadata } from 'next';

type Locale = typeof locales[number];

interface Hero {
  title: string;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

interface CallToAction {
  title: string;
  description: string;
  buttonText: string;
  learnMoreText: string;
}

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  if (!locales.includes(locale as any)) {
    return { title: 'Products - Not Found' };
  }
  
  return {
    title: 'Our Products | BT Elevator',
    description: 'Discover our range of modern, efficient, and reliable elevator systems for all your vertical transportation needs.',
  };
}

export default async function ProductsPage(
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  unstable_setRequestLocale(locale as any);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations('Products');
  const isRTL = locale === 'ar';

  const safeTranslate = (key: string, defaultText: string): string => {
    try {
      // Doğrudan key ile deneyelim
      return t(key);
    } catch (e) {
      // Çeviri bulunamazsa varsayılan metni kullan
      console.log(`Translation key not found: ${key}, using default text: ${defaultText}`);
      return defaultText;
    }
  };

  // Ürün görselleri için varsayılan görseller
  const getProductImageUrl = (id: string): string => {
    const defaultImages: Record<string, string> = {
      passenger: 'https://placehold.co/600x400/blue/white?text=Passenger+Elevator',
      freight: 'https://placehold.co/600x400/gray/white?text=Freight+Elevator',
      residential: 'https://placehold.co/600x400/green/white?text=Residential+Elevator',
      commercial: 'https://placehold.co/600x400/purple/white?text=Commercial+Elevator'
    };

    // Eğer bu id için varsayılan görsel varsa onu kullan, yoksa yerel dosya yolunu dene
    return defaultImages[id] ? defaultImages[id] : `/images/products/${id}-elevator.jpg`;
  };

  const hero: Hero = {
    title: safeTranslate('hero.title', 'Our Elevator Products'),
    description: safeTranslate('hero.description', 'Discover our range of modern, efficient, and reliable elevator systems')
  };

  const productsList: Product[] = [
    {
      id: 'passenger',
      title: safeTranslate('products.passenger.title', 'Passenger Elevators'),
      description: safeTranslate('products.passenger.description', 'Comfortable and efficient passenger transportation solutions'),
      imageUrl: getProductImageUrl('passenger'),
      features: [
        safeTranslate('products.passenger.features.0', 'Smooth and quiet operation'),
        safeTranslate('products.passenger.features.1', 'Advanced safety features'),
        safeTranslate('products.passenger.features.2', 'Energy-efficient design'),
        safeTranslate('products.passenger.features.3', 'Customizable interior')
      ]
    },
    {
      id: 'freight',
      title: safeTranslate('products.freight.title', 'Freight Elevators'),
      description: safeTranslate('products.freight.description', 'Durable solutions for commercial and industrial applications'),
      imageUrl: getProductImageUrl('freight'),
      features: [
        safeTranslate('products.freight.features.0', 'High load capacity'),
        safeTranslate('products.freight.features.1', 'Robust construction'),
        safeTranslate('products.freight.features.2', 'Wide door openings'),
        safeTranslate('products.freight.features.3', 'Industrial materials')
      ]
    },
    {
      id: 'residential',
      title: safeTranslate('products.residential.title', 'Residential Elevators'),
      description: safeTranslate('products.residential.description', 'Elegant and compact home elevator solutions'),
      imageUrl: getProductImageUrl('residential'),
      features: [
        safeTranslate('products.residential.features.0', 'Compact design'),
        safeTranslate('products.residential.features.1', 'Quiet operation'),
        safeTranslate('products.residential.features.2', 'Easy maintenance'),
        safeTranslate('products.residential.features.3', 'Modern aesthetics')
      ]
    },
    {
      id: 'commercial',
      title: safeTranslate('products.commercial.title', 'Commercial Elevators'),
      description: safeTranslate('products.commercial.description', 'Professional solutions for commercial buildings'),
      imageUrl: getProductImageUrl('commercial'),
      features: [
        safeTranslate('products.commercial.features.0', 'High traffic capacity'),
        safeTranslate('products.commercial.features.1', 'Smart control systems'),
        safeTranslate('products.commercial.features.2', 'Energy efficiency'),
        safeTranslate('products.commercial.features.3', 'Premium finishes')
      ]
    }
  ];

  const cta: CallToAction = {
    title: safeTranslate('cta.title', 'Ready to Choose Your Elevator?'),
    description: safeTranslate('cta.description', 'Contact us to discuss your specific needs'),
    buttonText: safeTranslate('cta.button', 'Contact Us'),
    learnMoreText: safeTranslate('cta.learnMore', 'Learn More')
  };

  return (
    <div className="products-page">
      <PageLayout isRTL={isRTL}>
        <Header />
        <ProductsClient 
          products={productsList}
          hero={hero}
          cta={cta}
          isRTL={isRTL}
        />
      </PageLayout>
    </div>
  );
}