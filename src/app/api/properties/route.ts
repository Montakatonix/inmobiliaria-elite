import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const debug = searchParams.get('debug')

  try {
    const response = await fetch(`${CRM_API_URL}?get_inmuebles`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${CRM_API_TOKEN}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) return NextResponse.json({ error: `CRM: ${response.status}` }, { status: 500 })
    const rawData = await response.json()
    const rawAds: any[] = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []

    if (debug === 'raw') {
      // Show raw structure of first 2 ads - comments languages, property fields, extras
      const debugData = rawAds.slice(0, 3).map((ad: any) => ({
        id: ad.id,
        allComments: ad.comments?.adComments?.map((c: any) => ({ lang: c.languageId, comment: (c.propertyComment || '').substring(0, 100) })),
        propertyKeys: Object.keys(ad.property || {}),
        propertyFull: JSON.stringify(ad.property || {}).substring(0, 1000),
        extrasKeys: Object.keys(ad.extras || {}),
        extrasFull: JSON.stringify(ad.extras || {}).substring(0, 1000),
        services: JSON.stringify(ad.services || {}).substring(0, 500),
      }))
      return NextResponse.json({ debugData, total: rawAds.length })
    }

    // Normal mode - map properties with Spanish comments
    const properties = rawAds.map((ad: any) => {
      // Find Spanish comment (languageId "es" or "1" or first available)
      const comments = ad.comments?.adComments || []
      const esComment = comments.find((c: any) => c.languageId === 'es' || c.languageId === '1')
      const comment = esComment?.propertyComment || comments[0]?.propertyComment || ''
      const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'

      const pics = ad.multimedias?.pictures
      const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []

      let price = 0
      if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
      else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)

      const prop = ad.property || {}
      const extras = ad.extras || {}
      const rooms = Number(prop.rooms || prop.bedrooms || extras.ROOMS || extras.BEDROOMS || 0)
      const bathrooms = Number(prop.bathrooms || extras.BATHROOMS || 0)
      const size = Number(prop.size || prop.constructedArea || prop.usableArea || extras.BUILTAREA || extras.PLOTOFLAND || 0)
      const typeMap: Record<string, string> = { '0': 'Piso', '1': 'Casa', '2': 'Chalet', '5': 'Local', '7': 'Terreno', '12': 'Edificio' }
      const loc = prop.address?.location?.name || ''

      return {
        id: ad.id,
        title,
        description: comment,
        property_type: typeMap[String(prop.typology || '')] || 'Inmueble',
        price,
        size,
        rooms,
        bathrooms,
        location: loc || 'Huércal-Overa',
        images,
        image: images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      }
    })

    return NextResponse.json({ success: true, properties, total: properties.length, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
                                                              }
