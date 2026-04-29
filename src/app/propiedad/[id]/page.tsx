import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

function getSpanishComment(adComments: any[]): string {
  if (!Array.isArray(adComments)) return ''
  const es = adComments.find(c => String(c.language) === '0')
  return es?.propertyComment?.trim() || adComments[0]?.propertyComment?.trim() || ''
}

function extractFromDesc(desc: string) {
  const r = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc))?.[1]
  const b = /([0-9]+)\s*ba[ñn]o/i.exec(desc)?.[1]
  const s = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return { rooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, size: s ? Number(s) : 0 }
}

async function getProperty(id: string) {
  try {
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const rawData = await res.json()
    const ads = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []
    const ad = ads.find((a: any) => String(a.id) === id)
    if (!ad) return null

    const comment = getSpanishComment(ad.comments?.adComments)
    const title = comment.split('\n')[0]?.trim() || 'Propiedad en venta'
    const pics = ad.multimedias?.pictures
    const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []
    let price = 0
    if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
    else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)
    const typeMap: Record<string, string> = { '0':'Piso','1':'Casa','2':'Chalet','3':'Adosado','4':'Ático','5':'Local','6':'Oficina','7':'Terreno','8':'Garaje','9':'Trastero','10':'Nave','11':'Finca','12':'Edificio' }
    const prop = ad.property || {}
    const fd = extractFromDesc(comment)
    return {
      id: String(ad.id), title, description: comment,
      property_type: typeMap[String(prop.typology ?? '')] || 'Inmueble',
      price, images, image: images[0] || '',
      location: prop.address?.location?.name || 'Huércal-Overa',
      rooms: Number(prop.rooms || 0) || fd.rooms,
      bathrooms: Number(prop.bathrooms || 0) || fd.bathrooms,
      size: Number(prop.size || prop.constructedArea || 0) || fd.size,
    }
  } catch { return null }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const p = await getProperty(params.id)
  if (!p) return { title: 'Propiedad no encontrada' }
  return { title: `${p.title} | Inmobiliaria Élite`, description: p.description.substring(0, 160) }
}

export default async function PropiedadPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-brand-navy mb-4">Propiedad no encontrada</h1>
          <Link href="/comprar" className="btn-primary">Ver todas las propiedades</Link>
        </div>
      </div>
    )
  }

  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)

  return (
    <>
      <section className="relative pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-h-[60vh] overflow-hidden">
          {property.images.slice(0, 5).map((img, i) => (
            <div key={i} className={i === 0 ? 'col-span-1 md:col-span-2 row-span-2' : ''}>
              <img src={img} alt={`${property.title} - foto ${i+1}`} className="w-full h-full object-cover" style={{ maxHeight: i === 0 ? '60vh' : '30vh' }} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="section-padding"><div className="container-elite">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Link href="/comprar" className="inline-flex items-center gap-2 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors mb-6">
                <ArrowLeft size={16}/> Volver a propiedades
              </Link>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-sm">{property.property_type}</span>
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mt-3">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-brand-warm-gray mt-2"><MapPin size={16}/>{property.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl lg:text-4xl font-bold text-brand-gold">{formattedPrice}</p>
                </div>
              </div>

              {(property.rooms > 0 || property.bathrooms > 0 || property.size > 0) && (
                <div className="grid grid-cols-3 gap-4 bg-brand-light-bg rounded-sm p-6 mb-8">
                  {property.rooms > 0 && <div className="text-center"><p className="font-display text-2xl font-bold text-brand-navy">{property.rooms}</p><p className="text-xs text-brand-warm-gray uppercase tracking-wider mt-1">Dormitorios</p></div>}
                  {property.bathrooms > 0 && <div className="text-center"><p className="font-display text-2xl font-bold text-brand-navy">{property.bathrooms}</p><p className="text-xs text-brand-warm-gray uppercase tracking-wider mt-1">Baños</p></div>}
                  {property.size > 0 && <div className="text-center"><p className="font-display text-2xl font-bold text-brand-navy">{property.size}</p><p className="text-xs text-brand-warm-gray uppercase tracking-wider mt-1">m²</p></div>}
                </div>
              )}

              <div>
                <h2 className="font-display text-xl font-semibold text-brand-navy mb-4">Descripción</h2>
                <div className="text-brand-slate leading-relaxed whitespace-pre-line text-sm">{property.description}</div>
              </div>

              {property.images.length > 5 && (
                <div className="mt-10">
                  <h2 className="font-display text-xl font-semibold text-brand-navy mb-4">Más fotos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.images.slice(5).map((img, i) => (
                      <img key={i} src={img} alt={`${property.title} - foto ${i+6}`} className="w-full aspect-[4/3] object-cover rounded-sm" loading="lazy"/>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-brand-light-bg rounded-sm p-6 mb-6">
                  <p className="font-display text-3xl font-bold text-brand-gold mb-1">{formattedPrice}</p>
                  <p className="text-sm text-brand-warm-gray">{property.property_type} en {property.location}</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm mb-4">
                  <h3 className="font-display text-lg font-semibold text-brand-navy mb-4">¿Te interesa esta propiedad?</h3>
                  <ContactForm variant="general"/>
                </div>
                <a href={`tel:${siteConfig.phone}`} className="btn-primary w-full justify-center gap-2 flex">
                  <Phone size={18}/> Llamar ahora
                </a>
              </div>
            </div>
          </div>
        </div></div>
      </section>
    </>
  )
      }
