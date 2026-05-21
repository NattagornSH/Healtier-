import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TDEEPage from './TDEEPage.jsx'

describe('TDEEPage workflow', () => {
  it('calculates BMR, TDEE, and macro breakdown', async () => {
    const user = userEvent.setup()

    render(<TDEEPage />)

    await user.click(screen.getByRole('button', { name: 'ชาย' }))
    await user.type(screen.getByLabelText('อายุ (ปี)'), '30')
    await user.type(screen.getByLabelText('น้ำหนัก (kg)'), '70')
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '170')
    await user.click(screen.getByRole('button', { name: /ปานกลาง/ }))
    await user.click(screen.getByRole('button', { name: 'คำนวณ TDEE' }))

    expect(screen.getByText('1,618 kcal/day')).toBeInTheDocument()
    expect(screen.getByText('2,507 kcal/day')).toBeInTheDocument()
    expect(screen.getByText('157 g')).toBeInTheDocument()
  })

  it('changes unit labels and resets result plus form state', async () => {
    const user = userEvent.setup()

    render(<TDEEPage />)

    await user.click(screen.getByRole('button', { name: 'Imperial' }))
    expect(screen.getByLabelText('น้ำหนัก (lb)')).toBeInTheDocument()
    expect(screen.getByLabelText('ส่วนสูง (in)')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'หญิง' }))
    await user.type(screen.getByLabelText('อายุ (ปี)'), '28')
    await user.type(screen.getByLabelText('น้ำหนัก (lb)'), '132')
    await user.type(screen.getByLabelText('ส่วนสูง (in)'), '64')
    await user.click(screen.getByRole('button', { name: /เบาบาง/ }))
    await user.click(screen.getByRole('button', { name: 'คำนวณ TDEE' }))

    expect(screen.getAllByText(/kcal\/day/).length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: 'เริ่มใหม่' }))

    expect(screen.queryByText(/พลังงานพื้นฐานต่อวัน/)).not.toBeInTheDocument()
    expect(screen.getByLabelText('อายุ (ปี)')).toHaveValue(null)
    expect(screen.getByLabelText('น้ำหนัก (kg)')).toBeInTheDocument()
  })
})
