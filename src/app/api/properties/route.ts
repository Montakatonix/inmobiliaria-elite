import { NextResponse } from 'next/server'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Detecta si el texto es español
function isSpanish(text: string): boolean {
  if (!text || text.length < 10) return true
  // Caracteres no latinos que indican otro idioma
  if (/[\u0400-\u04FF]/.test(text)) return false // cirílico (ruso/ucraniano/búlgaro)
  if (/[\u0102\u0103\u015E\u015F\u021A\u021B\u0218\u0219\u021C\u021D]/.test(text)) return false // rumano específico
  // Palabras clave de otros idiomas frecuentes
  const nonSpanishWords = ['house', 'bedroom', 'bathroom', 'property', 'located', 'floor', 'living', 'kitchen',
    'maison', 'chambre', 'étage', 'opportunité', 'découvrez', 'située',
    'woning', 'slaapkamer', 'koop', 'gelegen', 'verdieping', 'ruimte',
    'haus', 'schlafzimmer', 'etage', 'küche', 'zimmer', 'anwesen',
    'locuinta', 'dormitor', 'baie', 'etaj', 'oportunitate', 'descoperă']
  const lower = text.toLowerCase()
  const nonSpanishCount = nonSpanishWords.filter(w => lower.includes(w)).length
  return nonSpanishCount < 2
}

// Traducir texto al español usando Claude API
async function translateToSpanish(text: string): Promise<string> {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `Traduce este texto al español. Traduce SOLO el texto, sin explicaciones, sin comillas adicionales, sin cambiar nombres propios de lugares (Huércal-Overa, Albox, Pulpí, etc.) ni cantidades numéricas. Mantén el formato y saltos de línea originales:\n\n${text}`
        }]
      })
    })
    const data = await response.json()
    return data.content?.[0]?.text || text
  } catch {
    return text
  }
}

function extractFromDesc(desc: string) {
  const r = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc) ||
             /([0-9]+)\s*bedroom/i.exec(desc) || /([0-9]+)\s*chambre/i.exec(desc) ||
             /([0-9]+)\s*slaapkamer/i.exec(desc) || /([0-9]+)\s*schlafzimmer/i.exec(desc) ||
             /([0-9]+)\s*camera/i.exec(desc))?.[1]
  const b = (/([0-9]+)\s*ba[ñn]o/i.exec(desc) || /([0-9]+)\s*bathroom/i.exec(desc) ||
             /([0-9]+)\s*salle de bain/i.exec(desc) || /([0-9]+)\s*badkamer/i.exec(desc) ||
             /([0-9]+)\s*badezimmer/i.exec(desc))?.[1]
  const s = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return { bedrooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, area: s ? Number(s) : 0 }
}

async function mapAd(ad: any) {
  const fullText: string = ad.comments?.adComments?.[0]?.propertyComment || ''
  let firstLine = fullText.split('\n')[0]?.trim() || ''
  let description = fullText.trim()

  // Traducir si no está en español
  if (!isSpanish(firstLine) || !isSpanish(description.substring(0, 200))) {
    description = await translateToSpanish(description)
    firstLine = description.split('\n')[0]?.trim() || firstLine
  }

  const title = firstLine.length > 5 ? firstLine.substring(0, 120) : 'Propiedad en venta'

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

  const fromDesc = extractFromDesc(description)
  const bedrooms = Number(prop.rooms || 0) || fromDesc.bedrooms
  const bathrooms = Number(prop.bathrooms || 0) || fromDesc.bathrooms
  const area = Number(prop.size || prop.constructedArea || 0) || fromDesc.area

  return {
    id: String(ad.id),
    title,
    description,
    type,
    price,
    bedrooms,
    bathrooms,
    area,
    location,
    images,
    image: images[0] || '',
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

    // Traducir en paralelo todos los anuncios
    const properties = (await Promise.all(ads.map(mapAd))).filter(p => p.price > 0)

    return NextResponse.json({ success: true, properties, total: properties.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
                                                                                  }
