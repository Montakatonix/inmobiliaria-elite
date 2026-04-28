import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function mapProperty(ad: any) {
  // Extraer descripcion
  const comment = ad.comments?.adComments?.[0]?.propertyComment || ''
  
  // Extraer imagenes
  let images: string[] = []
  if (ad.images?.image) {
    const imgList = Array.isArray(ad.images.image) ? ad.images.image : [ad.images.image]
    images = imgList.map((img: any) => img.url || img).filter(Boolean)
  } else if (ad.multimedia?.images?.image) {
    const imgList = Array.isArray(ad.multimedia.images.image) ? ad.multimedia.images.image : [ad.multimedia.images.image]
    images = imgList.map((img: any) => img.url || img).filter(Boolean)
  }

  // Extraer ubicacion
  const location = ad.address?.addressName || ad.ubication?.locationName || ad.location || ''
  const city = ad.address?.cityName || ad.ubication?.cityName || ''
  
  return {
    id: ad.id || '',
    title: ad.title || comment.substring(0, 60) || 'Propiedad',
    description: comment,
    property_type: ad.propertyType || ad.typology || 'Inmueble',
    operation_type: ad.operation || ad.operationType || 'sale',
    price: Number(ad.price || ad.priceInfo?.amount || 0),
    size: Number(ad.size || ad.surface || ad.constructedArea || 0),
    rooms: Number(ad.rooms || ad.bedrooms || 0),
    bathrooms: Number(ad.bathrooms || 0),
    location: location || city || 'Huércal-Overa',
    city: city,
    address: ad.address?.addressName || '',
    images: images,
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
      return NextResponse.json({
        success: false,
        error: `CRM API error: ${response.status}`,
      }, { status: 500 })
    }

    const rawData = await response.json()
    
    // La API del CRM devuelve { ad: [...] }
    let rawAds: any[] = []
    if (rawData?.ad) {
      rawAds = Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]
    } else if (Array.isArray(rawData)) {
      rawAds = rawData
    }

    const properties = rawAds.map(mapProperty)

    // Debug: info sobre el primer elemento raw
    const debug = rawAds.length > 0 ? {
      firstRawKeys: Object.keys(rawAds[0]),
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
