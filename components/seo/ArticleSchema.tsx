interface ArticleSchemaProps {
  article: {
    title: string
    slug: string
    excerpt: string
    content_html?: string
    cover_image_url?: string
    author_name?: string
    published: boolean
    created_at: string
    updated_at?: string
    tags?: string[]
  }
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "url": `https://azarbi.com/journal/${article.slug}`,
    "image": article.cover_image_url || "https://azarbi.com/og-default.jpg",
    "datePublished": article.created_at,
    "dateModified": article.updated_at || article.created_at,
    "author": {
      "@type": "Organization",
      "name": article.author_name || "Azarbi",
      "url": "https://azarbi.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Azarbi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://azarbi.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://azarbi.com/journal/${article.slug}`
    },
    ...(article.tags && article.tags.length > 0 && {
      "keywords": article.tags.join(', ')
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
