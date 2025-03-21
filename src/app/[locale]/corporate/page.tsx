import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { 
  BuildingOfficeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

type Locale = typeof locales[number];

interface CorporateSection {
  icon: JSX.Element;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

interface Value {
  title: string;
  description: string;
}

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function CorporatePage({ params }: PageProps) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations('Corporate');
  const isRTL = locale === 'ar';

  const sections: CorporateSection[] = [
    {
      icon: <BuildingOfficeIcon className="w-8 h-8" />,
      title: t('sections.company.title'),
      description: t('sections.company.description'),
      link: {
        text: t('sections.company.link'),
        href: `/${locale}/about`
      }
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: t('sections.policies.title'),
      description: t('sections.policies.description'),
      link: {
        text: t('sections.policies.link'),
        href: `/${locale}/corporate/policies`
      }
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: t('sections.careers.title'),
      description: t('sections.careers.description'),
      link: {
        text: t('sections.careers.link'),
        href: `/${locale}/corporate/careers`
      }
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: t('sections.investors.title'),
      description: t('sections.investors.description'),
      link: {
        text: t('sections.investors.link'),
        href: `/${locale}/corporate/investors`
      }
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: t('sections.sustainability.title'),
      description: t('sections.sustainability.description'),
      link: {
        text: t('sections.sustainability.link'),
        href: `/${locale}/corporate/sustainability`
      }
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: t('sections.compliance.title'),
      description: t('sections.compliance.description'),
      link: {
        text: t('sections.compliance.link'),
        href: `/${locale}/corporate/compliance`
      }
    }
  ];

  const values = t.raw('values.items') as Value[];

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Sections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {section.description}
                </p>
                {section.link && (
                  <Link
                    href={section.link.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {section.link.text}
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8">
              {t('cta.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}