import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import ResultCard from "../ui/ResultCard.jsx";
import { formatNutrientValue } from "../../utils/nutritionCalculator.js";

const SUMMARY_ITEMS = [
  { key: "serving_size_g", translationKey: "servingSize", unit: "g" },
  { key: "protein_g", translationKey: "protein", unit: "g" },
  { key: "carbohydrates_total_g", translationKey: "carbs", unit: "g" },
  { key: "fat_total_g", translationKey: "fat", unit: "g" },
  { key: "sugar_g", translationKey: "sugar", unit: "g" },
  { key: "sodium_mg", translationKey: "sodium", unit: "mg" },
];

function NutritionSummary({ summary }) {
  const { t } = useLanguage();

  return (
    <section className="nutrition-summary" aria-label="Nutrition summary">
      <ResultCard
        title={t(translations.nutrition.totalCalories)}
        value={formatNutrientValue(summary.calories, "kcal")}
        status={t(translations.nutrition.totalCaloriesStatus)}
        color="var(--color-calories)"
      />

      <div className="nutrition-summary__grid">
        {SUMMARY_ITEMS.map((item) => (
          <div key={item.key} className="nutrition-summary__metric">
            <span>{t(translations.nutrition[item.translationKey])}</span>
            <strong>{formatNutrientValue(summary[item.key], item.unit)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NutritionSummary;
