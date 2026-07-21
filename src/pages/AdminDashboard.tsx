import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Layout } from '../components/layout/Layout'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { TabNav } from '../components/dashboard/TabNav'
import { CreateEventEmptyState } from '../components/dashboard/CreateEventEmptyState'
import { EventCard } from '../components/dashboard/EventCard'
// import { BlogPostCard } from '../components/dashboard/BlogPostCard'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { getDashboardStats } from '../api/dashboard'
import { listEvents } from '../api/events'
// import { listPosts } from '../api/posts'
import type { DashboardTab, Event } from '../types'

export function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') as DashboardTab | null
  const initialTab = tabParam === 'blog' ? 'create' : (tabParam || 'create')
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  // const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [stats, setStats] = useState<{ totalEvents: number; publishedPosts: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setError(null)
    try {
      const [upcoming, past, dashboardStats] = await Promise.all([
        listEvents('Upcoming'),
        listEvents('Past'),
        // listPosts(),
        getDashboardStats(),
      ])
      setUpcomingEvents(upcoming)
      setPastEvents(past)
      // setBlogPosts(posts)
      setStats({
        totalEvents: dashboardStats.totalEvents,
        publishedPosts: dashboardStats.publishedPosts,
      })
    } catch {
      setError('Failed to load dashboard data. Is the API server running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  const handleEventDeleted = (id: string) => {
    setUpcomingEvents((prev) => prev.filter((event) => event.id !== id))
    setPastEvents((prev) => prev.filter((event) => event.id !== id))
  }

  // const handlePostDeleted = (id: string) => {
  //   setBlogPosts((prev) => prev.filter((post) => post.id !== id))
  // }

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <DashboardHeader stats={stats} />
        <div className="mt-8">
          <TabNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        {error && (
          <div className="mt-6">
            <FeedbackMessage type="error" message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-zinc-500">Loading dashboard…</p>
          ) : (
            <>
              {activeTab === 'create' && <CreateEventEmptyState />}
              {activeTab === 'upcoming' && (
                <div className="space-y-4">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-sm text-zinc-500">No upcoming events yet.</p>
                  ) : (
                    upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} onDeleted={handleEventDeleted} />
                    ))
                  )}
                </div>
              )}
              {activeTab === 'past' && (
                <div className="space-y-4">
                  {pastEvents.length === 0 ? (
                    <p className="text-sm text-zinc-500">No past events yet.</p>
                  ) : (
                    pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} onDeleted={handleEventDeleted} />
                    ))
                  )}
                </div>
              )}
              {/* {activeTab === 'blog' && (
                <div className="space-y-4">
                  {blogPosts.length === 0 ? (
                    <p className="text-sm text-zinc-500">No blog posts yet.</p>
                  ) : (
                    blogPosts.map((post) => (
                      <BlogPostCard key={post.id} post={post} onDeleted={handlePostDeleted} />
                    ))
                  )}
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
