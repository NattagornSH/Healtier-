import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import { MACRO_RATIOS } from "../../utils/constants.js";

const MACRO_ITEMS = [
  { key: "protein", color: "var(--color-protein)" },
  { key: "carbs", color: "var(--color-carbs)" },
  { key: "fat", color: "var(--color-macro-fat)" },
];

function MacroBreakdown({ macros }) {
  const { t } = useLanguage();

  return (
    <section className="macro-breakdown" aria-label="Macro breakdown">
      {MACRO_ITEMS.map((item) => (
        <div
          key={item.key}
          className="macro-card"
          style={{ "--macro-color": item.color }}
        >
          <span>{t(translations.tdee[item.key])}</span>
          <strong>{macros[item.key]} g</strong>
          <small>{Math.round(MACRO_RATIOS[item.key] * 100)}%</small>
        </div>
      ))}
    </section>
  );
}

function EnergyCard({ title, value, unitLabel, status, color }) {
  return (
    <section
      className="result-card energy-card"
      style={{ "--category-color": color }}
      aria-label={title}
    >
      <p className="result-card__title">{title}</p>
      <strong
        className="result-card__value energy-card__value"
        aria-hidden="true"
      >
        <span>{value.toLocaleString()}</span>
        <small>{unitLabel}</small>
      </strong>
      <span className="sr-only">{`${value.toLocaleString()} ${unitLabel}`}</span>
      <span className="result-card__status">{status}</span>
    </section>
  );
}

function TDEEResult({ result, unit, onReset }) {
  const { t } = useLanguage();

  return (
    <section
      className="tdee-result"
      aria-label={t(translations.tdee.tdeeTitle)}
    >
      <div className="tdee-result__cards">
        <EnergyCard
          title={t(translations.tdee.bmrTitle)}
          value={result.bmr}
          unitLabel="kcal/day"
          status={t(translations.tdee.bmrStatus)}
          color="var(--color-bmr)"
        />
        <EnergyCard
          title={t(translations.tdee.tdeeTitle)}
          value={result.tdee}
          unitLabel="kcal/day"
          status={`${t(translations.tdee.tdeeStatus)} (${unit === "imperial" ? "imperial" : "metric"})`}
          color="var(--color-tdee)"
        />
      </div>
      <MacroBreakdown macros={result.macros} />
      <button className="secondary-button" type="button" onClick={onReset}>
        {t(translations.tdee.reset)}
      </button>
    </section>
  );
}

export { MacroBreakdown };
export default TDEEResult;
