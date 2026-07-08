import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { FormField, inputClassName } from '../ui/FormField'
import { FormSection } from '../ui/FormSection'

interface AgendaSectionProps {
  initialItems?: string[]
}

export function AgendaSection({ initialItems = [] }: AgendaSectionProps) {
  const [items, setItems] = useState<string[]>(initialItems)
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (!newItem.trim()) return
    setItems((prev) => [...prev, newItem.trim()])
    setNewItem('')
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <FormSection title="Agenda">
      {items.length > 0 && (
        <div className="mb-4 space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md border border-zinc-200 px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-100 text-xs font-semibold text-amber-800">
                  {index + 1}
                </span>
                <p className="text-sm text-zinc-900">{item}</p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-zinc-400 hover:text-red-500"
                aria-label={`Remove agenda item ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <FormField label="Agenda Item" className="flex-1">
          <input
            type="text"
            className={inputClassName}
            placeholder="e.g. 10:00 AM — Panel Discussion"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
          />
        </FormField>
        <div className="flex items-end sm:shrink-0">
          <button
            type="button"
            onClick={addItem}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800"
            aria-label="Add agenda item"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </FormSection>
  )
}
