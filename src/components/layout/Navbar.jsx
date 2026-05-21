import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand" aria-label="Healthier home">
        Healthier
      </NavLink>
      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink to="/" end>
          BMI
        </NavLink>
        <NavLink to="/tdee">TDEE</NavLink>
        <NavLink to="/nutrition">Nutrition</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
