import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import InputField from "../ui/InputField.jsx";
import ActivitySelector from "./ActivitySelector.jsx";
import { GENDER_OPTIONS } from "../../utils/constants.js";
import { validateTDEEInput } from "../../utils/tdeeCalculator.js";

const emptyForm = {
  age: "",
  gender: "",
  weight: "",
  height: "",
  activityLevel: "",
};

function TDEEForm({ onCalculate, unit, onUnitChange }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState([]);
  const { t } = useLanguage();

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleUnitChange = (nextUnit) => {
    onUnitChange(nextUnit);
    setForm((current) => ({ ...current, weight: "", height: "" }));
    setErrors([]);
  };

  const buildInput = () => ({
    age: parseFloat(form.age),
    gender: form.gender,
    weight: parseFloat(form.weight),
    height: parseFloat(form.height),
    activityLevel: form.activityLevel,
    unit,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const input = buildInput();
    const validation = validateTDEEInput(input);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      onCalculate(input);
      setErrors([]);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const weightUnit = unit === "imperial" ? "lb" : "kg";
  const heightUnit = unit === "imperial" ? "in" : "cm";

  return (
    <form className="tdee-form" onSubmit={handleSubmit} noValidate>
      <div
        className="segmented-control"
        aria-label={t(translations.tdee.unitLabel)}
      >
        <button
          type="button"
          className={
            unit === "metric"
              ? "segmented-control__item active"
              : "segmented-control__item"
          }
          onClick={() => handleUnitChange("metric")}
          aria-pressed={unit === "metric"}
        >
          {t(translations.tdee.metric)}
        </button>
        <button
          type="button"
          className={
            unit === "imperial"
              ? "segmented-control__item active"
              : "segmented-control__item"
          }
          onClick={() => handleUnitChange("imperial")}
          aria-pressed={unit === "imperial"}
        >
          {t(translations.tdee.imperial)}
        </button>
      </div>

      <div
        className="gender-toggle"
        aria-label={t(translations.tdee.genderLabel)}
      >
        {GENDER_OPTIONS.map((gender) => (
          <button
            key={gender.key}
            type="button"
            className={
              form.gender === gender.key
                ? "gender-toggle__item active"
                : "gender-toggle__item"
            }
            onClick={() => updateField("gender", gender.key)}
            aria-pressed={form.gender === gender.key}
          >
            {t(translations.tdee[gender.key])}
          </button>
        ))}
      </div>

      <InputField
        id="tdee-age"
        label={t(translations.tdee.age)}
        value={form.age}
        onChange={(event) => updateField("age", event.target.value)}
        min="1"
        max="120"
        step="1"
        placeholder={t(translations.tdee.agePlaceholder)}
      />
      <InputField
        id="tdee-weight"
        label={`${t(translations.tdee.weight)} (${weightUnit})`}
        value={form.weight}
        onChange={(event) => updateField("weight", event.target.value)}
        min={unit === "imperial" ? "2" : "1"}
        max={unit === "imperial" ? "1099" : "499"}
        step="0.1"
        placeholder={t(
          unit === "imperial"
            ? translations.tdee.weightPlaceholderImperial
            : translations.tdee.weightPlaceholderMetric,
        )}
      />
      <InputField
        id="tdee-height"
        label={`${t(translations.tdee.height)} (${heightUnit})`}
        value={form.height}
        onChange={(event) => updateField("height", event.target.value)}
        min={unit === "imperial" ? "20" : "50"}
        max={unit === "imperial" ? "119" : "299"}
        step="0.1"
        placeholder={t(
          unit === "imperial"
            ? translations.tdee.heightPlaceholderImperial
            : translations.tdee.heightPlaceholderMetric,
        )}
      />

      <ActivitySelector
        value={form.activityLevel}
        onChange={(activityLevel) =>
          updateField("activityLevel", activityLevel)
        }
      />

      {errors.length > 0 && (
        <div className="form-errors" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <button className="primary-button" type="submit">
        {t(translations.tdee.calculate)}
      </button>
    </form>
  );
}

export default TDEEForm;
