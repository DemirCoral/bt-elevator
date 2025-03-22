import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import { Metadata } from 'next';
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
  params: { locale: string };
}

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  if (!locales.includes(locale as any)) {
    return { title: 'Corporate - Not Found' };
  }
  
  return {
    title: 'Corporate | BT Elevator',
    description: 'Learn more about our company, our values, and our commitment to excellence.',
  };
}

export default async function CorporatePage(
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  // Set the locale for the request
  unstable_setRequestLocale(locale as any);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations();
  const isRTL = locale === 'ar';

  // Güvenli çeviri erişimi için yardımcı fonksiyon
  const safeTranslate = (key: string, defaultText: string): string => {
    let translation = defaultText;
    try {
      // Önce tam yol ile çevirmeyi dene
      translation = t(`Corporate.${key}`);
    } catch (e) {
      // Çeviri bulunamadıysa, varsayılan metni kullan ve konsola hata mesajı yaz
      console.error(`Translation not found: Corporate.${key}, using default text instead.`);
    }
    return translation;
  };

  const sections: CorporateSection[] = [
    {
      icon: <BuildingOfficeIcon className="w-8 h-8" />,
      title: safeTranslate('sections.company.title', 'Şirketimiz'),
      description: safeTranslate('sections.company.description', 'Şirketimiz hakkında daha fazla bilgi edinin'),
      link: {
        text: safeTranslate('sections.company.link', 'Detaylı Bilgi'),
        href: `/${locale}/about`
      }
    },
    {
      icon: <DocumentTextIcon className="w-8 h-8" />,
      title: safeTranslate('sections.policies.title', 'Politikalarımız'),
      description: safeTranslate('sections.policies.description', 'Şirket politikalarımızı inceleyin'),
      link: {
        text: safeTranslate('sections.policies.link', 'Politikaları Görüntüle'),
        href: `/${locale}/corporate/policies`
      }
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: safeTranslate('sections.careers.title', 'Kariyer'),
      description: safeTranslate('sections.careers.description', 'Kariyer fırsatlarımızı keşfedin'),
      link: {
        text: safeTranslate('sections.careers.link', 'Kariyer Fırsatları'),
        href: `/${locale}/corporate/careers`
      }
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: safeTranslate('sections.investors.title', 'Yatırımcı İlişkileri'),
      description: safeTranslate('sections.investors.description', 'Yatırımcı ilişkileri sayfamızı ziyaret edin'),
      link: {
        text: safeTranslate('sections.investors.link', 'Yatırımcı Bilgileri'),
        href: `/${locale}/corporate/investors`
      }
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: safeTranslate('sections.sustainability.title', 'Sürdürülebilirlik'),
      description: safeTranslate('sections.sustainability.description', 'Sürdürülebilirlik çalışmalarımızı inceleyin'),
      link: {
        text: safeTranslate('sections.sustainability.link', 'Sürdürülebilirlik'),
        href: `/${locale}/corporate/sustainability`
      }
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: safeTranslate('sections.compliance.title', 'Uyum'),
      description: safeTranslate('sections.compliance.description', 'Yasal uyum politikalarımızı görüntüleyin'),
      link: {
        text: safeTranslate('sections.compliance.link', 'Uyum Politikaları'),
        href: `/${locale}/corporate/compliance`
      }
    }
  ];

  // Değerleri doğrudan tanımlayalım
  const values = [
    {
      title: safeTranslate('values.items.0.title', 'Güvenlik'),
      description: safeTranslate('values.items.0.description', 'En yüksek güvenlik standartlarını uyguluyoruz')
    },
    {
      title: safeTranslate('values.items.1.title', 'Kalite'),
      description: safeTranslate('values.items.1.description', 'Sürekli kalite iyileştirmesi ve mükemmellik')
    },
    {
      title: safeTranslate('values.items.2.title', 'Yenilikçilik'),
      description: safeTranslate('values.items.2.description', 'Teknolojik gelişmeleri yakından takip ediyoruz')
    },
    {
      title: safeTranslate('values.items.3.title', 'Müşteri Odaklılık'),
      description: safeTranslate('values.items.3.description', 'Müşteri memnuniyeti önceliğimizdir')
    }
  ];

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {safeTranslate('hero.title', 'Kurumsal')}
            </h1>
            <p className="text-xl md:text-2xl">
              {safeTranslate('hero.description', 'BT Asansör şirket değerleri ve misyonumuz')}
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Misyon, Vizyon, Değerler bölümü */}
          <div className="max-w-5xl mx-auto">
            {/* Misyon */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {safeTranslate('mission.title', 'Misyonumuz')}
              </h2>
              <p className="text-xl text-gray-700">
                {safeTranslate('mission.description', 'Müşterilerimize en yüksek kalitede asansör sistemleri ve hizmetleri sunarak yaşam kalitelerini artırmayı hedefliyoruz.')}
              </p>
            </div>
            
            {/* Vizyon */}
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {safeTranslate('vision.title', 'Vizyonumuz')}
              </h2>
              <p className="text-xl text-gray-700">
                {safeTranslate('vision.description', 'Asansör sektöründe lider konuma gelerek, yenilikçi çözümlerimizle sektörde standartları belirlemek istiyoruz.')}
              </p>
            </div>
            
            {/* Değerler */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
                {safeTranslate('values.title', 'Değerlerimiz')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[0, 1, 2, 3].map((index) => {
                  // Varsayılan değerler
                  const defaultTitles = [
                    'Kalite', 'Güvenilirlik', 'Müşteri Memnuniyeti', 'Yenilikçilik'
                  ];
                  const defaultDescriptions = [
                    'En yüksek kalite standartlarını sağlamak için çalışıyoruz.',
                    'Güvenilir hizmet anlayışımızla müşterilerimizin yanındayız.',
                    'Müşteri memnuniyeti bizim en önemli önceliğimizdir.',
                    'Sürekli yenilikçi çözümler geliştirmeye odaklanıyoruz.'
                  ];
                  
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {safeTranslate(`values.items.${index}.title`, defaultTitles[index])}
                      </h3>
                      <p className="text-gray-700">
                        {safeTranslate(`values.items.${index}.description`, defaultDescriptions[index])}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
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
            {safeTranslate('values.title', 'Değerlerimiz')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
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
              {safeTranslate('cta.title', 'İletişime Geçin')}
            </h2>
            <p className="text-xl mb-8">
              {safeTranslate('cta.description', 'Tüm sorularınız için bizimle iletişime geçebilirsiniz')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              {safeTranslate('cta.button', 'İletişim')}
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}