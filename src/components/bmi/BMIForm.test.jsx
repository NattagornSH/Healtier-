import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BMIForm from './BMIForm.jsx'

describe('BMIForm', () => {
  it('submits parsed weight and height', async () => {
    const user = userEvent.setup()
    const onCalculate = vi.fn()

    render(<BMIForm onCalculate={onCalculate} />)

    await user.type(screen.getByLabelText('น้ำหนัก (kg)'), '65')
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '170')
    await user.click(screen.getByRole('button', { name: 'คำนวณ BMI' }))

    expect(onCalculate).toHaveBeenCalledWith(65, 170)
  })

  it('submits with Enter key', async () => {
    const user = userEvent.setup()
    const onCalculate = vi.fn()

    render(<BMIForm onCalculate={onCalculate} />)

    await user.type(screen.getByLabelText('น้ำหนัก (kg)'), '70')
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '175{Enter}')

    expect(onCalculate).toHaveBeenCalledWith(70, 175)
  })

  it('blocks invalid submit and shows Thai errors', async () => {
    const user = userEvent.setup()
    const onCalculate = vi.fn()

    render(<BMIForm onCalculate={onCalculate} />)

    await user.click(screen.getByRole('button', { name: 'คำนวณ BMI' }))

    expect(onCalculate).not.toHaveBeenCalled()
    expect(screen.getByText('น้ำหนักต้องอยู่ระหว่าง 1-499 kg')).toBeInTheDocument()
    expect(screen.getByText('ส่วนสูงต้องอยู่ระหว่าง 1-299 cm')).toBeInTheDocument()
  })
})
