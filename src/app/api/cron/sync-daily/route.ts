import { NextResponse } from 'next/server'
import { syncProperties } from '@/lib/idealista/sync-service'

export async function GET(request: Request) {
  try {
    // Verify Vercel Cron authorization
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      console.error('[Cron] CRON_SECRET not configured')
      return NextResponse.json(
        { error: 'Cron secret not configured' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('[Cron] Unauthorized cron request')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Execute sync
    console.log('[Cron] Daily sync triggered')
    const result = await syncProperties()

    console.log('[Cron] Sync completed:', result)

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[Cron] Sync failed:', error)

    // Return 200 to prevent Vercel from retrying
    // Log the error but don't fail the cron job
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  }
}
