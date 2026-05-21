import ResultCard from '../ui/ResultCard.jsx'
import { MACRO_RATIOS } from '../../utils/constants.js'

const MACRO_ITEMS = [
  { key: 'protein', label: 'โปรตีน', color: 'var(--color-protein)' },
  { key: 'carbs', label: 'คาร์บ', color: 'var(--color-carbs)' },
  { key: 'fat', label: 'ไขมัน', color: 'var(--color-macro-fat)' },
]

function MacroBreakdown({ macros }) {
  return (
    <section className="macro-breakdown" aria-label="Macro breakdown">
      {MACRO_ITEMS.map((item) => (
        <div
          key={item.key}
          className="macro-card"
          style={{ '--macro-color': item.color }}
        >
          <span>{item.label}</span>
          <strong>{macros[item.key]} g</strong>
          <small>{Math.round(MACRO_RATIOS[item.key] * 100)}%</small>
        </div>
      ))}
    </section>
  )
}

function TDEEResult({ result, unit, onReset }) {
  return (
    <section className="tdee-result" aria-label="ผลลัพธ์ TDEE">
      <div className="tdee-result__cards">
        <ResultCard
          title="BMR"
          value={`${result.bmr.toLocaleString()} kcal/day`}
          status="พลังงานพื้นฐานต่อวัน"
          color="var(--color-bmr)"
        />
        <ResultCard
          title="TDEE"
          value={`${result.tdee.toLocaleString()} kcal/day`}
          status={`พลังงานที่ใช้ต่อวัน (${unit === 'imperial' ? 'imperial' : 'metric'})`}
          color="var(--color-tdee)"
        />
      </div>
      <MacroBreakdown macros={result.macros} />
      <button className="secondary-button" type="button" onClick={onReset}>
        เริ่มใหม่
      </button>
    </section>
  )
}

export { MacroBreakdown }
export default TDEEResult
