import { NUTRITION_LIMITS } from './constants.js'

export const NUTRITION_NUMERIC_FIELDS = [
  'calories',
  'serving_size_g',
  'fat_total_g',
  'fat_saturated_g',
  'protein_g',
  'sodium_mg',
  'potassium_mg',
  'cholesterol_mg',
  'carbohydrates_total_g',
  'fiber_g',
  'sugar_g',
]

export function normalizeNutritionItem(item) {
  return {
    name: item.name || 'Unknown food',
    calories: toNumber(item.calories),
    serving_size_g: toNumber(item.serving_size_g),
    fat_total_g: toNumber(item.fat_total_g),
    fat_saturated_g: toNumber(item.fat_saturated_g),
    protein_g: toNumber(item.protein_g),
    sodium_mg: toNumber(item.sodium_mg),
    potassium_mg: toNumber(item.potassium_mg),
    cholesterol_mg: toNumber(item.cholesterol_mg),
    carbohydrates_total_g: toNumber(item.carbohydrates_total_g),
    fiber_g: toNumber(item.fiber_g),
    sugar_g: toNumber(item.sugar_g),
  }
}

export function calculateNutritionSummary(items) {
  return items.reduce(
    (summary, item) => ({
      calories: summary.calories + item.calories,
      serving_size_g: summary.serving_size_g + item.serving_size_g,
      protein_g: summary.protein_g + item.protein_g,
      carbohydrates_total_g:
        summary.carbohydrates_total_g + item.carbohydrates_total_g,
      fat_total_g: summary.fat_total_g + item.fat_total_g,
      sugar_g: summary.sugar_g + item.sugar_g,
      sodium_mg: summary.sodium_mg + item.sodium_mg,
    }),
    createEmptyNutritionSummary(),
  )
}

export function createEmptyNutritionSummary() {
  return {
    calories: 0,
    serving_size_g: 0,
    protein_g: 0,
    carbohydrates_total_g: 0,
    fat_total_g: 0,
    sugar_g: 0,
    sodium_mg: 0,
  }
}

export function validateNutritionQuery(query) {
  const errors = []
  const trimmed = query.trim()

  if (trimmed.length < NUTRITION_LIMITS.queryMinLength) {
    errors.push('กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร')
  }

  if (trimmed.length > NUTRITION_LIMITS.queryMaxLength) {
    errors.push('คำค้นหาต้องไม่เกิน 180 ตัวอักษร')
  }

  return { isValid: errors.length === 0, errors }
}

export function formatNutrientValue(value, unit) {
  const number = Number(value)

  if (!Number.isFinite(number)) {
    return '-'
  }

  return `${roundNutrient(number).toLocaleString()} ${unit}`
}

export function roundNutrient(value) {
  if (Math.abs(value) >= 100) {
    return Math.round(value)
  }

  return Math.round(value * 10) / 10
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}
