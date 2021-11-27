export function currentDateTime() {
  return [
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  ]
}