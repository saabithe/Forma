/**
 * Get today's date string in LOCAL timezone (YYYY-MM-DD)
 * Unlike toISOString() which returns UTC, this returns the user's local date
 */
export function getTodayLocal() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get yesterday's date string in LOCAL timezone (YYYY-MM-DD)
 */
export function getYesterdayLocal() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
