import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import NutritionItemCard from "./NutritionItemCard.jsx";

function NutritionResult({ items, onReset }) {
  const { t } = useLanguage();

  return (
    <section className="nutrition-result" aria-label="Nutrition result">
      <div className="nutrition-result__header">
        <div>
          <p className="eyebrow">{t(translations.nutrition.resultsEyebrow)}</p>
          <h2>{t(translations.nutrition.resultsTitle)}</h2>
        </div>
        <button className="secondary-button" type="button" onClick={onReset}>
          {t(translations.nutrition.clearResults)}
        </button>
      </div>

      <div className="nutrition-result__grid">
        {items.map((item, index) => (
          <NutritionItemCard key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </section>
  );
}

export default NutritionResult;
