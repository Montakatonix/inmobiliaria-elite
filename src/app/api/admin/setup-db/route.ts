import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Create properties table
    await sql`
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        idealista_id VARCHAR(255) UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        property_type VARCHAR(50) NOT NULL,
        operation_type VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2),
        size DECIMAL(10, 2),
        rooms INTEGER,
        bathrooms INTEGER,
        address TEXT,
        city VARCHAR(255),
        province VARCHAR(255),
        postal_code VARCHAR(20),
        latitude DECIMAL(10, 7),
        longitude DECIMAL(10, 7),
        images JSONB DEFAULT '[]',
        features JSONB DEFAULT '{}',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create sync_logs table
    await sql`
      CREATE TABLE IF NOT EXISTS sync_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) NOT NULL,
        total INTEGER DEFAULT 0,
        created INTEGER DEFAULT 0,
        updated INTEGER DEFAULT 0,
        errors INTEGER DEFAULT 0,
        error_message TEXT,
        duration_ms INTEGER
      )
    `

    // Create index on idealista_id for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_properties_idealista_id 
      ON properties(idealista_id)
    `

    // Create index on status for filtering active properties
    await sql`
      CREATE INDEX IF NOT EXISTS idx_properties_status 
      ON properties(status)
    `

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully',
      tables: ['properties', 'sync_logs'],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Migration] Failed to create tables:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
