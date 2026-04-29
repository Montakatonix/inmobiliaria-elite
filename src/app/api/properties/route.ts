import { NextResponse } from 'next/server'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getSpanishComment(adComments: any[]): string {
  if (!Array.isArray(adComments)) return ''
  const es = adComments.find(c => String(c.language) === '0')
  return es?.propertyComment?.trim() || adComments[0]?.propertyComment?.trim() || ''
}

function extractFromDesc(desc: string) {
  // Dormitorios/habitaciones
  const rMatch =
    /([0-9]+)\s*dormitorio/i.exec(desc) ||
    /([0-9]+)\s*habitaci/i.exec(desc) ||
    /([0-9]+)\s*cuarto/i.exec(desc)
  
  // Baños — captura "1 baño", "2 baños", "baño completo" con 1 previo implícito
  const bMatch = /([0-9]+)\s*ba[n\u00F1]o/i.exec(desc)
  
  // Superficie — captura "134 m²", "134 m2", "134 metros", "134 metros construidos"
  // El símbolo ² es U+00B2
  const sMatch =
    /([0-9]+)\s*m\u00B2/i.exec(desc) ||
    /([0-9]+)\s*m2\b/i.exec(desc) ||
    /([0-9]+)\s*metros?\s*construid/i.exec(desc) ||
    /([0-9]+)\s*metros?\s*[u\u00FA]tiles/i.exec(desc) ||
    /([0-9]+)\s*metros?\b/i.exec(desc)

  return {
    bedrooms: rMatch ? Number(rMatch[1]) : 0,
    bathrooms: bMatch ? Number(bMatch[1]) : 0,
    area: sMatch ? Number(sMatch[1]) : 0,
  }
}

function mapAd(ad: any) {
  const fullText = getSpanishComment(ad.comments?.adComments)
  const title = fullText.split('\n')[0]?.trim() || 'Propiedad en venta'
  const description = fullText

  const pics = ad.multimedias?.pictures
  const picArr = Array.isArray(pics) ? pics : pics ? [pics] : []
  const images: string[] = picArr.map((p: any) => p?.multimediaPath || '').filter(Boolean)

  const byOp = ad.prices?.byOperation
  const price = byOp?.SALE?.price ? Number(byOp.SALE.price) : byOp?.RENT?.price ? Number(byOp.RENT.price) : 0

  const typeMap: Record<string, string> = {
    '0':'Piso','1':'Casa','2':'Chalet','3':'Adosado','4':'Ático',
    '5':'Local','6':'Oficina','7':'Terreno','8':'Garaje',
    '9':'Trastero','10':'Nave','11':'Finca','12':'Edificio'
  }
  const prop = ad.property || {}
  const type = typeMap[String(prop.typology ?? '')] || 'Inmueble'
  const location: string = prop.address?.location?.name || 'Huércal-Overa'

  const fd = extractFromDesc(description)
  // XML rara vez trae datos numéricos; fallback siempre al regex
  const bedrooms = Number(prop.rooms || 0) || fd.bedrooms
  const bathrooms = Number(prop.bathrooms || 0) || fd.bathrooms
  const area = Number(prop.size || prop.constructedArea || 0) || fd.area

  return {
    id: String(ad.id),
    title, description, type, price,
    bedrooms, bathrooms, area,
    location, images, image: images[0] || '',
  }
}

export async function GET() {
  try {
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) throw new Error(`CRM ${res.status}`)
    const raw = await res.json()
    const ads: any[] = Array.isArray(raw?.ad) ? raw.ad : raw?.ad ? [raw.ad] : []
    const properties = ads.map(mapAd).filter(p => p.price > 0)
    return NextResponse.json({ success: true, properties, total: properties.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
                                     }
