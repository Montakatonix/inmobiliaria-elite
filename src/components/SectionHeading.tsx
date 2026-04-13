import { FadeIn } from './FadeIn'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export function SectionHeading({ label, title, description, centered = true, light = false }: SectionHeadingProps) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''}`}>
      {label && (
        <FadeIn>
          <span className={`text-xs font-body font-semibold uppercase tracking-[0.2em] ${light ? 'text-brand-gold' : 'text-brand-gold'}`}>
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className={`heading-lg mt-3 text-balance ${light ? 'text-white' : ''}`}>{title}</h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className={`mt-4 text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-brand-slate'}`}>
            {description}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={0.3}>
        <div className={`gold-line mt-6 ${centered ? 'mx-auto' : ''}`} />
      </FadeIn>
    </div>
  )
}
