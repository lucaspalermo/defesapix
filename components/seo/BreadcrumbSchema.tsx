/**
 * Componente que injeta JSON-LD de BreadcrumbList para SEO.
 * Uso: <BreadcrumbSchema items={[{ name: 'Golpes', href: '/golpes' }, { name: 'Golpe Pix' }]} />
 * O último item não precisa de href (é a página atual).
 */

const BASE_URL = 'https://defesapix.com.br';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: BASE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
