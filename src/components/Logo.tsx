import Image from 'next/image'

export function Logo({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: { w: 28, h: 27 }, md: { w: 38, h: 36 }, lg: { w: 56, h: 53 } }
  const { w, h } = sizes[size]
  return (
    <Image
      src="/logo.png"
      alt="\u00c9lite Bienes de Patrimonio"
      width={w}
      height={h}
      className={className}
      priority
    />
  )
}
