import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

function WaterControls({ onAdd, onRemove, isGoalReached }) {
  const { t } = useLanguage();

  const quickAmounts = [
    { ml: 100, label: "100ml", icon: "☕" },
    { ml: 250, label: "1 แก้ว", icon: "🥤" },
    { ml: 500, label: "500ml", icon: "🍶" },
    { ml: 1000, label: "1 ลิตร", icon: "💧" },
  ];

  return (
    <div className="water-controls">
      <div className="water-controls__header">
        <h3>{t(translations.water.addWater)}</h3>
        {isGoalReached && (
          <span className="water-controls__badge">
            ✨ {t(translations.water.goalReached)}
          </span>
        )}
      </div>

      <div className="water-controls__buttons">
        {quickAmounts.map((amount) => (
          <button
            key={amount.ml}
            className="water-btn water-btn--add"
            onClick={() => onAdd(amount.ml)}
          >
            <span className="water-btn__icon">{amount.icon}</span>
            <span className="water-btn__label">{amount.label}</span>
            <span className="water-btn__action">+</span>
          </button>
        ))}
      </div>

      <div className="water-controls__divider">
        <span>{t(translations.water.or)}</span>
      </div>

      <div className="water-controls__undo">
        <button
          className="water-btn water-btn--remove"
          onClick={() => onRemove(250)}
        >
          <span className="water-btn__icon">↩️</span>
          <span className="water-btn__label">
            {t(translations.water.undo)} (250ml)
          </span>
        </button>
      </div>
    </div>
  );
}

export default WaterControls;
