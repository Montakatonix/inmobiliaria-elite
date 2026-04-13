export function Logo({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: { w: 32, h: 40 }, md: { w: 44, h: 55 }, lg: { w: 64, h: 80 } }
  const { w, h } = sizes[size]
  return (
    <svg viewBox="0 0 200 220" width={w} height={h} className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      {/* Outer diamond/shield shape */}
      <path d="M100 2 L170 70 L100 215 L30 70 Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      {/* Left wing of diamond */}
      <path d="M100 2 L30 70 L55 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      {/* Right wing of diamond */}
      <path d="M100 2 L170 70 L145 70" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />

      {/* Left building - shorter, with angled top */}
      <path d="M55 70 L55 160 L75 185 L75 55 Z" fill="currentColor" opacity="0.9" />
      {/* Window cuts on left building */}
      <rect x="58" y="85" width="14" height="3" fill="currentColor" opacity="0" />

      {/* Center building - tallest */}
      <path d="M82 45 L82 195 L100 215 L118 195 L118 45 Z" fill="currentColor" opacity="0.95" />
      {/* Center dividing line */}
      <line x1="100" y1="50" x2="100" y2="210" stroke="currentColor" strokeWidth="0" />

      {/* Right building - shorter, mirrored */}
      <path d="M125 55 L125 185 L145 160 L145 70 Z" fill="currentColor" opacity="0.9" />

      {/* Gap/window cuts between buildings - horizontal lines creating separation */}
      {/* Left building windows */}
      <rect x="57" y="95" width="16" height="4" rx="0" className="fill-brand-navy dark:fill-[#2D1141]" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="59" y="115" width="14" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="61" y="135" width="12" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />

      {/* Center building windows */}
      <rect x="85" y="75" width="30" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="85" y="100" width="30" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="86" y="125" width="28" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="88" y="150" width="24" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="90" y="175" width="20" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />

      {/* Right building windows */}
      <rect x="127" y="95" width="16" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="127" y="115" width="14" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="127" y="135" width="12" height="4" rx="0" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />

      {/* Gaps between buildings */}
      <rect x="76" y="58" width="5" height="140" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />
      <rect x="119" y="58" width="5" height="140" className="fill-brand-navy" style={{fill: 'var(--bg, #2D1141)'}} />

      {/* 4-pointed stars */}
      {/* Star left */}
      <path d="M68 42 L70 48 L68 54 L66 48 Z" fill="currentColor" />
      <path d="M63 48 L68 46 L73 48 L68 50 Z" fill="currentColor" />
      {/* Star center-right */}
      <path d="M138 35 L140 40 L138 45 L136 40 Z" fill="currentColor" />
      <path d="M134 40 L138 38 L142 40 L138 42 Z" fill="currentColor" />
      {/* Star small top */}
      <path d="M120 22 L121 25 L120 28 L119 25 Z" fill="currentColor" />
      <path d="M117.5 25 L120 24 L122.5 25 L120 26 Z" fill="currentColor" />
    </svg>
  )
}
