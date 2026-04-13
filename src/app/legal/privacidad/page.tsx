import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Inmobiliaria Élite',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() { return (<><h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1><p>Responsable: Elite Bienes de Patrimonio S.L.</p></>) }
