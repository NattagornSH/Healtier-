import ResultCard from '../ui/ResultCard.jsx'
import { formatNutrientValue } from '../../utils/nutritionCalculator.js'

const SUMMARY_ITEMS = [
  { key: 'serving_size_g', label: 'ปริมาณรวม', unit: 'g' },
  { key: 'protein_g', label: 'โปรตีน', unit: 'g' },
  { key: 'carbohydrates_total_g', label: 'คาร์บ', unit: 'g' },
  { key: 'fat_total_g', label: 'ไขมัน', unit: 'g' },
  { key: 'sugar_g', label: 'น้ำตาล', unit: 'g' },
  { key: 'sodium_mg', label: 'โซเดียม', unit: 'mg' },
]

function NutritionSummary({ summary }) {
  return (
    <section className="nutrition-summary" aria-label="Nutrition summary">
      <ResultCard
        title="Total calories"
        value={formatNutrientValue(summary.calories, 'kcal')}
        status="พลังงานรวมจากคำค้นหา"
        color="var(--color-calories)"
      />

      <div className="nutrition-summary__grid">
        {SUMMARY_ITEMS.map((item) => (
          <div key={item.key} className="nutrition-summary__metric">
            <span>{item.label}</span>
            <strong>{formatNutrientValue(summary[item.key], item.unit)}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NutritionSummary
