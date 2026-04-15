import { HeroSplit } from '@/components/home/HeroSplit'
import { CategoryPills } from '@/components/home/CategoryPills'
import { OriginSection } from '@/components/home/OriginSection'
import { FeaturedWeaver } from '@/components/home/FeaturedWeaver'
import { CraftProcess } from '@/components/home/CraftProcess'
import { Newsletter } from '@/components/home/Newsletter'

export const metadata = {
  title: 'Azarbi — Authentic Handwoven Berber Rugs',
  description: 'Directly sourced masterpieces from independent Amazigh women weavers in the Atlas Mountains. 100% fair trade.',
}

export default function HomePage() {
  return (
    <>
      <HeroSplit />
      <CategoryPills />
      <OriginSection />
      <FeaturedWeaver />
      <CraftProcess />
      <Newsletter />
    </>
  )
}
