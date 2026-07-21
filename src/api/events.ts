import { apiDelete, apiGet, apiPatch, apiPost } from './client'
import type { Event, RegistrationField, Speaker } from '../types'

export interface EventWritePayload {
  title: string
  date: string
  time?: string
  location: string
  venue?: string
  type: string
  status?: string
  description?: string
  featured?: boolean
  moderator?: string
  externalRegistrationUrl?: string
  speakers?: Pick<Speaker, 'name' | 'role'>[]
  agenda?: string[]
  audience?: string[]
  resources?: { name: string; url?: string }[]
  recordings?: { label: string; url: string }[]
  registrationFields?: RegistrationField[]
}

export function listEvents(status?: string) {
  return apiGet<Event[]>('/events/', status ? { status } : undefined)
}

export function getEvent(id: string) {
  return apiGet<Event>(`/events/${id}/`)
}

export function createEvent(payload: EventWritePayload) {
  return apiPost<Event>('/events/', payload)
}

export function updateEvent(id: string, payload: Partial<EventWritePayload>) {
  return apiPatch<Event>(`/events/${id}/`, payload)
}

export function deleteEvent(id: string) {
  return apiDelete(`/events/${id}/`)
}
