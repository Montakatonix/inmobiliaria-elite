import { downloadXMLFromFTP } from './ftp-client'
import { parseIdealistaXML, validateXMLStructure } from './xml-parser'
import { mapIdealistaToProperty } from './property-mapper'
import {
  createSyncLog,
  updateSyncLog,
  getAllIdealistaRefs,
  getPropertyByRef,
  createProperty,
  updateProperty,
  inactivatePropertiesByRefs,
} from '../db/queries'

export async function syncProperties() {
  const startTime = Date.now()
  
  // Create log entry
  const log = await createSyncLog({
    startedAt: new Date(),
    status: 'running',
    feedUrl: `ftp://${process.env.IDEALISTA_FTP_HOST}${process.env.IDEALISTA_FTP_PATH}`,
  })

  console.log(`[Sync] Started sync job #${log.id}`)

  try {
    // Step 1: Download XML from FTP
    console.log('[Sync] Step 1: Downloading XML from FTP...')
    const xmlContent = await downloadXMLFromFTP()

    if (!xmlContent || xmlContent.length === 0) {
      throw new Error('Empty XML feed - aborting sync to prevent data loss')
    }

    // Step 2: Validate XML structure
    console.log('[Sync] Step 2: Validating XML structure...')
    const validation = validateXMLStructure(xmlContent)
    if (!validation.valid) {
      throw new Error(`Invalid XML structure: ${validation.error}`)
    }

    // Step 3: Parse XML
    console.log('[Sync] Step 3: Parsing XML...')
    const ads = parseIdealistaXML(xmlContent)

    if (ads.length === 0) {
      throw new Error('No properties found in feed - aborting to prevent data loss')
    }

    console.log(`[Sync] Found ${ads.length} properties in feed`)

    // Step 4: Get current refs from database
    console.log('[Sync] Step 4: Getting current properties from database...')
    const currentRefs = await getAllIdealistaRefs()
    const currentRefsSet = new Set(currentRefs)

    console.log(`[Sync] Current properties in DB: ${currentRefs.length}`)

    // Step 5: Sync properties
    console.log('[Sync] Step 5: Syncing properties...')
    const feedRefs = new Set(ads.map((ad) => ad.id))

    let created = 0
    let updated = 0
    const errors: string[] = []

    for (const ad of ads) {
      try {
        const mapped = mapIdealistaToProperty(ad)
        const exists = currentRefsSet.has(ad.id)

        if (exists) {
          // Update existing property
          await updateProperty(ad.id, mapped)
          updated++
          console.log(`[Sync] Updated property ${ad.id}`)
        } else {
          // Create new property
          await createProperty(mapped)
          created++
          console.log(`[Sync] Created property ${ad.id}`)
        }
      } catch (error) {
        const errorMsg = `Failed to sync property ${ad.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        console.error(`[Sync] ${errorMsg}`)
        errors.push(errorMsg)
      }
    }

    // Step 6: Inactivate properties not in feed
    console.log('[Sync] Step 6: Inactivating properties not in feed...')
    const refsToInactivate = currentRefs.filter((ref) => !feedRefs.has(ref))
    
    let inactivated = 0
    if (refsToInactivate.length > 0) {
      const result = await inactivatePropertiesByRefs(refsToInactivate)
      inactivated = result.length
      console.log(`[Sync] Inactivated ${inactivated} properties`)
    }

    // Step 7: Calculate duration and update log
    const durationMs = Date.now() - startTime
    
    await updateSyncLog(log.id, {
      finishedAt: new Date(),
      status: 'success',
      propertiesCreated: created,
      propertiesUpdated: updated,
      propertiesInactivated: inactivated,
      totalInFeed: ads.length,
      durationMs,
      errorMessage: errors.length > 0 ? errors.join('; ') : null,
    })

    console.log(`[Sync] ✅ Sync completed successfully in ${durationMs}ms`)
    console.log(`[Sync] Created: ${created}, Updated: ${updated}, Inactivated: ${inactivated}`)

    return {
      success: true,
      created,
      updated,
      inactivated,
      totalInFeed: ads.length,
      durationMs,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    const durationMs = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error(`[Sync] ❌ Sync failed:`, error)

    await updateSyncLog(log.id, {
      finishedAt: new Date(),
      status: 'error',
      errorMessage,
      errorStack: errorStack || null,
      durationMs,
    })

    throw error
  }
}
