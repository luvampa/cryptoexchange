export default (text, max = 15, s = '.') => {
  let sliced = text.slice(0, max)
  if (sliced.length < text.length) {
    sliced += s
  }
  return sliced
}
