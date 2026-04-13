import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal de Inmobiliaria Élite – Elite Bienes de Patrimonio S.L.',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() { return (<><h1 className="text-3xl font-bold mb-8">Aviso Legal</h1><p>En cumplimiento del artículo 10 de la Ley 34/2002, LSSICE.</p><h2>1. Datos identificativos</h2><p>Elite Bienes de Patrimonio S.L. - Av. Guillermo Reyna, 33, 04600 Huércal-Overa, Almería</p></>) }
