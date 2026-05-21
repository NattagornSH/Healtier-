import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App routing', () => {
  it('renders BMI route and navbar', () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Healthier home' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'BMI Calculator' })).toBeInTheDocument()
  })

  it('renders TDEE calculator route', () => {
    window.history.pushState({}, '', '/tdee')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'TDEE Calculator' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'คำนวณ TDEE' })).toBeInTheDocument()
  })

  it('renders nutrition placeholder route', () => {
    window.history.pushState({}, '', '/nutrition')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Nutrition Lookup' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ค้นหาโภชนาการ' })).toBeInTheDocument()
  })
})
