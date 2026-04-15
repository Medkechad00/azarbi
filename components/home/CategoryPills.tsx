import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 'beni-ourain', label: 'Beni Ourain', image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=400&h=400&fit=crop' },
  { id: 'azilal', label: 'Azilal', image: 'https://images.unsplash.com/photo-1600607688033-b4e64f02fa3f?q=80&w=400&h=400&fit=crop' },
  { id: 'kilim', label: 'Kilim', image: 'https://images.unsplash.com/photo-1542868725-582cb696122d?q=80&w=400&h=400&fit=crop' },
  { id: 'boucherouite', label: 'Boucherouite', image: 'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?q=80&w=400&h=400&fit=crop' },
]

export function CategoryPills() {
  return (
    <section className="py-24 bg-linen border-t border-bone2">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl text-night">Shop by Craft</h2>
          <Link href="/collections" className="text-label uppercase tracking-widest text-smoke hover:text-clay transition-colors hidden sm:block">
            View All Series
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/collections/${cat.id}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-square rounded-brand overflow-hidden bg-bone">
                <Image 
                  src={cat.image} 
                  alt={`${cat.label} rugs`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl lg:text-2xl text-night group-hover:text-clay transition-colors">{cat.label}</span>
                <span className="text-smoke group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
