import { forwardRef, useImperativeHandle, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { FormField, inputClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import type { Speaker } from '../../types'

export interface SpeakersSectionHandle {
  getValues: () => Speaker[]
}

interface SpeakersSectionProps {
  initialSpeakers?: Speaker[]
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const SpeakersSection = forwardRef<SpeakersSectionHandle, SpeakersSectionProps>(
  function SpeakersSection({ initialSpeakers = [] }, ref) {
    const [speakers, setSpeakers] = useState<Speaker[]>(initialSpeakers)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')

    useImperativeHandle(ref, () => ({
      getValues: () => speakers,
    }))

    const addSpeaker = () => {
      if (!name.trim()) return
      setSpeakers((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name: name.trim(), role: role.trim() },
      ])
      setName('')
      setRole('')
    }

    const removeSpeaker = (id: string) => {
      setSpeakers((prev) => prev.filter((s) => s.id !== id))
    }

    return (
      <FormSection title="Speakers">
        {speakers.length > 0 && (
          <div className="mb-4 space-y-2">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
                    {getInitials(speaker.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900">{speaker.name}</p>
                    {speaker.role && <p className="text-xs text-zinc-500">{speaker.role}</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeSpeaker(speaker.id)}
                  className="text-zinc-400 hover:text-red-500"
                  aria-label={`Remove ${speaker.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <FormField label="Speaker Name" className="flex-1">
            <input
              type="text"
              className={inputClassName}
              placeholder="Speaker name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField label="Role / Organization" className="flex-1">
            <input
              type="text"
              className={inputClassName}
              placeholder="Role / Organization"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </FormField>
          <div className="flex items-end sm:shrink-0">
            <button
              type="button"
              onClick={addSpeaker}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
              aria-label="Add speaker"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </FormSection>
    )
  },
)
