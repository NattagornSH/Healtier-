import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import {
  calculateBMI,
  calculateScalePosition,
  getBMICategory,
  validateInput,
} from './bmiCalculator.js'
import { CATEGORY_KEYS } from './constants.js'

describe('calculateBMI', () => {
  it('calculates BMI with WHO formula', () => {
    expect(calculateBMI(70, 170)).toBeCloseTo(24.22, 2)
  })

  it('handles boundary-sized valid inputs', () => {
    expect(calculateBMI(1, 1)).toBe(10000)
    expect(calculateBMI(499, 299)).toBeCloseTo(55.82, 2)
  })
})

describe('getBMICategory', () => {
  it('classifies all BMI boundaries', () => {
    expect(getBMICategory(18.49).key).toBe('thin')
    expect(getBMICategory(18.5).key).toBe('normal')
    expect(getBMICategory(22.99).key).toBe('normal')
    expect(getBMICategory(23).key).toBe('fat')
    expect(getBMICategory(24.99).key).toBe('fat')
    expect(getBMICategory(25).key).toBe('obese')
    expect(getBMICategory(29.99).key).toBe('obese')
    expect(getBMICategory(30).key).toBe('obese')
  })
})

describe('validateInput', () => {
  it('accepts valid input', () => {
    expect(validateInput(65, 170)).toEqual({ isValid: true, errors: [] })
  })

  it('rejects invalid weight with Thai message', () => {
    expect(validateInput(0, 170)).toEqual({
      isValid: false,
      errors: ['น้ำหนักต้องอยู่ระหว่าง 1-499 kg'],
    })
    expect(validateInput(500, 170).errors).toContain(
      'น้ำหนักต้องอยู่ระหว่าง 1-499 kg',
    )
  })

  it('rejects invalid height with Thai message', () => {
    expect(validateInput(65, 0)).toEqual({
      isValid: false,
      errors: ['ส่วนสูงต้องอยู่ระหว่าง 1-299 cm'],
    })
    expect(validateInput(65, 300).errors).toContain(
      'ส่วนสูงต้องอยู่ระหว่าง 1-299 cm',
    )
  })

  it('collects both errors for empty or non-numeric input', () => {
    expect(validateInput(NaN, NaN)).toEqual({
      isValid: false,
      errors: [
        'น้ำหนักต้องอยู่ระหว่าง 1-499 kg',
        'ส่วนสูงต้องอยู่ระหว่าง 1-299 cm',
      ],
    })
  })
})

describe('calculateScalePosition', () => {
  it('clamps below 15 to 0%', () => {
    expect(calculateScalePosition(10)).toBe(0)
  })

  it('clamps above 35 to 100%', () => {
    expect(calculateScalePosition(50)).toBe(100)
  })

  it('maps BMI 25 to midpoint', () => {
    expect(calculateScalePosition(25)).toBe(50)
  })
})

describe('BMI property-based checks', () => {
  it('is deterministic for the same inputs', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 499, noNaN: true }),
        fc.float({ min: 1, max: 299, noNaN: true }),
        (weight, height) => {
          expect(calculateBMI(weight, height)).toBe(calculateBMI(weight, height))
        },
      ),
    )
  })

  it('always returns one of the four category keys', () => {
    fc.assert(
      fc.property(fc.float({ min: 0, max: 100, noNaN: true }), (bmi) => {
        expect(CATEGORY_KEYS).toContain(getBMICategory(bmi).key)
      }),
    )
  })

  it('always keeps scale position between 0 and 100', () => {
    fc.assert(
      fc.property(fc.float({ min: -100, max: 200, noNaN: true }), (bmi) => {
        const position = calculateScalePosition(bmi)
        expect(position).toBeGreaterThanOrEqual(0)
        expect(position).toBeLessThanOrEqual(100)
      }),
    )
  })

  it('does not mutate input values', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 499, noNaN: true }),
        fc.float({ min: 1, max: 299, noNaN: true }),
        (weight, height) => {
          const original = { weight, height }
          calculateBMI(weight, height)
          validateInput(weight, height)

          expect({ weight, height }).toEqual(original)
        },
      ),
    )
  })
})
