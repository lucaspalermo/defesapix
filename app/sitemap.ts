import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE_URL = 'https://defesapix.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/ferramentas`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/golpes`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-pix`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-whatsapp`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-boleto`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-romance`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-emprego`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-investimento`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-clone-app`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-falso-advogado`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/roubo-celular`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-cartao`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-phishing`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-consignado`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-delivery`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-sextorsao`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-falso-suporte`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-maquininha`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-pix-errado`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/golpes/golpe-falso-sequestro`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/como-funciona`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/resultados`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/ferramentas/diagnostico`, priority: 0.95, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/ferramentas/gerador-contestacao-med`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/ferramentas/gerador-bo`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/ferramentas/notificacao-banco`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/ferramentas/checklist`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/ferramentas/pacote-completo`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/calculadora-med`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/assinar`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/blog`, priority: 0.7, changeFrequency: 'daily' as const },
    { url: `${BASE_URL}/educacao`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/parceiros`, priority: 0.6, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/sobre`, priority: 0.5, changeFrequency: 'monthly' as const },
    // /termos, /privacidade, /lgpd, /cookies removidas — têm robots noindex
  ];

  // Static blog articles
  const BLOG_SLUGS = [
    'med-mecanismo-especial-devolucao-pix',
    'golpe-whatsapp-como-identificar-se-proteger',
    'banco-responsavel-golpe-digital-stj',
    'golpe-investimento-criptomoeda-brasil',
    'como-registrar-bo-online-golpe-digital',
    'procon-banco-central-reclamacao-golpe',
    'como-proteger-idoso-golpe-digital',
    'golpe-falso-funcionario-banco',
    'pix-agendado-golpe-comprovante-falso',
    'lei-14155-2021-fraude-digital-penas',
    'juizado-especial-civel-golpe-digital',
    'golpe-marketplace-olx-mercado-livre',
    'como-recuperar-dinheiro-golpe-pix-2025', // slug mantido para não quebrar links existentes
    'golpe-qr-code-pix-como-funciona',
    'seguro-celular-vale-a-pena',
    'direitos-consumidor-banco-digital',
    'golpe-falso-leilao-sites-fraudulentos',
    'como-bloquear-celular-roubado-imei',
    'engenharia-social-o-que-e-como-se-proteger',
    'conta-laranja-pix-consequencias-legais',
    'golpe-instagram-como-identificar-2026',
    'golpe-emprestimo-falso-como-evitar',
    'como-saber-se-e-golpe-checklist',
    'golpe-tinder-romance-online',
    'cai-em-um-golpe-o-que-fazer-primeiro',
    'golpe-nubank-inter-c6-banco-digital',
    'como-denunciar-golpe-internet-2026',
    'pix-para-pessoa-errada-como-recuperar',
    'golpe-telegram-grupo-investimento',
    'direitos-vitima-golpe-digital-2026',
  ];

  const staticBlogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.7 as const,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
  }));

  // Dynamic blog articles from database
  const staticSlugsSet = new Set(BLOG_SLUGS);
  let dbBlogPages: MetadataRoute.Sitemap = [];
  try {
    const dbArtigos = await prisma.artigo.findMany({
      where: { publicado: true },
      select: { slug: true, updatedAt: true },
    });
    dbBlogPages = dbArtigos
      .filter((a) => !staticSlugsSet.has(a.slug))
      .map((a) => ({
        url: `${BASE_URL}/blog/${a.slug}`,
        priority: 0.7 as const,
        changeFrequency: 'monthly' as const,
        lastModified: a.updatedAt,
      }));
  } catch {
    // DB unavailable — only static pages
  }

  // Dynamic golpe guide pages from database
  let dbGuiaPages: MetadataRoute.Sitemap = [];
  try {
    const dbGuias = await prisma.guiaGolpe.findMany({
      where: { publicado: true },
      select: { slug: true, updatedAt: true },
    });
    dbGuiaPages = dbGuias.map((g) => ({
      url: `${BASE_URL}/golpes/${g.slug}`,
      priority: 0.8 as const,
      changeFrequency: 'monthly' as const,
      lastModified: g.updatedAt,
    }));
  } catch {
    // DB unavailable
  }

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: new Date() })),
    ...staticBlogPages,
    ...dbBlogPages,
    ...dbGuiaPages,
  ];
}
