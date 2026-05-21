import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import "./HomePage.css";

function HomePage() {
  const { t } = useLanguage();

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Simple AOS-like animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-aos]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const features = [
    {
      id: "bmi",
      icon: "📊",
      emoji: "💪",
      color: "#246afe",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      link: "/bmi",
    },
    {
      id: "tdee",
      icon: "⚡",
      emoji: "🔥",
      color: "#13a87e",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      link: "/tdee",
    },
    {
      id: "nutrition",
      icon: "🍎",
      emoji: "🥗",
      color: "#f4772e",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      link: "/nutrition",
    },
  ];

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="home-bg">
        <div className="home-bg__gradient"></div>
        <div className="home-bg__mesh"></div>
        <div className="home-bg__orbs">
          <div className="orb orb--1"></div>
          <div className="orb orb--2"></div>
          <div className="orb orb--3"></div>
          <div className="orb orb--4"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-premium">
        <div className="hero-premium__container">
          <div className="hero-premium__content">
            <div className="hero-premium__badge" data-aos="fade-down">
              <span className="badge__glow"></span>
              <span className="badge__icon">✨</span>
              <span className="badge__text">{t(translations.home.badge)}</span>
            </div>

            <h1
              className="hero-premium__title"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <span className="title__line">{t(translations.home.title)}</span>
              <span className="title__highlight">
                <span className="title__highlight-text">
                  {t(translations.home.titleHighlight)}
                </span>
                <svg className="title__underline" viewBox="0 0 300 12">
                  <path
                    d="M5,6 Q150,0 295,6"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#667eea" />
                      <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p
              className="hero-premium__description"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {t(translations.home.description)}
            </p>

            <div
              className="hero-premium__actions"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Link to="/bmi" className="btn btn--primary">
                <span className="btn__text">
                  {t(translations.home.ctaPrimary)}
                </span>
                <span className="btn__icon">→</span>
                <span className="btn__glow"></span>
              </Link>
              <a href="#features" className="btn btn--glass">
                <span className="btn__text">
                  {t(translations.home.ctaSecondary)}
                </span>
                <span className="btn__shine"></span>
              </a>
            </div>

            <div
              className="hero-premium__stats"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="stat-card">
                <div className="stat-card__value">99%</div>
                <div className="stat-card__label">
                  {t(translations.home.stats.accuracy)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value">10K+</div>
                <div className="stat-card__label">
                  {t(translations.home.stats.calculations)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card__value">5K+</div>
                <div className="stat-card__label">
                  {t(translations.home.stats.users)}
                </div>
              </div>
            </div>
          </div>

          <div
            className="hero-premium__visual"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="visual-cards">
              <div className="visual-card visual-card--1">
                <div className="visual-card__glow"></div>
                <div className="visual-card__content">
                  <div className="visual-card__icon">📊</div>
                  <div className="visual-card__info">
                    <span className="visual-card__label">BMI</span>
                    <strong className="visual-card__value">22.5</strong>
                  </div>
                </div>
              </div>
              <div className="visual-card visual-card--2">
                <div className="visual-card__glow"></div>
                <div className="visual-card__content">
                  <div className="visual-card__icon">⚡</div>
                  <div className="visual-card__info">
                    <span className="visual-card__label">TDEE</span>
                    <strong className="visual-card__value">2,100</strong>
                  </div>
                </div>
              </div>
              <div className="visual-card visual-card--3">
                <div className="visual-card__glow"></div>
                <div className="visual-card__content">
                  <div className="visual-card__icon">🍎</div>
                  <div className="visual-card__info">
                    <span className="visual-card__label">Cal</span>
                    <strong className="visual-card__value">450</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-premium">
        <div className="features-premium__container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-header__badge">
              {t(translations.home.featuresEyebrow)}
            </span>
            <h2 className="section-header__title">
              {t(translations.home.featuresTitle)}
            </h2>
            <p className="section-header__description">
              {t(translations.home.featuresDescription)}
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                key={feature.id}
                to={feature.link}
                className="feature-premium"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                style={{ "--feature-gradient": feature.gradient }}
              >
                <div className="feature-premium__glow"></div>
                <div className="feature-premium__shine"></div>

                <div className="feature-premium__icon-wrapper">
                  <div className="feature-premium__icon">
                    <span className="icon__main">{feature.icon}</span>
                    <span className="icon__emoji">{feature.emoji}</span>
                  </div>
                </div>

                <h3 className="feature-premium__title">
                  {t(translations.home.features[feature.id].title)}
                </h3>

                <p className="feature-premium__description">
                  {t(translations.home.features[feature.id].description)}
                </p>

                <ul className="feature-premium__benefits">
                  {translations.home.features[feature.id].benefits.map(
                    (benefit, idx) => (
                      <li key={idx}>
                        <svg className="check-icon" viewBox="0 0 20 20">
                          <path
                            d="M7 10l2 2 4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                          />
                        </svg>
                        <span>{t(benefit)}</span>
                      </li>
                    ),
                  )}
                </ul>

                <div className="feature-premium__arrow">
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-premium">
        <div className="how-premium__container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-header__badge">
              {t(translations.home.howItWorksEyebrow)}
            </span>
            <h2 className="section-header__title">
              {t(translations.home.howItWorksTitle)}
            </h2>
          </div>

          <div className="steps-premium">
            {[1, 2, 3].map((step, index) => (
              <div
                key={step}
                className="step-premium"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="step-premium__number">
                  <span className="number__value">{step}</span>
                  <div className="number__glow"></div>
                </div>
                <div className="step-premium__content">
                  <h3 className="step-premium__title">
                    {t(translations.home.steps[`step${step}`].title)}
                  </h3>
                  <p className="step-premium__description">
                    {t(translations.home.steps[`step${step}`].description)}
                  </p>
                </div>
                {step < 3 && <div className="step-premium__connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-premium" data-aos="fade-up">
        <div className="cta-premium__container">
          <div className="cta-premium__glow"></div>
          <div className="cta-premium__content">
            <h2 className="cta-premium__title">
              {t(translations.home.ctaTitle)}
            </h2>
            <p className="cta-premium__description">
              {t(translations.home.ctaDescription)}
            </p>
            <Link to="/bmi" className="btn btn--cta">
              <span className="btn__text">
                {t(translations.home.ctaButton)}
              </span>
              <span className="btn__icon">→</span>
              <span className="btn__particles"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
