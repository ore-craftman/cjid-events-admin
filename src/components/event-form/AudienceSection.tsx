import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FormField, inputClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'

export function AudienceSection() {
  const [audience, setAudience] = useState<string[]>([])
  const [newAudience, setNewAudience] = useState('')

  const addAudience = () => {
    if (!newAudience.trim()) return
    setAudience((prev) => [...prev, newAudience.trim()])
    setNewAudience('')
  }

  return (
    <FormSection title="Audience & Resources">
      <FormField label="Expected Audience">
        <div className="flex gap-3">
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
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
            aria-label="Add audience"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {audience.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {audience.map((item, index) => (
              <span
                key={index}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </FormField>
    </FormSection>
  )
}
