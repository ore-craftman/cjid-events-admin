import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { FormField, inputClassName } from '../components/ui/FormField'
import { PasswordInput } from '../components/ui/PasswordInput'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../api/client'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Unable to sign in. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Admin login"
      subtitle="Sign in to manage events and dashboard content"
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkLabel="Create one"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <FeedbackMessage type="error" message={error} onDismiss={() => setError(null)} />}

        <FormField label="Email" required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClassName}
            placeholder="admin@example.com"
          />
        </FormField>

        <FormField label="Password" required>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-500">
        <Link to="/signup" className="font-medium text-zinc-700 hover:text-zinc-900">
          Need an admin account?
        </Link>
      </p>
    </AuthLayout>
  )
}
