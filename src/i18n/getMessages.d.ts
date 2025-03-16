declare module '@/i18n/getMessages' {
  export function getMessages(locale: string): Promise<Record<string, any> | null>;
} 