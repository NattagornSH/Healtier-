import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NutritionPage from './NutritionPage.jsx'

const apiItems = [
  {
    name: 'egg',
    calories: 78,
    serving_size_g: 50,
    fat_total_g: 5.3,
    fat_saturated_g: 1.6,
    protein_g: 6.3,
    sodium_mg: 62,
    potassium_mg: 63,
    cholesterol_mg: 186,
    carbohydrates_total_g: 0.6,
    fiber_g: 0,
    sugar_g: 0.4,
  },
  {
    name: 'rice',
    calories: 130,
    serving_size_g: 100,
    fat_total_g: 0.3,
    fat_saturated_g: 0.1,
    protein_g: 2.7,
    sodium_mg: 1,
    potassium_mg: 35,
    cholesterol_mg: 0,
    carbohydrates_total_g: 28,
    fiber_g: 0.4,
    sugar_g: 0.1,
  },
]

describe('NutritionPage workflow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('searches mocked API data and renders summary plus item cards', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => apiItems,
    })

    render(<NutritionPage />)

    await user.type(screen.getByLabelText('ค้นหาอาหาร'), 'egg and rice')
    await user.click(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' }))

    expect(await screen.findByText('208 kcal')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'egg' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'rice' })).toBeInTheDocument()
    expect(screen.getByText('ผลลัพธ์ล่าสุด: egg and rice')).toBeInTheDocument()
  })

  it('shows empty result message when API returns no items', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    })

    render(<NutritionPage />)

    await user.click(screen.getByRole('button', { name: 'banana and greek yogurt' }))

    expect(await screen.findByText('ไม่พบข้อมูลอาหารจากคำค้นหานี้')).toBeInTheDocument()
  })

  it('reset clears rendered result', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => apiItems,
    })

    render(<NutritionPage />)

    await user.click(screen.getByRole('button', { name: '2 eggs and 1 cup rice' }))
    expect(await screen.findByText('208 kcal')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'ล้างผลลัพธ์' }))

    expect(screen.queryByText('208 kcal')).not.toBeInTheDocument()
    expect(screen.getByText('ลองค้นหาเมนูหรือวัตถุดิบ')).toBeInTheDocument()
  })

  it('shows API error in the form', async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'service down' }),
    })

    render(<NutritionPage />)

    await user.type(screen.getByLabelText('ค้นหาอาหาร'), 'rice')
    await user.click(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' }))

    expect(await screen.findByText('service down')).toBeInTheDocument()
  })
})
