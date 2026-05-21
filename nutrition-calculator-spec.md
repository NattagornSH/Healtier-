# Nutrition Lookup — Project Spec (Extension)

> ต่อยอดจาก Health Calculator App เดิมในโปรเจกต์เดียวกัน  
> Status ปัจจุบัน: BMI Calculator ✅ Done, TDEE Calculator ✅ Done  
> Stack เดิม: React 18 + Vite 5 + React Router 6 + Plain CSS + CSS Variables + Vitest

---

## Overview

หน้า Nutrition Lookup ใช้ API จาก API Ninjas เพื่อแปลงข้อความอาหารแบบ natural language เป็นข้อมูลโภชนาการ เช่น calories, serving size, fat, protein, carbs, sodium, potassium, cholesterol, fiber และ sugar

API หลักที่ใช้:

```txt
GET https://api.api-ninjas.com/v1/nutrition
```

ตัวอย่าง query:

```txt
1lb brisket and fries
2 eggs and 1 cup rice
100g chicken breast
banana and greek yogurt
```

API จะคืนค่าเป็น JSON array โดยแต่ละ object คือข้อมูลโภชนาการของ food item ที่ extract ได้จากข้อความ

---

## Important API Notes

API Ninjas ต้องใช้ API key ผ่าน header:

```txt
X-Api-Key: YOUR_API_KEY
```

ห้าม hardcode API key ใน source code หรือ commit ลง Git

สำหรับ production ควรเรียกผ่าน serverless function/proxy เช่น:

```txt
Frontend React -> /api/nutrition?query=...
Serverless Function -> https://api.api-ninjas.com/v1/nutrition
```

เหตุผล: ถ้าเรียก API Ninjas จาก browser โดยตรงด้วย `X-Api-Key` key จะถูกเปิดเผยใน DevTools

สำหรับ Vite local dev ให้ใช้ env:

```env
VITE_NUTRITION_API_BASE=/api/nutrition
API_NINJAS_KEY=your_api_key_here
```

ถ้าจะทำแบบ frontend-only ชั่วคราวใน dev เท่านั้น:

```env
VITE_API_NINJAS_KEY=your_api_key_here
```

แต่ production ไม่ควรใช้ `VITE_API_NINJAS_KEY`

---

## API Contract

### Endpoint

```http
GET https://api.api-ninjas.com/v1/nutrition?query={query}
```

### Query Parameters

| Name | Required | Type | Description |
|---|---:|---|---|
| `query` | Yes | string | ข้อความอาหารที่ต้องการค้นหา เช่น `1lb brisket and fries` |

ถ้า query มี comma ต้อง encode ให้ถูกต้อง เช่น `%2C`

### Headers

| Name | Required | Value |
|---|---:|---|
| `X-Api-Key` | Yes | API key จาก API Ninjas account |

### Response

```js
[
  {
    "name": "brisket",
    "calories": 295.0,
    "serving_size_g": 100.0,
    "fat_total_g": 21.8,
    "fat_saturated_g": 8.7,
    "protein_g": 24.7,
    "sodium_mg": 65,
    "potassium_mg": 208,
    "cholesterol_mg": 92,
    "carbohydrates_total_g": 0,
    "fiber_g": 0,
    "sugar_g": 0
  }
]
```

หมายเหตุ: API docs ระบุว่า response เป็น array ของ object และ nutrition data จะ scale เป็น `100g` ถ้า query ไม่ระบุ quantity

### Response Fields

| Field | Type | Unit | Description |
|---|---|---|---|
| `name` | string | - | ชื่ออาหารที่ API extract ได้ |
| `calories` | number | kcal | พลังงาน |
| `serving_size_g` | number | g | ปริมาณเสิร์ฟ |
| `fat_total_g` | number | g | ไขมันรวม |
| `fat_saturated_g` | number | g | ไขมันอิ่มตัว |
| `protein_g` | number | g | โปรตีน |
| `sodium_mg` | number | mg | โซเดียม |
| `potassium_mg` | number | mg | โพแทสเซียม |
| `cholesterol_mg` | number | mg | คอเลสเตอรอล |
| `carbohydrates_total_g` | number | g | คาร์โบไฮเดรตรวม |
| `fiber_g` | number | g | ใยอาหาร |
| `sugar_g` | number | g | น้ำตาล |

