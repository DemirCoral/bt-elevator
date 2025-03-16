'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

export default function ProductCard({ title, description, image, href }: ProductCardProps) {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={`/${locale}${href}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          {t('products.viewMore')}
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 