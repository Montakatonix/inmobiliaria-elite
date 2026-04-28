import Link from 'next/link'
import { Bed, Bath, Maximize, MapPin } from 'lucide-react'

interface PropertyCardProps {
  id?: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  image: string
}

export function PropertyCard({ id, title, location, price, bedrooms, bathrooms, area, type, image }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)

  const card = (
    <div className="card-elite group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-navy/90 text-white text-xs font-medium px-3 py-1.5 rounded-sm">{type}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
        <div className="absolute bottom-4 left-4">
          <span className="text-white font-display text-xl font-bold">{formattedPrice}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-brand-navy mb-1 group-hover:text-brand-gold transition-colors">{title}</h3>
        <p className="flex items-center gap-1 text-sm text-brand-warm-gray mb-4">
          <MapPin size={14} />{location}
        </p>
        <div className="flex items-center gap-4 text-sm text-brand-slate border-t border-gray-100 pt-4">
          {bedrooms > 0 && <span className="flex items-center gap-1.5"><Bed size={16} className="text-brand-gold" />{bedrooms} hab.</span>}
          {bathrooms > 0 && <span className="flex items-center gap-1.5"><Bath size={16} className="text-brand-gold" />{bathrooms} banos</span>}
          {area > 0 && <span className="flex items-center gap-1.5"><Maximize size={16} className="text-brand-gold" />{area} m2</span>}
          {bedrooms === 0 && bathrooms === 0 && area === 0 && (
            <span className="text-brand-gold text-sm font-medium">Ver detalles →</span>
          )}
        </div>
      </div>
    </div>
  )

  if (id) {
    return <Link href={`/propiedad/${id}`} className="block">{card}</Link>
  }
  return card
}
