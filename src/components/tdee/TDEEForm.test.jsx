import { describe, expect, it, vi } from 'vitest'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TDEEForm from './TDEEForm.jsx'

describe('TDEEForm', () => {
  it('renders all expected fields', () => {
    render(<TDEEForm onCalculate={() => {}} unit="metric" onUnitChange={() => {}} />)

    expect(screen.getByLabelText('อายุ (ปี)')).toBeInTheDocument()
    expect(screen.getByLabelText('น้ำหนัก (kg)')).toBeInTheDocument()
    expect(screen.getByLabelText('ส่วนสูง (cm)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ชาย' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ปานกลาง/ })).toBeInTheDocument()
  })

  it('submits a valid input object', async () => {
    const user = userEvent.setup()
    const onCalculate = vi.fn()

    render(<TDEEForm onCalculate={onCalculate} unit="metric" onUnitChange={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'ชาย' }))
    await user.type(screen.getByLabelText('อายุ (ปี)'), '30')
    await user.type(screen.getByLabelText('น้ำหนัก (kg)'), '70')
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '170')
    await user.click(screen.getByRole('button', { name: /ปานกลาง/ }))
    await user.click(screen.getByRole('button', { name: 'คำนวณ TDEE' }))

    expect(onCalculate).toHaveBeenCalledWith({
      age: 30,
      gender: 'male',
      weight: 70,
      height: 170,
      activityLevel: 'moderate',
      unit: 'metric',
    })
  })

  it('shows validation errors and blocks invalid submit', async () => {
    const user = userEvent.setup()
    const onCalculate = vi.fn()

    render(<TDEEForm onCalculate={onCalculate} unit="metric" onUnitChange={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'คำนวณ TDEE' }))

    expect(onCalculate).not.toHaveBeenCalled()
    expect(screen.getByText('อายุต้องอยู่ระหว่าง 1-120 ปี')).toBeInTheDocument()
    expect(screen.getByText('กรุณาเลือกเพศ')).toBeInTheDocument()
    expect(screen.getByText('กรุณาเลือกระดับกิจกรรม')).toBeInTheDocument()
  })

  it('unit toggle changes weight and height labels', async () => {
    const user = userEvent.setup()

    function Harness() {
      const [unit, setUnit] = useState('metric')
      return <TDEEForm onCalculate={() => {}} unit={unit} onUnitChange={setUnit} />
    }

    render(<Harness />)

    await user.click(screen.getByRole('button', { name: 'Imperial' }))

    expect(screen.getByLabelText('น้ำหนัก (lb)')).toBeInTheDocument()
    expect(screen.getByLabelText('ส่วนสูง (in)')).toBeInTheDocument()
  })
})
