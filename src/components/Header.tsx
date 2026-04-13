'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
const navItems = [{label:'Inicio',href:'/'},{label:'Comprar',href:'/comprar'},{label:'Vender',href:'/vender'},{label:'Servicios',href:'/servicios'},{label:'Nosotros',href:'/nosotros'},{label:'Contacto',href:'/contacto'}]
export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h) }, [])
  return (<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
    <div className="container-elite section-padding"><div className="flex items-center justify-between h-16 lg:h-20">
      <Link href="/" className="flex flex-col"><span className={`font-display text-xl lg:text-2xl font-bold ${scrolled ? 'text-brand-navy' : 'text-white'}`}>Inmobiliaria</span><span className="font-display text-lg font-semibold text-brand-gold -mt-1">\u00c9lite</span></Link>
      <nav className="hidden lg:flex items-center gap-8">{navItems.map(i => <Link key={i.href} href={i.href} className={`text-sm font-medium uppercase tracking-wide hover:text-brand-gold ${scrolled ? 'text-brand-charcoal' : 'text-white/90'}`}>{i.label}</Link>)}<a href={`tel:${siteConfig.phone}`} className="btn-primary text-xs py-2.5 px-5"><Phone size={14}/>Llamar</a></nav>
      <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 ${scrolled ? 'text-brand-navy' : 'text-white'}`}>{isOpen ? <X size={24}/> : <Menu size={24}/>}</button>
    </div></div>
    <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}><nav className="bg-white border-t shadow-lg"><div className="section-padding py-4 space-y-1">{navItems.map(i => <Link key={i.href} href={i.href} onClick={() => setIsOpen(false)} className="block py-3 text-brand-charcoal font-medium text-sm uppercase tracking-wide hover:text-brand-gold border-b border-gray-50 last:border-0">{i.label}</Link>)}</div></nav></div>
  </header>)
}
