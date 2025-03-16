import { locales } from './settings';

export type Messages = {
  Home?: {
    title?: string;
    description?: string;
  };
  [key: string]: any;
};

export async function getMessages(locale: string): Promise<Messages | null> {
  if (!locales.includes(locale as any)) {
    return null;
  }

  try {
    return (await import(`../messages/${locale}/index.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return null;
  }
} 