import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Calendar, Info, Star } from 'lucide-react'
import { ImageUploadField, type ImageUploadFieldHandle } from '../ui/ImageUploadField'
import { FormField, inputClassName, selectClassName, textareaClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import { TimeSelect } from '../ui/TimeSelect'
import { ToggleSwitch } from '../ui/ToggleSwitch'
import { displayDateToInputValue, getEventStatusFromDate } from '../../utils/date'

export interface BasicInformationValues {
  title: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  registrationDeadline: string
  location: string
  venue: string
  type: string
  status: string
  description: string
  moderator: string
  externalRegistrationUrl: string
  imageUrl: string
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
    startDate?: string
    endDate?: string
    startTime?: string
    endTime?: string
    registrationDeadline?: string
    location?: string
    eventType?: string
    status?: string
    venue?: string
    description?: string
    moderator?: string
    externalUrl?: string
    thumbnailUrl?: string
  }
}

export const BasicInformation = forwardRef<BasicInformationHandle, BasicInformationProps>(
  function BasicInformation({ featured, onFeaturedChange, showStatus = true, defaults = {} }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageFieldRef = useRef<ImageUploadFieldHandle>(null)

    const initialStartDate = displayDateToInputValue(defaults.startDate)
    const initialEndDate = displayDateToInputValue(defaults.endDate)
    const isDraft = defaults.status?.toLowerCase() === 'draft'
    const computedInitialStatus = isDraft
      ? 'draft'
      : getEventStatusFromDate(initialStartDate, initialEndDate)

    const [startDateVal, setStartDateVal] = useState(initialStartDate)
    const [endDateVal, setEndDateVal] = useState(initialEndDate)
    const [statusVal, setStatusVal] = useState(computedInitialStatus)
    const [userOverrodeStatus, setUserOverrodeStatus] = useState(false)

    useEffect(() => {
      const sDate = displayDateToInputValue(defaults.startDate)
      const eDate = displayDateToInputValue(defaults.endDate)
      setStartDateVal(sDate)
      setEndDateVal(eDate)
      if (!userOverrodeStatus) {
        const isDraftStatus = defaults.status?.toLowerCase() === 'draft'
        setStatusVal(isDraftStatus ? 'draft' : getEventStatusFromDate(sDate, eDate))
      }
    }, [defaults.startDate, defaults.endDate, defaults.status, userOverrodeStatus])

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setStartDateVal(val)
      if (!userOverrodeStatus) {
        setStatusVal(getEventStatusFromDate(val, endDateVal))
      }
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setEndDateVal(val)
      if (!userOverrodeStatus) {
        setStatusVal(getEventStatusFromDate(startDateVal, val))
      }
    }

    useImperativeHandle(ref, () => ({
      getValues: () => {
        const root = containerRef.current
        const value = (name: string) =>
          (root?.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)
            ?.value ?? ''

        const formStartDate = value('startDate')
        const formEndDate = value('endDate')
        const formStatus = statusVal || value('status') || getEventStatusFromDate(formStartDate, formEndDate)

        return {
          title: value('title'),
          startDate: formStartDate,
          endDate: formEndDate,
          startTime: value('startTime'),
          endTime: value('endTime'),
          registrationDeadline: value('registrationDeadline'),
          location: value('location'),
          venue: value('venue'),
          type: value('type'),
          status: formStatus,
          description: value('description'),
          moderator: value('moderator'),
          externalRegistrationUrl: value('externalRegistrationUrl'),
          imageUrl: imageFieldRef.current?.getImageUrl() ?? '',
        }
      },
    }))

    return (
      <FormSection title="Basic Information">
        <div ref={containerRef} className="space-y-4">
          <ImageUploadField
            ref={imageFieldRef}
            label="Event Thumbnail (landscape or portrait)"
            defaultImageUrl={defaults.thumbnailUrl}
          />

          <FormField label="Event Title" required>
            <input
              type="text"
              name="title"
              className={inputClassName}
              placeholder="Enter event title"
              defaultValue={defaults.title}
              required
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Start Date" required>
              <input
                type="date"
                name="startDate"
                className={inputClassName}
                defaultValue={initialStartDate}
                onChange={handleStartDateChange}
                required
              />
            </FormField>
            <FormField label="End Date" required>
              <input
                type="date"
                name="endDate"
                className={inputClassName}
                defaultValue={initialEndDate}
                onChange={handleEndDateChange}
                required
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Start Time">
              <TimeSelect name="startTime" defaultValue={defaults.startTime} />
            </FormField>
            <FormField label="End Time">
              <TimeSelect name="endTime" defaultValue={defaults.endTime} />
            </FormField>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="mb-3 flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-900">Registration Deadline</p>
                <p className="mt-0.5 text-xs text-amber-700">
                  After this date the Register button will be hidden and replaced with "Registration
                  Closed". Leave blank for no deadline.
                </p>
              </div>
            </div>
            <input
              type="date"
              name="registrationDeadline"
              className={inputClassName}
              defaultValue={displayDateToInputValue(defaults.registrationDeadline)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Location">
              <input
                type="text"
                name="location"
                className={inputClassName}
                placeholder="Zoom / City, Country"
                defaultValue={defaults.location}
              />
            </FormField>
            <FormField label="Venue">
              <input
                type="text"
                name="venue"
                className={inputClassName}
                placeholder="Venue name (e.g. Virtual, Main Auditorium)"
                defaultValue={defaults.venue}
              />
            </FormField>
          </div>

          <div className={showStatus ? 'grid gap-4 sm:grid-cols-2' : ''}>
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

            {showStatus && (
              <FormField label="Status">
                <select
                  name="status"
                  className={selectClassName}
                  value={statusVal}
                  onChange={(e) => {
                    setStatusVal(e.target.value)
                    setUserOverrodeStatus(true)
                  }}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="draft">Draft</option>
                </select>
              </FormField>
            )}
          </div>

          {statusVal === 'past' && (
            <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-800">
              <Calendar className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                This event is set as <strong>Past</strong> based on its date and will appear under <strong>Past Events</strong>.
              </span>
            </div>
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
                  Featured events appear on the large carousel banner on the homepage. Only upcoming
                  events with the featured flag are shown.
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