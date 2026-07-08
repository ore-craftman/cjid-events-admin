interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const color = variant === 'dark' ? 'text-zinc-900' : 'text-white'

  return (
    <span className={`font-serif text-xl font-bold tracking-tight sm:text-2xl ${color} ${className}`}>
      CJID
    </span>
  )
}
