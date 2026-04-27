import { XMLParser } from 'fast-xml-parser'
import type { IdealistaAd, IdealFeedExport } from './types'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
})

export function parseIdealistaXML(xmlContent: string): IdealistaAd[] {
  try {
    if (!xmlContent || xmlContent.trim().length === 0) {
      throw new Error('XML content is empty')
    }

    const result = parser.parse(xmlContent) as IdealFeedExport

    if (!result || !result.ads || !result.ads.ad) {
      throw new Error('Invalid XML structure: missing ads')
    }

    // Ensure ad is always an array
    const ads = Array.isArray(result.ads.ad) 
      ? result.ads.ad 
      : [result.ads.ad]

    console.log(`[XML Parser] Parsed ${ads.length} properties from XML`)

    return ads
  } catch (error) {
    console.error('[XML Parser] Failed to parse XML:', error)
    throw new Error(`XML parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function validateXMLStructure(xmlContent: string): {
  valid: boolean
  error?: string
} {
  try {
    if (!xmlContent || xmlContent.trim().length === 0) {
      return { valid: false, error: 'XML content is empty' }
    }

    if (!xmlContent.includes('<ads>') || !xmlContent.includes('</ads>')) {
      return { valid: false, error: 'Missing <ads> root element' }
    }

    if (!xmlContent.includes('<ad>')) {
      return { valid: false, error: 'No <ad> elements found' }
    }

    // Try parsing
    const result = parser.parse(xmlContent) as IdealFeedExport
    
    if (!result.ads) {
      return { valid: false, error: 'Invalid structure: missing ads' }
    }

    return { valid: true }
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error',
    }
  }
}
