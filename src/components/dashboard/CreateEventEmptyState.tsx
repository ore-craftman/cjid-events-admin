import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export function CreateEventEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-24">
      <Plus className="mb-4 h-12 w-12 text-zinc-300" strokeWidth={1} />
      <p className="mb-6 text-sm text-zinc-500">Click below to open the event creation form</p>
      <Link
        to="/events/create"
        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <Plus className="h-4 w-4" />
        Create New Event
      </Link>
    </div>
  )
}