ให้ handle field ที่หายไปด้วย fallback เช่น `0` หรือ `-` เพราะบาง plan/response อาจคืนค่าไม่ครบ

---

## Project Structure

เพิ่มไฟล์ใหม่:

```txt
src/
├── components/
│   └── nutrition/
│       ├── NutritionSearchForm.jsx
│       ├── NutritionResult.jsx
│       ├── NutritionItemCard.jsx
│       ├── NutritionSummary.jsx
│       └── NutrientRow.jsx
├── hooks/
│   └── useNutrition.js
├── services/
│   └── nutritionApi.js
├── utils/
│   └── nutritionCalculator.js
└── pages/
    └── NutritionPage.jsx
```

แก้ไฟล์เดิม:

| File | Change |
|---|---|
| `src/pages/NutritionPage.jsx` | แทน Coming Soon ด้วย Nutrition Lookup จริง |
| `src/utils/constants.js` | เพิ่ม nutrition constants เช่น field labels, units, default examples |
| `src/styles/variables.css` | เพิ่มสีสำหรับ calories/macros/minerals |
| `src/styles/global.css` | เพิ่ม layout/style ของ nutrition page |
| `.env.example` | เพิ่ม env vars สำหรับ API key/base URL |
| `.gitignore` | ให้แน่ใจว่า `.env` ถูก ignore |

---

## Data Models

```js
// NutritionInput
{
  query: string
}

// NutritionItem
{
  name: string,
  calories: number,
  serving_size_g: number,
  fat_total_g: number,
  fat_saturated_g: number,
  protein_g: number,
  sodium_mg: number,
  potassium_mg: number,
  cholesterol_mg: number,
  carbohydrates_total_g: number,
  fiber_g: number,
  sugar_g: number
}

// NutritionSummary
{
  calories: number,
  serving_size_g: number,
  protein_g: number,
  carbohydrates_total_g: number,
  fat_total_g: number,
  sugar_g: number,
  sodium_mg: number
}

// NutritionState
{
  items: NutritionItem[],
  summary: NutritionSummary | null,
  loading: boolean,
  error: string | null,
  query: string
}
```

---

## Constants

เพิ่มใน `src/utils/constants.js`

```js
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
```

เพิ่มใน `src/styles/variables.css`

```css
:root {
  --color-nutrition: #14b8a6;
  --color-calories: #f97316;
  --color-protein: #f472b6;
  --color-carbs: #facc15;
  --color-fat: #a78bfa;
  --color-mineral: #38bdf8;
}
```

---

## Service Layer

### `src/services/nutritionApi.js`

```js
const API_BASE = import.meta.env.VITE_NUTRITION_API_BASE || '/api/nutrition'

export async function fetchNutrition(query, { signal } = {}) {
  const trimmedQuery = query.trim()
  const url = `${API_BASE}?query=${encodeURIComponent(trimmedQuery)}`

  const response = await fetch(url, { signal })

  if (!response.ok) {
    const message = await getErrorMessage(response)
    throw new Error(message)
  }

  return response.json()
}

async function getErrorMessage(response) {
  try {
    const data = await response.json()
    return data.error || data.message || 'ไม่สามารถดึงข้อมูลโภชนาการได้'
  } catch {
    return 'ไม่สามารถดึงข้อมูลโภชนาการได้'
  }
}
```

### Serverless Proxy Example

ตัวอย่างสำหรับ Vercel: `api/nutrition.js`

```js
export default async function handler(request, response) {
  const query = request.query.query

  if (!query || query.trim().length < 2) {
    return response.status(400).json({ error: 'กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร' })
  }

  const apiResponse = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'X-Api-Key': process.env.API_NINJAS_KEY,
      },
    },
  )

  const data = await apiResponse.json()

  return response.status(apiResponse.status).json(data)
}
```

ถ้าใช้ Netlify ให้ทำเป็น `netlify/functions/nutrition.js` และตั้ง redirect ไป `/api/nutrition`

---

## Utility Functions

### `src/utils/nutritionCalculator.js`

