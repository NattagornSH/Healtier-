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

function EnergyCard({ title, value, unitLabel, status, color }) {
  return (
    <section
      className="result-card energy-card"
      style={{ '--category-color': color }}
      aria-label={title}
    >
      <p className="result-card__title">{title}</p>
      <strong className="result-card__value energy-card__value" aria-hidden="true">
        <span>{value.toLocaleString()}</span>
        <small>{unitLabel}</small>
      </strong>
      <span className="sr-only">{`${value.toLocaleString()} ${unitLabel}`}</span>
      <span className="result-card__status">{status}</span>
    </section>
  )
}

function TDEEResult({ result, unit, onReset }) {
  return (
    <section className="tdee-result" aria-label="ผลลัพธ์ TDEE">
      <div className="tdee-result__cards">
        <EnergyCard
          title="BMR"
          value={result.bmr}
          unitLabel="kcal/day"
          status="พลังงานพื้นฐานต่อวัน"
          color="var(--color-bmr)"
        />
        <EnergyCard
          title="TDEE"
          value={result.tdee}
          unitLabel="kcal/day"
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
