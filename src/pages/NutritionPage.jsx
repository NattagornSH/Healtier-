import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import NutritionResult from "../components/nutrition/NutritionResult.jsx";
import NutritionSearchForm from "../components/nutrition/NutritionSearchForm.jsx";
import NutritionSummary from "../components/nutrition/NutritionSummary.jsx";
import useNutrition from "../hooks/useNutrition.js";

function NutritionPage() {
  const { items, summary, loading, error, query, noResults, search, reset } =
    useNutrition();
  const { t } = useLanguage();

  return (
    <div className="nutrition-page">
      <section className="nutrition-hero feature-shell feature-shell--nutrition">
        <div className="feature-shell__content">
          <section className="nutrition-page__intro">
            <p className="eyebrow">{t(translations.nutrition.eyebrow)}</p>
            <h1>{t(translations.nutrition.title)}</h1>
            <p>{t(translations.nutrition.description)}</p>
          </section>

          <div className="insight-strip" aria-label="Nutrition metrics">
            <span>{t(translations.nutrition.insights.calories)}</span>
            <span>{t(translations.nutrition.insights.protein)}</span>
            <span>{t(translations.nutrition.insights.sodium)}</span>
          </div>
        </div>

        <section className="nutrition-page__search">
          <NutritionSearchForm
            onSearch={search}
            loading={loading}
            error={error}
          />
        </section>
      </section>

      {loading && (
        <section className="nutrition-state" aria-live="polite">
          <strong>{t(translations.nutrition.loadingTitle)}</strong>
          <p>{t(translations.nutrition.loadingDescription)}</p>
        </section>
      )}

      {!loading && noResults && (
        <section className="nutrition-state" role="status">
          <strong>{t(translations.nutrition.noResultsTitle)}</strong>
          <p>{t(translations.nutrition.noResultsDescription)}</p>
        </section>
      )}

      {!loading && !summary && !noResults && (
        <section className="nutrition-state">
          <strong>{t(translations.nutrition.emptyStateTitle)}</strong>
          <p>{t(translations.nutrition.emptyStateDescription)}</p>
        </section>
      )}

      {summary && (
        <>
          <NutritionSummary summary={summary} />
          <NutritionResult items={items} onReset={reset} />
          <p className="nutrition-page__caption">
            {t(translations.nutrition.lastQuery)} {query}
          </p>
        </>
      )}
    </div>
  );
}

export default NutritionPage;
