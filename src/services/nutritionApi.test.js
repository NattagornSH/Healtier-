import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchNutrition } from './nutritionApi.js'

describe('fetchNutrition', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls URL with encoded query and returns JSON array', async () => {
    const data = [{ name: 'rice', calories: 130 }]
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => data,
    })

    await expect(fetchNutrition('rice, egg')).resolves.toEqual(data)

    expect(fetchMock).toHaveBeenCalledWith('/api/nutrition?query=rice%2C%20egg', {
      headers: undefined,
      signal: undefined,
    })
  })

  it('returns empty array when response JSON is not an array', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ result: [] }),
    })

    await expect(fetchNutrition('rice')).resolves.toEqual([])
  })

  it('throws readable error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'service down' }),
    })

    await expect(fetchNutrition('rice')).rejects.toThrow('service down')
  })

  it('maps auth and rate-limit errors to Thai messages', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({}),
    })

    await expect(fetchNutrition('rice')).rejects.toThrow(
      'API key ไม่ถูกต้องหรือไม่มีสิทธิ์ใช้งาน',
    )

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({}),
    })

    await expect(fetchNutrition('rice')).rejects.toThrow(
      'เรียกใช้งาน API ถี่เกินไป กรุณาลองใหม่อีกครั้ง',
    )
  })

  it('passes abort signal to fetch', async () => {
    const controller = new AbortController()
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    })

    await fetchNutrition('rice', { signal: controller.signal })

    expect(fetchMock).toHaveBeenCalledWith('/api/nutrition?query=rice', {
      headers: undefined,
      signal: controller.signal,
    })
  })
})
