import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="section-padding">
        <div className="container-elite max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-brand-warm-gray hover:text-brand-gold transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
          <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-brand-navy prose-p:text-brand-slate prose-p:leading-relaxed prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-charcoal">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
