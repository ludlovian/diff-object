import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import diffObject from '../src/index.mjs'

suite('diffObject', () => {
  test('simple diff', () => {
    const from = { a: 1, b: 'foo' }
    const to = { a: 1, b: 'bar' }
    const exp = { b: 'bar' }
    const act = diffObject(from, to)
    assert.deepStrictEqual(act, exp)
  })

  test('strutured diff', () => {
    const from = { a: { b: 2, c: 'foo' } }
    const to = { a: { b: 2, c: 'bar' } }
    const exp = { a: { c: 'bar' } }
    const act = diffObject(from, to)
    assert.deepStrictEqual(act, exp)
  })

  test('arrays', () => {
    const from = { a: 1, b: [2, 'foo'] }
    const to = { a: 1, b: [2, 'bar'] }
    const exp = { b: [2, 'bar'] }
    const act = diffObject(from, to)
    assert.deepStrictEqual(act, exp)
  })

  test('new elements', () => {
    const from = { a: 1 }
    const to = { a: 1, b: { c: 'foo' } }
    const exp = { b: { c: 'foo' } }
    const act = diffObject(from, to)
    assert.deepStrictEqual(act, exp)
  })

  test('deleted elements', () => {
    const from = { a: 1, b: { c: 'foo', d: 'bar' } }
    const to = { a: 1, b: { d: 'baz' } }
    const exp = { b: { c: null, d: 'baz' } }
    const act = diffObject(from, to)
    assert.deepStrictEqual(act, exp)
  })

  test('options: depth', () => {
    const from = { a: 1, b: { c: 2, d: 'foo' } }
    const to = { a: 1, b: { c: 2, d: 'bar' } }

    const exp1 = { b: { d: 'bar' } }
    const act1 = diffObject(from, to, { depth: 2 })
    assert.deepStrictEqual(act1, exp1)

    const exp2 = { b: { c: 2, d: 'bar' } }
    const act2 = diffObject(from, to, { depth: 1 })
    assert.deepStrictEqual(act2, exp2)
  })
})
