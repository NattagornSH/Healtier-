import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import ResultCard from "../ui/ResultCard.jsx";
import BMIScale from "./BMIScale.jsx";

function BMIResult({ bmi, category }) {
  const { t } = useLanguage();

  return (
    <div className="bmi-result">
      <ResultCard
        title={t(translations.bmi.result)}
        value={bmi.toFixed(1)}
        status={t(translations.bmi.categoryLabels[category.key])}
        color={category.color}
      />
      <BMIScale currentBMI={bmi} category={category} />
    </div>
  );
}

export default BMIResult;
