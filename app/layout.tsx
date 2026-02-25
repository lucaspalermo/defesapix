import type { Metadata, Viewport } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://defesapix.com.br'),
  title: {
    default: 'DefesaPix — Golpe Pix: O Que Fazer? Recupere seu Dinheiro',
    template: '%s | DefesaPix',
  },
  description:
    'Fui vítima de golpe via Pix? Saiba o que fazer agora. Gere contestação MED, boletim de ocorrência e notificação bancária em minutos. A maior plataforma brasileira de recuperação após golpes digitais.',
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DefesaPix' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DefesaPix — Golpe Pix: O Que Fazer?',
    description: 'Gere documentos oficiais para recuperar seu dinheiro após golpe digital.',
    images: ['/og-image.png'],
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
  logo: 'https://defesapix.com.br/logo.png',
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
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="font-sans antialiased bg-navy-900 text-white">
        {children}
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
