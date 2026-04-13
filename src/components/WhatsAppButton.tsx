'use client'

import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/data/site'

export function WhatsAppButton() {
  const phone = siteConfig.phone.replace(/[^0-9]/g, '')
  const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hola, me gustaría recibir información sobre vuestros servicios inmobiliarios.')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
