import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ActivitySelector from './ActivitySelector.jsx'

describe('ActivitySelector', () => {
  it('renders five activity options', () => {
    render(<ActivitySelector value="" onChange={() => {}} />)

    expect(screen.getAllByRole('button')).toHaveLength(5)
  })

  it('calls onChange and marks the active card', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<ActivitySelector value="moderate" onChange={onChange} />)

    const active = screen.getByRole('button', { name: /ปานกลาง/ })
    expect(active).toHaveClass('activity-card--active')

    await user.click(screen.getByRole('button', { name: /หนักมาก/ }))

    expect(onChange).toHaveBeenCalledWith('very_active')
  })
})
