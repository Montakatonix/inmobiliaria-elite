import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function mapProperty(ad: any) {
  const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
  const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'

  // Imagenes: multimedias.pictures.picture[] o multimedias.images.image[]
  let images: string[] = []
  const pics = ad.multimedias?.pictures?.picture || ad.multimedias?.images?.image || ad.multimedias?.multimedia || []
  const picList = Array.isArray(pics) ? pics : [pics]
  images = picList.map((p: any) => p?.url || p?.src || p?.highResUrl || (typeof p === 'string' ? p : '')).filter(Boolean)

  // Precio: prices.price[] o prices.amount
  let price = 0
  if (ad.prices?.price) {
    const priceList = Array.isArray(ad.prices.price) ? ad.prices.price : [ad.prices.price]
    price = Number(priceList[0]?.amount || priceList[0]?.value || priceList[0] || 0)
  } else if (ad.prices?.amount) {
    price = Number(ad.prices.amount)
  }

  // Property details: property.rooms, property.bathrooms, property.size, property.type
  const prop = ad.property || {}
  const rooms = Number(prop.rooms || prop.bedrooms || prop.bedRooms || 0)
  const bathrooms = Number(prop.bathrooms || prop.bathRooms || 0)
  const size = Number(prop.size || prop.constructedArea || prop.area || prop.surface || 0)
  const propertyType = prop.type || prop.typology || prop.subtype || 'Inmueble'

  // Ubicacion: scope o property.address
  const scope = ad.scope || {}
  const city = scope.cityName || scope.city || prop.address?.cityName || ''
  const zone = scope.zoneName || scope.zone || ''
  const province = scope.provinceName || scope.province || ''
  const location = zone ? zone + ', ' + city : city || 'Huércal-Overa'

  return {
    id: ad.id || '',
    title,
    description: comment,
    property_type: propertyType,
    operation_type: ad.operations?.operation?.[0]?.type || 'sale',
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
    let rawAds: any[] = []
    if (rawData?.ad) {
      rawAds = Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]
    } else if (Array.isArray(rawData)) {
      rawAds = rawData
    }

    const properties = rawAds.map(mapProperty)

    // Debug del primer raw item
    const debug = rawAds.length > 0 ? {
      firstRawSample: JSON.stringify(rawAds[0]).substring(0, 2000),
      totalRaw: rawAds.length,
    } : null

    return NextResponse.json({
      success: true,
      properties,
      total: properties.length,
      debug,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
        }
