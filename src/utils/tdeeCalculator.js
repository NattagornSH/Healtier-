import {
  ACTIVITY_LEVELS,
  CALORIES_PER_GRAM,
  CONVERSION,
  IMPERIAL_LIMITS,
  MACRO_RATIOS,
  TDEE_LIMITS,
} from './constants.js'

export function calculateBMR(weightKg, heightCm, age, gender) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

export function calculateTDEE(bmr, activityFactor) {
  return bmr * activityFactor
}

export function calculateMacros(tdee) {
  return {
    protein: Math.round((tdee * MACRO_RATIOS.protein) / CALORIES_PER_GRAM.protein),
    fat: Math.round((tdee * MACRO_RATIOS.fat) / CALORIES_PER_GRAM.fat),
    carbs: Math.round((tdee * MACRO_RATIOS.carbs) / CALORIES_PER_GRAM.carbs),
  }
}

export function toMetric(weight, height, unit) {
  if (unit === 'imperial') {
    return {
      weightKg: weight * CONVERSION.lbToKg,
      heightCm: height * CONVERSION.inToCm,
    }
  }

  return { weightKg: weight, heightCm: height }
}

export function validateTDEEInput(input) {
  const errors = []
  const { age, weight, height, gender, activityLevel, unit } = input
  const limits = unit === 'imperial' ? IMPERIAL_LIMITS : TDEE_LIMITS
  const weightUnit = unit === 'imperial' ? 'lb' : 'kg'
  const heightUnit = unit === 'imperial' ? 'in' : 'cm'

  if (!age || age < TDEE_LIMITS.age.min || age > TDEE_LIMITS.age.max) {
    errors.push(
      `อายุต้องอยู่ระหว่าง ${TDEE_LIMITS.age.min}-${TDEE_LIMITS.age.max} ปี`,
    )
  }

  if (!weight || weight < limits.weight.min || weight >= limits.weight.max) {
    errors.push(
      `น้ำหนักต้องอยู่ระหว่าง ${limits.weight.min}-${limits.weight.max - 1} ${weightUnit}`,
    )
  }

  if (!height || height < limits.height.min || height >= limits.height.max) {
    errors.push(
      `ส่วนสูงต้องอยู่ระหว่าง ${limits.height.min}-${limits.height.max - 1} ${heightUnit}`,
    )
  }

  if (!['male', 'female'].includes(gender)) {
    errors.push('กรุณาเลือกเพศ')
  }

  if (!ACTIVITY_LEVELS.find((activity) => activity.key === activityLevel)) {
    errors.push('กรุณาเลือกระดับกิจกรรม')
  }

  return { isValid: errors.length === 0, errors }
}
