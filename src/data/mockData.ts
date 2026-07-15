import type { BlogPost, Event, RegistrationField } from '../types'

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Webinar – Executive Order for Direct Remittance of Oil and Gas Revenues to Federation',
    date: 'January 29, 2026',
    location: 'Zoom',
    type: 'Webinar',
    status: 'Upcoming',
    featured: true,
    formFieldCount: 5,
  },
  {
    id: '2',
    title: 'Annual Data Journalism Summit 2026',
    date: 'February 15, 2026',
    location: 'Lagos, Nigeria',
    type: 'Summit',
    status: 'Upcoming',
    featured: true,
    formFieldCount: 5,
  },
  {
    id: '3',
    title: 'Investigative Journalism Workshop: Financial Crimes',
    date: 'March 5, 2026',
    location: 'Abuja, Nigeria',
    type: 'Workshop',
    status: 'Upcoming',
    featured: false,
    formFieldCount: 6,
  },
]

export const pastEvents: Event[] = [
  {
    id: '4',
    title: 'Media Freedom Conference West Africa',
    date: 'November 25, 2025',
    location: 'Accra, Ghana',
    type: 'Conference',
    status: 'Past',
    featured: true,
    formFieldCount: 5,
  },
  {
    id: '5',
    title: 'Digital Security for Journalists',
    date: 'October 10, 2025',
    location: 'Zoom',
    type: 'Webinar',
    status: 'Past',
    featured: false,
    formFieldCount: 4,
  },
  {
    id: '6',
    title: 'Fact-Checking Workshop 2025',
    date: 'September 3, 2025',
    location: 'Lagos, Nigeria',
    type: 'Workshop',
    status: 'Past',
    featured: false,
    formFieldCount: 5,
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Key Takeaways from the Media Freedom Conference West Africa 2025',
    category: 'Event Recap',
    status: 'Published',
    date: 'November 25, 2025',
    readTime: '5 min read',
    content:
      'The Media Freedom Conference brought together journalists, advocates, and policymakers from across West Africa to discuss press freedom challenges and opportunities.',
  },
  {
    id: '2',
    title: 'Why Data Journalism Matters in African Newsrooms',
    category: 'Insight',
    status: 'Published',
    date: 'October 18, 2025',
    readTime: '7 min read',
    content:
      'Data journalism is transforming how African newsrooms tell stories, enabling deeper investigations and more accountable reporting.',
  },
  {
    id: '3',
    title: 'Behind the Scenes: Building the CJID Events Platform',
    category: 'Story',
    status: 'Draft',
    date: 'September 5, 2025',
    readTime: '4 min read',
    content:
      'A look at how the CJID team designed and built the events platform to better serve journalists and media professionals.',
  },
]

export const editBlogPostData: BlogPost = blogPosts[0]

export const editEventData: Event = {
  id: '4',
  title: 'Media Freedom Conference West Africa',
  date: 'November 25, 2025',
  time: '10:00 AM GMT',
  location: 'Accra, Ghana',
  venue: 'Kempinski Hotel Gold Coast City',
  type: 'Conference',
  status: 'Past',
  description: '',
  moderator: 'Ama Adjei Aidoo, Media Freedom Advocate',
  externalRegistrationUrl: '',
  featured: false,
  formFieldCount: 5,
  speakers: [
    { id: '1', name: 'Kwame Mensah', role: 'Executive Director, Press Freedom Ghana' },
    { id: '2', name: 'Aisha Umar', role: 'Senior Correspondent, West Africa Today' },
    { id: '3', name: 'Kofi Asante', role: 'Legal Advisor, Media Rights Watch' },
  ],
  agenda: [
    'Opening Ceremony',
    'State of Media Freedom in West Africa',
    'Panel: Digital Threats to Press Freedom',
    'Workshop: Safety Protocols for Journalists',
  ],
  audience: ['Journalists', 'Media Organizations'],
  resources: [
    { id: '1', name: 'Conference Report 2025.pdf', url: '#' },
    { id: '2', name: 'Speaker Presentations.zip', url: '#' },
  ],
  recordings: [],
}

export const defaultRegistrationFields: RegistrationField[] = [
  { id: '1', label: 'Full Name', type: 'short-text', required: true, placeholder: 'Enter your full name' },
  { id: '2', label: 'Email Address', type: 'short-text', required: true, placeholder: 'you@example.com' },
  { id: '3', label: 'Organization', type: 'short-text', required: false, placeholder: 'Your organization' },
  { id: '4', label: 'Job Title', type: 'short-text', required: false, placeholder: 'Your role' },
  {
    id: '5',
    label: 'Country',
    type: 'dropdown',
    required: true,
    placeholder: 'Select your country',
    options: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other'],
  },
  {
    id: '6',
    label: 'Who are you?',
    type: 'checkbox',
    required: true,
    options: ['Journalist', 'Editor', 'Student', 'Academic', 'Other'],
  },
]
