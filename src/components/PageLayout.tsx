import Header from '@/components/Header';

interface PageLayoutProps {
  children: React.ReactNode;
  isRTL?: boolean;
}

export default function PageLayout({ children, isRTL = false }: PageLayoutProps) {
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 