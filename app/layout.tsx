import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import CookieBanner from '@/components/layout/CookieBanner';

import LeadCapturePopup from '@/components/home/LeadCapturePopup';
import Chatbot from '@/components/layout/Chatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://defesapix.com.br'),
  title: {
    default: 'DefesaPix — Golpe Pix: O Que Fazer? Recupere seu Dinheiro',
    template: '%s | DefesaPix',
  },
  description:
    'Caiu num golpe digital? Diagnóstico gratuito em 30s + Kit Completo com 5 documentos jurídicos por R$47. Contestação MED, BO, notificação bancária e reclamação BACEN. Prazo MED: 72h.',
  keywords: [
    'golpe pix o que fazer',
    'golpe pix como recuperar dinheiro',
    'mecanismo especial devolução pix',
    'MED pix',
    'golpe whatsapp',
    'contestação pix',
    'recuperar dinheiro golpe',
    'boletim de ocorrência golpe digital',
    'notificação banco golpe',
    'central defesa digital',
    'golpe investimento',
    'golpe boleto falso',
    'estelionato digital',
  ],
  authors: [{ name: 'DefesaPix' }],
  creator: 'DefesaPix',
  publisher: 'DefesaPix',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://defesapix.com.br',
    siteName: 'DefesaPix',
    title: 'DefesaPix — Recupere seu Dinheiro após Golpe Pix',
    description:
      'A maior plataforma brasileira focada em recuperação financeira após golpes digitais. Documentos oficiais gerados em minutos.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'DefesaPix' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DefesaPix — Golpe Pix: O Que Fazer?',
    description: 'Gere documentos oficiais para recuperar seu dinheiro após golpe digital.',
    images: ['/twitter-image'],
  },
  alternates: { canonical: 'https://defesapix.com.br' },
  verification: { google: '9E1YEZk0Jy0IOAwk-iJxUq51yXWdlHR4bZqQQTQD540' },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#09090F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DefesaPix',
  url: 'https://defesapix.com.br',
  logo: 'https://defesapix.com.br/favicon.svg',
  description: 'Plataforma brasileira especializada em recuperação financeira após golpes digitais',
  address: { '@type': 'PostalAddress', addressCountry: 'BR' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'contato@defesapix.com.br', availableLanguage: 'Portuguese' },
  sameAs: [
    'https://www.instagram.com/defesapix',
    'https://www.facebook.com/defesapix',
    'https://www.youtube.com/@defesapix',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DefesaPix',
  url: 'https://defesapix.com.br',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://defesapix.com.br/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${heading.variable}`}>
      <head>
        {/* Google Ads Conversion ID */}
        <meta name="google-ads-conversion" content="AW-18009766174/YXheCOne84YcEJ7y3ItD" />

        {/* Google tag (gtag.js) — carrega com AW- ID para conversões Google Ads */}
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18009766174"
        />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer=window.dataLayer||[];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag=gtag;
          gtag('consent','default',{
            analytics_storage:'denied',
            ad_storage:'granted',
            ad_user_data:'granted',
            ad_personalization:'denied',
            wait_for_update:500
          });
          gtag('js',new Date());
          gtag('config','AW-18009766174');
          gtag('config','G-VN5PQZYBCD',{anonymize_ip:true});
          var cc=localStorage.getItem('cookie_consent');
          if(cc==='accepted'){
            gtag('consent','update',{analytics_storage:'granted',ad_personalization:'granted'});
          }
        `}} />

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          ${process.env.NEXT_PUBLIC_META_PIXEL_ID ? `fbq('init','${process.env.NEXT_PUBLIC_META_PIXEL_ID}');fbq('track','PageView');` : '// Meta Pixel ID não configurado'}
        `}} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="font-sans antialiased bg-navy-900 text-white">
        {children}

        <LeadCapturePopup />
        <Chatbot />
        <CookieBanner />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111228',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  );
}
