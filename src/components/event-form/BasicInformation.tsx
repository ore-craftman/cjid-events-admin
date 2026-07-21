import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Info, Star } from 'lucide-react'
import { FormField, inputClassName, selectClassName, textareaClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import { TimeSelect } from '../ui/TimeSelect'
import { ToggleSwitch } from '../ui/ToggleSwitch'
import { displayDateToInputValue } from '../../utils/date'

export interface BasicInformationValues {
  title: string
  date: string
  time: string
  location: string
  venue: string
  type: string
  status: string
  description: string
  moderator: string
  externalRegistrationUrl: string
}

export interface BasicInformationHandle {
  getValues: () => BasicInformationValues
}

interface BasicInformationProps {
  featured: boolean
  onFeaturedChange: (value: boolean) => void
  showStatus?: boolean
  defaults?: {
    title?: string
    date?: string
    time?: string
    location?: string
    eventType?: string
    status?: string
    venue?: string
    description?: string
    moderator?: string
    externalUrl?: string
  }
}

export const BasicInformation = forwardRef<BasicInformationHandle, BasicInformationProps>(
  function BasicInformation({ featured, onFeaturedChange, showStatus, defaults = {} }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      getValues: () => {
        const root = containerRef.current
        const value = (name: string) =>
          (root?.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
            ?.value ?? ''

        return {
          title: value('title'),
          date: value('date'),
          time: value('time'),
          location: value('location'),
          venue: value('venue'),
          type: value('type'),
          status: value('status'),
          description: value('description'),
          moderator: value('moderator'),
          externalRegistrationUrl: value('externalRegistrationUrl'),
        }
      },
    }))

    return (
      <FormSection title="Basic Information">
        <div ref={containerRef} className="space-y-4">
          <FormField label="Event Title" required>
            <input
              type="text"
              name="title"
              className={inputClassName}
              placeholder="Event title"
              defaultValue={defaults.title}
              required
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Date" required>
              <input
                type="date"
                name="date"
                className={inputClassName}
                defaultValue={displayDateToInputValue(defaults.date)}
                required
              />
            </FormField>
            <FormField label="Time">
              <TimeSelect name="time" defaultValue={defaults.time} />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Location">
              <input
                type="text"
                name="location"
                className={inputClassName}
                placeholder="Zunari City, Zambia"
                defaultValue={defaults.location}
              />
            </FormField>
            <FormField label="Event Type">
              <select name="type" className={selectClassName} defaultValue={defaults.eventType || ''}>
                <option value="" disabled>
                  Select event type
                </option>
                <option value="webinar">Webinar</option>
                <option value="summit">Summit</option>
                <option value="workshop">Workshop</option>
                <option value="conference">Conference</option>
              </select>
            </FormField>
          </div>

          {showStatus ? (
            <FormField label="Status">
              <select name="status" className={selectClassName} defaultValue={defaults.status || 'upcoming'}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="draft">Draft</option>
              </select>
            </FormField>
          ) : (
            <FormField label="Venue">
              <input
                type="text"
                name="venue"
                className={inputClassName}
                placeholder="Venue name"
                defaultValue={defaults.venue}
              />
            </FormField>
          )}

          <FormField label="Description">
            <textarea
              name="description"
              className={textareaClassName}
              placeholder="Event description..."
              rows={4}
              defaultValue={defaults.description}
            />
          </FormField>

          <FormField label="Moderator">
            <input
              type="text"
              name="moderator"
              className={inputClassName}
              placeholder="Name and position"
              defaultValue={defaults.moderator}
            />
          </FormField>

          <div className="rounded-lg border border-sky-100 bg-sky-50 p-4">
            <div className="mb-3 flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
              <div>
                <p className="text-sm font-medium text-sky-900">External Registration URL</p>
                <p className="mt-0.5 text-xs text-sky-700">
                  Use this if registration happens on an external platform instead of the built-in form.
                </p>
              </div>
            </div>
            <input
              type="url"
              name="externalRegistrationUrl"
              className={inputClassName}
              placeholder="https://example.com/register"
              defaultValue={defaults.externalUrl}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-amber-100 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Star className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-amber-900">Featured Event</p>
                <p className="mt-0.5 text-xs text-amber-700">
                  Featured events are pinned to the homepage and highlighted in listings.
                </p>
              </div>
            </div>
            <ToggleSwitch checked={featured} onChange={onFeaturedChange} label="Featured event" />
          </div>
        </div>
      </FormSection>
    )
  },
)
