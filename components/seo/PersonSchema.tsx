interface PersonSchemaProps {
  weaver: {
    name: string
    slug: string
    bio?: string
    portrait_url?: string
    cooperatives?: { name: string; region: string }
  }
}

export function PersonSchema({ weaver }: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": weaver.name,
    "url": `https://azarbi.com/weavers/${weaver.slug}`,
    "description": weaver.bio || `${weaver.name} is an Amazigh artisan weaver from the Atlas Mountains of Morocco.`,
    "jobTitle": "Master Weaver",
    "knowsAbout": ["Berber rug weaving", "Moroccan textiles", "Traditional Amazigh crafts"],
    ...(weaver.portrait_url && { "image": weaver.portrait_url }),
    ...(weaver.cooperatives && {
      "worksFor": {
        "@type": "Organization",
        "name": weaver.cooperatives.name,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "MA",
          "addressRegion": weaver.cooperatives.region
        }
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
