import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BasicInformation, type BasicInformationHandle } from '../components/event-form/BasicInformation'
import { SpeakersSection, type SpeakersSectionHandle } from '../components/event-form/SpeakersSection'
import { AgendaSection, type AgendaSectionHandle } from '../components/event-form/AgendaSection'
import {
  EditAudienceResources,
  type EditAudienceResourcesHandle,
} from '../components/event-form/EditAudienceResources'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { getEvent, updateEvent } from '../api/events'
import { ApiError } from '../api/client'
import type { Event } from '../types'

export function EditEventPage() {
  const { id } = useParams()
  const basicInfoRef = useRef<BasicInformationHandle>(null)
  const speakersRef = useRef<SpeakersSectionHandle>(null)
  const agendaRef = useRef<AgendaSectionHandle>(null)
  const audienceResourcesRef = useRef<EditAudienceResourcesHandle>(null)

  const [event, setEvent] = useState<Event | null>(null)
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )

  useEffect(() => {
    if (!id) return

    getEvent(id)
      .then((data) => {
        setEvent(data)
        setFeatured(data.featured)
      })
      .catch(() => {
        setFeedback({ type: 'error', message: 'Failed to load event.' })
      })
      .finally(() => setLoading(false))
  }, [id])

  const handleSave = async () => {
    if (!id) return
    setFeedback(null)
    setIsSubmitting(true)

    try {
      const basic = basicInfoRef.current?.getValues()
      if (!basic?.title || !basic.date || !basic.type) {
        throw new Error('Please fill in the required fields: title, date, and event type.')
      }

      const audienceResources = audienceResourcesRef.current?.getValues()

      await updateEvent(id, {
        title: basic.title,
        date: basic.date,
        time: basic.time,
        location: basic.location,
        type: basic.type,
        status: basic.status,
        description: basic.description,
        featured,
        moderator: basic.moderator,
        externalRegistrationUrl: basic.externalRegistrationUrl,
        speakers: speakersRef.current?.getValues().map(({ name, role }) => ({ name, role })),
        agenda: agendaRef.current?.getValues(),
        audience: audienceResources?.audience,
        resources: audienceResources?.resources.map(({ name, url }) => ({ name, url })),
        recordings: audienceResources?.recordings.map(({ label, url }) => ({ label, url })),
      })

      setFeedback({
        type: 'success',
        message: 'Changes saved successfully!',
      })
    } catch (err) {
      setFeedback({
        type: 'error',
        message:
          err instanceof ApiError || err instanceof Error
            ? err.message
            : 'Failed to save changes. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-zinc-500">
          Loading event…
        </div>
      </Layout>
    )
  }

  if (!event) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="text-sm text-zinc-500">Event not found.</p>
          <Link to="/" className="mt-4 inline-block text-sm font-medium text-zinc-900">
            Back to dashboard
          </Link>
        </div>
      </Layout>
    )
  }

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

        {feedback && (
          <div className="mt-6">
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
              onDismiss={() => setFeedback(null)}
            />
          </div>
        )}

        <div className="mt-6 space-y-6 sm:mt-8">
          <BasicInformation
            ref={basicInfoRef}
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
          <SpeakersSection ref={speakersRef} initialSpeakers={event.speakers} />
          <AgendaSection ref={agendaRef} initialItems={event.agenda} />
          <EditAudienceResources
            ref={audienceResourcesRef}
            initialAudience={event.audience}
            initialResources={event.resources}
            initialRecordings={event.recordings}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSubmitting ? 'Saving…' : 'Save Changes'}
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
