import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/settings';
import Header from '@/components/Header';
import PageLayout from '@/components/PageLayout';
import ServicesContent from '@/components/services/ServicesContent';
import { 
  WrenchScrewdriverIcon, 
  WrenchIcon, 
  BoltIcon
} from '@heroicons/react/24/outline';

type Locale = typeof locales[number];

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
}

interface ProcessStep {
  title: string;
  description: string;
}

interface TranslationMessages {
  hero: {
    title: string;
    description: string;
  };
  services: {
    installation: Service;
    maintenance: Service;
    repair: Service;
  };
  process: {
    title: string;
    steps: ProcessStep[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function ServicesPage({ params: { locale } }: PageProps) {
  // Using destructuring directly in the function parameters to properly handle async params

  if (!locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations('Services');
  const isRTL = locale === 'ar';

  // Extract features manually instead of using returnObjects
  const maintenanceFeatures = [];
  const repairFeatures = [];
  const installationFeatures = [];
  
  // Get the features from the translation file
  for (let i = 0; i < 5; i++) {
    try {
      maintenanceFeatures.push(t(`services.maintenance.features.${i}`));
    } catch (e) {
      // Stop if we've reached the end of the features
      break;
    }
  }
  
  for (let i = 0; i < 5; i++) {
    try {
      repairFeatures.push(t(`services.repair.features.${i}`));
    } catch (e) {
      // Stop if we've reached the end of the features
      break;
    }
  }
  
  for (let i = 0; i < 5; i++) {
    try {
      installationFeatures.push(t(`services.installation.features.${i}`));
    } catch (e) {
      // Stop if we've reached the end of the features
      break;
    }
  }
  
  const services: Service[] = [
    {
      icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.description'),
      features: maintenanceFeatures
    },
    {
      icon: <WrenchIcon className="w-8 h-8" />,
      title: t('services.repair.title'),
      description: t('services.repair.description'),
      features: repairFeatures
    },
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: t('services.installation.title'),
      description: t('services.installation.description'),
      features: installationFeatures
    }
  ];

  // Extract process steps manually instead of using returnObjects
  const processSteps: ProcessStep[] = [];
  
  // Get the process steps from the translation file
  for (let i = 0; i < 5; i++) {
    try {
      processSteps.push({
        title: t(`process.steps.${i}.title`),
        description: t(`process.steps.${i}.description`)
      });
    } catch (e) {
      // Stop if we've reached the end of the steps
      break;
    }
  }

  return (
    <div className="services-page">
      <PageLayout isRTL={isRTL}>
        <Header />
        <ServicesContent
          services={services}
          processSteps={processSteps}
          t={{
            hero: {
              title: t('hero.title'),
              description: t('hero.description')
            },
            cta: {
              title: t('cta.title'),
              description: t('cta.description'),
              button: t('cta.button')
            }
          }}
          locale={locale}
        />
      </PageLayout>
    </div>
  );
}