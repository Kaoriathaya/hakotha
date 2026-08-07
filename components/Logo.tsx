type LogoProps = {
  size?: number
  markColor?: string
  dripColor?: string
  className?: string
}


export default function Logo({
  size = 48,
  markColor = '#00F0FF',
  dripColor = '#FF4B00',
  className = '',
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      className={className}
      role="img"
      aria-label="Hakotha"
    >
      <path
        d="M18 44 C14 32 14 18 30 15 C43 13 45 27 34 29 C25 30 27 42 39 39"
        stroke={markColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="18" cy="44" r="4.5" fill={dripColor} />
    </svg>
  )
}
