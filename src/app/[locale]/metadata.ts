import { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages(locale);
  
  return {
    title: messages?.Home?.title || 'BT Elevator',
    description: messages?.Home?.description || 'High quality elevator solutions',
    icons: {
      icon: '/favicon.ico',
    },
  };
} 