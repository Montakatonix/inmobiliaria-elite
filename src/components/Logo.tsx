export function Logo({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: { w: 32, h: 40 }, md: { w: 44, h: 55 }, lg: { w: 64, h: 80 } }
  const { w, h } = sizes[size]
  return (
    <svg viewBox="0 0 100 125" width={w} height={h} className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Diamond shape outer */}
      <path d="M50 5 L78 38 L50 98 L22 38 Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Horizontal line */}
      <path d="M22 38 L78 38" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Inner chevron at top */}
      <path d="M35 38 L50 15 L65 38" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {/* Three vertical pillars */}
      <path d="M40 38 L40 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 38 L50 85" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 38 L60 72" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Small decorative dots */}
      <circle cx="33" cy="25" r="1.8" fill="currentColor" />
      <circle cx="67" cy="25" r="1.8" fill="currentColor" />
      <circle cx="50" cy="10" r="1.2" fill="currentColor" />
      {/* Text ÉLITE */}
      <text x="50" y="113" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="'Playfair Display', serif" letterSpacing="8" fontWeight="500">ÉLITE</text>
      {/* Subtitle */}
      <text x="50" y="123" textAnchor="middle" fill="currentColor" fontSize="5" fontFamily="'DM Sans', sans-serif" letterSpacing="3" opacity="0.7">BIENES DE PATRIMONIO</text>
    </svg>
  )
}
