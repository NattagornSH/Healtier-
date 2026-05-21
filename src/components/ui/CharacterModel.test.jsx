import { describe, expect, it, vi } from 'vitest'
import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import CharacterModel from './CharacterModel.jsx'

describe('CharacterModel', () => {
  it('renders the correct character', () => {
    render(<CharacterModel category="thin" />)

    expect(screen.getByRole('img', { name: 'ผอมเกินไป' })).toBeInTheDocument()
    expect(screen.getByTestId('character-model')).toHaveClass('character--thin')
  })

  it('renders the fat character variant', () => {
    render(<CharacterModel category="fat" />)

    expect(screen.getByRole('img', { name: 'น้ำหนักเกิน' })).toBeInTheDocument()
  })

  it('transitions class and swaps SVG when category changes', () => {
    vi.useFakeTimers()
    const { rerender } = render(<CharacterModel category="normal" />)

    rerender(<CharacterModel category="obese" />)

    expect(screen.getByTestId('character-model')).toHaveClass(
      'character--transitioning',
    )

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(screen.getByTestId('character-model')).toHaveClass('character--obese')
    expect(screen.getByRole('img', { name: 'อ้วน' })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(screen.getByTestId('character-model')).not.toHaveClass(
      'character--transitioning',
    )

    vi.useRealTimers()
  })

  it('renders nothing when category is not mapped', () => {
    const { container } = render(<CharacterModel category="unknown" />)

    expect(container).toBeEmptyDOMElement()
  })
})
