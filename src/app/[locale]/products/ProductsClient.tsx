'use client';

import PageLayout from '@/components/PageLayout';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Product {
  key: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

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

interface TranslationMessages {
  hero: Hero;
  products: {
    passenger: Product;
    freight: Product;
    residential: Product;
    commercial: Product;
  };
  cta: CTA;
}

interface ProductsClientProps {
  products: Product[];
  hero: Hero;
  cta: CTA;
  locale: string;
  messages: TranslationMessages;
}

export default function ProductsClient({ products, hero, cta, locale, messages }: ProductsClientProps) {
  const isRTL = locale === 'ar';

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative pt-20 py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.key}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {product.title}
                </h3>
                <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {product.description}
                </p>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className={`flex items-center text-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckIcon className={`w-5 h-5 text-green-500 ${isRTL ? 'mr-0 ml-2' : 'mr-2'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {cta.title}
            </h2>
            <p className="text-xl mb-8 text-gray-600">
              {cta.description}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                {cta.button}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-block bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                {cta.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}