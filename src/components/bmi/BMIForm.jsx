import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useProfile } from "../../contexts/ProfileContext";
import { translations } from "../../translations";
import InputField from "../ui/InputField.jsx";
import { validateInput } from "../../utils/bmiCalculator.js";

function BMIForm({ onCalculate }) {
  const { profile, updateProfile } = useProfile();
  const [weight, setWeight] = useState(profile.weight ?? "");
  const [height, setHeight] = useState(profile.height ?? "");
  const [errors, setErrors] = useState([]);
  const { t } = useLanguage();

  // Keep fields in sync when profile changes from Profile page
  useEffect(() => {
    setWeight((prev) => (prev === "" ? (profile.weight ?? "") : prev));
    setHeight((prev) => (prev === "" ? (profile.height ?? "") : prev));
  }, [profile.weight, profile.height]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const validation = validateInput(parsedWeight, parsedHeight);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    // Save weight/height back to profile so TDEE gets it too
    updateProfile({ weight, height });
    onCalculate(parsedWeight, parsedHeight);
  };

  return (
    <form className="bmi-form" onSubmit={handleSubmit} noValidate>
      <InputField
        id="weight"
        label={t(translations.bmi.weight)}
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
        min="1"
        max="499"
        step="0.1"
        placeholder={t(translations.bmi.weightPlaceholder)}
      />
      <InputField
        id="height"
        label={t(translations.bmi.height)}
        value={height}
        onChange={(event) => setHeight(event.target.value)}
        min="1"
        max="299"
        step="0.1"
        placeholder={t(translations.bmi.heightPlaceholder)}
      />
      {errors.length > 0 && (
        <div className="form-errors" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <button className="primary-button" type="submit">
        {t(translations.bmi.calculate)}
      </button>
    </form>
  );
}

export default BMIForm;

