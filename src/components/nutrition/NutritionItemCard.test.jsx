import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import NutritionItemCard from './NutritionItemCard.jsx'

describe('NutritionItemCard', () => {
  it('renders food name and nutrient rows', () => {
    render(
      <NutritionItemCard
        item={{
          name: 'chicken breast',
          calories: 165,
          serving_size_g: 100,
          protein_g: 31,
          carbohydrates_total_g: 0,
          fat_total_g: 3.6,
          fat_saturated_g: 1,
          fiber_g: 0,
          sugar_g: 0,
          sodium_mg: 74,
          potassium_mg: 256,
          cholesterol_mg: 85,
        }}
      />,
    )

    expect(screen.getByRole('heading', { name: 'chicken breast' })).toBeInTheDocument()
    expect(screen.getByText('165 kcal')).toBeInTheDocument()
    expect(screen.getByText('โซเดียม')).toBeInTheDocument()
    expect(screen.getByText('74 mg')).toBeInTheDocument()
  })

  it('handles missing values with fallback', () => {
    render(
      <NutritionItemCard
        item={{
          name: 'unknown',
          calories: undefined,
          serving_size_g: undefined,
        }}
      />,
    )

    expect(screen.getAllByText('-').length).toBeGreaterThan(0)
  })
})
