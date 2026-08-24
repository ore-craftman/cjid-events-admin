import { apiGet } from './client'

export interface Registration {
  id: string
  eventId: string
  eventSlug: string
  fullName: string
  email: string
  organization?: string
  jobTitle?: string
  country?: string
  responses?: Record<string, unknown>
  submittedAt: string
}

export function listRegistrations(eventId: string) {
  return apiGet<Registration[]>(`/events/${eventId}/registrations/`)
}
