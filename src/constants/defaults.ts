import type { RegistrationField } from '../types'

export const defaultRegistrationFields: RegistrationField[] = [
  { id: '1', label: 'Full Name', type: 'short-text', required: true },
  { id: '2', label: 'Email Address', type: 'short-text', required: true },
  { id: '3', label: 'Organization', type: 'short-text', required: false },
  { id: '4', label: 'Job Title', type: 'short-text', required: false },
  {
    id: '5',
    label: 'Country',
    type: 'dropdown',
    required: false,
    options: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other'],
  },
]
