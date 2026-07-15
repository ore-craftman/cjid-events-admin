import { useState } from 'react'
import { GripVertical, Plus, Trash2, X } from 'lucide-react'
import { FormField, inputClassName } from '../ui/FormField'
import { ToggleSwitch } from '../ui/ToggleSwitch'
import type { FieldType, RegistrationField } from '../../types'

const fieldTypes: { type: FieldType; label: string }[] = [
  { type: 'short-text', label: 'Short text' },
  { type: 'long-text', label: 'Long Text' },
  { type: 'dropdown', label: 'Dropdown' },
  { type: 'phone', label: 'Phone' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'multiple-choice', label: 'Multiple Choice' },
  { type: 'number', label: 'Number' },
  { type: 'date', label: 'Date' },
  { type: 'url', label: 'URL / Link' },
]

const fieldTypeLabels: Record<FieldType, string> = {
  'short-text': 'Short text',
  'long-text': 'Long Text',
  dropdown: 'Dropdown',
  phone: 'Phone',
  checkbox: 'Checkbox',
  'multiple-choice': 'Multiple Choice',
  number: 'Number',
  date: 'Date',
  url: 'URL / Link',
}

const OPTION_FIELD_TYPES: FieldType[] = ['dropdown', 'checkbox', 'multiple-choice']

interface RegistrationFieldsSectionProps {
  initialFields: RegistrationField[]
}

