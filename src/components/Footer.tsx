import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Facebook, Instagram } from 'lucide-react'
import { siteConfig } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white/80">
      {/* Main footer */}
      <div className="section-padding py-16 lg:py-20">
        <div className="container-elite">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <span className="font-display text-2xl font-bold text-white">Inmobiliaria</span>
                <span className="font-display text-xl font-semibold text-brand-gold block -mt-1">Élite</span>
              </div>
              <p className="text-sm leading-relaxed text-white/60 mb-6">
                Tu agencia inmobiliaria de confianza en el Levante Almeriense. 
                Compra, vende o invierte con la seguridad de un equipo profesional y cercano.
              </p>
              <div className="flex items-center gap-2 text-brand-gold text-sm font-medium">
                <span>★ {siteConfig.rating.score}/5</span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">{siteConfig.rating.count} reseñas en Google</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Navegación</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Inicio', href: '/' },
                  { label: 'Comprar vivienda', href: '/comprar' },
                  { label: 'Vender propiedad', href: '/vender' },
                  { label: 'Nuestros servicios', href: '/servicios' },
                  { label: 'Sobre nosotros', href: '/nosotros' },
                  { label: 'Contacto', href: '/contacto' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-brand-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Contacto</h4>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 text-sm hover:text-brand-gold transition-colors">
                    <Phone size={16} className="mt-0.5 text-brand-gold flex-shrink-0" />
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-sm hover:text-brand-gold transition-colors">
                    <Mail size={16} className="mt-0.5 text-brand-gold flex-shrink-0" />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm hover:text-brand-gold transition-colors">
                    <MapPin size={16} className="mt-0.5 text-brand-gold flex-shrink-0" />
                    <span>{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}, {siteConfig.address.province}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <Clock size={16} className="mt-0.5 text-brand-gold flex-shrink-0" />
                  <span>
                    {siteConfig.hours.weekdays}<br />
                    {siteConfig.hours.saturday}
                  </span>
                </li>
              </ul>
            </div>

            {/* Zones */}
            <div>
              <h4 className="font-display text-lg font-semibold text-white mb-6">Zonas</h4>
              <div className="flex flex-wrap gap-2">
                {siteConfig.zones.map((zone) => (
                  <span
                    key={zone}
                    className="text-xs px-3 py-1.5 border border-white/10 rounded-sm text-white/50 hover:border-brand-gold/30 hover:text-brand-gold/80 transition-colors"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="container-elite flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/legal/aviso-legal" className="hover:text-brand-gold transition-colors">Aviso legal</Link>
              <Link href="/legal/privacidad" className="hover:text-brand-gold transition-colors">Privacidad</Link>
              <Link href="/legal/cookies" className="hover:text-brand-gold transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
