interface CollectionSchemaProps {
  name: string
  description: string
  url: string
  products?: Array<{
    title: string
    slug: string
    price_usd: number
    primary_image_url: string
  }>
}

export function CollectionSchema({ name, description, url, products }: CollectionSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Azarbi",
      "url": "https://azarbi.com"
    },
    ...(products && products.length > 0 && {
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": products.length,
        "itemListElement": products.slice(0, 10).map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `https://azarbi.com/products/${p.slug}`,
          "name": p.title,
          "image": p.primary_image_url
        }))
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
