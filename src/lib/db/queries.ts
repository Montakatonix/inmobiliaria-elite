import { db } from './index'
import { properties, syncLogs, type NewProperty, type NewSyncLog } from './schema'
import { eq, and, inArray } from 'drizzle-orm'

// PROPERTIES QUERIES

export async function getActiveProperties() {
  return await db
    .select()
    .from(properties)
    .where(
      and(
        eq(properties.source, 'idealista'),
        eq(properties.status, 'active')
      )
    )
    .orderBy(properties.createdAt)
}

export async function getPropertyBySlug(slug: string) {
  const result = await db
    .select()
    .from(properties)
    .where(eq(properties.slug, slug))
    .limit(1)

  return result[0] || null
}

export async function getPropertyByRef(ref: string) {
  const result = await db
    .select()
    .from(properties)
    .where(eq(properties.idealistaRef, ref))
    .limit(1)

  return result[0] || null
}

export async function getAllIdealistaRefs() {
  const result = await db
    .select({ ref: properties.idealistaRef })
    .from(properties)
    .where(eq(properties.source, 'idealista'))

  return result.map((r) => r.ref)
}

export async function createProperty(data: NewProperty) {
  const result = await db
    .insert(properties)
    .values({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSyncedAt: new Date(),
    })
    .returning()

  return result[0]
}

export async function updateProperty(ref: string, data: Partial<NewProperty>) {
  const result = await db
    .update(properties)
    .set({
      ...data,
      updatedAt: new Date(),
      lastSyncedAt: new Date(),
    })
    .where(eq(properties.idealistaRef, ref))
    .returning()

  return result[0]
}

export async function inactivateProperty(ref: string) {
  const result = await db
    .update(properties)
    .set({
      status: 'inactive',
      updatedAt: new Date(),
    })
    .where(eq(properties.idealistaRef, ref))
    .returning()

  return result[0]
}

export async function inactivatePropertiesByRefs(refs: string[]) {
  if (refs.length === 0) return []

  const result = await db
    .update(properties)
    .set({
      status: 'inactive',
      updatedAt: new Date(),
    })
    .where(inArray(properties.idealistaRef, refs))
    .returning()

  return result
}

export async function incrementViewCount(id: number) {
  await db.execute(
    `UPDATE properties SET view_count = view_count + 1 WHERE id = ${id}`
  )
}

// SYNC LOGS QUERIES

export async function createSyncLog(data: Omit<NewSyncLog, 'createdAt'>) {
  const result = await db
    .insert(syncLogs)
    .values({
      ...data,
      createdAt: new Date(),
    })
    .returning()

  return result[0]
}

export async function updateSyncLog(
  id: number,
  data: Partial<Omit<NewSyncLog, 'id' | 'startedAt' | 'createdAt'>>
) {
  const result = await db
    .update(syncLogs)
    .set(data)
    .where(eq(syncLogs.id, id))
    .returning()

  return result[0]
}

export async function getLastSyncLog() {
  const result = await db
    .select()
    .from(syncLogs)
    .orderBy(syncLogs.createdAt)
    .limit(1)

  return result[0] || null
}

export async function getRecentSyncLogs(limit: number = 10) {
  return await db
    .select()
    .from(syncLogs)
    .orderBy(syncLogs.createdAt)
    .limit(limit)
}
