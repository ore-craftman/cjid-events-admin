export function displayDateToInputValue(date?: string): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0]
  }
  return ''
}
