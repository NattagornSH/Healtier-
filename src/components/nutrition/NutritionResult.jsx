import NutritionItemCard from './NutritionItemCard.jsx'

function NutritionResult({ items, onReset }) {
  return (
    <section className="nutrition-result" aria-label="Nutrition result">
      <div className="nutrition-result__header">
        <div>
          <p className="eyebrow">Results</p>
          <h2>รายการอาหารที่พบ</h2>
        </div>
        <button className="secondary-button" type="button" onClick={onReset}>
          ล้างผลลัพธ์
        </button>
      </div>

      <div className="nutrition-result__grid">
        {items.map((item, index) => (
          <NutritionItemCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </section>
  )
}

export default NutritionResult
