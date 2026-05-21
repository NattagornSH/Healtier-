import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import { ACTIVITY_LEVELS } from "../../utils/constants.js";

function ActivitySelector({ value, onChange }) {
  const { t } = useLanguage();

  return (
    <fieldset className="activity-selector">
      <legend>{t(translations.tdee.activityLevel)}</legend>
      <div className="activity-selector__grid">
        {ACTIVITY_LEVELS.map((activity, index) => (
          <button
            key={activity.key}
            type="button"
            className={`activity-card activity-card--${index + 1} ${
              value === activity.key ? "activity-card--active" : ""
            }`}
            onClick={() => onChange(activity.key)}
            aria-pressed={value === activity.key}
          >
            <span>{t(translations.tdee.activities[activity.key].label)}</span>
            <small>
              {t(translations.tdee.activities[activity.key].description)}
            </small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default ActivitySelector;
