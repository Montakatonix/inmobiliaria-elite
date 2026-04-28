// Cliente API simple para obtener propiedades del CRM
const CRM_API_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_API_TOKEN = 'Elite_SuperSecretToken_2026'

export interface Property {
  id: string
  title: string
  description?: string
  property_type: string
  operation_type: string
  price?: number
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
  features?: Record<string, any>
  status?: string
}

/**
 * Obtiene todas las propiedades del CRM
 */
export async function getPropertiesFromCRM(): Promise<Property[]> {
  try {
    const response = await fetch(`${CRM_API_URL}?get_inmuebles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRM_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Siempre obtener datos frescos
    })

    if (!response.ok) {
      throw new Error(`CRM API error: ${response.status} ${response.statusText}`)
    }

    const properties = await response.json()
    
    return Array.isArray(properties) ? properties : []
  } catch (error) {
    console.error('[CRM API] Error fetching properties:', error)
    throw error
  }
}
