import { useCallback, useState } from 'react'
import { ACTIVITY_LEVELS } from '../utils/constants.js'
import {
  calculateBMR,
  calculateMacros,
  calculateTDEE,
  toMetric,
  validateTDEEInput,
} from '../utils/tdeeCalculator.js'

function useTDEE() {
  const [result, setResult] = useState(null)
  const [unit, setUnit] = useState('metric')

  const calculate = useCallback((input) => {
    const { isValid, errors } = validateTDEEInput(input)

    if (!isValid) {
      throw new Error(errors.join(', '))
    }

    const { weightKg, heightCm } = toMetric(input.weight, input.height, input.unit)
    const activityFactor = ACTIVITY_LEVELS.find(
      (activity) => activity.key === input.activityLevel,
    ).factor
    const bmr = calculateBMR(weightKg, heightCm, input.age, input.gender)

    if (bmr <= 0) {
      throw new Error('ข้อมูลที่กรอกไม่สามารถคำนวณ BMR ได้')
    }

    const tdee = calculateTDEE(bmr, activityFactor)
    const macros = calculateMacros(tdee)

    const resultObj = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      macros,
      // flat for easy Dashboard consumption
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
    }

    setResult(resultObj)

    // Persist to localStorage so Dashboard can read it
    try {
      localStorage.setItem('healtier_tdee_result', JSON.stringify(resultObj))
    } catch {
      // ignore storage errors
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
  }, [])

  return { result, unit, setUnit, calculate, reset }
}

export default useTDEE
