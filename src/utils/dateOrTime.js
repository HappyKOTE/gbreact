import { currentDateTime } from './currentDateTime'

export function dateOrTime(value) {
  const now = currentDateTime()
  if (value[0] === now[0]) {
    return value[1].substr(0,5)
  } else {
    return value[0]
  }
}