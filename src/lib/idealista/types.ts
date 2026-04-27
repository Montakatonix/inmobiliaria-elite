export interface IdealistaAd {
  id: string
  operations: number // 0 = sale, 1 = rent
  creation: number // timestamp
  modification: number // timestamp
  property: IdealistaProperty
  comments: IdealistaComments
  multimedias?: IdealistaMultimedias
}

export interface IdealistaProperty {
  propertyType: number
  price: {
    price: number
  }
  location: {
    address?: string
    country?: string
    zones?: {
      LEVEL6?: { n: string } // Ciudad
      LEVEL3?: { n: string } // Provincia
      LEVEL5?: { n: string } // Zona
    }
  }
  housing?: {
    propertyArea?: number
    plotOfLand?: number
    roomNumber?: number
    bathNumber?: number
    hasBoxRoom?: boolean
    hasTerrace?: boolean
    hasGarden?: boolean
    hasSwimmingPool?: boolean
    hasLift?: boolean
    hasAirConditioning?: boolean
    heatingType?: number
    parkingSpace?: {
      hasParkingSpace?: boolean
    }
    orientations?: number | number[]
    builtType?: number
    chaletType?: number
  }
  energy?: {
    certification?: number
  }
}

export interface IdealistaComments {
  adComments: Array<{
    propertyComment: string
    language: number // 0 = Spanish, 1 = English
  }>
}

export interface IdealistaMultimedias {
  pictures?: Array<{
    id: string
    multimediaTag: string
    position: number
    multimediaPath: string
  }>
}

export interface IdealFeedExport {
  ads: {
    ad: IdealistaAd[]
  }
}

// Enums
export const OPERATION_TYPES = {
  0: 'sale',
  1: 'rent',
} as const

export const PROPERTY_TYPES = {
  0: 'flat',
  1: 'house',
  2: 'chalet',
  3: 'villa',
  4: 'land',
  5: 'garage',
  6: 'storage',
  7: 'office',
  8: 'building',
} as const

export const LANGUAGE_CODES = {
  0: 'es',
  1: 'en',
  2: 'fr',
  3: 'de',
} as const

// Energy certifications
export const ENERGY_CERTS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'En trámite',
  'No indicado',
  'Exento',
] as const
