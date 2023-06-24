import equal from 'pixutil/equal'

export default function diffObject (from, to) {
  const ret = {}
  const fromKeys = new Set(Object.keys(from))

  for (const [key, value] of Object.entries(to)) {
    fromKeys.delete(key)
    if (key in from && equal(from[key], to[key])) continue
    if (isPOJO(value)) {
      ret[key] = diffObject(from[key] || {}, value)
    } else {
      ret[key] = value
    }
  }
  for (const key of fromKeys) ret[key] = null
  return ret
}

function isPOJO (x) {
  return x && typeof x === 'object' && x.constructor === Object
}