```js
function normalizeNutritionItem(item) {
  return {
    name: item.name || 'Unknown food',
    calories: toNumber(item.calories),
    serving_size_g: toNumber(item.serving_size_g),
    fat_total_g: toNumber(item.fat_total_g),
    fat_saturated_g: toNumber(item.fat_saturated_g),
    protein_g: toNumber(item.protein_g),
    sodium_mg: toNumber(item.sodium_mg),
    potassium_mg: toNumber(item.potassium_mg),
    cholesterol_mg: toNumber(item.cholesterol_mg),
    carbohydrates_total_g: toNumber(item.carbohydrates_total_g),
    fiber_g: toNumber(item.fiber_g),
    sugar_g: toNumber(item.sugar_g),
  }
}

function calculateNutritionSummary(items) {
  return items.reduce(
    (summary, item) => ({
      calories: summary.calories + item.calories,
      serving_size_g: summary.serving_size_g + item.serving_size_g,
      protein_g: summary.protein_g + item.protein_g,
      carbohydrates_total_g: summary.carbohydrates_total_g + item.carbohydrates_total_g,
      fat_total_g: summary.fat_total_g + item.fat_total_g,
      sugar_g: summary.sugar_g + item.sugar_g,
      sodium_mg: summary.sodium_mg + item.sodium_mg,
    }),
    {
      calories: 0,
      serving_size_g: 0,
      protein_g: 0,
      carbohydrates_total_g: 0,
      fat_total_g: 0,
      sugar_g: 0,
      sodium_mg: 0,
    },
  )
}

function validateNutritionQuery(query) {
  const errors = []
  const trimmed = query.trim()

  if (trimmed.length < 2) {
    errors.push('กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร')
  }

  if (trimmed.length > 180) {
    errors.push('คำค้นหาต้องไม่เกิน 180 ตัวอักษร')
  }

  return { isValid: errors.length === 0, errors }
}

function toNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}
```

---

## Custom Hook

### `src/hooks/useNutrition.js`

```js
function useNutrition() {
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const search = useCallback(async (query) => {
    const validation = validateNutritionQuery(query)
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '))
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const data = await fetchNutrition(query, { signal: controller.signal })
      const normalizedItems = data.map(normalizeNutritionItem)
      setItems(normalizedItems)
      setSummary(calculateNutritionSummary(normalizedItems))
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message)
        setItems([])
        setSummary(null)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setItems([])
    setSummary(null)
    setError(null)
    setLoading(false)
  }, [])

  return { items, summary, loading, error, search, reset }
}
```

---

## Component Interfaces

### `NutritionPage`

```jsx
function NutritionPage() {
  const { items, summary, loading, error, search, reset } = useNutrition()

  return (
    <div className="nutrition-page">
      <NutritionSearchForm onSearch={search} loading={loading} error={error} />
      {summary && <NutritionSummary summary={summary} />}
      {items.length > 0 && <NutritionResult items={items} onReset={reset} />}
    </div>
  )
}
```

### `NutritionSearchForm`

Props:

```js
{
  onSearch(query: string): Promise<void>,
  loading: boolean,
  error: string | null
}
```

Behavior:

- ใช้ text input หรือ textarea สำหรับ freeform food query
- มี example chips จาก `NUTRITION_EXAMPLES`
- Submit ด้วย Enter ได้
- แสดง validation/API error ภาษาไทยใต้ form
- ปุ่ม submit disabled ตอน loading

### `NutritionSummary`

Props:

```js
{
  summary: NutritionSummary
}
```

Render:

- Total calories
- Total serving size
- Total protein/carbs/fat
- Total sugar/sodium
- ใช้ `<ResultCard>` ได้สำหรับ calories หรือ summary หลัก

### `NutritionResult`

Props:

```js
{
  items: NutritionItem[],
  onReset(): void
}
```

Render:

- Grid/list ของ `NutritionItemCard`
- ปุ่ม reset/clear search

### `NutritionItemCard`

Props:

```js
{
  item: NutritionItem
}
```

Render:

- ชื่ออาหาร
- calories + serving size เป็นส่วนเด่น
- macro chips: protein, carbs, fat
- nutrient rows: saturated fat, fiber, sugar, sodium, potassium, cholesterol

### `NutrientRow`

Props:

```js
{
  label: string,
  value: number,
  unit: string
}
```

Render:

- label ซ้าย value ขวา
- ถ้า value missing ให้แสดง `-`

---

## UX Requirements

