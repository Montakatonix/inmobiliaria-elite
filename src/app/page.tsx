import { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone, ArrowRight, Star, Shield, Users, TrendingUp, MapPin,
  Home, Search, Calculator, CheckCircle, Quote, ChevronRight,
} from 'lucide-react'
import { siteConfig, testimonials, services } from '@/data/site'
import { Property } from '@/lib/crm-api'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/FadeIn'
import { SectionHeading } from '@/components/SectionHeading'
import { PropertyCard } from '@/components/PropertyCard'
import { ZoneMap } from '@/components/ZoneMap'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Inmobiliaria Élite | Compra y venta de viviendas en Huércal-Overa, Almería',
  description: 'Tu inmobiliaria de confianza en Huércal-Overa.',
  alternates: { canonical: 'https://inmobiliariaelite.es' },
}

async function getFeaturedProperties() {
  try {
    const res = await fetch('https://inmobiliaria-elite-montesinos72s-projects.vercel.app/api/properties', {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      console.error('Error fetching properties:', res.status)
      return []
    }
    
    const data = await res.json()
    const properties = data.properties?.slice(0, 3) || []
    
    return properties.map((p: Property) => ({
      id: p.id,
      title: p.title || 'Propiedad',
      location: p.location || p.city || p.address || 'Huércal-Overa',
      price: p.price || 0,
      bedrooms: p.rooms || p.bedrooms || 0,
      bathrooms: p.bathrooms || 0,
      area: p.size || p.area || 0,
      type: p.property_type || p.type || 'Inmueble',
      image: (Array.isArray(p.images) && p.images.length > 0) ? p.images[0] : (p.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80')
    }))
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties()
  return (
    <>
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Vivienda premium en Almería" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/40" />
        </div>
        <div className="relative z-10 section-padding w-full pt-32 pb-20">
          <div className="container-elite"><div className="max-w-2xl">
            <FadeIn><span className="inline-block text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 border border-brand-gold/30 px-4 py-2">Inmobiliaria en Huércal-Overa</span></FadeIn>
            <FadeIn delay={0.15}><h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">Tu hogar ideal en el{' '}
              <span className="text-brand-gold">Levante Almeriense</span></h1></FadeIn>
            <FadeIn delay={0.3}><p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">Compra, vende o invierte con la tranquilidad de un equipo que conoce cada rincón de esta tierra. Asesoramiento profesional, transparente y cercano.</p></FadeIn>
            <FadeIn delay={0.45}><div className="flex flex-col sm:flex-row gap-4">
              <Link href="/comprar" className="btn-primary text-base py-4 px-8">Busco vivienda<ArrowRight size={18}/></Link>
              <Link href="/vender" className="btn-outline-gold text-base py-4 px-8">Quiero vender</Link>
            </div></FadeIn>
            <FadeIn delay={0.6}><div className="mt-12 flex items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-1.5"><div className="flex">{[...Array(5)].map((_,i)=><Star key={i} size={16} className={i<Math.round(siteConfig.rating.score)?'text-brand-gold fill-brand-gold':'text-white/20'}/>)}</div>
                <span className="text-white font-semibold">{siteConfig.rating.score}</span><span>· {siteConfig.rating.count} reseñas</span></div>
            </div></FadeIn>
          </div></div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100"><div className="section-padding py-8 lg:py-10"><div className="container-elite">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
{ [{v:'4,8/5',l:'Valoración Google',i:Star},{v:'100+',l:'Familias atendidas',i:Users},{v:'100%',l:'Compromiso',i:Shield},{v:'10+',l:'Zonas cubiertas',i:MapPin}].map(({v:value,l:label,i:Icon})=><StaggerItem key={label}><div className="flex flex-col items-center"><Icon size={22} className="text-brand-gold mb-2"/><span className="font-display text-2xl lg:text-3xl font-bold text-brand-navy">{value}</span><span className="text-xs text-brand-warm-gray uppercase tracking-wider mt-1">{label}</span></div></StaggerItem>) }
        </StaggerContainer></div></div></section>

      <section className="bg-brand-light-bg py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
        <SectionHeading label="Nuestros servicios" title="Todo lo que necesitas, en un solo lugar" description="Ofrecemos un servicio integral para que comprar, vender o invertir en el Levante Almeriense sea una experiencia segura y sin complicaciones."/>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services.slice(0,6).map(s=><StaggerItem key={s.id}><div className="card-elite p-8 h-full"><ServiceIcon name={s.icon}/><h3 className="font-display text-lg font-semibold text-brand-navy mb-3 mt-5">{s.title}</h3><p className="text-sm text-brand-slate leading-relaxed">{s.description}</p></div></StaggerItem>)}</StaggerContainer>
        <FadeIn delay={0.3}><div className="text-center mt-10"><Link href="/servicios" className="btn-secondary">Ver todos los servicios<ChevronRight size={16}/></Link></div></FadeIn>
      </div></div></section>

      <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
        <SectionHeading label="Propiedades destacadas" title="Encuentra tu próximo hogar" description="Una selección de nuestras propiedades más atractivas."/>
        {featuredProperties.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((p: any)=><StaggerItem key={p.id}><PropertyCard {...p}/></StaggerItem>)}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-brand-slate">Cargando propiedades desde nuestro CRM...</p>
          </div>
        )}
        <FadeIn delay={0.3}><div className="text-center mt-10"><Link href="/comprar" className="btn-primary">Ver más propiedades<ArrowRight size={16}/></Link></div></FadeIn>
      </div></div></section>

      <section className="bg-brand-cream py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
        <SectionHeading label="Opiniones" title="Lo que dicen nuestros clientes" description="La confianza se gana con hechos."/>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{testimonials.map((t,i)=><StaggerItem key={i}><div className="bg-white p-6 rounded-sm shadow-sm h-full flex flex-col"><Quote size={24} className="text-brand-gold/30 mb-4"/><p className="text-sm text-brand-slate leading-relaxed flex-1 mb-4">&ldquo;{t.text}&rdquo;</p><div className="flex items-center justify-between border-t border-gray-100 pt-4"><span className="font-medium text-sm text-brand-navy">{t.author}</span><div className="flex">{[...Array(t.rating)].map((_,j)=><Star key={j} size={12} className="text-brand-gold fill-brand-gold"/>)}</div></div></div></StaggerItem>)}</StaggerContainer>
      </div></div></section>

      <section className="bg-white py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
        <SectionHeading label="Cobertura" title="Dónde trabajamos" description="Especializados en el Levante Almeriense."/>
        <ZoneMap zones={siteConfig.zones} />
      </div></div></section>

      <section className="relative py-20 lg:py-28"><div className="absolute inset-0"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="Interior" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-brand-navy/85"/></div>
        <div className="relative z-10 section-padding"><div className="container-elite text-center">
          <FadeIn><span className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">Propietarios</span></FadeIn>
          <FadeIn delay={0.1}><h2 className="heading-lg text-white mt-4 mb-6">¿Quieres vender tu propiedad?</h2></FadeIn>
          <FadeIn delay={0.2}><p className="text-lg text-white/70 max-w-xl mx-auto mb-10">Te ofrecemos una valoración gratuita y un plan de comercialización personalizado.</p></FadeIn>
          <FadeIn delay={0.3}><div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vender" className="btn-primary text-base py-4 px-8">Solicitar valoración gratuita<ArrowRight size={18}/></Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-outline-gold text-base py-4 px-8"><Phone size={18}/>{siteConfig.phoneDisplay}</a>
          </div></FadeIn>
        </div></div>
      </section>

      <section className="bg-brand-light-bg py-20 lg:py-28"><div className="section-padding"><div className="container-elite">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div><SectionHeading label="Contacto" title="Hablemos de tu proyecto" description="Cuéntanos qué necesitas y nos pondremos en contacto contigo en menos de 24 horas." centered={false}/>
            <FadeIn delay={0.2}><div className="space-y-6 mt-8">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-4 group"><div className="w-12 h-12 bg-brand-gold/10 rounded-sm flex items-center justify-center"><Phone size={20} className="text-brand-gold"/></div><div><p className="text-xs text-brand-warm-gray uppercase tracking-wider">Teléfono</p><p className="font-display text-lg font-semibold text-brand-navy">{siteConfig.phoneDisplay}</p></div></a>
              <div className="flex items-center gap-4"><div className="w-12 h-12 bg-brand-gold/10 rounded-sm flex items-center justify-center"><MapPin size={20} className="text-brand-gold"/></div><div><p className="text-xs text-brand-warm-gray uppercase tracking-wider">Dirección</p><p className="text-sm text-brand-charcoal">{siteConfig.address.street}</p><p className="text-sm text-brand-charcoal">{siteConfig.address.postalCode} {siteConfig.address.city}, {siteConfig.address.province}</p></div></div>
            </div></FadeIn>
          </div>
          <FadeIn delay={0.2} direction="left"><div className="bg-white p-8 lg:p-10 rounded-sm shadow-sm border border-gray-100"><ContactForm variant="general"/></div></FadeIn>
        </div>
      </div></div></section>
    </>
  )
}

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Home: <Home size={22} className="text-brand-gold" />,
    Search: <Search size={22} className="text-brand-gold" />,
    Calculator: <Calculator size={22} className="text-brand-gold" />,
    BarChart3: <TrendingUp size={22} className="text-brand-gold" />,
    TrendingUp: <TrendingUp size={22} className="text-brand-gold" />,
    Megaphone: <Users size={22} className="text-brand-gold" />,
    Handshake: <Shield size={22} className="text-brand-gold" />,
  }
  return <>{icons[name] || <Home size={22} className="text-brand-gold" />}</>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      }
