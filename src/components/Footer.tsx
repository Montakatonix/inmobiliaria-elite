import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/data/site'
export function Footer() {
  return (<footer className="bg-brand-navy text-white/80">
    <div className="section-padding py-16 lg:py-20"><div className="container-elite">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <div><span className="font-display text-2xl font-bold text-white">Inmobiliaria</span><span className="font-display text-xl font-semibold text-brand-gold block -mt-1">\u00c9lite</span><p className="text-sm leading-relaxed text-white/60 mt-6">Tu agencia inmobiliaria de confianza en el Levante Almeriense.</p></div>
        <div><h4 className="font-display text-lg font-semibold text-white mb-6">Navegaci\u00f3n</h4><ul className="space-y-3">{[{l:'Inicio',h:'/'},{l:'Comprar',h:'/comprar'},{l:'Vender',h:'/vender'},{l:'Servicios',h:'/servicios'},{l:'Nosotros',h:'/nosotros'},{l:'Contacto',h:'/contacto'}].map(i=><li key={i.h}><Link href={i.h} className="text-sm text-white/60 hover:text-brand-gold">{i.l}</Link></li>)}</ul></div>
        <div><h4 className="font-display text-lg font-semibold text-white mb-6">Contacto</h4><ul className="space-y-4"><li><a href={`tel:${siteConfig.phone}`} className="flex items-start gap-3 text-sm hover:text-brand-gold"><Phone size={16} className="mt-0.5 text-brand-gold"/>{siteConfig.phoneDisplay}</a></li><li><a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-sm hover:text-brand-gold"><Mail size={16} className="mt-0.5 text-brand-gold"/>{siteConfig.email}</a></li></ul></div>
        <div><h4 className="font-display text-lg font-semibold text-white mb-6">Zonas</h4><div className="flex flex-wrap gap-2">{siteConfig.zones.map(z=><span key={z} className="text-xs px-3 py-1.5 border border-white/10 rounded-sm text-white/50">{z}</span>)}</div></div>
      </div>
    </div></div>
    <div className="border-t border-white/10"><div className="section-padding py-6"><div className="container-elite flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40"><p>\u00a9 {new Date().getFullYear()} {siteConfig.legalName}</p><div className="flex gap-4"><Link href="/legal/aviso-legal" className="hover:text-brand-gold">Aviso legal</Link><Link href="/legal/privacidad" className="hover:text-brand-gold">Privacidad</Link><Link href="/legal/cookies" className="hover:text-brand-gold">Cookies</Link></div></div></div></div>
  </footer>)
}
