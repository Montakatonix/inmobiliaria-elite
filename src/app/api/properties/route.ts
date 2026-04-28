import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function mapProperty(ad: any) {
  const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
  const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'

  // Imagenes from multimedias
  let images: string[] = []
  const mm = ad.multimedias
  if (mm) {
    // Try different structures
    const pics = mm.picture || mm.pictures?.picture || mm.image || mm.images?.image || mm.multimedia || []
    const picList = Array.isArray(pics) ? pics : [pics]
    images = picList.map((p: any) => {
      if (typeof p === 'string') return p
      return p?.url || p?.src || p?.highResUrl || p?.highResolution || p?.mediumUrl || p?.thumbnailUrl || ''
    }).filter(Boolean)
  }

  // Precio from prices
  let price = 0
  const pr = ad.prices
  if (pr) {
    const priceObj = pr.price || pr
    if (Array.isArray(priceObj)) {
      price = Number(priceObj[0]?.amount || priceObj[0]?.value || priceObj[0] || 0)
    } else if (typeof priceObj === 'object') {
      price = Number(priceObj.amount || priceObj.value || priceObj.price || 0)
    } else {
      price = Number(priceObj || 0)
    }
  }

  // Property details
  const prop = ad.property || {}
  const rooms = Number(prop.rooms || prop.bedrooms || prop.bedRooms || prop.numberOfRooms || 0)
  const bathrooms = Number(prop.bathrooms || prop.bathRooms || prop.numberOfBathrooms || 0)
  const size = Number(prop.size || prop.constructedArea || prop.area || prop.surface || prop.builtUpArea || 0)
  
  // Property type mapping
  const typeMap: Record<string, string> = {
    '0': 'Piso', '1': 'Casa', '2': 'Chalet', '3': 'Adosado', '4': 'Ático',
    '5': 'Local', '6': 'Oficina', '7': 'Terreno', '8': 'Garaje', '9': 'Trastero',
    '10': 'Nave', '11': 'Finca', '12': 'Edificio'
  }
  const rawType = String(prop.type || prop.typology || prop.subtype || '')
  const propertyType = typeMap[rawType] || rawType || 'Inmueble'

  // Location from scope
  const scope = ad.scope || {}
  const city = scope.city || scope.cityName || scope.municipality || ''
  const zone = scope.zone || scope.zoneName || scope.neighbourhood || scope.district || ''
  const province = scope.province || scope.provinceName || ''
  const location = [zone, city].filter(Boolean).join(', ') || 'Huércal-Overa'

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
    city,
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

    // Debug: show sub-objects of first item
    const first = rawAds[0] || {}
    const debug = {
      prices: JSON.stringify(first.prices || {}).substring(0, 500),
      property: JSON.stringify(first.property || {}).substring(0, 500),
      multimedias: JSON.stringify(first.multimedias || {}).substring(0, 500),
      scope: JSON.stringify(first.scope || {}).substring(0, 500),
      operations: JSON.stringify(first.operations || {}).substring(0, 500),
      extras: JSON.stringify(first.extras || {}).substring(0, 300),
      total: rawAds.length,
    }

    return NextResponse.json({ success: true, properties, total: properties.length, debug, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
        }
