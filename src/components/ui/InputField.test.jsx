import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputField from './InputField.jsx'

describe('InputField', () => {
  it('renders label, value, and numeric attributes', () => {
    render(
      <InputField
        label="น้ำหนัก (kg)"
        value="65"
        onChange={() => {}}
        min="1"
        max="499"
        step="0.1"
      />,
    )

    const input = screen.getByLabelText('น้ำหนัก (kg)')
    expect(input).toHaveValue(65)
    expect(input).toHaveAttribute('type', 'number')
    expect(input).toHaveAttribute('min', '1')
    expect(input).toHaveAttribute('max', '499')
    expect(input).toHaveAttribute('step', '0.1')
  })

  it('calls onChange when edited', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<InputField label="ส่วนสูง (cm)" value="" onChange={onChange} />)
    await user.type(screen.getByLabelText('ส่วนสูง (cm)'), '170')

    expect(onChange).toHaveBeenCalled()
  })
})
