// Servicio de sincronización simplificado usando la API del CRM
// En lugar de FTP + XML + Base de datos, simplemente consultamos la API

const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export interface Property {
  id: string
  title: string
  description: string
  property_type: string
  operation_type: string
  price: number
  size?: number
  rooms?: number
  bathrooms?: number
  address?: string
  city?: string
  province?: string
  postal_code?: string
  latitude?: number
  longitude?: number
  images: string[]
  features: Record<string, any>
  status: string
  idealista_id: string
}

/**
 * Obtiene las propiedades directamente desde la API del CRM
 */
export async function getPropertiesFromCRM(): Promise<Property[]> {
  try {
    console.log('[CRM API] Fetching properties...')
    
    const response = await fetch(`${CRM_API_URL}?get_inmuebles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRM_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`CRM API error: ${response.status} ${response.statusText}`)
    }

    const properties = await response.json()
    
    console.log(`[CRM API] ✅ Fetched ${properties.length} properties`)
    
    return properties
  } catch (error) {
    console.error('[CRM API] ❌ Failed to fetch properties:', error)
    throw error
  }
}

/**
 * Sincronización simplificada - Solo obtiene las propiedades de la API
 * No necesita base de datos ni sincronización compleja
 */
export async function syncPropertiesSimple() {
  const startTime = Date.now()
  
  try {
    const properties = await getPropertiesFromCRM()
    const durationMs = Date.now() - startTime
    
    return {
      success: true,
      properties,
      total: properties.length,
      durationMs,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    const durationMs = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error('[Sync] ❌ Sync failed:', error)
    
    return {
      success: false,
      error: errorMessage,
      durationMs,
      timestamp: new Date().toISOString(),
    }
  }
}
