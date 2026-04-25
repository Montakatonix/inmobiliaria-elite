'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Facebook, Instagram } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { Logo } from '@/components/Logo'

const navItems = [
  { label: 'Comprar', href: '/comprar' },
  { label: 'Vender', href: '/vender' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      {/* Top bar */}
      <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'}`}>
        <div className="bg-brand-navy text-white/80 text-xs">
          <div className="container-elite section-padding flex justify-between items-center py-2">
            <span className="hidden sm:inline">{siteConfig.address.full}</span>
            <div className="flex items-center gap-4">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-gold transition-colors">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-brand-gold transition-colors flex items-center gap-1">
                <Phone size={12} />
                {siteConfig.phoneDisplay}
              </a>
              <div className="flex items-center gap-2 ml-2">
                <a href="https://www.facebook.com/p/%C3%89lite-Bienes-de-Patrimonio-61587822161257/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors"><Facebook size={14} /></a>
                <a href="https://www.instagram.com/elitepatrimonio/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors"><Instagram size={14} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-elite section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size="sm" className={`transition-colors duration-300 ${scrolled ? 'text-brand-gold' : 'text-brand-gold'}`} />
            <div className="flex flex-col">
              <span className={`font-display text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-brand-navy' : 'text-white'
              }`}>
                Inmobiliaria
              </span>
              <span className={`font-display text-lg lg:text-xl font-semibold -mt-1 transition-colors duration-300 ${
                scrolled ? 'text-brand-gold' : 'text-brand-gold'
              }`}>
                Élite
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-brand-gold ${
                  scrolled ? 'text-brand-charcoal' : 'text-white/90'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${siteConfig.phone}`} className="btn-primary text-xs py-2.5 px-5">
              <Phone size={14} />
              Llamar
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-brand-navy' : 'text-white'}`}
            aria-label="Menú"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-white border-t border-gray-100 shadow-lg">
          <div className="section-padding py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-brand-charcoal font-medium text-sm uppercase tracking-wide hover:text-brand-gold transition-colors border-b border-gray-50 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a href={`tel:${siteConfig.phone}`} className="btn-primary text-center">
                <Phone size={16} />
                Llamar ahora
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
