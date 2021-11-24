import { currentDateTime } from './currentDateTime'

export function dateOrTime(value) {
  if (value[0] === currentDateTime[0]) {
    return value[1].substr(0,5)
  } else {
    return value[0]
  }
}
