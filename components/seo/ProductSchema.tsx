interface ProductSchemaProps {
  product: {
    id: string
    slug: string
    title: string
    description: string
    sku: string
    price_usd: number
    status: string
    primary_image_url: string
    gallery_image_urls?: string[]
    material_pile: string
    width_cm: number
    length_cm: number
    weavers?: { name: string }
    cooperatives?: { name: string; region: string }
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description || "Authentic handwoven Berber rug.",
    "sku": product.sku,
    "mpn": product.sku,
    "image": [product.primary_image_url, ...(product.gallery_image_urls || [])],
    "url": `https://azarbi.com/products/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Azarbi"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.cooperatives?.name || "Atlas Mountains Cooperative",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MA",
        "addressRegion": product.cooperatives?.region || "High Atlas"
      }
    },
    "material": product.material_pile || "Wool",
    "countryOfOrigin": "Morocco",
    "isSimilarTo": {
      "@type": "Product",
      "name": "Handwoven Moroccan Berber Rug"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://azarbi.com/products/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price_usd,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.status === 'available'
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Azarbi"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": 0
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
          },
          "cutoffTime": "17:00:00+01:00",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 5,
            "maxValue": 14,
            "unitCode": "DAY"
          }
        }
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
