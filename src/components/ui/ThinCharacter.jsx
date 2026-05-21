function ThinCharacter() {
  return (
    <svg
      viewBox="0 0 200 400"
      className="character-svg"
      role="img"
      aria-label="ผอมเกินไป"
    >
      <circle cx="100" cy="62" r="34" className="skin" />
      <path className="hair" d="M66 58c4-28 24-44 54-34 16 6 24 20 18 42-16-12-42-14-72-8z" />
      <path className="shirt thin-shirt" d="M82 106h36l16 118H66z" />
      <path className="arm" d="M76 118 44 214" />
      <path className="arm" d="M124 118 156 214" />
      <path className="leg" d="M86 224 78 354" />
      <path className="leg" d="M114 224 122 354" />
      <path className="shoe" d="M62 358h30" />
      <path className="shoe" d="M108 358h30" />
      <circle cx="88" cy="62" r="4" className="face" />
      <circle cx="112" cy="62" r="4" className="face" />
      <path className="face-line" d="M88 79c8 5 16 5 24 0" />
    </svg>
  )
}

export default ThinCharacter
