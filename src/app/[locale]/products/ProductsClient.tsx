'use client';

import PageLayout from '@/components/PageLayout';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

interface Hero {
  title: string;
  description: string;
}

interface CallToAction {
  title: string;
  description: string;
  buttonText: string;
  learnMoreText: string;
}

interface ProductsClientProps {
  products: Product[];
  hero: Hero;
  cta: CallToAction;
  isRTL: boolean;
}

export default function ProductsClient({ products, hero, cta, isRTL }: ProductsClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800">
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
                key={product.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Ürün görseli */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                  {product.imageUrl ? (
                    <Image 
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Ürün Görseli
                    </div>
                  )}
                </div>
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
                href="/contact"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                {cta.buttonText}
              </Link>
              <Link
                href="/about"
                className="inline-block bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                {cta.learnMoreText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}