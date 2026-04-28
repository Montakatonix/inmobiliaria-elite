import { NextResponse } from 'next/server'
import { syncPropertiesSimple } from '@/lib/crm/sync-service'

export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.IDEALISTA_SYNC_SECRET || process.env.CRON_SECRET}`

    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('[API] Starting property sync from CRM...')

    // Ejecutar sincronización simple desde la API del CRM
    const result = await syncPropertiesSimple()

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          timestamp: result.timestamp,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Properties synced successfully from CRM API',
      stats: {
        total: result.total,
        properties: result.properties.length,
      },
      timestamp: result.timestamp,
      durationMs: result.durationMs,
    })
  } catch (error) {
    console.error('[API] Sync failed:', error)
    
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

// GET method para pruebas rápidas sin autenticación
export async function GET() {
  try {
    console.log('[API] GET request - fetching properties from CRM...')
    
    const result = await syncPropertiesSimple()
    
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      properties: result.properties,
      total: result.total,
      timestamp: result.timestamp,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
