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
    const cat = getBMICategory(bmiValue)
    setBMI(bmiValue)
    setCategory(cat)

    // Persist to localStorage so Dashboard can read it
    try {
      localStorage.setItem(
        'healtier_bmi_result',
        JSON.stringify({ bmi: bmiValue, categoryKey: cat?.key, weight, height })
      )
    } catch {
      // ignore storage errors
    }
  }, [])

  return { bmi, category, calculate }
}

export default useBMI
