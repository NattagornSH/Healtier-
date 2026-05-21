import BMIForm from '../components/bmi/BMIForm.jsx'
import BMIResult from '../components/bmi/BMIResult.jsx'
import CharacterModel from '../components/ui/CharacterModel.jsx'
import useBMI from '../hooks/useBMI.js'

function BMIPage() {
  const { bmi, category, calculate } = useBMI()

  return (
    <div className="bmi-page">
      <section className="bmi-page__workspace feature-shell feature-shell--bmi">
        <div className="feature-shell__content">
          <section className="bmi-page__intro">
            <p className="eyebrow">Health Calculator</p>
            <h1>BMI Calculator</h1>
            <p>
              กรอกน้ำหนักและส่วนสูงเพื่อดูค่า BMI หมวดหมู่สุขภาพ และตัวละครที่ปรับตามผลลัพธ์
            </p>
          </section>

          <div className="insight-strip" aria-label="BMI categories">
            <span>ผอม</span>
            <span>ปกติ</span>
            <span>ท้วม</span>
            <span>25+</span>
          </div>

          <div className="bmi-page__panel">
            <BMIForm onCalculate={calculate} />
          </div>
        </div>

        <div className="feature-shell__visual">
          <div className="bmi-page__visual">
            {bmi && category ? (
              <>
                <CharacterModel category={category.key} />
                <BMIResult bmi={bmi} category={category} />
              </>
            ) : (
              <div className="empty-state">
                <CharacterModel category="normal" />
                <p>ผลลัพธ์จะแสดงตรงนี้หลังคำนวณ</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BMIPage
