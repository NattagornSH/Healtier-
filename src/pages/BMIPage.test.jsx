import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BMIPage from './BMIPage.jsx'

describe('BMIPage workflow', () => {
  it('calculates BMI, shows result, and renders matching character', async () => {
    const user = userEvent.setup()

    render(<BMIPage />)

    await user.type(screen.getByLabelText('น้ำหนัก (kg)'), '95')
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '170')
    await user.click(screen.getByRole('button', { name: 'คำนวณ BMI' }))

    expect(screen.getByText('32.9')).toBeInTheDocument()
    expect(screen.getByText('อ้วน')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'อ้วน' })).toBeInTheDocument()
  })
})
