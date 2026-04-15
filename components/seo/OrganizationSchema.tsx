export function OrganizationSchema() {
  const schema = {
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
      "availableLanguage": ["English","French","Arabic"],
      "contactOption": "TollFree"
    }],
    "sameAs": [
      "https://www.instagram.com/azarbi",
      "https://www.pinterest.com/azarbi",
      "https://www.tiktok.com/@azarbi"
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
