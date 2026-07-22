import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { Logo } from './Logo'
import { useAuth } from '../../context/AuthContext'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          {user && (
            <span className="hidden text-sm text-zinc-600 sm:inline">
              {user.name || user.email}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 sm:gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
