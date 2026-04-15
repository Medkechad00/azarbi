export function OrganizationSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Azarbi",
    "alternateName": "Azarbi — Handwoven Berber Rugs",
    "url": "https://azarbi.com",
    "logo": "https://azarbi.com/logo.png",
    "description": "Authentic handwoven Berber rugs from Atlas Mountains cooperatives, directly from Amazigh women weavers in Morocco.",
    "foundingDate": "2022",
    "foundingLocation": {
      "@type": "Place",
      "name": "Marrakech, Morocco"
    },
    "areaServed": ["US","GB","AE","DE","FR","NL"],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@azarbi.com",
      "availableLanguage": ["English","French","Arabic"]
    }],
    "sameAs": [
      "https://www.instagram.com/azarbi",
      "https://www.pinterest.com/azarbi",
      "https://www.tiktok.com/@azarbi"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Azarbi",
    "url": "https://azarbi.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://azarbi.com/collections?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
