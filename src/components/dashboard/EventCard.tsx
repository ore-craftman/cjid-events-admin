import { Link } from 'react-router-dom'
import { Pencil, Star, Trash2 } from 'lucide-react'
import type { Event, EventType } from '../../types'

const typeStyles: Record<EventType, string> = {
  Webinar: 'bg-amber-100 text-amber-800',
  Summit: 'bg-emerald-100 text-emerald-800',
  Workshop: 'bg-sky-100 text-sky-800',
  Conference: 'bg-violet-100 text-violet-800',
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeStyles[event.type]}`}>
            {event.type}
          </span>
          {event.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              Featured
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 sm:text-base">{event.title}</h3>
        <p className="mt-1 text-sm text-zinc-500">
          {event.date} · {event.location} · {event.formFieldCount} form fields
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <Link
          to={`/events/${event.id}/edit`}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Link>
        <button
          type="button"
          className="rounded-md border border-zinc-300 bg-white p-1.5 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-red-500"
          aria-label="Delete event"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
