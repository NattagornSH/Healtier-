import NutritionResult from '../components/nutrition/NutritionResult.jsx'
import NutritionSearchForm from '../components/nutrition/NutritionSearchForm.jsx'
import NutritionSummary from '../components/nutrition/NutritionSummary.jsx'
import useNutrition from '../hooks/useNutrition.js'

function NutritionPage() {
  const { items, summary, loading, error, query, noResults, search, reset } =
    useNutrition()

  return (
    <div className="nutrition-page">
      <section className="nutrition-hero feature-shell feature-shell--nutrition">
        <div className="feature-shell__content">
          <section className="nutrition-page__intro">
            <p className="eyebrow">Nutrition API</p>
            <h1>Nutrition Lookup</h1>
            <p>
              ค้นหาข้อมูลโภชนาการจากข้อความอาหาร เช่น "2 eggs and 1 cup rice"
              แล้วดู calories, macros และสารอาหารสำคัญแบบแยกรายการ
            </p>
          </section>

          <div className="insight-strip" aria-label="Nutrition metrics">
            <span>Calories</span>
            <span>Protein</span>
            <span>Sodium</span>
          </div>
        </div>

        <section className="nutrition-page__search">
          <NutritionSearchForm onSearch={search} loading={loading} error={error} />
        </section>
      </section>

      {loading && (
        <section className="nutrition-state" aria-live="polite">
          <strong>กำลังค้นหาข้อมูลโภชนาการ...</strong>
          <p>ระบบกำลังอ่านรายการอาหารและคำนวณสารอาหารให้</p>
        </section>
      )}

      {!loading && noResults && (
        <section className="nutrition-state" role="status">
          <strong>ไม่พบข้อมูลอาหารจากคำค้นหานี้</strong>
          <p>ลองระบุปริมาณหรือใช้ชื่ออาหารเป็นภาษาอังกฤษ เช่น chicken rice</p>
        </section>
      )}

      {!loading && !summary && !noResults && (
        <section className="nutrition-state">
          <strong>ลองค้นหาเมนูหรือวัตถุดิบ</strong>
          <p>ตัวอย่างเช่น 100g chicken breast, banana หรือ 1lb brisket and fries</p>
        </section>
      )}

      {summary && (
        <>
          <NutritionSummary summary={summary} />
          <NutritionResult items={items} onReset={reset} />
          <p className="nutrition-page__caption">ผลลัพธ์ล่าสุด: {query}</p>
        </>
      )}
    </div>
  )
}

export default NutritionPage
