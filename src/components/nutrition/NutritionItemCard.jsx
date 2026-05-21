import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import NutrientRow from "./NutrientRow.jsx";
import { formatNutrientValue } from "../../utils/nutritionCalculator.js";

const DETAIL_FIELDS = [
  { key: "fat_saturated_g", translationKey: "saturatedFat", unit: "g" },
  { key: "fiber_g", translationKey: "fiber", unit: "g" },
  { key: "sugar_g", translationKey: "sugar", unit: "g" },
  { key: "sodium_mg", translationKey: "sodium", unit: "mg" },
  { key: "potassium_mg", translationKey: "potassium", unit: "mg" },
  { key: "cholesterol_mg", translationKey: "cholesterol", unit: "mg" },
];

function NutritionItemCard({ item }) {
  const { t } = useLanguage();

  return (
    <article className="nutrition-item-card">
      <div className="nutrition-item-card__header">
        <div>
          <p className="eyebrow">{t(translations.nutrition.foodItemEyebrow)}</p>
          <h2>{item.name}</h2>
        </div>
        <strong>{formatNutrientValue(item.calories, "kcal")}</strong>
      </div>

      <div className="nutrition-item-card__serving">
        {formatNutrientValue(item.serving_size_g, "g")}{" "}
        {t(translations.nutrition.serving)}
      </div>

      <div className="nutrition-macro-chips" aria-label="Macro nutrients">
        <span className="nutrition-chip nutrition-chip--protein">
          {t(translations.nutrition.protein)}{" "}
          {formatNutrientValue(item.protein_g, "g")}
        </span>
        <span className="nutrition-chip nutrition-chip--carbs">
          {t(translations.nutrition.carbs)}{" "}
          {formatNutrientValue(item.carbohydrates_total_g, "g")}
        </span>
        <span className="nutrition-chip nutrition-chip--fat">
          {t(translations.nutrition.fat)}{" "}
          {formatNutrientValue(item.fat_total_g, "g")}
        </span>
      </div>

      <div className="nutrition-item-card__details">
        {DETAIL_FIELDS.map((field) => (
          <NutrientRow
            key={field.key}
            label={t(translations.nutrition[field.translationKey])}
            value={item[field.key]}
            unit={field.unit}
          />
        ))}
      </div>
    </article>
  );
}

export default NutritionItemCard;
