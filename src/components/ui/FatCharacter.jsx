function FatCharacter() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="character-svg"
      role="img"
      aria-label="น้ำหนักเกิน"
    >
      <circle cx="100" cy="62" r="37" className="skin" />
      <path className="hair" d="M63 57c8-30 42-41 66-22 11 9 13 24 4 38-21-15-46-18-70-16z" />
      <path className="shirt fat-shirt" d="M58 120c16-20 68-20 84 0 18 30 18 76 8 112H50c-10-36-8-82 8-112z" />
      <path className="arm" d="M60 134 32 230" />
      <path className="arm" d="M140 134 168 230" />
      <path className="leg" d="M76 232 66 354" />
      <path className="leg" d="M124 232 134 354" />
      <path className="shoe" d="M48 358h40" />
      <path className="shoe" d="M112 358h40" />
      <circle cx="87" cy="62" r="4" className="face" />
      <circle cx="113" cy="62" r="4" className="face" />
      <path className="face-line" d="M84 80c10 8 22 8 32 0" />
    </svg>
  )
}

export default FatCharacter
