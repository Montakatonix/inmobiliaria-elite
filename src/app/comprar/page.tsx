import { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'
import { buyingSteps } from '@/data/site'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { SectionHeading } from '@/components/SectionHeading'
import { PropertyCard } from '@/components/PropertyCard'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Comprar vivienda en Huércal-Overa y Almería | Inmobiliaria Élite', description: 'Encuentra tu vivienda ideal en el Levante Almeriense.' }

function extractFromDesc(desc: string) {
  const r = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc))?.[1]
  const b = /([0-9]+)\s*ba[ñn]o/i.exec(desc)?.[1]
  const s = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return { bedrooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, area: s ? Number(s) : 0 }
}

async function getAllProperties() {
  try {
    const res = await fetch('https://crm.inmobiliariaelite.es/api/?get_inmuebles', {
      headers: { Authorization: 'Bearer Elite_SuperSecretToken_2026' },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const raw = await res.json()
    const ads: any[] = Array.isArray(raw?.ad) ? raw.ad : raw?.ad ? [raw.ad] : []
    const typeMap: Record<string, string> = { '0':'Piso','1':'Casa','2':'Chalet','3':'Adosado','4':'Ático','5':'Local','6':'Oficina','7':'Terreno','8':'Garaje','9':'Trastero','10':'Nave','11':'Finca','12':'Edificio' }
    return ads
      .map((ad: any) => {
        const fullText: string = ad.comments?.adComments?.[0]?.propertyComment || ''
        const title = fullText.split('\n')[0]?.trim() || 'Propiedad en venta'
        const description = fullText.trim()
        const pics = ad.multimedias?.pictures
        const picArr = Array.isArray(pics) ? pics : pics ? [pics] : []
        const images: string[] = picArr.map((p: any) => p?.multimediaPath || '').filter(Boolean)
        const byOp = ad.prices?.byOperation
        const price = byOp?.SALE?.price ? Number(byOp.SALE.price) : byOp?.RENT?.price ? Number(byOp.RENT.price) : 0
        const prop = ad.property || {}
        const type = typeMap[String(prop.typology ?? '')] || 'Inmueble'
        const location: string = prop.address?.location?.name || 'Huércal-Overa'
        const fd = extractFromDesc(description)
        const bedrooms = Number(prop.rooms || 0) || fd.bedrooms
        const bathrooms = Number(prop.bathrooms || 0) || fd.bathrooms
        const area = Number(prop.size || prop.constructedArea || 0) || fd.area
        return { id: String(ad.id), title, description, type, price, bedrooms, bathrooms, area, location, images, image: images[0] || '' }
      })
      .filter((p: any) => p.price > 0)
  } catch { return [] }
}

export default async function ComprarPage() {
  const properties = await getAllProperties()
  return (<>
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Viviendas" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-brand-navy/80"/></div>
      <div className="relative z-10 section-padding"><div className="container-elite max-w-3xl">
        <FadeIn><span className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">Comprar vivienda</span></FadeIn>
        <FadeIn delay={0.1}><h1 className="heading-xl text-white mt-4 mb-6">Propiedades en venta</h1></FadeIn>
        <FadeIn delay={0.2}><p className="text-lg text-white/80">{properties.length} propiedades disponibles en el Levante Almeriense.</p></FadeIn>
      </div></div>
    </section>

    <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
      <SectionHeading label="Proceso de compra" title="Te acompañamos en cada paso"/>
      <div className="max-w-3xl mx-auto"><StaggerContainer className="space-y-8">{buyingSteps.map(s=><StaggerItem key={s.step}><div className="flex gap-6"><div className="flex-shrink-0 w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center font-display font-bold text-lg">{s.step}</div><div className="pt-1"><h3 className="font-display text-xl font-semibold text-brand-navy mb-2">{s.title}</h3><p className="text-body">{s.description}</p></div></div></StaggerItem>)}</StaggerContainer></div>
    </div></div></section>

    <section className="bg-brand-light-bg py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
      <SectionHeading label="Nuestros inmuebles" title="Todas las propiedades disponibles"/>
      {properties.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p: any) => <StaggerItem key={p.id}><PropertyCard {...p}/></StaggerItem>)}
        </StaggerContainer>
      ) : (
        <p className="text-center text-brand-slate py-12">No hay propiedades disponibles.</p>
      )}
    </div></div></section>

    <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <FadeIn><div><h2 className="heading-lg mt-3 mb-6">Comprar con Élite tiene ventajas</h2><div className="space-y-4">{['Asesoramiento financiero incluido','Acceso a propiedades exclusivas','Verificación legal completa','Negociación profesional','Acompañamiento hasta notaría'].map(b=><div key={b} className="flex items-start gap-3"><CheckCircle size={20} className="text-brand-gold flex-shrink-0 mt-0.5"/><span className="text-brand-charcoal">{b}</span></div>)}</div></div></FadeIn>
        <FadeIn delay={0.2} direction="left"><div className="bg-white p-8 lg:p-10 rounded-sm shadow-sm border border-gray-100"><ContactForm variant="comprar"/></div></FadeIn>
      </div>
    </div></div></section>
  </>)
      }
