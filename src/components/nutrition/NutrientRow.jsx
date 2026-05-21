import { formatNutrientValue } from '../../utils/nutritionCalculator.js'

function NutrientRow({ label, value, unit }) {
  return (
    <div className="nutrient-row">
      <span>{label}</span>
      <strong>{formatNutrientValue(value, unit)}</strong>
    </div>
  )
}

export default NutrientRow
