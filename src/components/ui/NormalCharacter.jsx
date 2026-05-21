function NormalCharacter() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="character-svg"
      role="img"
      aria-label="ปกติ"
    >
      <circle cx="100" cy="62" r="35" className="skin" />
      <path className="hair" d="M65 55c7-27 32-43 61-28 14 8 18 24 9 42-18-14-43-18-70-14z" />
      <path className="shirt normal-shirt" d="M72 112c12-8 44-8 56 0l18 112H54z" />
      <path className="arm" d="M72 126 42 224" />
      <path className="arm" d="M128 126 158 224" />
      <path className="leg" d="M80 224 70 354" />
      <path className="leg" d="M120 224 130 354" />
      <path className="shoe" d="M54 358h34" />
      <path className="shoe" d="M112 358h34" />
      <circle cx="88" cy="62" r="4" className="face" />
      <circle cx="112" cy="62" r="4" className="face" />
      <path className="face-line" d="M84 78c10 10 22 10 32 0" />
    </svg>
  )
}

export default NormalCharacter
