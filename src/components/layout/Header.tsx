import { Link } from 'react-router-dom'
import { LogOut, Settings } from 'lucide-react'
import { Logo } from './Logo'

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 sm:gap-2"
          >
            <Settings className="h-4 w-4" />
            Admin
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 sm:gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
