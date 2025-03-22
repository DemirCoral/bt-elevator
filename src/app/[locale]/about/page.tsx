'use client';

import { useTranslations, useLocale } from 'next-intl';
import PageLayout from '@/components/PageLayout';

export default function AboutPage() {
  const t = useTranslations('About');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Güvenli çeviri erişimi için yardımcı fonksiyon
  const safeTranslate = (key: string, defaultText: string): string => {
    try {
      // Doğrudan key ile deneyelim
      return t(key);
    } catch (e) {
      // Başarısız olursa varsayılan metni kullan
      console.log(`Translation key not found: ${key}, using default text: ${defaultText}`);
      return defaultText;
    }
  };

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800">
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

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-${isRTL ? 'right' : 'center'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('history.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('history.description')}
            </p>
            <p className="text-lg text-gray-700">
              {t('history.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-${isRTL ? 'right' : 'center'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('mission.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('mission.description')}
            </p>
            <p className="text-lg text-gray-700">
              {t('mission.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-${isRTL ? 'right' : 'center'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {Object.entries(t.raw('values.items')).map(([key, value]: [string, any]) => (
                <div key={key} className={`p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-${isRTL ? 'right' : 'left'}`}>
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
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-${isRTL ? 'right' : 'center'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('team.description')}
            </p>
            <p className="text-lg text-gray-700">
              {t('team.content')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              {t('stats.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(t.raw('stats.items')).map(([key, value]: [string, any]) => (
                <div key={key} className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {value.value}
                  </div>
                  <div className="text-gray-600">
                    {value.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 