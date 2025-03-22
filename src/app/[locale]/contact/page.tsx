'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import PageLayout from '@/components/PageLayout';

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  content: string;
}

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Güvenli çeviri erişimi için yardımcı fonksiyon
  const safeTranslate = (key: string, defaultText: string): string => {
    try {
      // Key'i olduğu gibi deneyelim, bazı çeviriler Contact/ anahtarı yerine Contact altında olabilir
      return t(key);
    } catch (e) {
      // Key bulunamazsa console'a bir hata mesajı verelim ve varsayılan metni kullanalım
      console.log(`Translation key not found: ${key}, using default text: ${defaultText}`);
      return defaultText;
    }
  };

  // URL'i doğrudan tanımla, t fonksiyonundan çekmek yerine
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.775737294366!2d28.96915231541966!3d41.00490297930096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9f0348053f1%3A0x82d1eba5bf4f701f!2sGalata%20Tower!5e0!3m2!1sen!2str!4v1680878238428!5m2!1sen!2str";

  const contactInfo: ContactInfo[] = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: safeTranslate('contact.phone.title', 'Telefon'),
      content: safeTranslate('contact.phone.value', '+90 (555) 123 45 67')
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: safeTranslate('contact.email.title', 'E-posta'),
      content: safeTranslate('contact.email.value', 'info@btasansor.com')
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: safeTranslate('contact.address.title', 'Adres'),
      content: safeTranslate('contact.address.value', 'Asansör Caddesi No:123, Bina Şehri, 34000')
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: safeTranslate('contact.hours.title', 'Çalışma Saatleri'),
      content: safeTranslate('contact.hours.value', 'Pazartesi - Cuma: 09:00 - 18:00')
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageLayout isRTL={isRTL}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {safeTranslate('hero.title', 'BT Asansör ile İletişime Geçin')}
            </h1>
            <p className="text-xl md:text-2xl">
              {safeTranslate('hero.description', 'Tüm asansör ihtiyaçlarınız için buradayız')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {safeTranslate('form.title', 'Bize Mesaj Gönderin')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {safeTranslate('form.name', 'Ad Soyad')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {safeTranslate('form.email', 'E-posta Adresi')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {safeTranslate('form.phone', 'Telefon Numarası')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {safeTranslate('form.subject', 'Konu')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">{safeTranslate('form.selectSubject', 'Bir konu seçin')}</option>
                    <option value="general">{safeTranslate('form.subjects.general', 'Genel Bilgi')}</option>
                    <option value="sales">{safeTranslate('form.subjects.sales', 'Satış')}</option>
                    <option value="support">{safeTranslate('form.subjects.support', 'Teknik Destek')}</option>
                    <option value="other">{safeTranslate('form.subjects.other', 'Diğer')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {safeTranslate('form.message', 'Mesaj')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  {safeTranslate('form.submit', 'Mesaj Gönder')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {safeTranslate('contact.title', 'İletişim Bilgileri')}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4 shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-600">
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {safeTranslate('map.title', 'Bizi Bulun')}
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
} 