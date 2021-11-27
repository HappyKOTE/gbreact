export function findIndex(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i
    }
  }
  return -1
}