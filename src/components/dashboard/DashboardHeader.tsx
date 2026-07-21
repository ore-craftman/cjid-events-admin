import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

interface DashboardHeaderProps {
  stats: { totalEvents: number; publishedPosts: number } | null
}

export function DashboardHeader({ stats }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {stats
            ? `${stats.totalEvents} events`
            : 'Loading stats…'}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        {/* <Link
          to="/posts/create"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 sm:w-auto"
        >
          <BookOpen className="h-4 w-4" />
          New Post
        </Link> */}
        <Link
          to="/events/create"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          New Event
        </Link>
      </div>
    </div>
  )
}