function FieldPreview({
  type,
  label,
  placeholder,
  required,
  options,
}: {
  type: FieldType
  label: string
  placeholder: string
  required: boolean
  options: string[]
}) {
  const displayLabel = label || 'Field Label'

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {displayLabel}
        {required && <span className="text-red-600"> *</span>}
      </label>

      {type === 'long-text' && (
        <textarea
          className={inputClassName}
          placeholder={placeholder || 'Enter text...'}
          rows={3}
          disabled
        />
      )}

      {type === 'dropdown' && (
        <select className={inputClassName} disabled defaultValue="">
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.filter(Boolean).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {type === 'checkbox' && (
        <div className="space-y-2">
          {(options.filter(Boolean).length > 0 ? options.filter(Boolean) : ['Option 1', 'Option 2']).map(
            (opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-zinc-700">
                <input type="checkbox" disabled className="h-4 w-4 rounded border-zinc-300" />
                {opt}
              </label>
            ),
          )}
        </div>
      )}

      {type === 'multiple-choice' && (
        <div className="space-y-2">
          {(options.filter(Boolean).length > 0 ? options.filter(Boolean) : ['Option 1', 'Option 2']).map(
            (opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-zinc-700">
                <input type="radio" disabled className="h-4 w-4 border-zinc-300" name="preview-radio" />
                {opt}
              </label>
            ),
          )}
        </div>
      )}

      {type === 'date' && (
        <input type="date" className={inputClassName} disabled />
      )}

      {type === 'url' && (
        <input
          type="url"
          className={inputClassName}
          placeholder={placeholder || 'https://example.com'}
          disabled
        />
      )}

      {(type === 'short-text' || type === 'phone' || type === 'number') && (
        <input
          type={type === 'number' ? 'number' : type === 'phone' ? 'tel' : 'text'}
          className={inputClassName}
          placeholder={
            placeholder ||
            (type === 'phone' ? 'Enter phone number' : type === 'number' ? '0' : 'Enter value...')
          }
          disabled
        />
      )}
    </div>
  )
}

function reorderFields(
  fields: RegistrationField[],
  draggedId: string,
  targetId: string,
): RegistrationField[] {
  const draggedIndex = fields.findIndex((f) => f.id === draggedId)
  const targetIndex = fields.findIndex((f) => f.id === targetId)
  if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return fields

  const updated = [...fields]
  const [removed] = updated.splice(draggedIndex, 1)
  updated.splice(targetIndex, 0, removed)
  return updated
}

export function RegistrationFieldsSection({ initialFields }: RegistrationFieldsSectionProps) {
  const [fields, setFields] = useState<RegistrationField[]>(initialFields)
  const [selectedType, setSelectedType] = useState<FieldType>('short-text')
  const [label, setLabel] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [options, setOptions] = useState<string[]>([''])
  const [required, setRequired] = useState(false)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const showOptions = OPTION_FIELD_TYPES.includes(selectedType)
  const canAdd = label.trim().length > 0

  const handleTypeChange = (type: FieldType) => {
    setSelectedType(type)
    if (OPTION_FIELD_TYPES.includes(type) && options.length === 0) {
      setOptions([''])
    }
  }

  const addOption = () => {
    setOptions((prev) => [...prev, ''])
  }

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)))
  }

  const removeOption = (index: number) => {
    setOptions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : ['']))
  }

  const resetForm = () => {
    setLabel('')
    setPlaceholder('')
    setOptions([''])
    setRequired(false)
    setSelectedType('short-text')
  }

  const addField = () => {
    if (!canAdd) return
    const cleanedOptions = options.map((o) => o.trim()).filter(Boolean)

    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        type: selectedType,
        required,
        placeholder: placeholder.trim() || undefined,
        options: showOptions && cleanedOptions.length > 0 ? cleanedOptions : undefined,
      },
    ])
    resetForm()
  }

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDragStart = (id: string) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedId || draggedId === targetId) return
    setDragOverId(targetId)
    setFields((prev) => reorderFields(prev, draggedId, targetId))
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverId(null)
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-zinc-900">Registration Fields</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Create form for the registration details you want to collect.
        </p>
      </div>

      {fields.length > 0 && (
        <div className="mb-6 space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              draggable
              onDragStart={() => handleDragStart(field.id)}
              onDragOver={(e) => handleDragOver(e, field.id)}
              onDragEnd={handleDragEnd}
              className={`flex flex-col gap-3 rounded-md border px-4 py-3 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                dragOverId === field.id && draggedId !== field.id
                  ? 'border-zinc-400 bg-zinc-50'
                  : 'border-zinc-200'
              } ${draggedId === field.id ? 'opacity-50' : ''}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="cursor-grab text-zinc-400 hover:text-zinc-600 active:cursor-grabbing"
                  aria-label="Drag to reorder"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-zinc-400">{index + 1}.</span>
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {field.label}
                    {field.required && <span className="text-red-600"> *</span>}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {fieldTypeLabels[field.type]}
                    {field.required && (
                      <span className="ml-2 rounded bg-red-100 px-1.5 py-0.5 font-medium text-red-600">
                        Required
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="text-zinc-400 hover:text-red-500"
                  aria-label={`Remove ${field.label}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Add Field
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {fieldTypes.map((ft) => (
              <button
                key={ft.type}
                type="button"
                onClick={() => handleTypeChange(ft.type)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  selectedType === ft.type
                    ? 'bg-zinc-900 text-white'
                    : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <FormField label="Field Label" required>
              <input
                type="text"
                className={inputClassName}
                placeholder="e.g. Full Name"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </FormField>

            <FormField label="Placeholder">
              <input
                type="text"
                className={inputClassName}
                placeholder="Placeholder shown in the field"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </FormField>

            {showOptions && (
              <div>
                <p className="mb-2 text-sm font-medium text-zinc-700">Options</p>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className={inputClassName}
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="shrink-0 text-zinc-400 hover:text-red-500"
                        aria-label={`Remove option ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add option
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={required} onChange={setRequired} label="Required field" />
                <span className="text-sm text-zinc-700">Required</span>
              </div>
              <button
                type="button"
                onClick={addField}
                disabled={!canAdd}
                className="w-full rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-500 transition-colors enabled:bg-zinc-900 enabled:text-white enabled:hover:bg-zinc-800 disabled:cursor-not-allowed sm:w-auto"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Live Preview
          </p>
          <FieldPreview
            type={selectedType}
            label={label}
            placeholder={placeholder}
            required={required}
            options={options}
          />
        </div>
      </div>
    </section>
  )
}
