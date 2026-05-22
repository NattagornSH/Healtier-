import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useProfile } from "../../contexts/ProfileContext";
import { translations } from "../../translations";
import "./LanguageToggle.css";
import "./Navbar.css";

function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { profile } = useProfile();

  const initials = profile.name
    ? profile.name.trim().split(" ").map((w) => w[0]?.toUpperCase()).join("").slice(0, 2)
    : null;

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

        {/* Profile button */}
        <NavLink to="/profile" className="navbar__profile-btn" aria-label="Profile">
          {initials ? (
            <span className="navbar__profile-initials">{initials}</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          )}
          <span className="navbar__profile-dot" />
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
