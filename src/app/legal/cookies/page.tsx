import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies de Inmobiliaria Élite',
  robots: { index: false, follow: false },
}

export default function CookiesPage() { return (<><h1 className="text-3xl font-bold mb-8">Política de Cookies</h1><p>Utilizamos cookies propias y de terceros.</p></>) }
