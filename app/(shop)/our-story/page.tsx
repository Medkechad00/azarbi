import { Metadata } from 'next'
import OurStoryClient from './OurStoryClient'

export const metadata: Metadata = {
  title: 'Our Story — Azarbi | Authentic Moroccan Rugs Direct from Atlas Mountains',
  description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains. Fair trade, zero middlemen, one-of-a-kind handwoven Berber rugs. Learn how every purchase supports artisan communities.',
  keywords: 'Moroccan rugs, Berber rugs, Atlas Mountains, fair trade rugs, handwoven rugs, Amazigh weavers, Beni Ourain, artisan cooperatives',
  openGraph: {
    title: 'Our Story — Azarbi | Authentic Moroccan Rugs',
    description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains. Fair trade, zero middlemen, one-of-a-kind handwoven Berber rugs.',
    url: 'https://azarbi.com/our-story',
    type: 'website',
    images: [{
      url: '/og-our-story.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Handwoven Berber Rugs from Atlas Mountains'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story — Azarbi | Authentic Moroccan Rugs',
    description: 'Azarbi connects you directly with women-led weaving cooperatives in Morocco\'s Atlas Mountains.',
    images: ['/og-our-story.jpg']
  },
  alternates: {
    canonical: 'https://azarbi.com/our-story'
  }
}

export default function OurStoryPage() {
  return <OurStoryClient />
}
