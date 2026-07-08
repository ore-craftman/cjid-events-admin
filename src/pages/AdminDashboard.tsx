import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { TabNav } from '../components/dashboard/TabNav'
import { CreateEventEmptyState } from '../components/dashboard/CreateEventEmptyState'
import { EventCard } from '../components/dashboard/EventCard'
import { BlogPostCard } from '../components/dashboard/BlogPostCard'
import { upcomingEvents, pastEvents, blogPosts } from '../data/mockData'
import type { DashboardTab } from '../types'

export function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as DashboardTab | null
  const [activeTab, setActiveTab] = useState<DashboardTab>(tabParam || 'create')

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <DashboardHeader />
        <div className="mt-8">
          <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className="mt-6">
          {activeTab === 'create' && <CreateEventEmptyState />}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          {activeTab === 'past' && (
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
          {activeTab === 'blog' && (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
