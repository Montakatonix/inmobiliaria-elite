import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Bed, Bath, Maximize, Home } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'
import { notFound } from 'next/navigation'

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
  return { bedrooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, area: s ? Number(s) : 0 }
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

    const fullText = getSpanishComment(ad.comments?.adComments)
    const title = fullText.split('\n')[0]?.trim() || 'Propiedad en venta'
    const description = fullText

    const pics = ad.multimedias?.pictures
    const picArr = Array.isArray(pics) ? pics : pics ? [pics] : []
    const images: string[] = picArr.map((p: any) => p?.multimediaPath || '').filter(Boolean)

    let price = 0
    if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
    else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)

    const typeMap: Record<string, string> = {
      '0':'Piso','1':'Casa','2':'Chalet','3':'Adosado','4':'Ático',
      '5':'Local','6':'Oficina','7':'Terreno','8':'Garaje',
      '9':'Trastero','10':'Nave','11':'Finca','12':'Edificio'
    }
    const prop = ad.property || {}
    const type = typeMap[String(prop.typology ?? '')] || 'Inmueble'
    const location: string = prop.address?.location?.name || 'Huércal-Overa'

    const fd = extractFromDesc(description)
    const bedrooms = Number(prop.rooms || 0) || fd.bedrooms
    const bathrooms = Number(prop.bathrooms || 0) || fd.bathrooms
    const area = Number(prop.size || prop.constructedArea || 0) || fd.area

    return { id: String(ad.id), title, description, type, price, bedrooms, bathrooms, area, location, images, image: images[0] || '' }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getProperty(params.id)
  if (!property) return { title: 'Propiedad no encontrada' }
  return {
    title: `${property.title} | Inmobiliaria Élite`,
    description: property.description.substring(0, 160),
  }
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price)

export default async function PropiedadPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id)
  if (!property) notFound()

  return (
    <>
      <section className="pt-24 pb-8 bg-white">
        <div className="section-padding">
          <div className="container-elite">
            <Link href="/comprar" className="inline-flex items-center gap-2 text-brand-warm-gray hover:text-brand-navy transition-colors text-sm mb-6">
              <ArrowLeft size={16} /> Volver a propiedades
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                {/* Galería de imágenes */}
                {property.images.length > 0 && (
                  <div className="mb-8">
                    <div className="aspect-[4/3] rounded-sm overflow-hidden mb-3">
                      <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                    </div>
                    {property.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {property.images.slice(1, 5).map((img, i) => (
                          <div key={i} className="aspect-square rounded-sm overflow-hidden">
                            <img src={img} alt={`${property.title} ${i + 2}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Título y datos */}
                <div className="mb-6">
                  <span className="inline-block bg-brand-navy/10 text-brand-navy text-xs font-semibold px-3 py-1 rounded-sm mb-3">{property.type}</span>
                  <h1 className="font-display text-2xl lg:text-3xl font-bold text-brand-navy mb-3">{property.title}</h1>
                  <div className="flex items-center gap-2 text-brand-warm-gray text-sm mb-4">
                    <MapPin size={16} className="text-brand-gold flex-shrink-0" />
                    <span>{property.location}</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-brand-gold mb-6">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-brand-slate border-t border-b border-gray-100 py-4 mb-6">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center gap-1.5"><Bed size={18} className="text-brand-gold" />{property.bedrooms} dormitorio{property.bedrooms !== 1 ? 's' : ''}</div>
                    )}
                    {property.bathrooms > 0 && (
                      <div className="flex items-center gap-1.5"><Bath size={18} className="text-brand-gold" />{property.bathrooms} baño{property.bathrooms !== 1 ? 's' : ''}</div>
                    )}
                    {property.area > 0 && (
                      <div className="flex items-center gap-1.5"><Maximize size={18} className="text-brand-gold" />{property.area} m²</div>
                    )}
                    <div className="flex items-center gap-1.5"><Home size={18} className="text-brand-gold" />{property.type}</div>
                  </div>
                </div>

                {/* Descripción completa */}
                <div className="prose prose-sm max-w-none text-brand-charcoal leading-relaxed">
                  <h2 className="font-display text-xl font-semibold text-brand-navy mb-4">Descripción</h2>
                  {property.description.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                    <p key={i} className="mb-3 text-brand-slate">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Sidebar contacto */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="bg-brand-light-bg p-6 rounded-sm border border-gray-100 mb-4">
                    <p className="text-2xl font-display font-bold text-brand-gold mb-1">{formatPrice(property.price)}</p>
                    <p className="text-sm text-brand-warm-gray mb-4">{property.location}</p>
                    <div className="space-y-2 text-sm text-brand-slate mb-4">
                      {property.bedrooms > 0 && <div className="flex justify-between"><span>Dormitorios</span><span className="font-medium text-brand-navy">{property.bedrooms}</span></div>}
                      {property.bathrooms > 0 && <div className="flex justify-between"><span>Baños</span><span className="font-medium text-brand-navy">{property.bathrooms}</span></div>}
                      {property.area > 0 && <div className="flex justify-between"><span>Superficie</span><span className="font-medium text-brand-navy">{property.area} m²</span></div>}
                      <div className="flex justify-between"><span>Tipo</span><span className="font-medium text-brand-navy">{property.type}</span></div>
                    </div>
                    <a href={`tel:${siteConfig.phone}`} className="btn-primary w-full justify-center gap-2 flex">
                      <Phone size={18} /> Llamar ahora
                    </a>
                  </div>
                  <div className="bg-white p-6 rounded-sm border border-gray-100">
                    <h3 className="font-display text-lg font-semibold text-brand-navy mb-4">¿Te interesa esta propiedad?</h3>
                    <ContactForm variant="propiedad" propertyTitle={property.title} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
      }
