import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import PageLayout from '@/components/PageLayout';

// Interfaces for structured data
interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface PageProps {
  params: { locale: string };
}

export default async function ServicesPage(
  { params }: { params: Promise<{ locale: string }> | { locale: string } }
) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  // Set the locale for the request
  unstable_setRequestLocale(locale as any);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const t = await getTranslations('Services');
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

  // Güvenli bir şekilde özellikleri alın, MISSING_MESSAGE hatalarını önleyin
  const getFeatures = (namespace: string, maxCount: number = 4): string[] => {
    const features: string[] = [];
    
    for (let i = 0; i < maxCount; i++) {
      try {
        // rich yerine normal t fonksiyonu kullanalım
        const feature = safeTranslate(`services.${namespace}.features.${i}`, 
          `Feature ${i+1} for ${namespace} service`); // Default text
        features.push(feature);
      } catch (e) {
        // Özellik yoksa, döngüden çık
        break;
      }
    }
    
    return features;
  };

  // Hizmet görselleri için varsayılan görseller
  const getServiceImageUrl = (imageKey: string, defaultUrl: string): string => {
    try {
      // İlk önce özel görsel yolunu dene
      const imagePath = `/images/services/${imageKey}.jpg`;
      return imagePath;
    } catch (e) {
      // Hata durumunda varsayılan görseli kullan
      console.log(`Service image not found: ${imageKey}, using default image`);
      return defaultUrl;
    }
  };

  // Hizmetleri hazırla
  const services: Service[] = [
    {
      id: 'maintenance',
      title: safeTranslate('services.maintenance.title', 'Maintenance Services'),
      description: safeTranslate('services.maintenance.description', 'Regular elevator maintenance to ensure safety and reliability'),
      features: getFeatures('maintenance'),
      imageUrl: getServiceImageUrl('maintenance', '/images/services/maintenance.jpg')
    },
    {
      id: 'repair',
      title: safeTranslate('services.repair.title', 'Repair Services'),
      description: safeTranslate('services.repair.description', 'Quick and professional elevator repair services'),
      features: getFeatures('repair'),
      imageUrl: getServiceImageUrl('repair', '/images/services/repair.jpg')
    },
    {
      id: 'installation',
      title: safeTranslate('services.installation.title', 'Installation Services'),
      description: safeTranslate('services.installation.description', 'Expert elevator installation for new and existing buildings'),
      features: getFeatures('installation'),
      imageUrl: getServiceImageUrl('installation', '/images/services/installation.jpg')
    }
  ];

  // Süreç adımlarını hazırla
  const getProcessSteps = (maxCount: number = 4): ProcessStep[] => {
    const steps: ProcessStep[] = [];
    
    for (let i = 0; i < maxCount; i++) {
      try {
        steps.push({
          title: safeTranslate(`process.steps.${i}.title`, `Step ${i+1}`),
          description: safeTranslate(`process.steps.${i}.description`, `Description for step ${i+1}`)
        });
      } catch (e) {
        // Adım yoksa, döngüden çık
        break;
      }
    }
    
    return steps;
  };

  const processSteps = getProcessSteps();

  // Services section title with default fallback
  const sectionTitle = safeTranslate('servicesSection.title', 'Hizmetlerimiz');

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {safeTranslate('hero.title', 'Our Services')}
            </h1>
            <p className="text-xl md:text-2xl">
              {safeTranslate('hero.description', 'Comprehensive elevator services for all your needs')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {safeTranslate('process.title', 'Our Service Process')}
          </h2>
          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {safeTranslate('cta.title', 'Ready to Get Started?')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {safeTranslate('cta.description', 'Contact us today to discuss your elevator service needs')}
            </p>
            <a 
              href={`/${locale}/contact`} 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              {safeTranslate('cta.button', 'Contact Us')}
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}