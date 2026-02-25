const BASE_URL = 'https://defesapix.com.br';

interface Props {
  name: string;
  description: string;
  price: number;
  url: string;
}

export default function ProductSchema({ name, description, price, url }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${BASE_URL}${url}`,
    brand: { '@type': 'Brand', name: 'DefesaPix' },
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}${url}`,
      seller: { '@type': 'Organization', name: 'DefesaPix' },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
