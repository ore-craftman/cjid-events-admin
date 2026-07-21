import { selectClassName } from './FormField'

const TIME_OPTIONS = [
  { value: '', label: 'Select time' },
  { value: '06:00', label: '6:00 AM' },
  { value: '06:30', label: '6:30 AM' },
  { value: '07:00', label: '7:00 AM' },
  { value: '07:30', label: '7:30 AM' },
  { value: '08:00', label: '8:00 AM' },
  { value: '08:30', label: '8:30 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '09:30', label: '9:30 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '10:30', label: '10:30 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '13:30', label: '1:30 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '15:30', label: '3:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '16:30', label: '4:30 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '18:30', label: '6:30 PM' },
  { value: '19:00', label: '7:00 PM' },
  { value: '19:30', label: '7:30 PM' },
  { value: '20:00', label: '8:00 PM' },
]

interface TimeSelectProps {
  name?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

function normalizeTime(value?: string) {
  if (!value) return ''
  const lower = value.toLowerCase()
  const exact = TIME_OPTIONS.find(
    (opt) => opt.label.toLowerCase() === lower || opt.value === value,
  )
  if (exact) return exact.value

  const partial = TIME_OPTIONS.find(
    (opt) => opt.value && lower.includes(opt.label.toLowerCase()),
  )
  return partial?.value ?? ''
}

export function TimeSelect({ name, defaultValue, value, onChange }: TimeSelectProps) {
  const resolvedDefault = normalizeTime(defaultValue)

  return (
    <select
      name={name}
      className={selectClassName}
      defaultValue={value === undefined ? resolvedDefault : undefined}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {TIME_OPTIONS.map((opt) => (
        <option key={opt.value || 'empty'} value={opt.value} disabled={!opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
