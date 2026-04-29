import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, MapPin, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { ContactForm } from '@/components/ContactForm'


export const dynamic = 'force-dynamic'


const CRM_URL = 'https://crm.inmobiliariaelite.es/api/'
const CRM_TOKEN = 'Elite_SuperSecretToken_2026'


// language="0" = español en el XML de Idealista
function getSpanishComment(adComments: any[]): string {
  if (!Array.isArray(adComments)) return ''
  const es = adComments.find(c => String(c.language) === '0')
  return es?.propertyComment?.trim() || adComments[0]?.propertyComment?.trim() || ''
}


function extractFromDesc(desc: string) {
  const r = (/([0-9]+)\s*dormitorio/i.exec(desc) || /([0-9]+)\s*habitaci/i.exec(desc))?.[1]
  const b = /([0-9]+)\s*ba[ñn]o/i.exec(desc)?.[1]
  const s = (/([0-9]+)\s*m[²2]/i.exec(desc) || /([0-9]+)\s*metros? construido/i.exec(desc))?.[1]
  return { rooms: r ? Number(r) : 0, bathrooms: b ? Number(b) : 0, size: s ? Number(s) : 0 }
}


async function getProperty(id: string) {
  try {
    const res = await fetch(`${CRM_URL}?get_inmuebles`, {
      headers: { 'Authorization': `Bearer ${CRM_TOKEN}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const rawData = await res.json()
    const ads = rawData?.ad ? (Array.isArray(rawData.ad) ? rawData.ad : [rawData.ad]) : []
    const ad = ads.find((a: any) => String(a.id) === id)
    if (!ad) return null
