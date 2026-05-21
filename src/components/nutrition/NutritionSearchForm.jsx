import { useState } from 'react'
import { NUTRITION_EXAMPLES } from '../../utils/constants.js'
import { validateNutritionQuery } from '../../utils/nutritionCalculator.js'

function NutritionSearchForm({ onSearch, loading, error }) {
  const [query, setQuery] = useState('')
  const [localError, setLocalError] = useState(null)

  const runSearch = async (nextQuery) => {
    const validation = validateNutritionQuery(nextQuery)

    if (!validation.isValid) {
      setLocalError(validation.errors.join(', '))
      return
    }

    try {
      setLocalError(null)
      await onSearch(nextQuery)
    } catch (caughtError) {
      setLocalError(caughtError.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await runSearch(query)
  }

  const handleExampleClick = async (example) => {
    setQuery(example)
    await runSearch(example)
  }

  const displayedError = localError || error

  return (
    <form className="nutrition-search-form" onSubmit={handleSubmit} noValidate>
      <label className="nutrition-search-form__field" htmlFor="nutrition-query">
        <span>ค้นหาอาหาร</span>
        <textarea
          id="nutrition-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="เช่น 2 eggs and 1 cup rice"
          rows="3"
        />
      </label>

      <div className="nutrition-examples" aria-label="ตัวอย่างคำค้นหา">
        {NUTRITION_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => handleExampleClick(example)}
            disabled={loading}
          >
            {example}
          </button>
        ))}
      </div>

      {displayedError && (
        <div className="form-errors" role="alert">
          <p>{displayedError}</p>
        </div>
      )}

      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'กำลังค้นหา...' : 'ค้นหาโภชนาการ'}
      </button>
    </form>
  )
}

export default NutritionSearchForm
