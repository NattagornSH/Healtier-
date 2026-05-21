export const translations = {
  // Navbar
  navbar: {
    brand: {
      th: "Healthier",
      en: "Healthier",
    },
    bmi: {
      th: "BMI",
      en: "BMI",
    },
    tdee: {
      th: "TDEE",
      en: "TDEE",
    },
    nutrition: {
      th: "โภชนาการ",
      en: "Nutrition",
    },
  },

  // BMI Page
  bmi: {
    eyebrow: {
      th: "Health Calculator",
      en: "Health Calculator",
    },
    title: {
      th: "BMI Calculator",
      en: "BMI Calculator",
    },
    description: {
      th: "กรอกน้ำหนักและส่วนสูงเพื่อดูค่า BMI หมวดหมู่สุขภาพ และตัวละครที่ปรับตามผลลัพธ์",
      en: "Enter your weight and height to see your BMI value, health category, and character that adjusts to your results",
    },
    categories: {
      thin: {
        th: "ผอม",
        en: "Thin",
      },
      normal: {
        th: "ปกติ",
        en: "Normal",
      },
      fat: {
        th: "ท้วม",
        en: "Overweight",
      },
      obese: {
        th: "25+",
        en: "25+",
      },
    },
    weight: {
      th: "น้ำหนัก (kg)",
      en: "Weight (kg)",
    },
    height: {
      th: "ส่วนสูง (cm)",
      en: "Height (cm)",
    },
    weightPlaceholder: {
      th: "เช่น 65",
      en: "e.g. 65",
    },
    heightPlaceholder: {
      th: "เช่น 170",
      en: "e.g. 170",
    },
    calculate: {
      th: "คำนวณ BMI",
      en: "Calculate BMI",
    },
    result: {
      th: "ผลลัพธ์ BMI",
      en: "BMI Result",
    },
    emptyState: {
      th: "ผลลัพธ์จะแสดงตรงนี้หลังคำนวณ",
      en: "Results will appear here after calculation",
    },
    categoryLabels: {
      thin: {
        th: "ผอมเกินไป",
        en: "Underweight",
      },
      normal: {
        th: "ปกติ",
        en: "Normal",
      },
      fat: {
        th: "น้ำหนักเกิน",
        en: "Overweight",
      },
      obese: {
        th: "อ้วน",
        en: "Obese",
      },
    },
    scaleLabel: {
      th: "ตำแหน่ง BMI",
      en: "BMI Position",
    },
  },

  // TDEE Page
  tdee: {
    eyebrow: {
      th: "Energy Calculator",
      en: "Energy Calculator",
    },
    title: {
      th: "TDEE Calculator",
      en: "TDEE Calculator",
    },
    description: {
      th: "คำนวณพลังงานที่ใช้ต่อวันจาก BMR ตามสูตร Mifflin-St Jeor พร้อมสัดส่วนสารอาหารแบบ balanced diet",
      en: "Calculate daily energy expenditure from BMR using Mifflin-St Jeor formula with balanced diet macronutrient ratios",
    },
    insights: {
      bmr: {
        th: "BMR",
        en: "BMR",
      },
      tdee: {
        th: "TDEE",
        en: "TDEE",
      },
      macros: {
        th: "Macros",
        en: "Macros",
      },
    },
    unitLabel: {
      th: "หน่วยวัด",
      en: "Unit System",
    },
    metric: {
      th: "Metric",
      en: "Metric",
    },
    imperial: {
      th: "Imperial",
      en: "Imperial",
    },
    genderLabel: {
      th: "เพศ",
      en: "Gender",
    },
    male: {
      th: "ชาย",
      en: "Male",
    },
    female: {
      th: "หญิง",
      en: "Female",
    },
    age: {
      th: "อายุ (ปี)",
      en: "Age (years)",
    },
    agePlaceholder: {
      th: "เช่น 30",
      en: "e.g. 30",
    },
    weight: {
      th: "น้ำหนัก",
      en: "Weight",
    },
    height: {
      th: "ส่วนสูง",
      en: "Height",
    },
    weightPlaceholderMetric: {
      th: "เช่น 70",
      en: "e.g. 70",
    },
    weightPlaceholderImperial: {
      th: "เช่น 154",
      en: "e.g. 154",
    },
    heightPlaceholderMetric: {
      th: "เช่น 170",
      en: "e.g. 170",
    },
    heightPlaceholderImperial: {
      th: "เช่น 67",
      en: "e.g. 67",
    },
    activityLevel: {
      th: "ระดับกิจกรรม",
      en: "Activity Level",
    },
    activities: {
      sedentary: {
        label: {
          th: "ไม่ค่อยขยับ",
          en: "Sedentary",
        },
        description: {
          th: "นั่งทำงานทั้งวัน แทบไม่ออกกำลังกาย",
          en: "Desk job, little to no exercise",
        },
      },
      light: {
        label: {
          th: "เบาบาง",
          en: "Light",
        },
        description: {
          th: "ออกกำลังกาย 1-3 วัน/สัปดาห์",
          en: "Exercise 1-3 days/week",
        },
      },
      moderate: {
        label: {
          th: "ปานกลาง",
          en: "Moderate",
        },
        description: {
          th: "ออกกำลังกาย 3-5 วัน/สัปดาห์",
          en: "Exercise 3-5 days/week",
        },
      },
      active: {
        label: {
          th: "หนัก",
          en: "Active",
        },
        description: {
          th: "ออกกำลังกาย 6-7 วัน/สัปดาห์",
          en: "Exercise 6-7 days/week",
        },
      },
      very_active: {
        label: {
          th: "หนักมาก",
          en: "Very Active",
        },
        description: {
          th: "ออกกำลังกายหนักวันละ 2 ครั้ง หรืองานใช้แรง",
          en: "Intense exercise twice daily or physical job",
        },
      },
    },
    calculate: {
      th: "คำนวณ TDEE",
      en: "Calculate TDEE",
    },
    emptyState: {
      title: {
        th: "พร้อมคำนวณพลังงานต่อวัน",
        en: "Ready to Calculate Daily Energy",
      },
      description: {
        th: "กรอกข้อมูลให้ครบแล้วผลลัพธ์ BMR, TDEE และ macros จะแสดงตรงนี้",
        en: "Fill in all information and BMR, TDEE, and macros results will appear here",
      },
    },
    bmrTitle: {
      th: "BMR",
      en: "BMR",
    },
    bmrStatus: {
      th: "พลังงานพื้นฐานต่อวัน",
      en: "Basal Metabolic Rate",
    },
    tdeeTitle: {
      th: "TDEE",
      en: "TDEE",
    },
    tdeeStatus: {
      th: "พลังงานที่ใช้ต่อวัน",
      en: "Total Daily Energy Expenditure",
    },
    protein: {
      th: "โปรตีน",
      en: "Protein",
    },
    carbs: {
      th: "คาร์บ",
      en: "Carbs",
    },
    fat: {
      th: "ไขมัน",
      en: "Fat",
    },
    reset: {
      th: "เริ่มใหม่",
      en: "Reset",
    },
  },

  // Nutrition Page
  nutrition: {
    eyebrow: {
      th: "Nutrition API",
      en: "Nutrition API",
    },
    title: {
      th: "Nutrition Lookup",
      en: "Nutrition Lookup",
    },
    description: {
      th: 'ค้นหาข้อมูลโภชนาการจากข้อความอาหาร เช่น "2 eggs and 1 cup rice" แล้วดู calories, macros และสารอาหารสำคัญแบบแยกรายการ',
      en: 'Search nutrition information from food text like "2 eggs and 1 cup rice" and view calories, macros, and key nutrients by item',
    },
    insights: {
      calories: {
        th: "Calories",
        en: "Calories",
      },
      protein: {
        th: "Protein",
        en: "Protein",
      },
      sodium: {
        th: "Sodium",
        en: "Sodium",
      },
    },
    searchLabel: {
      th: "ค้นหาอาหาร",
      en: "Search Food",
    },
    searchPlaceholder: {
      th: "เช่น 2 eggs and 1 cup rice",
      en: "e.g. 2 eggs and 1 cup rice",
    },
    examplesLabel: {
      th: "ตัวอย่างคำค้นหา",
      en: "Example Searches",
    },
    searchButton: {
      th: "ค้นหาโภชนาการ",
      en: "Search Nutrition",
    },
    searching: {
      th: "กำลังค้นหา...",
      en: "Searching...",
    },
    loadingTitle: {
      th: "กำลังค้นหาข้อมูลโภชนาการ...",
      en: "Searching for nutrition information...",
    },
    loadingDescription: {
      th: "ระบบกำลังอ่านรายการอาหารและคำนวณสารอาหารให้",
      en: "System is reading food items and calculating nutrients",
    },
    noResultsTitle: {
      th: "ไม่พบข้อมูลอาหารจากคำค้นหานี้",
      en: "No food data found for this search",
    },
    noResultsDescription: {
      th: "ลองระบุปริมาณหรือใช้ชื่ออาหารเป็นภาษาอังกฤษ เช่น chicken rice",
      en: "Try specifying quantity or use English food names like chicken rice",
    },
    emptyStateTitle: {
      th: "ลองค้นหาเมนูหรือวัตถุดิบ",
      en: "Try searching for dishes or ingredients",
    },
    emptyStateDescription: {
      th: "ตัวอย่างเช่น 100g chicken breast, banana หรือ 1lb brisket and fries",
      en: "For example: 100g chicken breast, banana, or 1lb brisket and fries",
    },
    totalCalories: {
      th: "Total calories",
      en: "Total calories",
    },
    totalCaloriesStatus: {
      th: "พลังงานรวมจากคำค้นหา",
      en: "Total energy from search",
    },
    servingSize: {
      th: "ปริมาณรวม",
      en: "Total Serving",
    },
    protein: {
      th: "โปรตีน",
      en: "Protein",
    },
    carbs: {
      th: "คาร์บ",
      en: "Carbs",
    },
    fat: {
      th: "ไขมัน",
      en: "Fat",
    },
    sugar: {
      th: "น้ำตาล",
      en: "Sugar",
    },
    sodium: {
      th: "โซเดียม",
      en: "Sodium",
    },
    resultsEyebrow: {
      th: "Results",
      en: "Results",
    },
    resultsTitle: {
      th: "รายการอาหารที่พบ",
      en: "Found Food Items",
    },
    clearResults: {
      th: "ล้างผลลัพธ์",
      en: "Clear Results",
    },
    lastQuery: {
      th: "ผลลัพธ์ล่าสุด:",
      en: "Latest results:",
    },
    foodItemEyebrow: {
      th: "Food item",
      en: "Food item",
    },
    serving: {
      th: "serving",
      en: "serving",
    },
    saturatedFat: {
      th: "ไขมันอิ่มตัว",
      en: "Saturated Fat",
    },
    fiber: {
      th: "ใยอาหาร",
      en: "Fiber",
    },
    potassium: {
      th: "โพแทสเซียม",
      en: "Potassium",
    },
    cholesterol: {
      th: "คอเลสเตอรอล",
      en: "Cholesterol",
    },
  },

  // Common
  common: {
    loading: {
      th: "กำลังโหลด...",
      en: "Loading...",
    },
    error: {
      th: "เกิดข้อผิดพลาด",
      en: "Error occurred",
    },
    reset: {
      th: "รีเซ็ต",
      en: "Reset",
    },
  },
};
