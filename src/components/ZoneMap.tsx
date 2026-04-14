'use client'

import { useState } from 'react'
import { X, MapPin } from 'lucide-react'

interface ZoneMapProps {
  zones: string[]
}

const zoneCoords: Record<string, string> = {
  'Huércal-Overa': '37.3888,-1.9414',
  'Levante Almeriense': '37.35,-1.85',
  'Almería': '36.834,-2.4637',
  'Pulpí': '37.3833,-1.7333',
  'Vera': '37.245,-1.8617',
  'Garrucha': '37.18,-1.8217',
  'Mojácar': '37.1378,-1.8519',
  'Cuevas del Almanzora': '37.2969,-1.8861',
  'Zurgena': '37.3372,-2.0333',
  'Albox': '37.3875,-2.1497',
}

export function ZoneMap({ zones }: ZoneMapProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null)

  const getMapUrl = (zone: string) => {
    const coords = zoneCoords[zone] || '37.3888,-1.9414'
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50000!2d${coords.split(',')[1]}!3d${coords.split(',')[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses&q=${encodeURIComponent(zone + ', Almería, España')}`
  }

  const getSearchUrl = (zone: string) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(zone + ', Almería, España')}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {zones.map((zone) => (
          <button
            key={zone}
            onClick={() => setActiveZone(zone)}
            className="text-center py-5 px-4 border border-gray-100 rounded-sm hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all duration-300 group cursor-pointer"
          >
            <MapPin size={18} className="text-brand-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-brand-charcoal">{zone}</span>
          </button>
        ))}
      </div>

      {activeZone && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setActiveZone(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-sm shadow-xl w-full max-w-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-brand-gold" />
                <h3 className="font-display text-lg font-semibold text-brand-navy">{activeZone}</h3>
              </div>
              <button onClick={() => setActiveZone(null)} className="p-1 hover:bg-gray-100 rounded-sm transition-colors">
                <X size={20} className="text-brand-slate" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={getSearchUrl(activeZone)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa de ${activeZone}`}
              />
            </div>
            <div className="p-4 bg-brand-light-bg text-center">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(activeZone + ', Almería, España')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-gold hover:underline font-medium"
              >
                Abrir en Google Maps →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
