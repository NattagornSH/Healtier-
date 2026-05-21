import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TDEEResult from './TDEEResult.jsx'

describe('TDEEResult', () => {
  const result = {
    bmr: 1618,
    tdee: 2507,
    macros: { protein: 157, carbs: 282, fat: 84 },
  }

  it('renders BMR, TDEE, and macros', () => {
    render(<TDEEResult result={result} unit="metric" onReset={() => {}} />)

    expect(screen.getByText('1,618 kcal/day')).toBeInTheDocument()
    expect(screen.getByText('2,507 kcal/day')).toBeInTheDocument()
    expect(screen.getByText('157 g')).toBeInTheDocument()
    expect(screen.getByText('282 g')).toBeInTheDocument()
    expect(screen.getByText('84 g')).toBeInTheDocument()
  })

  it('calls reset button handler', async () => {
    const user = userEvent.setup()
    const onReset = vi.fn()

    render(<TDEEResult result={result} unit="metric" onReset={onReset} />)
    await user.click(screen.getByRole('button', { name: 'เริ่มใหม่' }))

    expect(onReset).toHaveBeenCalled()
  })
})
