/**
 * คำนวณปริมาณน้ำที่แนะนำต่อวัน (มิลลิลิตร)
 * สูตร: น้ำหนัก (kg) × 30-35 ml
 * @param {number} weight - น้ำหนักในหน่วย kg
 * @param {string} activityLevel - ระดับกิจกรรม
 * @returns {number} ปริมาณน้ำที่แนะนำในหน่วย ml
 */
export function calculateRecommendedWater(weight, activityLevel = "moderate") {
  if (!weight || weight <= 0) return 0;

  // Base calculation: 30-35 ml per kg
  let baseWater = weight * 33; // ค่ากลาง

  // ปรับตามระดับกิจกรรม
  const activityMultipliers = {
    sedentary: 1.0,
    light: 1.1,
    moderate: 1.15,
    active: 1.25,
    very_active: 1.35,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.0;
  const recommendedWater = Math.round(baseWater * multiplier);

  return recommendedWater;
}

/**
 * แปลงมิลลิลิตรเป็นแก้ว (1 แก้ว = 250 ml)
 * @param {number} ml - ปริมาณน้ำในหน่วย ml
 * @returns {number} จำนวนแก้ว
 */
export function mlToGlasses(ml) {
  return Math.round((ml / 250) * 10) / 10;
}

/**
 * แปลงแก้วเป็นมิลลิลิตร
 * @param {number} glasses - จำนวนแก้ว
 * @returns {number} ปริมาณน้ำในหน่วย ml
 */
export function glassesToMl(glasses) {
  return Math.round(glasses * 250);
}

/**
 * คำนวณเปอร์เซ็นต์ความคืบหน้า
 * @param {number} current - ปริมาณน้ำที่ดื่มแล้ว (ml)
 * @param {number} goal - เป้าหมาย (ml)
 * @returns {number} เปอร์เซ็นต์ (0-100)
 */
export function calculateProgress(current, goal) {
  if (!goal || goal <= 0) return 0;
  const progress = (current / goal) * 100;
  return Math.min(Math.round(progress), 100);
}

/**
 * สร้างช่วงเวลาแนะนำสำหรับดื่มน้ำ
 * @param {number} totalGlasses - จำนวนแก้วทั้งหมดที่ควรดื่ม
 * @returns {Array} รายการเวลาที่แนะนำ
 */
export function generateWaterSchedule(totalGlasses) {
  const schedule = [
    { time: "07:00", label: "เช้า", icon: "🌅" },
    { time: "09:00", label: "สาย", icon: "☕" },
    { time: "11:00", label: "เที่ยง", icon: "🌤️" },
    { time: "13:00", label: "บ่าย", icon: "🍽️" },
    { time: "15:00", label: "บ่าย", icon: "💼" },
    { time: "17:00", label: "เย็น", icon: "🌆" },
    { time: "19:00", label: "ค่ำ", icon: "🌙" },
    { time: "21:00", label: "ก่อนนอน", icon: "😴" },
  ];

  // เลือกเฉพาะช่วงเวลาที่จำเป็นตามจำนวนแก้ว
  const glassesPerSlot = Math.ceil(totalGlasses / schedule.length);
  return schedule.slice(0, Math.ceil(totalGlasses / glassesPerSlot));
}
