import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const debug = url.searchParams.get('debug')
    
    const response = await fetch('https://crm.inmobiliariaelite.es/api/?get_inmuebles', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer Elite_SuperSecretToken_2026', 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!response.ok) return NextResponse.json({ error: response.status }, { status: 500 })
    const rawData = await response.json()
    const ads = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []

    if (debug === 'comments') {
      const sample = ads.slice(0, 5).map((ad: any) => ({
        id: ad.id,
        comments: ad.comments,
      }))
      return NextResponse.json({ sample, total: ads.length })
    }

    const typeMap: Record<string, string> = { '0': 'Piso', '1': 'Casa', '2': 'Chalet', '5': 'Local', '7': 'Terreno', '12': 'Edificio' }

    const properties = ads.map((ad: any) => {
      const comments = ad.comments?.adComments || []
      const esComment = comments.find((c: any) => c.language === 'es') || comments[0] || {}
      const comment = esComment.propertyComment || ''
      const title = comment.split('\n')[0]?.trim()?.substring(0, 80) || 'Propiedad en venta'
      const pics = ad.multimedias?.pictures
      const images = pics ? (Array.isArray(pics) ? pics : [pics]).map((p: any) => p?.multimediaPath || '').filter(Boolean) : []
      let price = 0
      if (ad.prices?.byOperation?.SALE?.price) price = Number(ad.prices.byOperation.SALE.price)
      else if (ad.prices?.byOperation?.RENT?.price) price = Number(ad.prices.byOperation.RENT.price)
      const prop = ad.property || {}
      const loc = prop.address?.location?.name || 'Huércal-Overa'
      return {
        id: ad.id,
        title,
        description: comment.substring(0, 300),
        property_type: typeMap[String(prop.typology || '')] || 'Inmueble',
        price,
        size: Number(prop.size || 0),
        rooms: Number(prop.rooms || 0),
        bathrooms: Number(prop.bathrooms || 0),
        location: loc,
        images,
        image: images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      }
    })

    return NextResponse.json({ success: true, properties, total: properties.length, timestamp: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
      }
