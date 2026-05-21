import { useState } from 'react'
import TDEEForm from '../components/tdee/TDEEForm.jsx'
import TDEEResult from '../components/tdee/TDEEResult.jsx'
import useTDEE from '../hooks/useTDEE.js'

function TDEEPage() {
  const { result, unit, setUnit, calculate, reset } = useTDEE()
  const [resetSignal, setResetSignal] = useState(0)

  const handleReset = () => {
    reset()
    setUnit('metric')
    setResetSignal((current) => current + 1)
  }

  return (
    <div className="tdee-page">
      <section className="tdee-page__workspace feature-shell feature-shell--tdee">
        <div className="feature-shell__content">
          <section className="tdee-page__intro">
            <p className="eyebrow">Energy Calculator</p>
            <h1>TDEE Calculator</h1>
            <p>
              คำนวณพลังงานที่ใช้ต่อวันจาก BMR ตามสูตร Mifflin-St Jeor
              พร้อมสัดส่วนสารอาหารแบบ balanced diet
            </p>
          </section>

          <div className="insight-strip" aria-label="TDEE rhythm">
            <span>BMR</span>
            <span>TDEE</span>
            <span>Macros</span>
          </div>

          <div className="tdee-page__panel">
            <TDEEForm
              key={resetSignal}
              onCalculate={calculate}
              unit={unit}
              onUnitChange={setUnit}
            />
          </div>
        </div>

        <div className="feature-shell__visual">
          <div className="tdee-page__summary">
            {result ? (
              <TDEEResult result={result} unit={unit} onReset={handleReset} />
            ) : (
              <div className="empty-state tdee-empty">
                <strong>พร้อมคำนวณพลังงานต่อวัน</strong>
                <p>กรอกข้อมูลให้ครบแล้วผลลัพธ์ BMR, TDEE และ macros จะแสดงตรงนี้</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default TDEEPage
