import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import TDEEForm from "../components/tdee/TDEEForm.jsx";
import TDEEResult from "../components/tdee/TDEEResult.jsx";
import useTDEE from "../hooks/useTDEE.js";

function TDEEPage() {
  const { result, unit, setUnit, calculate, reset } = useTDEE();
  const [resetSignal, setResetSignal] = useState(0);
  const { t } = useLanguage();

  const handleReset = () => {
    reset();
    setUnit("metric");
    setResetSignal((current) => current + 1);
  };

  return (
    <div className="tdee-page">
      <section className="tdee-page__workspace feature-shell feature-shell--tdee">
        <div className="feature-shell__content">
          <section className="tdee-page__intro">
            <p className="eyebrow">{t(translations.tdee.eyebrow)}</p>
            <h1>{t(translations.tdee.title)}</h1>
            <p>{t(translations.tdee.description)}</p>
          </section>

          <div className="insight-strip" aria-label="TDEE rhythm">
            <span>{t(translations.tdee.insights.bmr)}</span>
            <span>{t(translations.tdee.insights.tdee)}</span>
            <span>{t(translations.tdee.insights.macros)}</span>
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
                <strong>{t(translations.tdee.emptyState.title)}</strong>
                <p>{t(translations.tdee.emptyState.description)}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TDEEPage;
