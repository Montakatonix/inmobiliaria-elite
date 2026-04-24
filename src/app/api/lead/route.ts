import { NextRequest, NextResponse } from 'next/server'

// Next.js API Route: receives form submissions from the website and forwards
// them to the Inmobiliaria Elite CRM API, keeping the Bearer token safely on
// the server side (never exposed to the browser).
//
// The CRM expects one of two shapes depending on tipo_lead:
//   - "vendedor": tipo_inmueble, ubicacion, superficie, habitaciones, detalles_adicionales
//   - "comprador": tipo_inmueble, presupuesto, zona_preferida, detalles_adicionales
//
// The token is read from process.env.CRM_API_TOKEN (configured in Vercel).
// The CRM endpoint is read from process.env.CRM_API_URL (with a sensible default).

export const runtime = 'nodejs'

const CRM_URL = process.env.CRM_API_URL || 'https://crm.inmobiliariaelite.es/api/'

type LeadPayload = {
  tipo_lead: 'vendedor' | 'comprador'
  nombre: string
  telefono: string
  email?: string
  tipo_inmueble?: string
  ubicacion?: string
  superficie?: number | string
  habitaciones?: number | string
  presupuesto?: number | string
  zona_preferida?: string
  detalles_adicionales?: string
}

function bad(message: string, status = 400) {
  return NextResponse.json({ status: 'error', message }, { status })
}

export async function POST(req: NextRequest) {
  const token = process.env.CRM_API_TOKEN
  if (!token) {
    return bad('Servicio no configurado. Intenta de nuevo m\u00e1s tarde.', 500)
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return bad('Petici\u00f3n inv\u00e1lida.')
  }

  const tipo_lead = String(body.tipo_lead || '').toLowerCase().trim()
  const nombre = String(body.nombre || '').trim()
  const telefono = String(body.telefono || '').trim()
  const email = body.email ? String(body.email).trim() : undefined

  if (tipo_lead !== 'vendedor' && tipo_lead !== 'comprador') {
    return bad('tipo_lead debe ser "vendedor" o "comprador".')
  }
  if (!nombre) return bad('Falta el nombre.')
  if (!telefono) return bad('Falta el tel\u00e9fono.')
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return bad('Email no v\u00e1lido.')
  }

  // Build payload with only the fields relevant to this lead type, dropping
  // undefined/empty strings so we don't send noise to the CRM.
  const payload: LeadPayload = { tipo_lead: tipo_lead as 'vendedor' | 'comprador', nombre, telefono }
  if (email) payload.email = email

  const copyOpt = (key: keyof LeadPayload, raw: unknown) => {
    if (raw === undefined || raw === null) return
    const v = typeof raw === 'string' ? raw.trim() : raw
    if (v === '' || v === undefined) return
    ;(payload as Record<string, unknown>)[key] = v
  }

  if (tipo_lead === 'vendedor') {
    copyOpt('tipo_inmueble', body.tipo_inmueble)
    copyOpt('ubicacion', body.ubicacion)
    copyOpt('superficie', body.superficie)
    copyOpt('habitaciones', body.habitaciones)
    copyOpt('detalles_adicionales', body.detalles_adicionales)
  } else {
    copyOpt('tipo_inmueble', body.tipo_inmueble)
    copyOpt('presupuesto', body.presupuesto)
    copyOpt('zona_preferida', body.zona_preferida)
    copyOpt('detalles_adicionales', body.detalles_adicionales)
  }

  try {
    const upstream = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      // Fail fast if the CRM is unreachable
      signal: AbortSignal.timeout(10_000),
    })

    const text = await upstream.text()
    let data: unknown = null
    try { data = text ? JSON.parse(text) : null } catch { data = text }

    if (!upstream.ok) {
      console.error('[lead] CRM error', upstream.status, data)
      return NextResponse.json(
        { status: 'error', message: 'No se pudo registrar el lead. Int\u00e9ntalo de nuevo.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ status: 'success', data }, { status: 201 })
  } catch (err) {
    console.error('[lead] network error', err)
    return NextResponse.json(
      { status: 'error', message: 'Error de red al contactar con el CRM.' },
      { status: 502 },
    )
  }
}

export function GET() {
  return NextResponse.json({ status: 'error', message: 'Method Not Allowed' }, { status: 405 })
}
