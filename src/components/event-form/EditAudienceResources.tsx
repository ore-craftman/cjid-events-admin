import { useState } from 'react'
import { FileText, Plus, X } from 'lucide-react'
import { FormField, inputClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'
import type { Recording, Resource } from '../../types'

interface EditAudienceResourcesProps {
  initialAudience?: string[]
  initialResources?: Resource[]
  initialRecordings?: Recording[]
}

export function EditAudienceResources({
  initialAudience = [],
  initialResources = [],
  initialRecordings = [],
}: EditAudienceResourcesProps) {
  const [audience, setAudience] = useState<string[]>(initialAudience)
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [recordings, setRecordings] = useState<Recording[]>(initialRecordings)

  const [newAudience, setNewAudience] = useState('')
  const [resourceName, setResourceName] = useState('')
  const [resourceUrl, setResourceUrl] = useState('')
  const [recordingLabel, setRecordingLabel] = useState('')
  const [recordingUrl, setRecordingUrl] = useState('')

  const addAudience = () => {
    if (!newAudience.trim()) return
    setAudience((prev) => [...prev, newAudience.trim()])
    setNewAudience('')
  }

  const removeAudience = (index: number) => {
    setAudience((prev) => prev.filter((_, i) => i !== index))
  }

  const addResource = () => {
    if (!resourceName.trim()) return
    setResources((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: resourceName.trim(), url: resourceUrl.trim() },
    ])
    setResourceName('')
    setResourceUrl('')
  }

  const removeResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id))
  }

  const addRecording = () => {
    if (!recordingLabel.trim()) return
    setRecordings((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: recordingLabel.trim(), url: recordingUrl.trim() },
    ])
    setRecordingLabel('')
    setRecordingUrl('')
  }

  return (
    <FormSection title="Audience & Resources">
      <div className="space-y-6">
        <div>
          <FormField label="Expected Audience">
            {audience.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {audience.map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeAudience(index)}
                      className="text-zinc-400 hover:text-white"
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                className={inputClassName}
                placeholder="e.g. Journalists"
                value={newAudience}
                onChange={(e) => setNewAudience(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAudience())}
              />
              <button
                type="button"
                onClick={addAudience}
                className="flex h-[38px] w-full items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800 sm:w-[38px] sm:shrink-0"
                aria-label="Add audience"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </FormField>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-zinc-700">Resources / Downloads</h3>
          {resources.length > 0 && (
            <div className="mb-3 space-y-2">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-zinc-400" />
                    <span className="text-sm text-zinc-900">{resource.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResource(resource.id)}
                    className="text-zinc-400 hover:text-red-500"
                    aria-label={`Remove ${resource.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              className={inputClassName}
              placeholder="File name (e.g. Report.pdf)"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />
            <input
              type="url"
              className={inputClassName}
              placeholder="URL link"
              value={resourceUrl}
              onChange={(e) => setResourceUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={addResource}
              className="flex h-[38px] w-full items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800 sm:w-[38px] sm:shrink-0"
              aria-label="Add resource"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-1 text-sm font-medium text-zinc-700">Recordings & External Links</h3>
          <p className="mb-3 text-xs text-zinc-500">
            Add links to event recordings, livestreams, or related external content.
          </p>
          {recordings.length > 0 && (
            <div className="mb-3 space-y-2">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2.5"
                >
                  <span className="text-sm text-zinc-900">{recording.label}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setRecordings((prev) => prev.filter((r) => r.id !== recording.id))
                    }
                    className="text-zinc-400 hover:text-red-500"
                    aria-label={`Remove ${recording.label}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              className={inputClassName}
              placeholder="Link label (e.g. Watch Recording)"
              value={recordingLabel}
              onChange={(e) => setRecordingLabel(e.target.value)}
            />
            <input
              type="url"
              className={inputClassName}
              placeholder="https://..."
              value={recordingUrl}
              onChange={(e) => setRecordingUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={addRecording}
              className="flex h-[38px] w-full items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 sm:w-[38px] sm:shrink-0"
              aria-label="Add recording link"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </FormSection>
  )
}
