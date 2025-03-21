'use client';

import { useTranslations, useLocale } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import ServiceCard from '@/components/ServiceCard';
import { 
  WrenchScrewdriverIcon, 
  ClockIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const getPlaceholderText = (text: string) => {
    switch(locale) {
      case 'de':
        return {
          'Passenger Elevators': 'Personenaufzüge',
          'Cargo Elevators': 'Lastenaufzüge',
          'Panoramic Elevators': 'Panoramaaufzüge'
        }[text] || text;
      case 'tr':
        return {
          'Passenger Elevators': 'Yolcu Asansörleri',
          'Cargo Elevators': 'Yük Asansörleri',
          'Panoramic Elevators': 'Panoramik Asansörler'
        }[text] || text;
      case 'ru':
        return {
          'Passenger Elevators': 'Пассажирские Лифты',
          'Cargo Elevators': 'Грузовые Лифты',
          'Panoramic Elevators': 'Панорамные Лифты'
        }[text] || text;
      case 'ar':
        return {
          'Passenger Elevators': 'مصاعد الركاب',
          'Cargo Elevators': 'مصاعد البضائع',
          'Panoramic Elevators': 'المصاعد البانورامية'
        }[text] || text;
      default:
        return text;
    }
  };

  const createPlaceholderUrl = (text: string) => {
    const placeholderText = getPlaceholderText(text);
    // Use base64 encoding for Arabic text to prevent URL encoding issues
    const encodedText = isRTL ? 
      Buffer.from(placeholderText).toString('base64') :
      encodeURIComponent(placeholderText);
    
    return `https://placehold.co/600x400/2563eb/ffffff?text=${encodedText}&font=noto-sans-arabic`;
  };

  const products = [
    {
      title: t('products.items.passenger.title'),
      description: t('products.items.passenger.description'),
      image: createPlaceholderUrl('Passenger Elevators'),
      href: `/${locale}/products/passenger-elevators`
    },
    {
      title: t('products.items.cargo.title'),
      description: t('products.items.cargo.description'),
      image: createPlaceholderUrl('Cargo Elevators'),
      href: `/${locale}/products/cargo-elevators`
    },
    {
      title: t('products.items.panoramic.title'),
      description: t('products.items.panoramic.description'),
      image: createPlaceholderUrl('Panoramic Elevators'),
      href: `/${locale}/products/panoramic-elevators`
    }
  ];

  const services = [
    {
      title: t('services.items.maintenance.title'),
      description: t('services.items.maintenance.description'),
      icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
      href: `/${locale}/services/maintenance`
    },
    {
      title: t('services.items.support.title'),
      description: t('services.items.support.description'),
      icon: <ClockIcon className="w-6 h-6" />,
      href: `/${locale}/services/support`
    },
    {
      title: t('services.items.safety.title'),
      description: t('services.items.safety.description'),
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      href: `/${locale}/services/safety`
    }
  ];

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8">
              {t('hero.description')}
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              {t('hero.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('products.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.href}
                title={product.title}
                description={product.description}
                image={product.image}
                href={product.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.href}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl mb-8 text-gray-600">
              {t('contact.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t('contact.cta')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 