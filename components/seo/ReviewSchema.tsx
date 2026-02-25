/**
 * Componente que injeta JSON-LD de AggregateRating + Review para SEO.
 * Adiciona rich snippets de estrelas nos resultados do Google.
 */

const BASE_URL = 'https://defesapix.com.br';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

interface Props {
  reviews: Review[];
}

export default function ReviewSchema({ reviews }: Props) {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DefesaPix',
    url: BASE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      bestRating: '5',
      worstRating: '1',
      ratingCount: reviews.length,
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
