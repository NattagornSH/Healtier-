import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import "./LanguageToggle.css";
import "./Navbar.css";

function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__brand" aria-label="Healthier home">
        {t(translations.navbar.brand)}
      </NavLink>
      <div className="navbar__right">
        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink to="/" end>
            {t(translations.navbar.home)}
          </NavLink>
          <NavLink to="/dashboard" className="navbar__dashboard-link">
            {language === "th" ? "แดชบอร์ด" : "Dashboard"}
          </NavLink>
          <NavLink to="/bmi">{t(translations.navbar.bmi)}</NavLink>
          <NavLink to="/tdee">{t(translations.navbar.tdee)}</NavLink>
          <NavLink to="/nutrition">{t(translations.navbar.nutrition)}</NavLink>
          <NavLink to="/water">{t(translations.navbar.water)}</NavLink>
        </nav>
        <button
          className="language-toggle"
          onClick={toggleLanguage}
          aria-label="Toggle language"
        >
          <span
            className={`language-toggle__option ${language === "th" ? "active" : ""}`}
          >
            TH
          </span>
          <span
            className={`language-toggle__option ${language === "en" ? "active" : ""}`}
          >
            EN
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

