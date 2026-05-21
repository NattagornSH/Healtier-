function ResultCard({ title, value, status, color }) {
  return (
    <section
      className="result-card"
      style={{ '--category-color': color }}
      aria-label={title}
    >
      <p className="result-card__title">{title}</p>
      <strong className="result-card__value">{value}</strong>
      <span className="result-card__status">{status}</span>
    </section>
  )
}

export default ResultCard
