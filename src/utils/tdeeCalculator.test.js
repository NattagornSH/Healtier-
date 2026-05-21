import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { ACTIVITY_LEVELS, CALORIES_PER_GRAM, MACRO_RATIOS } from './constants.js'
import {
  calculateBMR,
  calculateMacros,
  calculateTDEE,
  toMetric,
  validateTDEEInput,
} from './tdeeCalculator.js'

const validInput = {
  age: 30,
  gender: 'male',
  weight: 70,
  height: 170,
  activityLevel: 'moderate',
  unit: 'metric',
}

describe('calculateBMR', () => {
  it('calculates male and female Mifflin-St Jeor formulas', () => {
    expect(calculateBMR(70, 170, 30, 'male')).toBeCloseTo(1617.5)
    expect(calculateBMR(70, 170, 30, 'female')).toBeCloseTo(1451.5)
  })

  it('handles age boundaries', () => {
    expect(calculateBMR(70, 170, 1, 'male')).toBeCloseTo(1762.5)
    expect(calculateBMR(70, 170, 120, 'female')).toBeCloseTo(1001.5)
  })

  it('stays positive for normal inputs', () => {
    expect(calculateBMR(55, 160, 45, 'female')).toBeGreaterThan(0)
  })
})

describe('calculateTDEE', () => {
  it('multiplies BMR by activity factor', () => {
    expect(calculateTDEE(1600, 1.55)).toBe(2480)
  })

  it('supports every configured activity factor', () => {
    ACTIVITY_LEVELS.forEach((activity) => {
      expect(calculateTDEE(1000, activity.factor)).toBe(1000 * activity.factor)
    })
  })
})

describe('calculateMacros', () => {
  it('returns grams from balanced diet ratios', () => {
    expect(calculateMacros(2000)).toEqual({
      protein: 125,
      fat: 67,
      carbs: 225,
    })
  })

  it('rounding stays close to original calories', () => {
    const tdee = 2137
    const macros = calculateMacros(tdee)
    const macroCalories =
      macros.protein * CALORIES_PER_GRAM.protein +
      macros.carbs * CALORIES_PER_GRAM.carbs +
      macros.fat * CALORIES_PER_GRAM.fat

    expect(Math.abs(macroCalories - tdee)).toBeLessThanOrEqual(5)
  })
})

describe('toMetric', () => {
  it('converts imperial values to metric', () => {
    expect(toMetric(1, 1, 'imperial')).toEqual({
      weightKg: 0.453592,
      heightCm: 2.54,
    })
  })

  it('keeps metric values unchanged', () => {
    expect(toMetric(70, 170, 'metric')).toEqual({
      weightKg: 70,
      heightCm: 170,
    })
  })
})

describe('validateTDEEInput', () => {
  it('accepts a valid input', () => {
    expect(validateTDEEInput(validInput)).toEqual({ isValid: true, errors: [] })
  })

  it('rejects invalid age values with Thai messages', () => {
    expect(validateTDEEInput({ ...validInput, age: -1 }).errors).toContain(
      'อายุต้องอยู่ระหว่าง 1-120 ปี',
    )
    expect(validateTDEEInput({ ...validInput, age: 121 }).errors).toContain(
      'อายุต้องอยู่ระหว่าง 1-120 ปี',
    )
  })

  it('rejects invalid weight, gender, and activity values', () => {
    const result = validateTDEEInput({
      ...validInput,
      weight: 0,
      gender: 'other',
      activityLevel: 'sleeping',
    })

    expect(result.errors).toContain('น้ำหนักต้องอยู่ระหว่าง 1-499 kg')
    expect(result.errors).toContain('กรุณาเลือกเพศ')
    expect(result.errors).toContain('กรุณาเลือกระดับกิจกรรม')
  })

  it('uses imperial validation limits', () => {
    expect(
      validateTDEEInput({
        ...validInput,
        unit: 'imperial',
        weight: 1,
        height: 19,
      }).errors,
    ).toEqual([
      'น้ำหนักต้องอยู่ระหว่าง 2-1099 lb',
      'ส่วนสูงต้องอยู่ระหว่าง 20-119 in',
    ])
  })

  it('returns Thai height error', () => {
    expect(validateTDEEInput({ ...validInput, height: 300 }).errors).toContain(
      'ส่วนสูงต้องอยู่ระหว่าง 50-299 cm',
    )
  })
})

describe('TDEE property-based checks', () => {
  it('BMR is deterministic for identical inputs', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 1, max: 499, noNaN: true }),
        fc.float({ min: 50, max: 299, noNaN: true }),
        fc.integer({ min: 1, max: 120 }),
        fc.constantFrom('male', 'female'),
        (weight, height, age, gender) => {
          expect(calculateBMR(weight, height, age, gender)).toBe(
            calculateBMR(weight, height, age, gender),
          )
        },
      ),
    )
  })

  it('TDEE is always greater than or equal to BMR for configured factors', () => {
    fc.assert(
      fc.property(fc.float({ min: 1, max: 3000, noNaN: true }), (bmr) => {
        ACTIVITY_LEVELS.forEach((activity) => {
          expect(calculateTDEE(bmr, activity.factor)).toBeGreaterThanOrEqual(bmr)
        })
      }),
    )
  })

  it('calculateMacros does not mutate input', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 10000 }), (tdee) => {
        const original = tdee
        calculateMacros(tdee)
        expect(tdee).toBe(original)
      }),
    )
  })

  it('macro ratios add up to approximately 100%', () => {
    const total =
      MACRO_RATIOS.protein + MACRO_RATIOS.carbs + MACRO_RATIOS.fat

    expect(total).toBeCloseTo(1)
  })

  it('validateTDEEInput does not mutate the input object', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 120 }), (age) => {
        const input = { ...validInput, age }
        const original = { ...input }
        validateTDEEInput(input)
        expect(input).toEqual(original)
      }),
    )
  })
})
