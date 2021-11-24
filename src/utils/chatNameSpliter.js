export function chatNameSpliter(name) {
  const words = name.split(' ')
  if (words.length > 1) {
    return words[0].slice(0,1) + words[1].slice(0,1)
  } else {
    return name.slice(0,2)
  }
}