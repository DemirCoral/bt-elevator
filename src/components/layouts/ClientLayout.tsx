'use client';

import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
  isRTL?: boolean;
}

export default function ClientLayout({ children, isRTL }: ClientLayoutProps) {
  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      {children}
    </div>
  );
}