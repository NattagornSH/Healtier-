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

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      macros: calculateMacros(tdee),
    })
  }, [])

  const reset = useCallback(() => {
    setResult(null)
  }, [])

  return { result, unit, setUnit, calculate, reset }
}

export default useTDEE
