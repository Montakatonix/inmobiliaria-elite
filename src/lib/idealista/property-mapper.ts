import type { IdealistaAd } from './types'
import type { NewProperty } from '../db/schema'
import { OPERATION_TYPES, PROPERTY_TYPES, ENERGY_CERTS } from './types'
import { generateSlug } from '../utils/slug'

export function mapIdealistaToProperty(ad: IdealistaAd): NewProperty {
  const { property, comments, multimedias } = ad

  // Extract Spanish and English descriptions
  const spanishComment = comments?.adComments?.find((c) => c.language === 0)
  const englishComment = comments?.adComments?.find((c) => c.language === 1)

  // Extract location
  const city = property.location?.zones?.LEVEL6?.n || ''
  const province = property.location?.zones?.LEVEL3?.n || ''
  const zone = property.location?.zones?.LEVEL5?.n || ''

  // Extract housing data
  const housing = property.housing || {}

  // Process images
  const images = multimedias?.pictures
    ? multimedias.pictures.map((pic) => ({
        url: pic.multimediaPath,
        tag: pic.multimediaTag,
        position: pic.position,
      }))
    : []

  const mainImage = images.length > 0 ? images[0].url : null

  // Generate title from comment or property type + location
  const title = extractTitle(spanishComment?.propertyComment || '', city, ad.id)

  // Generate slug
  const slug = generateSlug(`${ad.id}-${title}-${city}`)

  // Map operation type
  const operationType = OPERATION_TYPES[ad.operations as keyof typeof OPERATION_TYPES] || 'sale'

  // Map property type
  const propertyType =
    PROPERTY_TYPES[property.propertyType as keyof typeof PROPERTY_TYPES] || 'house'

  // Map energy certification
  const energyCert = property.energy?.certification
    ? ENERGY_CERTS[property.energy.certification] || null
    : null

  // Handle orientations (can be number or array)
  let orientationsArray: number[] = []
  if (housing.orientations !== undefined && housing.orientations !== null) {
    orientationsArray = Array.isArray(housing.orientations)
      ? housing.orientations
      : [housing.orientations]
  }

  return {
    idealistaRef: ad.id,
    source: 'idealista',
    status: 'active',

    // Basic
    title,
    description: spanishComment?.propertyComment || null,
    descriptionEn: englishComment?.propertyComment || null,
    operationType,
    propertyType,

    // Location
    address: property.location?.address || null,
    city: city || null,
    province: province || null,
    zone: zone || null,

    // Price & area
    price: property.price?.price?.toString() || '0',
    propertyArea: housing.propertyArea?.toString() || null,
    plotArea: housing.plotOfLand?.toString() || null,

    // Characteristics
    rooms: housing.roomNumber || null,
    bathrooms: housing.bathNumber || null,
    hasGarage: housing.parkingSpace?.hasParkingSpace || false,
    hasElevator: housing.hasLift || false,
    hasTerrace: housing.hasTerrace || false,
    hasGarden: housing.hasGarden || false,
    hasPool: housing.hasSwimmingPool || false,
    hasStorage: housing.hasBoxRoom || false,
    hasAirConditioning: housing.hasAirConditioning || false,
    heatingType: housing.heatingType || null,

    // Energy
    energyCert: energyCert || null,

    // Extras
    builtType: housing.builtType || null,
    chaletType: housing.chaletType || null,
    orientations: orientationsArray,

    // Images
    images,
    mainImage,

    // SEO
    slug,
    viewCount: 0,

    // Timestamps
    idealistaCreatedAt: new Date(ad.creation),
    idealistaModifiedAt: new Date(ad.modification),
    lastSyncedAt: new Date(),
  }
}

function extractTitle(description: string, city: string, fallbackId: string): string {
  if (!description) {
    return `Propiedad ${fallbackId}`
  }

  // Extract first line as title (usually the best summary)
  const firstLine = description.split('\n')[0].trim()

  if (firstLine.length > 100) {
    return firstLine.substring(0, 97) + '...'
  }

  return firstLine || `Propiedad en ${city}`
}
