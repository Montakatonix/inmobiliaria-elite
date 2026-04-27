import {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
} from 'drizzle-orm/pg-core'

export const properties = pgTable(
  'properties',
  {
    id: serial('id').primaryKey(),
    idealistaRef: varchar('idealista_ref', { length: 50 }).unique().notNull(),
    source: varchar('source', { length: 20 }).default('idealista').notNull(),
    status: varchar('status', { length: 20 }).default('active').notNull(),

    // Básicos
    title: text('title'),
    description: text('description'),
    descriptionEn: text('description_en'),
    operationType: varchar('operation_type', { length: 10 }), // 'sale' | 'rent'
    propertyType: varchar('property_type', { length: 30 }),

    // Ubicación
    address: text('address'),
    city: varchar('city', { length: 100 }),
    province: varchar('province', { length: 100 }),
    zone: varchar('zone', { length: 100 }),

    // Precio y superficies
    price: decimal('price', { precision: 12, scale: 2 }),
    propertyArea: decimal('property_area', { precision: 10, scale: 2 }),
    plotArea: decimal('plot_area', { precision: 10, scale: 2 }),

    // Características
    rooms: integer('rooms'),
    bathrooms: integer('bathrooms'),
    hasGarage: boolean('has_garage').default(false),
    hasElevator: boolean('has_elevator').default(false),
    hasTerrace: boolean('has_terrace').default(false),
    hasGarden: boolean('has_garden').default(false),
    hasPool: boolean('has_pool').default(false),
    hasStorage: boolean('has_storage').default(false),
    hasAirConditioning: boolean('has_air_conditioning').default(false),
    heatingType: integer('heating_type'),

    // Energía
    energyCert: varchar('energy_cert', { length: 2 }),

    // Extras
    builtType: integer('built_type'),
    chaletType: integer('chalet_type'),
    orientations: jsonb('orientations').$type<number[]>(),

    // Imágenes (array de URLs)
    images: jsonb('images').$type<
      Array<{
        url: string
        tag: string
        position: number
      }>
    >(),
    mainImage: text('main_image'),

    // SEO
    slug: text('slug').unique(),
    viewCount: integer('view_count').default(0),

    // Metadata
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    lastSyncedAt: timestamp('last_synced_at'),
    idealistaCreatedAt: timestamp('idealista_created_at'),
    idealistaModifiedAt: timestamp('idealista_modified_at'),
  },
  (table) => ({
    statusIdx: index('idx_status').on(table.status),
    operationIdx: index('idx_operation').on(table.operationType),
    typeIdx: index('idx_type').on(table.propertyType),
    cityIdx: index('idx_city').on(table.city),
    priceIdx: index('idx_price').on(table.price),
    idealistaRefIdx: index('idx_idealista_ref').on(table.idealistaRef),
  })
)

export const syncLogs = pgTable('sync_logs', {
  id: serial('id').primaryKey(),
  startedAt: timestamp('started_at').notNull(),
  finishedAt: timestamp('finished_at'),
  status: varchar('status', { length: 20 }), // 'success' | 'error' | 'running'
  propertiesCreated: integer('properties_created').default(0),
  propertiesUpdated: integer('properties_updated').default(0),
  propertiesInactivated: integer('properties_inactivated').default(0),
  totalInFeed: integer('total_in_feed').default(0),
  errorMessage: text('error_message'),
  errorStack: text('error_stack'),
  durationMs: integer('duration_ms'),
  feedUrl: text('feed_url'),
  createdAt: timestamp('created_at').defaultNow(),
})

export type Property = typeof properties.$inferSelect
export type NewProperty = typeof properties.$inferInsert
export type SyncLog = typeof syncLogs.$inferSelect
export type NewSyncLog = typeof syncLogs.$inferInsert
