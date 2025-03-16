'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ReactNode } from 'react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={`/${locale}${href}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        {t('services.viewMore')}
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
  );
} 