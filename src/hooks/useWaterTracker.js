import { useState, useEffect, useCallback } from "react";
import {
  calculateRecommendedWater,
  calculateProgress,
  mlToGlasses,
} from "../utils/waterCalculator";

/**
 * Hook สำหรับจัดการ Water Tracker
 */
function useWaterTracker() {
  const [weight, setWeight] = useState(() => {
    const saved = localStorage.getItem("waterTracker_weight");
    return saved ? parseFloat(saved) : null;
  });

  const [activityLevel, setActivityLevel] = useState(() => {
    return localStorage.getItem("waterTracker_activityLevel") || "moderate";
  });

  const [currentIntake, setCurrentIntake] = useState(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem("waterTracker_intake");
    if (saved) {
      const data = JSON.parse(saved);
      // ถ้าเป็นวันเดียวกัน ใช้ข้อมูลเดิม ไม่งั้นเริ่มใหม่
      if (data.date === today) {
        return data.amount;
      }
    }
    return 0;
  });

  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem("waterTracker_goal");
    return saved ? parseFloat(saved) : null;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("waterTracker_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem("waterTracker_notifications");
    return saved === "true";
  });

  // คำนวณเป้าหมายใหม่เมื่อน้ำหนักหรือระดับกิจกรรมเปลี่ยน
  useEffect(() => {
    if (weight && weight > 0) {
      const recommended = calculateRecommendedWater(weight, activityLevel);
      setGoal(recommended);
      localStorage.setItem("waterTracker_goal", recommended.toString());
      localStorage.setItem("waterTracker_weight", weight.toString());
      localStorage.setItem("waterTracker_activityLevel", activityLevel);
    }
  }, [weight, activityLevel]);

  // บันทึกปริมาณน้ำที่ดื่มลง localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(
      "waterTracker_intake",
      JSON.stringify({ date: today, amount: currentIntake }),
    );
  }, [currentIntake]);

  // บันทึก history
  useEffect(() => {
    localStorage.setItem("waterTracker_history", JSON.stringify(history));
  }, [history]);

  // บันทึกการตั้งค่าการแจ้งเตือน
  useEffect(() => {
    localStorage.setItem(
      "waterTracker_notifications",
      notificationsEnabled.toString(),
    );
  }, [notificationsEnabled]);

  // เพิ่มปริมาณน้ำ
  const addWater = useCallback(
    (amount) => {
      setCurrentIntake((prev) => {
        const newAmount = prev + amount;
        return Math.min(newAmount, goal * 1.5); // จำกัดไม่เกิน 150% ของเป้าหมาย
      });
    },
    [goal],
  );

  // ลดปริมาณน้ำ
  const removeWater = useCallback((amount) => {
    setCurrentIntake((prev) => Math.max(0, prev - amount));
  }, []);

  // รีเซ็ตวันใหม่
  const resetDaily = useCallback(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // บันทึกข้อมูลเมื่อวานลง history
    if (currentIntake > 0) {
      setHistory((prev) => {
        const newHistory = [
          {
            date: yesterday,
            intake: currentIntake,
            goal: goal,
            progress: calculateProgress(currentIntake, goal),
          },
          ...prev.slice(0, 29), // เก็บแค่ 30 วันล่าสุด
        ];
        return newHistory;
      });
    }

    setCurrentIntake(0);
  }, [currentIntake, goal]);

  // ตั้งค่าน้ำหนักและคำนวณเป้าหมาย
  const setWeightAndCalculate = useCallback((newWeight) => {
    setWeight(newWeight);
  }, []);

  // คำนวณความคืบหน้า
  const progress = goal ? calculateProgress(currentIntake, goal) : 0;

  // คำนวณจำนวนแก้ว
  const glassesConsumed = mlToGlasses(currentIntake);
  const glassesGoal = goal ? mlToGlasses(goal) : 0;

  // ตรวจสอบว่าถึงเป้าหมายหรือยัง
  const isGoalReached = progress >= 100;

  // คำนวณน้ำที่เหลือ
  const remainingWater = goal ? Math.max(0, goal - currentIntake) : 0;

  return {
    // State
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

    // Actions
    setWeightAndCalculate,
    setActivityLevel,
    addWater,
    removeWater,
    resetDaily,
    setNotificationsEnabled,
  };
}

export default useWaterTracker;
