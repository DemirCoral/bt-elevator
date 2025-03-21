import { locales } from './settings';

export type Messages = {
  Home?: {
    title?: string;
    description?: string;
    hero?: {
      title?: string;
      description?: string;
      cta?: string;
    };
    products?: {
      title?: string;
      description?: string;
      viewMore?: string;
      items?: {
        [key: string]: {
          title?: string;
          description?: string;
        };
      };
    };
    services?: {
      title?: string;
      description?: string;
      viewMore?: string;
      items?: {
        [key: string]: {
          title?: string;
          description?: string;
        };
      };
    };
    contact?: {
      title?: string;
      description?: string;
      cta?: string;
    };
  };
  Navigation?: {
    home?: string;
    products?: string;
    services?: string;
    about?: string;
    contact?: string;
    corporate?: string;
    language?: string;
    menu?: string;
  };
  Products?: {
    title?: string;
    description?: string;
    hero?: {
      title?: string;
      description?: string;
    };
    products?: {
      [key: string]: {
        title?: string;
        description?: string;
        features?: string[];
      };
    };
    cta?: {
      title?: string;
      description?: string;
      button?: string;
      learnMore?: string;
    };
  };
  [key: string]: any;
};

// Default messages as fallback
const defaultMessages: Messages = {
  Navigation: {
    home: 'Home',
    products: 'Products',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    corporate: 'Corporate',
    language: 'Language',
    menu: 'Menu',
  },
  Home: {
    title: 'BT Elevator',
    description: 'Modern Elevator Solutions',
    hero: {
      title: 'Modern Elevator Solutions',
      description: 'Discover our range of modern, efficient, and reliable elevator systems',
      cta: 'Learn More'
    },
    products: {
      title: 'Our Products',
      description: 'Innovative elevator solutions for every need',
      viewMore: 'View More'
    },
    services: {
      title: 'Our Services',
      description: 'Comprehensive elevator services and maintenance',
      viewMore: 'View More'
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with our team',
      cta: 'Contact Us'
    }
  },
  Products: {
    title: 'Our Products',
    description: 'Discover our range of elevator solutions',
    hero: {
      title: 'Elevator Solutions',
      description: 'Explore our modern, efficient, and reliable elevator systems'
    },
    products: {
      passenger: {
        title: 'Passenger Elevators',
        description: 'Comfortable and efficient passenger transportation solutions',
        features: [
          'Smooth and quiet operation',
          'Advanced safety features',
          'Energy-efficient design',
          'Customizable interior'
        ]
      },
      freight: {
        title: 'Freight Elevators',
        description: 'Durable solutions for commercial and industrial applications',
        features: [
          'High load capacity',
          'Robust construction',
          'Wide door openings',
          'Industrial materials'
        ]
      },
      residential: {
        title: 'Residential Elevators',
        description: 'Elegant and compact home elevator solutions',
        features: [
          'Compact design',
          'Quiet operation',
          'Easy maintenance',
          'Modern aesthetics'
        ]
      },
      commercial: {
        title: 'Commercial Elevators',
        description: 'Professional solutions for commercial buildings',
        features: [
          'High traffic capacity',
          'Smart control systems',
          'Energy efficiency',
          'Premium finishes'
        ]
      }
    },
    cta: {
      title: 'Ready to Upgrade Your Elevator?',
      description: 'Contact us to discuss your specific needs',
      button: 'Get in Touch',
      learnMore: 'Learn More'
    }
  }
};

export async function getMessages(locale: string): Promise<Messages> {
  if (!locales.includes(locale as any)) {
    console.warn(`Invalid locale: ${locale}, falling back to default messages`);
    return defaultMessages;
  }

  try {
    // Try to load the navigation messages
    const navigationMessages = await import(`../messages/${locale}/navigation.json`).catch(() => ({}));
    
    // Try to load other messages if they exist
    const otherMessages = await import(`../messages/${locale}/index.json`).catch(() => ({}));
    
    // Try to load products messages
    const productsMessages = await import(`../messages/${locale}/products.json`).catch(() => ({}));

    // Deep merge function to handle nested objects
    const deepMerge = (target: any, source: any) => {
      if (!source) return target;
      if (!target) return source;

      const output = { ...target };
      for (const key in source) {
        if (isObject(target[key]) && isObject(source[key])) {
          output[key] = deepMerge(target[key], source[key]);
        } else if (source[key] !== undefined) {
          output[key] = source[key];
        }
      }
      return output;
    };

    const isObject = (item: any) => {
      return item && typeof item === 'object' && !Array.isArray(item);
    };

    // Ensure default messages are properly structured
    const structuredDefaultMessages = deepMerge(defaultMessages, {});

    // Merge all messages with fallbacks using deep merge
    const mergedMessages = deepMerge(
      structuredDefaultMessages,
      {
        ...otherMessages.default || {},
        Navigation: {
          ...navigationMessages.default || {},
        },
        Products: {
          ...productsMessages.default || {},
        }
      }
    );

    // Ensure all required message keys exist with proper structure
    const finalMessages = {
      ...mergedMessages,
      Home: deepMerge(structuredDefaultMessages.Home, mergedMessages.Home),
      Navigation: deepMerge(structuredDefaultMessages.Navigation, mergedMessages.Navigation),
      Products: deepMerge(structuredDefaultMessages.Products, mergedMessages.Products),
    };

    // Validate message structure
    if (!finalMessages.Home || !finalMessages.Navigation || !finalMessages.Products) {
      console.warn('Invalid message structure, falling back to defaults');
      return defaultMessages;
    }

    return finalMessages;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return defaultMessages;
  }
} 