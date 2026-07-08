import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BasicInformation } from '../components/event-form/BasicInformation'
import { SpeakersSection } from '../components/event-form/SpeakersSection'
import { AgendaSection } from '../components/event-form/AgendaSection'
import { AudienceSection } from '../components/event-form/AudienceSection'
import { RegistrationFieldsSection } from '../components/event-form/RegistrationFieldsSection'
import { defaultRegistrationFields } from '../data/mockData'

export function CreateEventPage() {
  const [featured, setFeatured] = useState(false)

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          to="/?tab=create"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 sm:mb-8 sm:text-3xl">Create New Event</h1>

        <div className="space-y-6">
          <BasicInformation featured={featured} onFeaturedChange={setFeatured} />
          <SpeakersSection />
          <AgendaSection />
          <AudienceSection />
          <RegistrationFieldsSection initialFields={defaultRegistrationFields} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto"
          >
            <FileText className="h-4 w-4" />
            Create Event
          </button>
          <Link
            to="/"
            className="text-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 sm:text-left"
          >
            Cancel
          </Link>
        </div>
      </div>
    </Layout>
  )
}
