import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import InputField from "../ui/InputField";

function WaterSetupForm({ onSetup, initialWeight, initialActivity }) {
  const { t } = useLanguage();
  const [weight, setWeight] = useState(initialWeight || "");
  const [activityLevel, setActivityLevel] = useState(
    initialActivity || "moderate",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    if (weightNum > 0) {
      onSetup(weightNum, activityLevel);
    }
  };

  const activities = [
    { value: "sedentary", labelKey: "sedentary" },
    { value: "light", labelKey: "light" },
    { value: "moderate", labelKey: "moderate" },
    { value: "active", labelKey: "active" },
    { value: "very_active", labelKey: "very_active" },
  ];

  return (
    <form onSubmit={handleSubmit} className="water-setup-form">
      <div className="water-setup-form__field">
        <InputField
          label={t(translations.water.weight)}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={t(translations.water.weightPlaceholder)}
          min="1"
          step="0.1"
          required
        />
      </div>

      <div className="water-setup-form__field">
        <label className="water-setup-form__label">
          {t(translations.water.activityLevel)}
        </label>
        <div className="activity-selector-compact">
          {activities.map((activity) => (
            <button
              key={activity.value}
              type="button"
              className={`activity-option-compact ${
                activityLevel === activity.value ? "active" : ""
              }`}
              onClick={() => setActivityLevel(activity.value)}
            >
              <span className="activity-option-compact__label">
                {t(translations.water.activities[activity.labelKey].label)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn--primary btn--full">
        <span className="btn__text">{t(translations.water.calculate)}</span>
      </button>
    </form>
  );
}

export default WaterSetupForm;
