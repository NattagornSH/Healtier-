import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import NutritionSummary from './NutritionSummary.jsx'

describe('NutritionSummary', () => {
  it('renders calories, macros, sugar, and sodium', () => {
    render(
      <NutritionSummary
        summary={{
          calories: 450,
          serving_size_g: 300,
          protein_g: 30,
          carbohydrates_total_g: 55,
          fat_total_g: 12,
          sugar_g: 8,
          sodium_mg: 500,
        }}
      />,
    )

    expect(screen.getByText('450 kcal')).toBeInTheDocument()
    expect(screen.getByText('30 g')).toBeInTheDocument()
    expect(screen.getByText('55 g')).toBeInTheDocument()
    expect(screen.getByText('12 g')).toBeInTheDocument()
    expect(screen.getByText('500 mg')).toBeInTheDocument()
  })
})
