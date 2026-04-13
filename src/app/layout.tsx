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
  description: 'Inmobiliaria en Huércal-Overa especializada en compra, venta y asesoramiento inmobiliario en el Levante Almeriense.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
