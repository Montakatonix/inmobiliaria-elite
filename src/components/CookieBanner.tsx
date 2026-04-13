'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = document.cookie.includes('cookies_accepted=true')
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    document.cookie = 'cookies_accepted=true;max-age=31536000;path=/;SameSite=Lax'
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-sm text-white p-4 sm:p-6 border-t border-white/10">
      <div className="container-elite flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-white/80 max-w-2xl">
          Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación.
          Puedes obtener más información en nuestra{' '}
          <Link href="/legal/cookies" className="text-brand-gold underline">política de cookies</Link>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={accept} className="btn-primary text-xs py-2 px-5">
            Aceptar
          </button>
          <button onClick={() => setVisible(false)} className="text-xs text-white/50 hover:text-white transition-colors px-3">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
