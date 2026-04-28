import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

async function getProperty(id: string) {
  try {
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const rawData = await res.json()
    const ads = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []
    const ad = ads.find((a: any) => String(a.id) === id)
    if (!ad) return null

    const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
    const title = comment.split('\n')[0]?.trim() || 'Propiedad en venta'
    const pics = ad.multimedias?.pictures
    const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []
    let price = 0
    if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
    else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)
    const prop = ad.property || {}
    const typeMap: Record<string, string> = { '0': 'Piso', '1': 'Casa', '2': 'Chalet', '5': 'Local', '7': 'Terreno', '12': 'Edificio' }
    const loc = prop.address?.location?.name || ''
    return {
      id: ad.id, title, description: comment,
      property_type: typeMap[String(prop.typology || '')] || 'Inmueble',
      price, size: Number(prop.size || 0), rooms: Number(prop.rooms || 0), bathrooms: Number(prop.bathrooms || 0),
      location: loc || 'Huercal-Overa', images,
      image: images[0] || '',
    }
  } catch { return null }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProperty(params.id)
  return { title: p ? `${p.title.substring(0,60)} | Inmobiliaria Elite` : 'Propiedad | Inmobiliaria Elite' }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)
  if (!property) {
    return (<div className="min-h-screen flex items-center justify-center pt-32">
      <div className="text-center"><h1 className="heading-lg mb-4">Propiedad no encontrada</h1>
      <Link href="/comprar" className="btn-primary">Volver a propiedades</Link></div></div>)
  }
  const fmt = (n: number) => n.toLocaleString('es-ES') + '\u00a0\u20ac'
  return (<>
    <div className="pt-28 lg:pt-36 pb-20 bg-white"><div className="section-padding"><div className="container-elite">
      <Link href="/comprar" className="inline-flex items-center gap-2 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors mb-8"><ArrowLeft size={16}/> Volver a propiedades</Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {property.images[0] && (<div className="aspect-[16/10] rounded-sm overflow-hidden mb-3">
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover"/></div>)}
          {property.images.length > 1 && (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {property.images.slice(1).map((img: string, i: number) => (
              <div key={i} className="aspect-[4/3] rounded-sm overflow-hidden">
                <img src={img} alt={`Foto ${i+2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"/></div>))}
          </div>)}
        </div>
        <div className="lg:col-span-1"><div className="sticky top-32">
          <span className="inline-block bg-brand-navy/90 text-white text-xs font-medium px-3 py-1.5 rounded-sm mb-4">{property.property_type}</span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-3 leading-tight">{property.title}</h1>
          <p className="flex items-center gap-1.5 text-brand-warm-gray text-sm mb-6"><MapPin size={16} className="text-brand-gold"/> {property.location}</p>
          <div className="text-3xl font-display font-bold text-brand-gold mb-8">{fmt(property.price)}</div>
          {(property.rooms > 0 || property.bathrooms > 0 || property.size > 0) && (
            <div className="flex gap-6 mb-8 pb-8 border-b border-gray-100">
              {property.rooms > 0 && <div><span className="block text-2xl font-bold text-brand-navy">{property.rooms}</span><span className="text-xs text-brand-warm-gray">Habitaciones</span></div>}
              {property.bathrooms > 0 && <div><span className="block text-2xl font-bold text-brand-navy">{property.bathrooms}</span><span className="text-xs text-brand-warm-gray">Banos</span></div>}
              {property.size > 0 && <div><span className="block text-2xl font-bold text-brand-navy">{property.size}</span><span className="text-xs text-brand-warm-gray">m2</span></div>}
            </div>)}
          <div className="bg-brand-light-bg p-6 rounded-sm mb-6">
            <h3 className="font-display text-lg font-semibold text-brand-navy mb-4">Te interesa?</h3>
            <div className="space-y-3">
              <a href={`tel:${siteConfig.phone}`} className="btn-primary w-full justify-center"><Phone size={16}/> Llamar ahora</a>
              <a href={`https://wa.me/34633077837?text=Hola, me interesa la propiedad: ${property.title} (Ref: ${property.id})`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full justify-center">WhatsApp</a>
              <a href={`mailto:${siteConfig.email}?subject=Consulta propiedad ${property.id}`} className="btn-secondary w-full justify-center"><Mail size={16}/> Email</a>
            </div>
          </div>
          <p className="text-xs text-brand-warm-gray">Ref: {property.id}</p>
        </div></div>
      </div>
      <div className="mt-12 max-w-3xl"><h2 className="font-display text-xl font-semibold text-brand-navy mb-4">Descripcion</h2>
        <div className="text-brand-slate leading-relaxed whitespace-pre-line">{property.description}</div></div>
    </div></div></div>
    <section className="bg-brand-light-bg py-16"><div className="section-padding"><div className="container-elite max-w-2xl">
      <h2 className="font-display text-2xl font-semibold text-brand-navy mb-6 text-center">Solicitar informacion</h2>
      <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100"><ContactForm variant="comprar"/></div>
    </div></div></section>
  </>)
}
