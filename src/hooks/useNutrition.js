import { useCallback, useRef, useState } from 'react'
import { fetchNutrition } from '../services/nutritionApi.js'
import {
  calculateNutritionSummary,
  normalizeNutritionItem,
  validateNutritionQuery,
} from '../utils/nutritionCalculator.js'

function useNutrition() {
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [noResults, setNoResults] = useState(false)
  const abortRef = useRef(null)

  const search = useCallback(async (nextQuery) => {
    const validation = validateNutritionQuery(nextQuery)

    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '))
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    setNoResults(false)
    setQuery(nextQuery.trim())

    try {
      const data = await fetchNutrition(nextQuery, { signal: controller.signal })
      if (abortRef.current !== controller) return

      const normalizedItems = data.map(normalizeNutritionItem)

      setItems(normalizedItems)
      setSummary(
        normalizedItems.length > 0
          ? calculateNutritionSummary(normalizedItems)
          : null,
      )
      setNoResults(normalizedItems.length === 0)
    } catch (caughtError) {
      if (caughtError.name !== 'AbortError' && abortRef.current === controller) {
        setError(caughtError.message || 'เชื่อมต่อบริการโภชนาการไม่ได้ กรุณาลองใหม่')
        setItems([])
        setSummary(null)
        setNoResults(false)
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
      }
    }
  }, [])

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setItems([])
    setSummary(null)
    setError(null)
    setLoading(false)
    setQuery('')
    setNoResults(false)
  }, [])

  return { items, summary, loading, error, query, noResults, search, reset }
}

export default useNutrition
