export type EventType = 'Webinar' | 'Summit' | 'Workshop' | 'Conference'

export type EventStatus = 'Upcoming' | 'Past' | 'Draft'

export interface Event {
  id: string
  title: string
  date: string
  time?: string
  location: string
  venue?: string
  type: EventType
  status: EventStatus
  description?: string
  moderator?: string
  externalRegistrationUrl?: string
  featured: boolean
  formFieldCount: number
  speakers?: Speaker[]
  agenda?: string[]
  audience?: string[]
  resources?: Resource[]
  recordings?: Recording[]
}

export interface Speaker {
  id: string
  name: string
  role: string
}

export interface Resource {
  id: string
  name: string
  url: string
}

export interface Recording {
  id: string
  label: string
  url: string
}

export interface BlogPost {
  id: string
  title: string
  category: string
  status: 'Published' | 'Draft'
  date: string
  readTime: string
}

export type FieldType =
  | 'short-text'
  | 'long-text'
  | 'dropdown'
  | 'phone'
  | 'checkbox'
  | 'number'

export interface RegistrationField {
  id: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  options?: string[]
}

export type DashboardTab = 'create' | 'upcoming' | 'past' | 'blog'
