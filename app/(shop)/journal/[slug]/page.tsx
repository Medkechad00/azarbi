import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify'
import { ArticleSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const supabase = await createClient()
  const { data } = await supabase.from('journal_posts').select('slug, title, excerpt').eq('slug', params.slug).single()
  if (!data) return {}
  return { 
    title: `${data.title} — Azarbi Journal`, 
    description: data.excerpt,
    alternates: {
      canonical: `https://azarbi.com/journal/${data.slug}`
    }
  }
}

export const revalidate = 3600 // hourly

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data: posts } = await supabase.from('journal_posts').select('slug').eq('published', true)
  return posts?.map((post) => ({ slug: post.slug })) || []
}

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  
  const { data: post } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) notFound()

  return (
    <article className="bg-linen min-h-screen pb-32">
      <ArticleSchema article={post} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://azarbi.com' },
        { name: 'Journal', url: 'https://azarbi.com/journal' },
        { name: post.title, url: `https://azarbi.com/journal/${post.slug}` },
      ]} />
      {/* Hero Image */}
      <div className="w-full h-[60vh] relative bg-bone relative group">
        {post.cover_image_url && (
          <Image 
            src={post.cover_image_url} 
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-night/20" />
      </div>

      <div className="container mx-auto px-6 max-w-3xl -mt-32 relative z-10">
        <div className="bg-linen p-8 md:p-16 rounded-brand shadow-sm border border-bone2 flex flex-col items-center text-center mb-16">
          <span className="text-label uppercase tracking-widest text-smoke mb-6 block">
            {new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-night leading-tight mb-8">
            {post.title}
          </h1>
          <span className="font-sans text-smoke italic">By {post.author}</span>
        </div>

        {/* Since it's a prototype, we render HTML dangerously. In prod, we'd use a Markdown/MDX component parser */}
        <div 
          className="prose prose-lg prose-p:text-smoke prose-p:leading-loose prose-headings:font-display prose-headings:font-normal prose-headings:text-night max-w-none mb-24"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }}
        />
        
        <div className="border-t border-bone2 pt-8 flex justify-center">
          <Link href="/journal" className="text-label uppercase tracking-widest text-night hover:text-clay transition-colors">
            ← Back to Dispatch
          </Link>
        </div>
      </div>
    </article>
  )
}
