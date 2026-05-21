import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import useWaterTracker from "../hooks/useWaterTracker";
import WaterSetupForm from "../components/water/WaterSetupForm";
import WaterProgress from "../components/water/WaterProgress";
import WaterControls from "../components/water/WaterControls";
import WaterNotifications from "../components/water/WaterNotifications";
import WaterHistory from "../components/water/WaterHistory";
import ErrorBoundary from "../components/ErrorBoundary";
import "./WaterPage.css";

function WaterPage() {
  const { t } = useLanguage();
  const {
    weight,
    activityLevel,
    currentIntake,
    goal,
    progress,
    glassesConsumed,
    glassesGoal,
    isGoalReached,
    remainingWater,
    history,
    notificationsEnabled,
    setWeightAndCalculate,
    setActivityLevel,
    addWater,
    removeWater,
    resetDaily,
    setNotificationsEnabled,
  } = useWaterTracker();

  const [showSetup, setShowSetup] = useState(!weight);

  // ตรวจสอบว่าเป็นวันใหม่หรือไม่
  useEffect(() => {
    const checkNewDay = () => {
      const lastCheck = localStorage.getItem("waterTracker_lastCheck");
      const today = new Date().toDateString();

      if (lastCheck !== today) {
        resetDaily();
        localStorage.setItem("waterTracker_lastCheck", today);
      }
    };

    checkNewDay();
    // ตรวจสอบทุกชั่วโมง
    const interval = setInterval(checkNewDay, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [resetDaily]);

  const handleSetup = (newWeight, newActivityLevel) => {
    console.log("Setup called with:", newWeight, newActivityLevel);
    setWeightAndCalculate(newWeight);
    setActivityLevel(newActivityLevel);
    setShowSetup(false);
  };

  const handleEditSettings = () => {
    setShowSetup(true);
  };

  // Debug: log state changes
  useEffect(() => {
    console.log("Water Tracker State:", {
      weight,
      activityLevel,
      currentIntake,
      goal,
      progress,
      glassesConsumed,
      glassesGoal,
      isGoalReached,
      remainingWater,
    });
  }, [
    weight,
    activityLevel,
    currentIntake,
    goal,
    progress,
    glassesConsumed,
    glassesGoal,
    isGoalReached,
    remainingWater,
  ]);

  return (
    <ErrorBoundary>
      <div className="water-page">
        {/* Hero Section */}
        <section className="feature-shell feature-shell--water">
          <div className="feature-shell__content">
            <section className="water-page__intro">
              <p className="eyebrow">{t(translations.water.eyebrow)}</p>
              <h1>{t(translations.water.title)}</h1>
              <p>{t(translations.water.description)}</p>
            </section>

            <div className="insight-strip" aria-label="Water metrics">
              <span>{t(translations.water.insights.hydration)}</span>
              <span>{t(translations.water.insights.daily)}</span>
              <span>{t(translations.water.insights.health)}</span>
            </div>
          </div>
        </section>

        {/* Setup Form หรือ Tracker */}
        {showSetup ? (
          <section className="water-setup">
            <div className="water-setup__header">
              <h2>{t(translations.water.setupTitle)}</h2>
              <p>{t(translations.water.setupDescription)}</p>
            </div>
            <WaterSetupForm
              onSetup={handleSetup}
              initialWeight={weight}
              initialActivity={activityLevel}
            />
          </section>
        ) : (
          <>
            {/* Progress Section */}
            <section className="water-tracker">
              <div className="water-tracker__header">
                <div>
                  <h2>{t(translations.water.todayProgress)}</h2>
                  <p className="water-tracker__date">
                    {new Date().toLocaleDateString("th-TH", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button
                  className="btn btn--ghost btn--small"
                  onClick={handleEditSettings}
                >
                  ⚙️ {t(translations.water.editSettings)}
                </button>
              </div>

              <WaterProgress
                currentIntake={currentIntake}
                goal={goal}
                progress={progress}
                glassesConsumed={glassesConsumed}
                glassesGoal={glassesGoal}
                remainingWater={remainingWater}
              />

              <WaterControls
                onAdd={addWater}
                onRemove={removeWater}
                isGoalReached={isGoalReached}
              />
            </section>

            {/* Notifications Section */}
            <section className="water-notifications-section">
              <WaterNotifications
                enabled={notificationsEnabled}
                onToggle={setNotificationsEnabled}
                progress={progress}
                remainingWater={remainingWater}
              />
            </section>

            {/* History Section */}
            <section className="water-history-section">
              <WaterHistory history={history} />
            </section>

            {/* Tips Section */}
            <section className="water-tips">
              <h3>{t(translations.water.tips.title)}</h3>
              <div className="water-tips__grid">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="water-tip-card">
                    <div className="water-tip-card__icon">
                      {t(translations.water.tips[`tip${num}`].icon)}
                    </div>
                    <h4 className="water-tip-card__title">
                      {t(translations.water.tips[`tip${num}`].title)}
                    </h4>
                    <p className="water-tip-card__description">
                      {t(translations.water.tips[`tip${num}`].description)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default WaterPage;
