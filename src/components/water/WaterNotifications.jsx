import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

function WaterNotifications({ enabled, onToggle, progress, remainingWater }) {
  const { t } = useLanguage();
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        onToggle(true);
        showNotification(
          t(translations.water.notifications.enabled),
          t(translations.water.notifications.enabledMessage),
        );
      }
    }
  };

  const showNotification = (title, body) => {
    if (permission === "granted" && enabled) {
      new Notification(title, {
        body,
        icon: "💧",
        badge: "💧",
      });
    }
  };

  // ตั้งเวลาแจ้งเตือนทุก 2 ชั่วโมง
  useEffect(() => {
    if (!enabled || permission !== "granted") return;

    const interval = setInterval(
      () => {
        if (progress < 100) {
          showNotification(
            t(translations.water.notifications.reminder),
            t(translations.water.notifications.reminderMessage).replace(
              "{amount}",
              remainingWater.toLocaleString(),
            ),
          );
        }
      },
      2 * 60 * 60 * 1000,
    ); // 2 ชั่วโมง

    return () => clearInterval(interval);
  }, [enabled, permission, progress, remainingWater, t]);

  // แจ้งเตือนเมื่อถึงเป้าหมาย
  useEffect(() => {
    if (enabled && permission === "granted" && progress >= 100) {
      showNotification(
        t(translations.water.notifications.goalReached),
        t(translations.water.notifications.goalReachedMessage),
      );
    }
  }, [progress, enabled, permission, t]);

  return (
    <div className="water-notifications">
      <div className="water-notifications__header">
        <div className="water-notifications__info">
          <h4>{t(translations.water.notifications.title)}</h4>
          <p>{t(translations.water.notifications.description)}</p>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={enabled && permission === "granted"}
            onChange={(e) => {
              if (e.target.checked && permission !== "granted") {
                requestPermission();
              } else {
                onToggle(e.target.checked);
              }
            }}
          />
          <span className="toggle-switch__slider"></span>
        </label>
      </div>

      {permission === "denied" && (
        <div className="water-notifications__warning">
          <span className="warning-icon">⚠️</span>
          <p>{t(translations.water.notifications.permissionDenied)}</p>
        </div>
      )}

      {enabled && permission === "granted" && (
        <div className="water-notifications__status">
          <span className="status-icon">✅</span>
          <p>{t(translations.water.notifications.active)}</p>
        </div>
      )}
    </div>
  );
}

export default WaterNotifications;
