import { ACTIVITY_LEVELS } from '../../utils/constants.js'

function ActivitySelector({ value, onChange }) {
  return (
    <fieldset className="activity-selector">
      <legend>ระดับกิจกรรม</legend>
      <div className="activity-selector__grid">
        {ACTIVITY_LEVELS.map((activity, index) => (
          <button
            key={activity.key}
            type="button"
            className={`activity-card activity-card--${index + 1} ${
              value === activity.key ? 'activity-card--active' : ''
            }`}
            onClick={() => onChange(activity.key)}
            aria-pressed={value === activity.key}
          >
            <span>{activity.label}</span>
            <small>{activity.description}</small>
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default ActivitySelector
