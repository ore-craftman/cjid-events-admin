import { Link } from 'react-router-dom'
import { Logo } from '../layout/Logo'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  footerText: string
  footerLink: string
  footerLinkLabel: string
}

export function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkLabel,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
        <Link to="/" className="mb-8">
          <Logo />
        </Link>

        <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
            <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>
          </div>

          {children}
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          {footerText}{' '}
          <Link to={footerLink} className="font-medium text-zinc-900 hover:underline">
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </div>
  )
}
