import NutrientRow from './NutrientRow.jsx'
import { formatNutrientValue } from '../../utils/nutritionCalculator.js'

const DETAIL_FIELDS = [
  { key: 'fat_saturated_g', label: 'ไขมันอิ่มตัว', unit: 'g' },
  { key: 'fiber_g', label: 'ใยอาหาร', unit: 'g' },
  { key: 'sugar_g', label: 'น้ำตาล', unit: 'g' },
  { key: 'sodium_mg', label: 'โซเดียม', unit: 'mg' },
  { key: 'potassium_mg', label: 'โพแทสเซียม', unit: 'mg' },
  { key: 'cholesterol_mg', label: 'คอเลสเตอรอล', unit: 'mg' },
]

function NutritionItemCard({ item }) {
  return (
    <article className="nutrition-item-card">
      <div className="nutrition-item-card__header">
        <div>
          <p className="eyebrow">Food item</p>
          <h2>{item.name}</h2>
        </div>
        <strong>{formatNutrientValue(item.calories, 'kcal')}</strong>
      </div>

      <div className="nutrition-item-card__serving">
        {formatNutrientValue(item.serving_size_g, 'g')} serving
      </div>

      <div className="nutrition-macro-chips" aria-label="Macro nutrients">
        <span className="nutrition-chip nutrition-chip--protein">
          โปรตีน {formatNutrientValue(item.protein_g, 'g')}
        </span>
        <span className="nutrition-chip nutrition-chip--carbs">
          คาร์บ {formatNutrientValue(item.carbohydrates_total_g, 'g')}
        </span>
        <span className="nutrition-chip nutrition-chip--fat">
          ไขมัน {formatNutrientValue(item.fat_total_g, 'g')}
        </span>
      </div>

      <div className="nutrition-item-card__details">
        {DETAIL_FIELDS.map((field) => (
          <NutrientRow
            key={field.key}
            label={field.label}
            value={item[field.key]}
            unit={field.unit}
          />
        ))}
      </div>
    </article>
  )
}

export default NutritionItemCard
