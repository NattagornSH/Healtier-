import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import BMIForm from "../components/bmi/BMIForm.jsx";
import BMIResult from "../components/bmi/BMIResult.jsx";
import CharacterModel from "../components/ui/CharacterModel.jsx";
import useBMI from "../hooks/useBMI.js";

function BMIPage() {
  const { bmi, category, calculate } = useBMI();
  const { t } = useLanguage();

  return (
    <div className="bmi-page">
      <section className="bmi-page__workspace feature-shell feature-shell--bmi">
        <div className="feature-shell__content">
          <section className="bmi-page__intro">
            <p className="eyebrow">{t(translations.bmi.eyebrow)}</p>
            <h1>{t(translations.bmi.title)}</h1>
            <p>{t(translations.bmi.description)}</p>
          </section>

          <div className="insight-strip" aria-label="BMI categories">
            <span>{t(translations.bmi.categories.thin)}</span>
            <span>{t(translations.bmi.categories.normal)}</span>
            <span>{t(translations.bmi.categories.fat)}</span>
            <span>{t(translations.bmi.categories.obese)}</span>
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
                <p>{t(translations.bmi.emptyState)}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BMIPage;
