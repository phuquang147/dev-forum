export const encodeQueryData = (data: Record<string, any>): string => {
  const ret = []
  for (const d in data) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]))
  }
  return '?' + ret.join('&')
}
