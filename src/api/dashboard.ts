import { apiGet } from './client'

export interface DashboardStats {
  totalEvents: number
  upcomingEvents: number
  pastEvents: number
  draftEvents: number
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalRegistrations: number
}

export function getDashboardStats() {
  return apiGet<DashboardStats>('/dashboard/stats/')
}
