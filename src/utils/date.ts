export function parseEventDate(dateStr?: string): Date | null {
  if (!dateStr) return null
  const trimmed = dateStr.trim()
  if (!trimmed) return null

  // Check YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(trimmed)
  if (ymdMatch) {
    const [, year, month, day] = ymdMatch
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  // Check DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/.exec(trimmed)
  if (dmyMatch) {
    const [, day, month, year] = dmyMatch
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const parsed = new Date(trimmed)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function displayDateToInputValue(date?: string): string {
  if (!date) return ''
  const trimmed = date.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }
  const parsed = parseEventDate(trimmed)
  if (parsed) {
    const year = parsed.getFullYear()
    const month = String(parsed.getMonth() + 1).padStart(2, '0')
    const day = String(parsed.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return ''
}

export function getEventStatusFromDate(startDate?: string, endDate?: string): 'upcoming' | 'past' {
  const targetDate = parseEventDate(endDate) || parseEventDate(startDate)
  if (!targetDate) return 'upcoming'

  targetDate.setHours(23, 59, 59, 999)
  const now = new Date()
  return targetDate < now ? 'past' : 'upcoming'
}
