import equal from '@ludlovian/equal'

export default function diffObject (from, to, opts = {}) {
  const { depth: maxDepth = Infinity } = opts

  return _diff(from, to, 1)

  function _diff (from, to, depth) {
    const ret = {}
    const fromKeys = new Set(Object.keys(from))

    for (const [key, value] of Object.entries(to)) {
      fromKeys.delete(key)
      if (key in from && equal(from[key], to[key])) continue
      if (isPOJO(value) && depth < maxDepth) {
        ret[key] = _diff(from[key] || {}, value, depth + 1)
      } else {
        ret[key] = value
      }
    }
    for (const key of fromKeys) ret[key] = null
    return ret
  }
}

function isPOJO (x) {
  return x && typeof x === 'object' && x.constructor === Object
}
