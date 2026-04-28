import { NextResponse } from 'next/server'

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
        error: `CRM API error: ${response.status} ${response.statusText}`,
        timestamp: new Date().toISOString(),
      }, { status: 500 })
    }

    const rawData = await response.json()
    
    // La API del CRM devuelve el JSON del XML de Idealista
    // Puede ser un array directamente o un objeto con propiedades
    let properties: any[] = []
    
    if (Array.isArray(rawData)) {
      properties = rawData
    } else if (rawData && typeof rawData === 'object') {
      // Si es un objeto, buscar el array de propiedades
      if (rawData.property) {
        properties = Array.isArray(rawData.property) ? rawData.property : [rawData.property]
      } else if (rawData.properties) {
        properties = Array.isArray(rawData.properties) ? rawData.properties : [rawData.properties]
      } else if (rawData.inmuebles) {
        properties = Array.isArray(rawData.inmuebles) ? rawData.inmuebles : [rawData.inmuebles]
      } else if (rawData.data) {
        properties = Array.isArray(rawData.data) ? rawData.data : [rawData.data]
      } else {
        // Devolver la estructura raw para debug
        return NextResponse.json({
          success: true,
          properties: [],
          total: 0,
          debug: {
            type: typeof rawData,
            isArray: false,
            topLevelKeys: Object.keys(rawData).slice(0, 20),
            sample: JSON.stringify(rawData).substring(0, 500),
          },
          timestamp: new Date().toISOString(),
        })
      }
    }

    // Debug: mostrar la estructura del primer elemento
    const debug = properties.length > 0 ? {
      firstItemKeys: Object.keys(properties[0]).slice(0, 30),
      firstItemSample: JSON.stringify(properties[0]).substring(0, 1000),
      totalRaw: properties.length,
    } : { message: 'No properties found' }

    return NextResponse.json({
      success: true,
      properties,
      total: properties.length,
      debug,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[API] Error fetching properties:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}
