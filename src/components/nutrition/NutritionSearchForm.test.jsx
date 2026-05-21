import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NutritionSearchForm from './NutritionSearchForm.jsx'

describe('NutritionSearchForm', () => {
  it('renders input, submit button, and examples', () => {
    render(<NutritionSearchForm onSearch={() => {}} loading={false} error={null} />)

    expect(screen.getByLabelText('ค้นหาอาหาร')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '2 eggs and 1 cup rice' })).toBeInTheDocument()
  })

  it('submits query through onSearch', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn().mockResolvedValue(undefined)

    render(<NutritionSearchForm onSearch={onSearch} loading={false} error={null} />)

    await user.type(screen.getByLabelText('ค้นหาอาหาร'), '2 eggs')
    await user.click(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' }))

    expect(onSearch).toHaveBeenCalledWith('2 eggs')
  })

  it('clicking an example fills and submits query', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn().mockResolvedValue(undefined)

    render(<NutritionSearchForm onSearch={onSearch} loading={false} error={null} />)

    await user.click(screen.getByRole('button', { name: '100g chicken breast' }))

    expect(screen.getByLabelText('ค้นหาอาหาร')).toHaveValue('100g chicken breast')
    expect(onSearch).toHaveBeenCalledWith('100g chicken breast')
  })

  it('shows validation error and disabled state', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()

    const { unmount } = render(
      <NutritionSearchForm onSearch={onSearch} loading={true} error={null} />,
    )

    expect(screen.getByRole('button', { name: 'กำลังค้นหา...' })).toBeDisabled()

    unmount()
    render(<NutritionSearchForm onSearch={onSearch} loading={false} error={null} />)
    await user.click(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' }))

    expect(onSearch).not.toHaveBeenCalled()
    expect(screen.getByText('กรุณากรอกชื่ออาหารอย่างน้อย 2 ตัวอักษร')).toBeInTheDocument()
  })

  it('shows API error from props', () => {
    render(
      <NutritionSearchForm
        onSearch={() => {}}
        loading={false}
        error="ไม่สามารถดึงข้อมูลโภชนาการได้"
      />,
    )

    expect(screen.getByText('ไม่สามารถดึงข้อมูลโภชนาการได้')).toBeInTheDocument()
  })
})
