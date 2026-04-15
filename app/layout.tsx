import type { Metadata } from 'next'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://azarbi.com'),
  title: {
    template: '%s | Azarbi — Handwoven Berber Rugs from Morocco',
    default: 'Azarbi — Authentic Handwoven Moroccan Berber Rugs | Direct from Atlas Mountains',
  },
  description: 'Authentic handwoven Berber rugs from Atlas Mountains cooperatives. Beni Ourain, Azilal, Kilim, and Boucherouite — each rug unique, fair trade, woven by Amazigh women. Free shipping to US, UK, EU.',
  keywords: [
    'berber rugs', 'moroccan rug', 'beni ourain rug', 'azilal rug',
    'handwoven rug', 'atlas mountains', 'fair trade rug', 'amazigh weaving',
    'kilim rug', 'boucherouite rug', 'authentic moroccan rug', 'wool rug'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azarbi.com',
    siteName: 'Azarbi',
    images: [{
      url: '/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Handwoven Berber Rugs from the Atlas Mountains',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@azarbi',
    creator: '@azarbi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://azarbi.com',
    languages: {
      'en-US': 'https://azarbi.com',
      'en-GB': 'https://azarbi.co.uk',
      'fr': 'https://azarbi.com/fr',
    },
  },
  // verification: {
  //   google: process.env.GOOGLE_SITE_VERIFICATION,
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Josefin+Sans:wght@300;400&family=DM+Mono&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <OrganizationSchema />
      </head>
      <body className="flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
