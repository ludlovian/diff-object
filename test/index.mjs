import { test } from 'uvu'
import * as assert from 'uvu/assert'

import diffObject from '../src/index.mjs'

test('simple diff', () => {
  const from = { a: 1, b: 'foo' }
  const to = { a: 1, b: 'bar' }
  const exp = { b: 'bar' }
  const act = diffObject(from, to)
  assert.equal(act, exp)
})

test('strutured diff', () => {
  const from = { a: { b: 2, c: 'foo' } }
  const to = { a: { b: 2, c: 'bar' } }
  const exp = { a: { c: 'bar' } }
  const act = diffObject(from, to)
  assert.equal(act, exp)
})

test('arrays', () => {
  const from = { a: 1, b: [2, 'foo'] }
  const to = { a: 1, b: [2, 'bar'] }
  const exp = { b: [2, 'bar'] }
  const act = diffObject(from, to)
  assert.equal(act, exp)
})

test('new elements', () => {
  const from = { a: 1 }
  const to = { a: 1, b: { c: 'foo' } }
  const exp = { b: { c: 'foo' } }
  const act = diffObject(from, to)
  assert.equal(act, exp)
})

test('deleted elements', () => {
  const from = { a: 1, b: { c: 'foo', d: 'bar' } }
  const to = { a: 1, b: { d: 'baz' } }
  const exp = { b: { c: null, d: 'baz' } }
  const act = diffObject(from, to)
  assert.equal(act, exp)
})

test.run()
