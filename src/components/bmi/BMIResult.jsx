import ResultCard from '../ui/ResultCard.jsx'
import BMIScale from './BMIScale.jsx'

function BMIResult({ bmi, category }) {
  return (
    <div className="bmi-result">
      <ResultCard
        title="ผลลัพธ์ BMI"
        value={bmi.toFixed(1)}
        status={category.label}
        color={category.color}
      />
      <BMIScale currentBMI={bmi} category={category} />
    </div>
  )
}

export default BMIResult
