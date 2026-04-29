import { NextResponse } from 'next/server'

const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function extractFromDesc(desc: string) {
  const rooms = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc))?.[1]
  const baths = /([0-9]+)\s*ba[ñn]o/i.exec(desc)?.[1]
  const size = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return {
    rooms: rooms ? Number(rooms) : 0,
    bathrooms: baths ? Number(baths) : 0,
    size: size ? Number(size) : 0,
  }
}

function mapAd(ad: any) {
  const fullText: string = ad.comments?.adComments?.[0]?.propertyComment || ''
  const firstLine = fullText.split('\n')[0]?.trim() || ''
  const title = firstLine.length > 5 ? firstLine : 'Propiedad en venta'
  const description = fullText.trim()

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
  const property_type = typeMap[String(prop.typology ?? '')] || 'Inmueble'
  const location: string = prop.address?.location?.name || 'Huércal-Overa'

  const fromDesc = extractFromDesc(description)
  const rooms = Number(prop.rooms || 0) || fromDesc.rooms
  const bathrooms = Number(prop.bathrooms || 0) || fromDesc.bathrooms
  const size = Number(prop.size || prop.constructedArea || 0) || fromDesc.size

  return {
    id: String(ad.id),
    title,
    description,
    property_type,
    price,
    rooms,
    bathrooms,
    size,
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

    const properties = ads
      .map(mapAd)
      .filter(p => p.price > 0)

    return NextResponse.json({ success: true, properties, total: properties.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
    }
