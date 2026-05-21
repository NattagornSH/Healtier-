import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import { mlToGlasses } from "../../utils/waterCalculator";

function WaterHistory({ history = [] }) {
  const { t } = useLanguage();

  if (!history || history.length === 0) {
    return (
      <div className="water-history water-history--empty">
        <div className="empty-state">
          <span className="empty-state__icon">📊</span>
          <p>{t(translations.water.history.empty)}</p>
        </div>
      </div>
    );
  }

  // คำนวณสถิติ
  const totalDays = history.length;
  const daysReachedGoal = history.filter((day) => day.progress >= 100).length;
  const averageProgress =
    history.reduce((sum, day) => sum + day.progress, 0) / totalDays;
  const streak = calculateStreak(history);

  return (
    <div className="water-history">
      <div className="water-history__header">
        <h3>{t(translations.water.history.title)}</h3>
        <span className="water-history__subtitle">
          {t(translations.water.history.last30Days)}
        </span>
      </div>

      {/* สถิติสรุป */}
      <div className="water-history__stats">
        <div className="history-stat">
          <div className="history-stat__icon">🔥</div>
          <div className="history-stat__value">{streak}</div>
          <div className="history-stat__label">
            {t(translations.water.history.streak)}
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat__icon">✅</div>
          <div className="history-stat__value">{daysReachedGoal}</div>
          <div className="history-stat__label">
            {t(translations.water.history.daysReached)}
          </div>
        </div>

        <div className="history-stat">
          <div className="history-stat__icon">📈</div>
          <div className="history-stat__value">
            {Math.round(averageProgress)}%
          </div>
          <div className="history-stat__label">
            {t(translations.water.history.average)}
          </div>
        </div>
      </div>

      {/* รายการประวัติ */}
      <div className="water-history__list">
        {history.slice(0, 7).map((day, index) => (
          <div key={index} className="history-item">
            <div className="history-item__date">
              <span className="history-item__day">
                {formatDate(day.date, t)}
              </span>
            </div>
            <div className="history-item__progress">
              <div className="history-item__bar">
                <div
                  className="history-item__fill"
                  style={{
                    width: `${Math.min(day.progress, 100)}%`,
                    background:
                      day.progress >= 100
                        ? "#13a87e"
                        : day.progress >= 75
                          ? "#4facfe"
                          : "#f5576c",
                  }}
                ></div>
              </div>
              <span className="history-item__percentage">{day.progress}%</span>
            </div>
            <div className="history-item__details">
              <span className="history-item__amount">
                {day.intake.toLocaleString()}ml
              </span>
              <span className="history-item__glasses">
                ({mlToGlasses(day.intake)} {t(translations.water.glasses)})
              </span>
            </div>
            {day.progress >= 100 && (
              <div className="history-item__badge">✨</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ฟังก์ชันคำนวณ streak (วันติดต่อกันที่ถึงเป้าหมาย)
function calculateStreak(history) {
  let streak = 0;
  for (const day of history) {
    if (day.progress >= 100) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// ฟังก์ชันแปลงวันที่
function formatDate(dateString, t) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return t(translations.water.history.today);
  } else if (date.toDateString() === yesterday.toDateString()) {
    return t(translations.water.history.yesterday);
  } else {
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
    });
  }
}

export default WaterHistory;
