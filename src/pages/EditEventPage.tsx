import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BasicInformation } from '../components/event-form/BasicInformation'
import { SpeakersSection } from '../components/event-form/SpeakersSection'
import { AgendaSection } from '../components/event-form/AgendaSection'
import { EditAudienceResources } from '../components/event-form/EditAudienceResources'
import { editEventData } from '../data/mockData'

export function EditEventPage() {
  const [featured, setFeatured] = useState(editEventData.featured)
  const event = editEventData

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          to="/?tab=upcoming"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">Edit Event</h1>
        <p className="mt-1 text-sm text-zinc-500">{event.title}</p>

        <div className="mt-6 space-y-6 sm:mt-8">
          <BasicInformation
            featured={featured}
            onFeaturedChange={setFeatured}
            showStatus
            defaults={{
              title: event.title,
              date: event.date,
              time: event.time,
              location: event.location,
              eventType: event.type.toLowerCase(),
              status: event.status.toLowerCase(),
              description: event.description,
              moderator: event.moderator,
              externalUrl: event.externalRegistrationUrl,
            }}
          />
          <SpeakersSection initialSpeakers={event.speakers} />
          <AgendaSection initialItems={event.agenda} />
          <EditAudienceResources
            initialAudience={event.audience}
            initialResources={event.resources}
            initialRecordings={event.recordings}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
          <Link
            to="/"
            className="rounded-md border border-zinc-300 bg-white px-6 py-2.5 text-center text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 sm:text-left"
          >
            Cancel
          </Link>
        </div>
      </div>
    </Layout>
  )
}
