import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import { mlToGlasses } from "../../utils/waterCalculator";

function WaterProgress({
  currentIntake = 0,
  goal = 0,
  progress = 0,
  glassesConsumed = 0,
  glassesGoal = 0,
  remainingWater = 0,
}) {
  const { t } = useLanguage();

  // ป้องกัน null/undefined
  const safeCurrentIntake = Number(currentIntake) || 0;
  const safeGoal = Number(goal) || 0;
  const safeProgress = Number(progress) || 0;
  const safeGlassesConsumed = Number(glassesConsumed) || 0;
  const safeGlassesGoal = Number(glassesGoal) || 0;
  const safeRemainingWater = Number(remainingWater) || 0;

  // คำนวณระดับน้ำในแก้ว (animation)
  const waterLevel = Math.min(safeProgress, 100);

  // สีตามความคืบหน้า
  const getProgressColor = () => {
    if (safeProgress >= 100) return "#13a87e"; // เขียว - สำเร็จ
    if (safeProgress >= 75) return "#4facfe"; // ฟ้า - ใกล้ถึง
    if (safeProgress >= 50) return "#f093fb"; // ชมพู - กำลังดี
    if (safeProgress >= 25) return "#f5576c"; // แดง - ต้องเร่ง
    return "#667eea"; // ม่วง - เริ่มต้น
  };

  // Debug
  console.log("WaterProgress props:", {
    currentIntake,
    goal,
    progress,
    glassesConsumed,
    glassesGoal,
    remainingWater,
  });

  return (
    <div className="water-progress">
      {/* แก้วน้ำแอนิเมชั่น */}
      <div className="water-glass">
        <div className="water-glass__container">
          <div
            className="water-glass__fill"
            style={{
              height: `${waterLevel}%`,
              background: getProgressColor(),
            }}
          >
            <div className="water-glass__wave"></div>
          </div>
          <div className="water-glass__label">
            <span className="water-glass__percentage">{safeProgress}%</span>
          </div>
        </div>
        <div className="water-glass__base"></div>
      </div>

      {/* ข้อมูลสถิติ */}
      <div className="water-stats">
        <div className="water-stat-card">
          <div className="water-stat-card__icon">💧</div>
          <div className="water-stat-card__content">
            <div className="water-stat-card__value">
              {safeCurrentIntake.toLocaleString()}
              <span className="water-stat-card__unit">ml</span>
            </div>
            <div className="water-stat-card__label">
              {t(translations.water.consumed)}
            </div>
          </div>
        </div>

        <div className="water-stat-card">
          <div className="water-stat-card__icon">🎯</div>
          <div className="water-stat-card__content">
            <div className="water-stat-card__value">
              {safeGoal.toLocaleString()}
              <span className="water-stat-card__unit">ml</span>
            </div>
            <div className="water-stat-card__label">
              {t(translations.water.goal)}
            </div>
          </div>
        </div>

        <div className="water-stat-card">
          <div className="water-stat-card__icon">🥤</div>
          <div className="water-stat-card__content">
            <div className="water-stat-card__value">
              {safeGlassesConsumed}
              <span className="water-stat-card__unit">
                / {safeGlassesGoal} {t(translations.water.glasses)}
              </span>
            </div>
            <div className="water-stat-card__label">
              {t(translations.water.glassesLabel)}
            </div>
          </div>
        </div>

        {safeRemainingWater > 0 && (
          <div className="water-stat-card water-stat-card--highlight">
            <div className="water-stat-card__icon">⏳</div>
            <div className="water-stat-card__content">
              <div className="water-stat-card__value">
                {safeRemainingWater.toLocaleString()}
                <span className="water-stat-card__unit">ml</span>
              </div>
              <div className="water-stat-card__label">
                {t(translations.water.remaining)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="water-progress-bar">
        <div className="water-progress-bar__track">
          <div
            className="water-progress-bar__fill"
            style={{
              width: `${safeProgress}%`,
              background: getProgressColor(),
            }}
          ></div>
        </div>
        <div className="water-progress-bar__markers">
          {[25, 50, 75, 100].map((marker) => (
            <div
              key={marker}
              className={`water-progress-bar__marker ${
                safeProgress >= marker ? "reached" : ""
              }`}
              style={{ left: `${marker}%` }}
            >
              <span>{marker}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaterProgress;
