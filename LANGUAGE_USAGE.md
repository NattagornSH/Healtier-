# วิธีใช้งานระบบสลับภาษา (Language Toggle System)

## ภาพรวม

ระบบสลับภาษาได้ถูกเพิ่มเข้ามาในโปรเจกต์แล้ว โดยมีปุ่มสลับภาษา TH/EN อยู่ที่ Navbar

## ไฟล์ที่เกี่ยวข้อง

1. **Context**: `/src/contexts/LanguageContext.jsx` - จัดการ state ของภาษา
2. **Translations**: `/src/translations/index.js` - เก็บข้อความแปลทั้งหมด
3. **Components**:
   - `/src/components/layout/Navbar.jsx` - มีปุ่มสลับภาษา
   - `/src/components/layout/Footer.jsx` - รองรับการแปลภาษา

## วิธีใช้งานในคอมโพเนนต์

### 1. Import Hook และ Translations

```jsx
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
```

### 2. ใช้งาน Hook

```jsx
function MyComponent() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div>
      <h1>{t(translations.bmi.title)}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

### 3. เพิ่มคำแปลใหม่

แก้ไขไฟล์ `/src/translations/index.js`:

```javascript
export const translations = {
  // เพิ่มส่วนใหม่
  mySection: {
    title: {
      th: "หัวข้อภาษาไทย",
      en: "English Title",
    },
    description: {
      th: "คำอธิบายภาษาไทย",
      en: "English Description",
    },
  },
};
```

## คุณสมบัติ

- ✅ สลับภาษาระหว่าง ไทย (TH) และ อังกฤษ (EN)
- ✅ บันทึกภาษาที่เลือกใน localStorage (จำค่าเมื่อรีเฟรชหน้า)
- ✅ ปุ่มสลับภาษาที่สวยงามตามดีไซน์ของโปรเจกต์
- ✅ Responsive design (รองรับมือถือ)
- ✅ Navbar และ Footer รองรับการแปลภาษาแล้ว

## ขั้นตอนต่อไป

เพื่อให้ระบบสลับภาษาทำงานได้เต็มรูปแบบ คุณต้อง:

1. เพิ่มคำแปลในไฟล์ `/src/translations/index.js` สำหรับทุกหน้า
2. อัปเดตคอมโพเนนต์ต่างๆ ให้ใช้ `useLanguage()` hook
3. แทนที่ข้อความที่เขียนตายตัวด้วย `t(translations.section.key)`

## ตัวอย่างการใช้งานในหน้า BMI

```jsx
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

function BMIPage() {
  const { t } = useLanguage();

  return (
    <div className="bmi-page">
      <div className="bmi-page__intro">
        <h1>{t(translations.bmi.title)}</h1>
        <p>{t(translations.bmi.description)}</p>
      </div>

      <div className="bmi-form">
        <label>{t(translations.bmi.height)}</label>
        <input type="number" />

        <label>{t(translations.bmi.weight)}</label>
        <input type="number" />

        <button>{t(translations.bmi.calculate)}</button>
      </div>
    </div>
  );
}
```

## หมายเหตุ

- ภาษาเริ่มต้นคือ ไทย (th)
- ภาษาที่เลือกจะถูกบันทึกใน localStorage
- ถ้าไม่มีคำแปลสำหรับภาษาที่เลือก จะใช้ภาษาไทยเป็นค่าเริ่มต้น
