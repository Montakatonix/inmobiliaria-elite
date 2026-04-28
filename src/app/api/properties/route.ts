import { NextResponse } from 'next/server'
import { getPropertiesFromCRM } from '@/lib/crm-api'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const properties = await getPropertiesFromCRM()
    
    return NextResponse.json({
      success: true,
      properties,
      total: properties.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[API] Error fetching properties:', error)
    
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
