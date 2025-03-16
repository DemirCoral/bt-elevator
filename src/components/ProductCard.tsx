'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function ProductCard({ title, description, image, slug }: ProductCardProps) {
  const t = useTranslations('Home');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="image-container">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="product-image transition-transform duration-300 hover:scale-105"
          priority={false}
        />
      </div>
      <div className={`product-card-content p-4 ${isRtl ? 'text-right' : 'text-left'}`}>
        <h3 className="text-[color:var(--primary)] font-semibold mb-2">{title}</h3>
        <p className="text-[color:var(--dark)] text-sm mb-4">{description}</p>
        <Link 
          href={`/${locale}/products/${slug}`} 
          className="btn btn-outline"
        >
          Detaylı Bilgi
        </Link>
      </div>
    </div>
  );
} 