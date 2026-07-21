import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Loader2 } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { BasicInformation, type BasicInformationHandle } from '../components/event-form/BasicInformation'
import { SpeakersSection, type SpeakersSectionHandle } from '../components/event-form/SpeakersSection'
import { AgendaSection, type AgendaSectionHandle } from '../components/event-form/AgendaSection'
import { AudienceSection, type AudienceSectionHandle } from '../components/event-form/AudienceSection'
import {
  RegistrationFieldsSection,
  type RegistrationFieldsSectionHandle,
} from '../components/event-form/RegistrationFieldsSection'
import { FeedbackMessage } from '../components/ui/FeedbackMessage'
import { createEvent } from '../api/events'
import { defaultRegistrationFields } from '../constants/defaults'
import { ApiError } from '../api/client'

export function CreateEventPage() {
  const navigate = useNavigate()
  const basicInfoRef = useRef<BasicInformationHandle>(null)
  const speakersRef = useRef<SpeakersSectionHandle>(null)
  const agendaRef = useRef<AgendaSectionHandle>(null)
  const audienceRef = useRef<AudienceSectionHandle>(null)
  const registrationRef = useRef<RegistrationFieldsSectionHandle>(null)

  const [featured, setFeatured] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null,
  )

  const handleCreate = async () => {
    setFeedback(null)
    setIsSubmitting(true)

    try {
      const basic = basicInfoRef.current?.getValues()
      if (!basic?.title || !basic.date || !basic.type) {
        throw new Error('Please fill in the required fields: title, date, and event type.')
      }

      await createEvent({
        title: basic.title,
        date: basic.date,
        time: basic.time,
        location: basic.location,
        venue: basic.venue,
        type: basic.type,
        status: 'upcoming',
        description: basic.description,
        featured,
        moderator: basic.moderator,
        externalRegistrationUrl: basic.externalRegistrationUrl,
        speakers: speakersRef.current?.getValues().map(({ name, role }) => ({ name, role })),
        agenda: agendaRef.current?.getValues(),
        audience: audienceRef.current?.getValues(),
        registrationFields: registrationRef.current?.getValues(),
      })

      setFeedback({
        type: 'success',
        message: 'Event created successfully! Redirecting to dashboard…',
      })
      setTimeout(() => navigate('/?tab=upcoming'), 2000)
    } catch (err) {
      setFeedback({
        type: 'error',
        message:
          err instanceof ApiError || err instanceof Error
            ? err.message
            : 'Failed to create event. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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

        {feedback && (
          <div className="mb-6">
            <FeedbackMessage
              type={feedback.type}
              message={feedback.message}
              onDismiss={() => setFeedback(null)}
            />
          </div>
        )}

        <div className="space-y-6">
          <BasicInformation ref={basicInfoRef} featured={featured} onFeaturedChange={setFeatured} />
          <SpeakersSection ref={speakersRef} />
          <AgendaSection ref={agendaRef} />
          <AudienceSection ref={audienceRef} />
          <RegistrationFieldsSection ref={registrationRef} initialFields={defaultRegistrationFields} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
          <button
            type="button"
            onClick={handleCreate}
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            {isSubmitting ? 'Creating Event…' : 'Create Event'}
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
