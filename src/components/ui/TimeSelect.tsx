import { selectClassName } from './FormField'

function generateTimeOptions() {
  const options = [{ value: '', label: 'Select time' }]
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const h24 = String(hour).padStart(2, '0')
      const m = String(minute).padStart(2, '0')
      const val = `${h24}:${m}`
      const period = hour >= 12 ? 'PM' : 'AM'
      const h12 = hour % 12 === 0 ? 12 : hour % 12
      const label = `${h12}:${m} ${period}`
      options.push({ value: val, label })
    }
  }
  return options
}

const TIME_OPTIONS = generateTimeOptions()

interface TimeSelectProps {
  name?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

function normalizeTime(value?: string) {
  if (!value) return ''
  const trimmed = value.trim()
  const lower = trimmed.toLowerCase()

  const exact = TIME_OPTIONS.find(
    (opt) =>
      opt.value === trimmed ||
      opt.label.toLowerCase() === lower ||
      (opt.value && trimmed.startsWith(opt.value)),
  )
  if (exact) return exact.value

  const partial = TIME_OPTIONS.find(
    (opt) => opt.value && lower.includes(opt.label.toLowerCase()),
  )
  if (partial) return partial.value

  return trimmed
}

export function TimeSelect({ name, defaultValue, value, onChange }: TimeSelectProps) {
  const resolvedDefault = normalizeTime(defaultValue)
  const isCustom =
    resolvedDefault && !TIME_OPTIONS.some((opt) => opt.value === resolvedDefault)

  return (
    <select
      name={name}
      className={selectClassName}
      defaultValue={value === undefined ? resolvedDefault : undefined}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {isCustom && <option value={resolvedDefault}>{resolvedDefault}</option>}
      {TIME_OPTIONS.map((opt) => (
        <option key={opt.value || 'empty'} value={opt.value} disabled={!opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

