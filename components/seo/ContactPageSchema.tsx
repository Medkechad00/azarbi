export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Azarbi",
    "description": "Get in touch with the Azarbi team for orders, bespoke enquiries, and trade accounts.",
    "url": "https://azarbi.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Azarbi",
      "email": "hello@azarbi.com",
      "url": "https://azarbi.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "hello@azarbi.com",
        "availableLanguage": ["English", "French", "Arabic"]
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
