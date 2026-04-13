import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center max-w-md">
        <span className="font-display text-8xl font-bold text-brand-gold/20">404</span>
        <h1 className="heading-md mt-4 mb-4">Página no encontrada</h1>
        <p className="text-body mb-8">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16} />
            Ir al inicio
          </Link>
          <Link href="/contacto" className="btn-secondary">
            <ArrowLeft size={16} />
            Contactar
          </Link>
        </div>
      </div>
    </div>
  )
}
