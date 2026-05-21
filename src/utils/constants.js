export const BMI_CATEGORIES = [
  { label: 'ผอมเกินไป', key: 'thin', color: '#60a5fa', min: 0, max: 18.5 },
  { label: 'ปกติ', key: 'normal', color: '#4ade80', min: 18.5, max: 25 },
  { label: 'น้ำหนักเกิน', key: 'fat', color: '#fb923c', min: 25, max: 30 },
  { label: 'อ้วน', key: 'obese', color: '#f87171', min: 30, max: Infinity },
]

export const BMI_LIMITS = {
  weight: { min: 1, max: 499 },
  height: { min: 1, max: 299 },
  scaleMin: 15,
  scaleMax: 35,
}

export const CATEGORY_KEYS = BMI_CATEGORIES.map((category) => category.key)

export const ACTIVITY_LEVELS = [
  {
    key: 'sedentary',
    label: 'ไม่ค่อยขยับ',
    description: 'นั่งทำงานทั้งวัน แทบไม่ออกกำลังกาย',
    factor: 1.2,
  },
  {
    key: 'light',
    label: 'เบาบาง',
    description: 'ออกกำลังกาย 1-3 วัน/สัปดาห์',
    factor: 1.375,
  },
  {
    key: 'moderate',
    label: 'ปานกลาง',
    description: 'ออกกำลังกาย 3-5 วัน/สัปดาห์',
    factor: 1.55,
  },
  {
    key: 'active',
    label: 'หนัก',
    description: 'ออกกำลังกาย 6-7 วัน/สัปดาห์',
    factor: 1.725,
  },
  {
    key: 'very_active',
    label: 'หนักมาก',
    description: 'ออกกำลังกายหนักวันละ 2 ครั้ง หรืองานใช้แรง',
    factor: 1.9,
  },
]

export const GENDER_OPTIONS = [
  { key: 'male', label: 'ชาย' },
  { key: 'female', label: 'หญิง' },
]

export const MACRO_RATIOS = {
  protein: 0.25,
  fat: 0.3,
  carbs: 0.45,
}

export const CALORIES_PER_GRAM = {
  protein: 4,
  carbs: 4,
  fat: 9,
}

export const TDEE_LIMITS = {
  age: { min: 1, max: 120 },
  weight: { min: 1, max: 500 },
  height: { min: 50, max: 300 },
}

export const IMPERIAL_LIMITS = {
  weight: { min: 2, max: 1100 },
  height: { min: 20, max: 120 },
}

export const CONVERSION = {
  lbToKg: 0.453592,
  inToCm: 2.54,
}

export const NUTRITION_EXAMPLES = [
  '1lb brisket and fries',
  '2 eggs and 1 cup rice',
  '100g chicken breast',
  'banana and greek yogurt',
]

export const NUTRITION_FIELDS = [
  { key: 'calories', label: 'พลังงาน', unit: 'kcal', group: 'energy' },
  { key: 'serving_size_g', label: 'ปริมาณ', unit: 'g', group: 'serving' },
  { key: 'protein_g', label: 'โปรตีน', unit: 'g', group: 'macro' },
  { key: 'carbohydrates_total_g', label: 'คาร์บ', unit: 'g', group: 'macro' },
  { key: 'fat_total_g', label: 'ไขมันรวม', unit: 'g', group: 'macro' },
  { key: 'fat_saturated_g', label: 'ไขมันอิ่มตัว', unit: 'g', group: 'macro' },
  { key: 'fiber_g', label: 'ใยอาหาร', unit: 'g', group: 'carb' },
  { key: 'sugar_g', label: 'น้ำตาล', unit: 'g', group: 'carb' },
  { key: 'sodium_mg', label: 'โซเดียม', unit: 'mg', group: 'mineral' },
  { key: 'potassium_mg', label: 'โพแทสเซียม', unit: 'mg', group: 'mineral' },
  { key: 'cholesterol_mg', label: 'คอเลสเตอรอล', unit: 'mg', group: 'mineral' },
]

export const NUTRITION_LIMITS = {
  queryMinLength: 2,
  queryMaxLength: 180,
}
