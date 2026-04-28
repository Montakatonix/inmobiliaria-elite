import { Metadata } from 'next'
import Link from 'next/link'
import { Phone, ArrowRight, CheckCircle } from 'lucide-react'
import { siteConfig, buyingSteps } from '@/data/site'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { SectionHeading } from '@/components/SectionHeading'
import { PropertyCard } from '@/components/PropertyCard'
import { ContactForm } from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Comprar vivienda en Huercal-Overa y Almería', description: 'Encuentra tu vivienda ideal.' }

async function getProperties() {
  try {
    const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
    const CRM_TOKEN = 'Elite_SuperSecretToken_2026'
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const rawData = await res.json()
    const ads = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []

    return ads.map((ad: any) => {
      const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
      const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad'
      const pics = ad.multimedias?.pictures
      const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []
      let price = 0
      if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
      else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)
      const prop = ad.property || {}
      const typeMap: Record<string, string> = { '0': 'Piso', '1': 'Casa', '2': 'Chalet', '5': 'Local', '7': 'Terreno', '12': 'Edificio' }
      const loc = prop.address?.location?.name || ''
      return {
        id: ad.id,
        title,
        location: loc || 'Huércal-Overa',
        price,
        bedrooms: Number(prop.rooms || 0),
        bathrooms: Number(prop.bathrooms || 0),
        area: Number(prop.size || 0),
        type: typeMap[String(prop.typology || '')] || 'Inmueble',
        image: images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      }
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export default async function ComprarPage() {
  const allProperties = await getProperties()
  return (<>
  <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" alt="Viviendas" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-brand-navy/80"/></div><div className="relative z-10 section-padding"><div className="container-elite max-w-3xl"><FadeIn><span className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">Comprar vivienda</span></FadeIn><FadeIn delay={0.1}><h1 className="heading-xl text-white mt-4 mb-6">Encuentra la casa que estas buscando</h1></FadeIn><FadeIn delay={0.2}><p className="text-lg text-white/80 leading-relaxed max-w-xl">Te ayudamos a encontrar tu hogar ideal con asesoramiento financiero incluido.</p></FadeIn></div></div></section>
  <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite"><SectionHeading label="Proceso" title="Te acompañamos en cada paso"/><div className="max-w-3xl mx-auto"><StaggerContainer className="space-y-8">{buyingSteps.map(s=><StaggerItem key={s.step}><div className="flex gap-6"><div className="flex-shrink-0 w-12 h-12 bg-brand-gold text-white rounded-full flex items-center justify-center font-display font-bold text-lg">{s.step}</div><div className="pt-1"><h3 className="font-display text-xl font-semibold text-brand-navy mb-2">{s.title}</h3><p className="text-body">{s.description}</p></div></div></StaggerItem>)}</StaggerContainer></div></div></div></section>
  <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite"><SectionHeading label="Nuestros inmuebles" title="Propiedades disponibles"/>
        {allProperties.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{allProperties.map((p: any)=><StaggerItem key={p.id}><PropertyCard {...p}/></StaggerItem>)}</StaggerContainer>
        ) : (
          <div className="text-center py-12"><p className="text-brand-slate">No hay propiedades disponibles en este momento.</p></div>
        )}
  </div></div></section>
  <section className="bg-brand-cream py-20 lg:py-28"><div className="section-padding"><div className="container-elite"><div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"><FadeIn><div><h2 className="heading-lg mt-3 mb-6">Comprar con la Elite tiene ventajas</h2><div className="space-y-4">{['Asesoramiento financiero incluido','Acceso a propiedades exclusivas','Verificación legal completa','Negociación profesional','Acompañamiento hasta notaría'].map(b=><div key={b} className="flex items-start gap-3"><CheckCircle size={20} className="text-brand-gold flex-shrink-0 mt-0.5"/><span className="text-brand-charcoal">{b}</span></div>)}</div></div></FadeIn><FadeIn delay={0.2} direction="left"><div className="bg-white p-8 lg:p-10 rounded-sm shadow-sm border border-gray-100"><ContactForm variant="comprar"/></div></FadeIn></div></div></div></section>
</>)}
