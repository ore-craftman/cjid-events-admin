import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { FormField, inputClassName } from '../components/ui/FormField'
import { PasswordInput } from '../components/ui/PasswordInput'
import { useAuth } from '../context/AuthContext'
import { ApiError } from '../api/client'

const MIN_PASSWORD_LENGTH = 8

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordTooShort = password.length > 0 && password.length < MIN_PASSWORD_LENGTH
  const confirmTouched = confirmPassword.length > 0
  const passwordsMismatch = confirmTouched && password !== confirmPassword
  const passwordsMatch = confirmTouched && password === confirmPassword

  const canSubmit =
    email.trim().length > 0 &&
    password.length >= MIN_PASSWORD_LENGTH &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    !isSubmitting

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsSubmitting(true)

    try {
      await signup({ email, password, name: name.trim() || undefined })
      navigate('/', { replace: true })
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Unable to create account. Please try again.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Create admin account"
      subtitle="Sign up to access the events admin dashboard"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkLabel="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <FeedbackMessage type="error" message={error} onDismiss={() => setError(null)} />}

        <FormField label="Full name">
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClassName}
            placeholder="Jane Doe"
          />
        </FormField>

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
            autoComplete="new-password"
            required
            value={password}
            onChange={setPassword}
            placeholder="At least 8 characters"
            hasError={passwordTooShort}
          />
          {passwordTooShort && (
            <p className="mt-1.5 text-xs text-red-600">
              Password must be at least {MIN_PASSWORD_LENGTH} characters.
            </p>
          )}
        </FormField>

        <FormField label="Confirm password" required>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Re-enter your password"
            hasError={passwordsMismatch}
          />
          {passwordsMismatch && (
            <p className="mt-1.5 text-xs text-red-600">Passwords do not match.</p>
          )}
          {passwordsMatch && (
            <p className="mt-1.5 text-xs text-emerald-600">Passwords match.</p>
          )}
        </FormField>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-500">
        <Link to="/login" className="font-medium text-zinc-700 hover:text-zinc-900">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