หน้าแรกของ `/nutrition` ต้องเป็น usable experience ไม่ใช่ landing page

Layout:

- Desktop: form/summary ด้านบน, result grid ด้านล่าง
- Mobile: single column
- Touch target >= 44px
- Loading state ชัดเจน
- Empty state ก่อนค้นหา
- Error state แยกจาก validation

Suggested screen copy:

```txt
Nutrition Lookup
ค้นหาข้อมูลโภชนาการจากข้อความอาหาร เช่น "2 eggs and 1 cup rice"
```

Empty state:

```txt
ลองค้นหาเมนูหรือวัตถุดิบเพื่อดู calories และสารอาหาร
```

Error states:

```txt
กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร
ไม่สามารถดึงข้อมูลโภชนาการได้ กรุณาลองใหม่
ไม่พบข้อมูลอาหารจากคำค้นหานี้
```

---

## Error Handling

| Scenario | Response |
|---|---|
| Empty query | แสดง `กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร` |
| Query too long | แสดง `คำค้นหาต้องไม่เกิน 180 ตัวอักษร` |
| API key missing in proxy | Return 500 พร้อม error message |
| API returns 401/403 | แสดง `API key ไม่ถูกต้องหรือไม่มีสิทธิ์ใช้งาน` |
| API returns 429 | แสดง `เรียกใช้งาน API ถี่เกินไป กรุณาลองใหม่อีกครั้ง` |
| API returns empty array | แสดง empty result `ไม่พบข้อมูลอาหารจากคำค้นหานี้` |
| Network error | แสดง `เชื่อมต่อบริการโภชนาการไม่ได้ กรุณาลองใหม่` |
| User submits while loading | Disable submit, keep current request |
| User searches again quickly | Abort previous request |

---

## Testing Requirements

### Unit Tests

`nutritionCalculator.test.js`

- `normalizeNutritionItem`
  - fills missing numeric fields with `0`
  - preserves item name
  - handles string numbers
- `calculateNutritionSummary`
  - sums calories/macros/minerals correctly
  - returns zero summary for empty array
- `validateNutritionQuery`
  - rejects empty query
  - rejects query shorter than 2 chars
  - rejects query longer than 180 chars
  - accepts valid query

### Property-Based Tests

- summary totals are never negative when items are non-negative
- normalize function does not mutate input
- summary does not mutate input array
- repeated normalize with same input returns same output

### Service Tests

`nutritionApi.test.js`

- calls URL with encoded query
- throws readable error when response is not ok
- supports abort signal
- handles JSON response array

Mock `global.fetch`

### Component Tests

`NutritionSearchForm`

- renders input, submit button, examples
- clicking example fills/submits query
- submit calls `onSearch`
- shows validation error
- disabled state while loading

`NutritionSummary`

- renders calories, protein, carbs, fat, sodium

`NutritionItemCard`

- renders food name and nutrient rows
- handles missing values with fallback

`NutritionPage`

- workflow: enter query -> fetch mocked data -> summary and item cards appear
- empty result shows no-data message
- reset clears result

---

## Suggested Implementation Order

1. Add constants in `src/utils/constants.js`
2. Add `src/utils/nutritionCalculator.js` + unit tests
3. Add `src/services/nutritionApi.js` + mocked fetch tests
4. Add `src/hooks/useNutrition.js`
5. Add components under `src/components/nutrition/`
6. Replace `src/pages/NutritionPage.jsx`
7. Add CSS variables and styles
8. Add integration tests
9. Add serverless proxy `/api/nutrition`
10. Add `.env.example`
11. Run:

```bash
npm run lint
npm test -- --run
npm run test:coverage -- --run
npm run build
```

---

## Acceptance Criteria

- `/nutrition` is a real Nutrition Lookup page, not placeholder
- User can search freeform food text
- API request uses `GET /v1/nutrition?query=...`
- API key is not exposed in committed source
- Results show summary and item-level nutrition details
- Empty/loading/error states are implemented
- UI matches existing BMI/TDEE visual language
- Mobile layout works at 320px width
- Tests cover utilities, service, components, and integration workflow
- Build output remains under existing performance target

---

## Source Reference

- API Ninjas Nutrition API: `https://api-ninjas.com/api/nutrition`
- Endpoint used by this app: `https://api.api-ninjas.com/v1/nutrition`
