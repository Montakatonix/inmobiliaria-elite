import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { syncProperties } from '@/lib/idealista/sync-service'

export async function POST(request: Request) {
  try {
    // Verify authorization
    const headersList = await headers()
    const authHeader = headersList.get('authorization')
    const secret = process.env.IDEALISTA_SYNC_SECRET

    if (!secret) {
      return NextResponse.json(
        { error: 'Sync secret not configured' },
        { status: 500 }
      )
    }

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Execute sync
    console.log('[API] Manual sync triggered')
    const result = await syncProperties()

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
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

// GET method to check status
export async function GET() {
  return NextResponse.json({
    message: 'Idealista sync endpoint',
    method: 'POST',
    auth: 'Bearer token required',
  })
}
