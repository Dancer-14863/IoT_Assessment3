import moment from 'moment'

export function toDateTimeString(date: Date | string): string {
  if (!date || date === '') return ''
  if (typeof date === 'string') {
    date = new Date(`${date} UTC`)
  }
  return moment(date).format('HH:mm:ss DD-MM-YYYY')
}
