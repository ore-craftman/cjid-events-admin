import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Loader2, Users } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { getEvent } from '../api/events'
import { listRegistrations, type Registration } from '../api/registrations'
import type { Event } from '../types'

function formatSubmittedAt(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function responseValueToText(value: unknown): string {
  if (Array.isArray(value)) return value.join(', ')
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

function toCsv(registrations: Registration[]): string {
  const customLabels = Array.from(
    new Set(registrations.flatMap((r) => Object.keys(r.responses ?? {}))),
  )
  const headers = [
    'Full Name',
    'Email',
    'Organization',
    'Job Title',
    'Country',
    'Submitted At',
    ...customLabels,
  ]
  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`
  const rows = registrations.map((r) => {
    const base = [
      r.fullName,
      r.email,
      r.organization ?? '',
      r.jobTitle ?? '',
      r.country ?? '',
      formatSubmittedAt(r.submittedAt),
    ]
    const custom = customLabels.map((label) => responseValueToText(r.responses?.[label]))
    return [...base, ...custom].map(escape).join(',')
  })
  return [headers.map(escape).join(','), ...rows].join('\n')
}

export function EventRegistrationsPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    Promise.all([getEvent(id), listRegistrations(id)])
      .then(([eventData, registrationsData]) => {
        setEvent(eventData)
        setRegistrations(registrationsData)
      })
      .catch(() => {
        setError('Failed to load registrations.')
      })
      .finally(() => setLoading(false))
  }, [id])

  const customLabels = Array.from(
    new Set(registrations.flatMap((r) => Object.keys(r.responses ?? {}))),
  )

  const handleExport = () => {
    if (!id) return
    const csv = toCsv(registrations)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `registrations-${event?.title ?? id}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="animate-slide-up mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          to="/?tab=upcoming"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Registrations</h1>
            <p className="mt-1 text-sm text-zinc-500">{event?.title ?? 'Loading…'}</p>
          </div>
          {registrations.length > 0 && (
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          )}
        </div>

        {error && (
          <div className="mt-6">
            <FeedbackMessage type="error" message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading registrations…
            </div>
          ) : registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-16 text-center">
              <Users className="mb-3 h-10 w-10 text-zinc-300" strokeWidth={1} />
              <p className="text-sm text-zinc-500">No one has registered for this event yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Organization</th>
                    <th className="px-4 py-3">Job Title</th>
                    <th className="px-4 py-3">Country</th>
                    {customLabels.map((label) => (
                      <th key={label} className="px-4 py-3">
                        {label}
                      </th>
                    ))}
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-medium text-zinc-900">
                        {registration.fullName}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{registration.email}</td>
                      <td className="px-4 py-3 text-zinc-600">
                        {registration.organization || '—'}
                      </td>
                      <td className="px-4 py-3 text-zinc-600">{registration.jobTitle || '—'}</td>
                      <td className="px-4 py-3 text-zinc-600">{registration.country || '—'}</td>
                      {customLabels.map((label) => (
                        <td key={label} className="px-4 py-3 text-zinc-600">
                          {responseValueToText(registration.responses?.[label])}
                        </td>
                      ))}
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-500">
                        {formatSubmittedAt(registration.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
