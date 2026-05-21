import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import {
  calculateNutritionSummary,
  formatNutrientValue,
  normalizeNutritionItem,
  validateNutritionQuery,
} from './nutritionCalculator.js'

const cloneableValue = fc.oneof(
  fc.string(),
  fc.double({ noNaN: true }),
  fc.boolean(),
  fc.constant(null),
)

const sampleItem = {
  name: 'rice',
  calories: 130,
  serving_size_g: 100,
  fat_total_g: 0.3,
  fat_saturated_g: 0.1,
  protein_g: 2.7,
  sodium_mg: 1,
  potassium_mg: 35,
  cholesterol_mg: 0,
  carbohydrates_total_g: 28,
  fiber_g: 0.4,
  sugar_g: 0.1,
}

describe('normalizeNutritionItem', () => {
  it('fills missing numeric fields with zero', () => {
    expect(normalizeNutritionItem({ name: 'banana', calories: 89 })).toMatchObject({
      name: 'banana',
      calories: 89,
      protein_g: 0,
      sodium_mg: 0,
    })
  })

  it('preserves item name and handles string numbers', () => {
    expect(
      normalizeNutritionItem({
        name: 'egg',
        calories: '78',
        protein_g: '6.3',
      }),
    ).toMatchObject({
      name: 'egg',
      calories: 78,
      protein_g: 6.3,
    })
  })
})

describe('calculateNutritionSummary', () => {
  it('sums calories, macros, and minerals correctly', () => {
    const summary = calculateNutritionSummary([
      sampleItem,
      { ...sampleItem, name: 'more rice' },
    ])

    expect(summary).toEqual({
      calories: 260,
      serving_size_g: 200,
      protein_g: 5.4,
      carbohydrates_total_g: 56,
      fat_total_g: 0.6,
      sugar_g: 0.2,
      sodium_mg: 2,
    })
  })

  it('returns zero summary for an empty array', () => {
    expect(calculateNutritionSummary([])).toEqual({
      calories: 0,
      serving_size_g: 0,
      protein_g: 0,
      carbohydrates_total_g: 0,
      fat_total_g: 0,
      sugar_g: 0,
      sodium_mg: 0,
    })
  })
})

describe('validateNutritionQuery', () => {
  it('rejects empty and too-short query', () => {
    expect(validateNutritionQuery('').errors).toContain(
      'กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร',
    )
    expect(validateNutritionQuery('a').errors).toContain(
      'กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร',
    )
  })

  it('rejects query longer than 180 characters', () => {
    expect(validateNutritionQuery('a'.repeat(181)).errors).toContain(
      'คำค้นหาต้องไม่เกิน 180 ตัวอักษร',
    )
  })

  it('accepts valid query', () => {
    expect(validateNutritionQuery('2 eggs')).toEqual({
      isValid: true,
      errors: [],
    })
  })
})

describe('formatNutrientValue', () => {
  it('formats finite values and missing values', () => {
    expect(formatNutrientValue(12.34, 'g')).toBe('12.3 g')
    expect(formatNutrientValue(undefined, 'g')).toBe('-')
  })
})

describe('nutrition property-based checks', () => {
  it('summary totals are never negative when items are non-negative', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            calories: fc.float({ min: 0, max: 5000, noNaN: true }),
            serving_size_g: fc.float({ min: 0, max: 5000, noNaN: true }),
            protein_g: fc.float({ min: 0, max: 500, noNaN: true }),
            carbohydrates_total_g: fc.float({ min: 0, max: 500, noNaN: true }),
            fat_total_g: fc.float({ min: 0, max: 500, noNaN: true }),
            sugar_g: fc.float({ min: 0, max: 500, noNaN: true }),
            sodium_mg: fc.float({ min: 0, max: 10000, noNaN: true }),
          }),
          { maxLength: 20 },
        ),
        (items) => {
          const summary = calculateNutritionSummary(items)

          Object.values(summary).forEach((value) => {
            expect(value).toBeGreaterThanOrEqual(0)
          })
        },
      ),
    )
  })

  it('normalizeNutritionItem does not mutate input', () => {
    fc.assert(
      fc.property(fc.dictionary(fc.string(), cloneableValue), (item) => {
        const copy = structuredClone(item)
        normalizeNutritionItem(item)
        expect(item).toEqual(copy)
      }),
    )
  })

  it('calculateNutritionSummary does not mutate input array', () => {
    const items = [sampleItem]
    const copy = structuredClone(items)

    calculateNutritionSummary(items)

    expect(items).toEqual(copy)
  })

  it('normalization is deterministic', () => {
    fc.assert(
      fc.property(fc.dictionary(fc.string(), cloneableValue), (item) => {
        expect(normalizeNutritionItem(item)).toEqual(normalizeNutritionItem(item))
      }),
    )
  })
})
