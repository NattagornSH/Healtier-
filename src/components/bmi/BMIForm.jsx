import { useState } from 'react'
import InputField from '../ui/InputField.jsx'
import { validateInput } from '../../utils/bmiCalculator.js'

function BMIForm({ onCalculate }) {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [errors, setErrors] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    const parsedWeight = parseFloat(weight)
    const parsedHeight = parseFloat(height)
    const validation = validateInput(parsedWeight, parsedHeight)

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors([])
    onCalculate(parsedWeight, parsedHeight)
  }

  return (
    <form className="bmi-form" onSubmit={handleSubmit} noValidate>
      <InputField
        id="weight"
        label="น้ำหนัก (kg)"
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
        min="1"
        max="499"
        step="0.1"
        placeholder="เช่น 65"
      />
      <InputField
        id="height"
        label="ส่วนสูง (cm)"
        value={height}
        onChange={(event) => setHeight(event.target.value)}
        min="1"
        max="299"
        step="0.1"
        placeholder="เช่น 170"
      />
      {errors.length > 0 && (
        <div className="form-errors" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <button className="primary-button" type="submit">
        คำนวณ BMI
      </button>
    </form>
  )
}

export default BMIForm
