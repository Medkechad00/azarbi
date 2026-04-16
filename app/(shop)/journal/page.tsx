import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal — Azarbi Masterweavers',
  description: 'Stories from the Atlas Mountains weaving cooperatives. Learn about Amazigh culture, traditional techniques, and the artisans behind your Moroccan rugs.',
  openGraph: {
    title: 'Journal — Azarbi Masterweavers',
    description: 'Stories from the Atlas Mountains weaving cooperatives. Learn about Amazigh culture, traditional techniques, and the artisans behind your Moroccan rugs.',
    url: 'https://azarbi.com/journal',
    type: 'website',
    images: [{
      url: '/og-journal.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Journal from Atlas Mountains Weavers'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal — Azarbi Masterweavers',
    description: 'Stories from the Atlas Mountains weaving cooperatives.',
    images: ['/og-journal.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/journal'
  }
}

export default async function JournalPage() {
  const supabase = await createClient()
  
  const { data: posts } = await supabase
    .from('journal_posts')
    .select('id, title, slug, excerpt, cover_image_url, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <h1 className="font-display text-5xl md:text-6xl text-night mb-16 text-center">
          The Atlas Dispatch
        </h1>

        {(!posts || posts.length === 0) ? (
          <div className="text-center py-20 border border-dashed border-bone2 rounded-brand">
            <p className="text-smoke">Our first dispatches are currently being penned from the cooperatives.<br/>Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {posts.map((post, idx) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] bg-bone rounded-brand overflow-hidden mb-6">
                  {post.cover_image_url ? (
                    <Image 
                      src={post.cover_image_url} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      priority={idx < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-bone2/50" />
                  )}
                </div>
                
                <span className="text-label-sm text-smoke uppercase tracking-widest block mb-3">
                  {new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                </span>
                <h2 className="font-display text-3xl text-night mb-3 group-hover:text-clay transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-smoke line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
