import type { DashboardTab } from '../../types'

interface TabNavProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

const tabs: { id: DashboardTab; label: string; count?: number }[] = [
  { id: 'create', label: 'Create Event' },
  { id: 'upcoming', label: 'Upcoming Events', count: 3 },
  { id: 'past', label: 'Past Events', count: 3 },
  // { id: 'blog', label: 'Blog Posts', count: 3 },
]

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <nav className="-mx-4 overflow-x-auto border-b border-zinc-200 px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-5 sm:min-w-0 sm:gap-8">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
