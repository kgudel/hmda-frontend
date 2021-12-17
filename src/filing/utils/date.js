export const months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
  ','
)

export function nth(d) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export function padZero(n) {
  if (n > 9 || n < -9) return '' + n
  return n < 0 ? '-0' + -n : '0' + n
}

export function ordinal(d, options=({nthDate: true})) {
  const { nthDate } = options
  const month = months[d.getMonth()]
  const day = d.getDate() 
  const dayStr = `${day}${nthDate ? nth(day) : ''}`
  return `${month} ${dayStr}, ${d.getFullYear()}`
}

export function ordinalHour(d) {
  const mil = d.getHours()
  const period = mil > 11 ? 'PM' : 'AM'
  const hour = mil % 12 ? mil % 12 : 12
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())

  return `${ordinal(d)}, ${hour}:${min}:${sec} ${period}`
}

export const numDaysBetween = function(d1, d2) {
  var diff = d1.getTime() - d2.getTime();
  const daysDiff = diff / (1000 * 60 * 60 * 24)
  return daysDiff
};