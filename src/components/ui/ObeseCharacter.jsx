function ObeseCharacter() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="character-svg"
      role="img"
      aria-label="อ้วน"
    >
      <circle cx="100" cy="62" r="39" className="skin" />
      <path className="hair" d="M61 58c8-34 48-44 73-21 11 10 10 26 0 40-23-17-50-20-73-19z" />
      <path className="shirt obese-shirt" d="M44 132c22-38 90-38 112 0 24 42 16 88 4 112H40c-12-24-20-70 4-112z" />
      <path className="arm" d="M48 148 24 240" />
      <path className="arm" d="M152 148 176 240" />
      <path className="leg" d="M72 244 58 354" />
      <path className="leg" d="M128 244 142 354" />
      <path className="shoe" d="M38 358h50" />
      <path className="shoe" d="M112 358h50" />
      <circle cx="87" cy="62" r="4" className="face" />
      <circle cx="113" cy="62" r="4" className="face" />
      <path className="face-line" d="M86 82c9 5 19 5 28 0" />
    </svg>
  )
}

export default ObeseCharacter
