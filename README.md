# diff-object

Provides simple recurive object diffing

## API

A single default export

### diffObject (from, to[, opts]) => obj

Calculates the difference between the objects

Objects are tested for equality with `pixutil/equal`, and equal values
are ignored

Plain Old JS Objects are recursed into - but nothing else

#### options

- `depth` - how deep should we recurse (default: Infinity).
