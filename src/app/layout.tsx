import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://inmobiliariaelite.es'),
  title: {
    default: 'Inmobiliaria Élite | Compra y venta de viviendas en Huércal-Overa, Almería',
    template: '%s | Inmobiliaria Élite',
  },
  description: 'Inmobiliaria en Huércal-Overa especializada en compra, venta y asesoramiento inmobiliario en el Levante Almeriense. Servicio integral, transparente y profesional.',
  keywords: [
    'inmobiliaria Huércal-Overa', 'inmobiliaria Almería', 'comprar casa Huércal-Overa',
    'vender vivienda Huércal-Overa', 'agencia inmobiliaria Almería',
    'asesoramiento inmobiliario Almería', 'inmobiliaria Levante Almeriense',
    'pisos en venta Huércal-Overa', 'casas en venta Almería',
  ],
  authors: [{ name: 'Inmobiliaria Élite' }],
  creator: 'Elite Bienes de Patrimonio S.L.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://inmobiliariaelite.es',
    siteName: 'Inmobiliaria Élite',
    title: 'Inmobiliaria Élite | Tu agencia inmobiliaria de confianza en Almería',
    description: 'Compra, vende o invierte en el Levante Almeriense con la confianza de un equipo profesional y cercano. Valoración gratuita de tu propiedad.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Inmobiliaria Élite - Huércal-Overa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inmobiliaria Élite | Huércal-Overa, Almería',
    description: 'Tu agencia inmobiliaria de confianza en el Levante Almeriense.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://inmobiliariaelite.es' },
  verification: {},
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Inmobiliaria Élite',
  legalName: 'Elite Bienes de Patrimonio S.L.',
  url: 'https://inmobiliariaelite.es',
  telephone: '+34633077837',
  email: 'contacto@inmobiliariaelite.es',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Guillermo Reyna, 33, local B',
    addressLocality: 'Huércal-Overa',
    addressRegion: 'Almería',
    postalCode: '04600',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.3888,
    longitude: -1.9414,
  },
  areaServed: [
    { '@type': 'City', name: 'Huércal-Overa' },
    { '@type': 'State', name: 'Almería' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '16',
    bestRating: '5',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:30',
      closes: '20:00',
    },
  ],
  priceRange: '€€',
  image: 'https://inmobiliariaelite.es/og-image.jpg',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  )
}
