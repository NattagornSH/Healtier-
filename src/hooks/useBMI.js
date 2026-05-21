import { useCallback, useState } from 'react'
import {
  calculateBMI,
  getBMICategory,
  validateInput,
} from '../utils/bmiCalculator.js'

function useBMI() {
  const [bmi, setBMI] = useState(null)
  const [category, setCategory] = useState(null)

  const calculate = useCallback((weight, height) => {
    const { isValid, errors } = validateInput(weight, height)

    if (!isValid) {
      throw new Error(errors.join(', '))
    }

    const bmiValue = calculateBMI(weight, height)
    setBMI(bmiValue)
    setCategory(getBMICategory(bmiValue))
  }, [])

  return { bmi, category, calculate }
}

export default useBMI
