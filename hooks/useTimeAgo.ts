import { useState } from 'react'

type UNITS = 'day' | 'hour' | 'minute' | 'second'

const DATE_UNITS: [UNITS, number][] = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = (timestamp: number) => {
  console.log('getDateDiffs')
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

interface TimeState {
  value: number
  unit: UNITS
}

export const useTimeAgo = (timestamp: number) => {
  const [timeago] = useState<TimeState>(() => getDateDiffs(timestamp)!)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newTimeAgo = getDateDiffs(timestamp)
  //     setTimeago(newTimeAgo!)
  //   }, 50000)

  //   return () => clearInterval(interval)
  // }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })

  const { value, unit } = timeago!

  return rtf.format(value, unit)
}
