import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/meus-casos', '/documentos', '/api/', '/login', '/cadastro'],
      },
    ],
    sitemap: 'https://centraldefesadigital.com.br/sitemap.xml',
    host: 'https://centraldefesadigital.com.br',
  };
}
