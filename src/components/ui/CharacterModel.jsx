import { useEffect, useRef, useState } from 'react'
import ThinCharacter from './ThinCharacter.jsx'
import NormalCharacter from './NormalCharacter.jsx'
import FatCharacter from './FatCharacter.jsx'
import ObeseCharacter from './ObeseCharacter.jsx'

const CHARACTER_MAP = {
  thin: ThinCharacter,
  normal: NormalCharacter,
  fat: FatCharacter,
  obese: ObeseCharacter,
}

const CHARACTER_CLASSES = [
  'character--thin',
  'character--normal',
  'character--fat',
  'character--obese',
]

function CharacterModel({ category }) {
  const [displayCategory, setDisplayCategory] = useState(category)
  const elementRef = useRef(null)
  const displayCategoryRef = useRef(category)

  useEffect(() => {
    const el = elementRef.current

    if (!el || !category || category === displayCategoryRef.current) {
      return undefined
    }

    el.classList.add('character--transitioning')

    const swapTimer = window.setTimeout(() => {
      if (!elementRef.current) return

      elementRef.current.classList.remove(...CHARACTER_CLASSES)
      elementRef.current.classList.add(`character--${category}`)
      displayCategoryRef.current = category
      setDisplayCategory(category)

      const fadeTimer = window.setTimeout(() => {
        elementRef.current?.classList.remove('character--transitioning')
      }, 200)

      el.dataset.fadeTimer = String(fadeTimer)
    }, 200)

    return () => {
      window.clearTimeout(swapTimer)
      if (el.dataset.fadeTimer) {
        window.clearTimeout(Number(el.dataset.fadeTimer))
      }
    }
  }, [category])

  const Character = CHARACTER_MAP[displayCategory]

  if (!Character) {
    return null
  }

  return (
    <div
      ref={elementRef}
      className={`character character--${displayCategory}`}
      data-testid="character-model"
    >
      <Character />
    </div>
  )
}

export default CharacterModel
