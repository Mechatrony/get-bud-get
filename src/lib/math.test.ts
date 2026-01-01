import { describe, it, expect } from 'vitest'
import { add, multiply } from './math'

describe('math utils', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(0, 0)).toBe(0)
    expect(add(-1, 1)).toBe(0)
  })

  it('should multiply two numbers', () => {
    expect(multiply(2, 3)).toBe(6)
    expect(multiply(0, 5)).toBe(0)
    expect(multiply(-2, 3)).toBe(-6)
  })
})
