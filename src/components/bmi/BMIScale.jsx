import { BMI_CATEGORIES } from '../../utils/constants.js'
import { calculateScalePosition } from '../../utils/bmiCalculator.js'

function BMIScale({ currentBMI, category }) {
  const position = calculateScalePosition(currentBMI)

  return (
    <section className="bmi-scale" aria-label="BMI scale">
      <div className="bmi-scale__track">
        {BMI_CATEGORIES.map((item) => (
          <span
            key={item.key}
            className={`bmi-scale__segment bmi-scale__segment--${item.key}`}
            aria-label={item.label}
          />
        ))}
        <span
          className="bmi-scale__indicator"
          style={{
            left: `${position}%`,
            '--category-color': category.color,
          }}
          aria-label={`ตำแหน่ง BMI ${currentBMI.toFixed(1)}`}
        />
      </div>
      <div className="bmi-scale__labels" aria-hidden="true">
        <span>15</span>
        <span>18.5</span>
        <span>23</span>
        <span>25</span>
        <span>30</span>
        <span>35</span>
      </div>
    </section>
  )
}

export default BMIScale
