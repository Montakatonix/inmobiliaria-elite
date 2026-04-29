import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function getSpanishComment(ad: any): string {
  const comments = ad.comments?.adComments
  if (!comments || !Array.isArray(comments)) return ''
  // Buscar comentario en español
  const esComment = comments.find((c: any) => c.language === 'es' || c.language === 'ES')
  if (esComment) return esComment.propertyComment || ''
  // Si no hay español, devolver el primero
  return comments[0]?.propertyComment || ''
}

function mapProperty(ad: any) {
  const comment = getSpanishComment(ad)
  const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'

  // Imagenes
  const pics = ad.multimedias?.pictures
  const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []

  // Precio
  let price = 0
  if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
  else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)

  // Property details
  const prop = ad.property || {}
  const rooms = Number(prop.rooms || 0)
  const bathrooms = Number(prop.bathrooms || 0)
  const size = Number(prop.size || 0)

  const typeMap: Record<string, string> = { '0': 'Piso', '1': 'Casa', '2': 'Chalet', '5': 'Local', '7': 'Terreno', '12': 'Edificio' }
  const propertyType = typeMap[String(prop.typology || '')] || 'Inmueble'

  const location = prop.address?.location?.name || 'Huércal-Overa'

  return {
    id: ad.id || '',
    title,
    description: comment.substring(0, 500),
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
      headers: { 'Authorization': `Bearer ${CRM_API_TOKEN}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) {
      return NextResponse.json({ success: false, error: `CRM error: ${response.status}` }, { status: 500 })
    }
    const rawData = await response.json()
    const rawAds = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []
    const properties = rawAds.map(mapProperty)

    // Debug: mostrar idiomas disponibles del primer anuncio
    const firstComments = rawAds[0]?.comments?.adComments?.map((c: any) => ({ lang: c.language, text: (c.propertyComment || '').substring(0, 60) })) || []

    return NextResponse.json({ success: true, properties, total: properties.length, debugLanguages: firstComments, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
      }
