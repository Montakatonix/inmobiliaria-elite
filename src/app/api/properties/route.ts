import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function mapProperty(ad: any) {
  const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
  const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'

  // Imagenes: multimedias.pictures[] con multimediaPath
  let images: string[] = []
  const pics = ad.multimedias?.pictures
  if (pics) {
    const picList = Array.isArray(pics) ? pics : [pics]
    images = picList.map((p: any) => p?.multimediaPath || '').filter(Boolean)
  }

  // Precio: prices.byOperation.SALE.price
  let price = 0
  const pr = ad.prices
  if (pr?.byOperation?.SALE?.price) {
    price = Number(pr.byOperation.SALE.price)
  } else if (pr?.byOperation?.RENT?.price) {
    price = Number(pr.byOperation.RENT.price)
  }

  // Property details
  const prop = ad.property || {}
  const rooms = Number(prop.rooms || prop.bedrooms || 0)
  const bathrooms = Number(prop.bathrooms || 0)
  const size = Number(prop.size || prop.constructedArea || prop.usableArea || 0)

  // Type mapping
  const typeMap: Record<string, string> = {
    '0': 'Piso', '1': 'Casa', '2': 'Chalet', '3': 'Adosado', '4': 'Atico',
    '5': 'Local', '6': 'Oficina', '7': 'Terreno', '8': 'Garaje', '9': 'Trastero',
    '10': 'Nave', '11': 'Finca', '12': 'Edificio'
  }
  const rawType = String(prop.typology || prop.propertyType || '')
  const propertyType = typeMap[rawType] || 'Inmueble'

  // Location from property.address.location
  const addr = prop.address || {}
  const loc = addr.location || {}
  const locationName = loc.name || ''
  const zones = loc.zones?.zones || {}
  const zoneName = zones.LEVEL4?.name || zones.LEVEL5?.name || ''
  const location = locationName || zoneName || 'Huercal-Overa'

  return {
    id: ad.id || '',
    title,
    description: comment.substring(0, 300),
    property_type: propertyType,
    price,
    size,
    rooms,
    bathrooms,
    location,
    images,
    image: images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  }
}

export async function GET() {
  try {
    const response = await fetch(`${CRM_API_URL}?get_inmuebles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRM_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({ success: false, error: `CRM error: ${response.status}` }, { status: 500 })
    }

    const rawData = await response.json()
    let rawAds: any[] = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : (Array.isArray(rawData) ? rawData : [])

    const properties = rawAds.map(mapProperty)

    return NextResponse.json({
      success: true,
      properties,
      total: properties.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
                               }
