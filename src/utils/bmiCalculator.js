import { BMI_CATEGORIES, BMI_LIMITS } from './constants.js'

export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100
  return weightKg / (heightM * heightM)
}

export function getBMICategory(bmi) {
  if (bmi < 18.5) return BMI_CATEGORIES[0]
  if (bmi < 25.0) return BMI_CATEGORIES[1]
  if (bmi < 30.0) return BMI_CATEGORIES[2]
  return BMI_CATEGORIES[3]
}

export function validateInput(weight, height) {
  const errors = []

  if (!weight || weight <= 0 || weight >= 500) {
    errors.push('น้ำหนักต้องอยู่ระหว่าง 1-499 kg')
  }

  if (!height || height <= 0 || height >= 300) {
    errors.push('ส่วนสูงต้องอยู่ระหว่าง 1-299 cm')
  }

  return { isValid: errors.length === 0, errors }
}

export function calculateScalePosition(bmi) {
  const { scaleMin, scaleMax } = BMI_LIMITS
  const clamped = Math.max(scaleMin, Math.min(scaleMax, bmi))
  return ((clamped - scaleMin) / (scaleMax - scaleMin)) * 100
}
