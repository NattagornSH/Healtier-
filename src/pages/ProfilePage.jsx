import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useProfile } from "../contexts/ProfileContext";
import { ACTIVITY_LEVELS } from "../utils/constants";
import { calculateBMI, getBMICategory } from "../utils/bmiCalculator";
import { calculateProgress } from "../utils/waterCalculator";
import "./ProfilePage.css";

const GENDER_OPTIONS = [
  { key: "male",   icon: "♂",  th: "ชาย",  en: "Male"   },
  { key: "female", icon: "♀",  th: "หญิง", en: "Female" },
];

const ACTIVITY_META = [
  { key: "sedentary",  icon: "🪑", color: "#5f95ff" },
  { key: "light",      icon: "🚶", color: "#3cbf8b" },
  { key: "moderate",   icon: "🏃", color: "#f4b63d" },
  { key: "active",     icon: "🏋️", color: "#f4772e" },
  { key: "very_active",icon: "⚡", color: "#ef4e4e" },
];

export default function ProfilePage() {
  const { language } = useLanguage();
  const { profile, updateProfile, clearProfile } = useProfile();

  const lbl = (th, en) => (language === "th" ? th : en);

  const [form, setForm] = useState({
    name:          profile.name          ?? "",
    weight:        profile.weight        ?? "",
    height:        profile.height        ?? "",
    age:           profile.age           ?? "",
    gender:        profile.gender        ?? "",
    activityLevel: profile.activityLevel ?? "",
  });

  const [saved, setSaved] = useState(false);
  const [showClear, setShowClear] = useState(false);

  // Sync local form when profile changes externally
  useEffect(() => {
    setForm({
      name:          profile.name          ?? "",
      weight:        profile.weight        ?? "",
      height:        profile.height        ?? "",
      age:           profile.age           ?? "",
      gender:        profile.gender        ?? "",
      activityLevel: profile.activityLevel ?? "",
    });
  }, [profile]);

  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    clearProfile();
    setShowClear(false);
  };

  // Live BMI preview
  const w = parseFloat(form.weight);
  const h = parseFloat(form.height);
  const liveBmi = w > 0 && h > 0 ? calculateBMI(w, h) : null;
  const liveCat = liveBmi ? getBMICategory(liveBmi) : null;
  const bmiColors = { thin:"#5f95ff", normal:"#16a37a", fat:"#f59f24", obese:"#ef4e4e" };
  const bmiColor  = liveCat ? (bmiColors[liveCat.key] ?? "#246afe") : "#246afe";

  // Water estimate
  const waterGoal = w > 0 ? Math.round(w * 33) : null;

  // Profile completion %
  const fields = ["name","weight","height","age","gender","activityLevel"];
  const filled = fields.filter((f) => form[f] !== "" && form[f] !== null && form[f] !== undefined);
  const completion = Math.round((filled.length / fields.length) * 100);

  // Avatar initials
  const initials = form.name
    ? form.name.trim().split(" ").map((w) => w[0]?.toUpperCase()).join("").slice(0, 2)
    : "?";

  return (
    <div className="profile-page">
      {/* ── Background orbs ── */}
      <div className="profile-bg" aria-hidden="true">
        <div className="profile-orb profile-orb--1" />
        <div className="profile-orb profile-orb--2" />
        <div className="profile-orb profile-orb--3" />
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="profile-hero">
        {/* Avatar */}
        <div className="profile-avatar">
          <div
            className="profile-avatar__ring"
            style={{ "--ring-color": form.gender === "female" ? "#d9468f" : "#246afe" }}
          >
            <div className="profile-avatar__inner">
              <span className="profile-avatar__initials">{initials}</span>
              <div className="profile-avatar__glow" />
            </div>
          </div>
          {/* Completion badge */}
          <div className="profile-completion-badge" style={{ "--pct": `${completion}%` }}>
            <svg viewBox="0 0 36 36" className="profile-completion-ring">
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(216,226,251,0.5)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15"
                fill="none"
                stroke={completion === 100 ? "#16a37a" : "#246afe"}
                strokeWidth="3"
                strokeDasharray={`${(completion / 100) * 94} 94`}
                strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 0.8s ease" }}
              />
            </svg>
            <span>{completion}%</span>
          </div>
        </div>

        <div className="profile-hero__text">
          <p className="eyebrow">{lbl("โปรไฟล์", "Profile")}</p>
          <h1>
            {form.name
              ? lbl(`สวัสดี, ${form.name}!`, `Hello, ${form.name}!`)
              : lbl("โปรไฟล์ของคุณ", "Your Profile")}
          </h1>
          <p className="profile-hero__sub">
            {lbl(
              "บันทึกข้อมูลส่วนตัวเพื่อ auto-fill ในทุกเครื่องมือ",
              "Save your info to auto-fill all health tools instantly"
            )}
          </p>

          {/* Mini stats */}
          <div className="profile-mini-stats">
            {liveBmi && (
              <div className="profile-mini-stat" style={{ "--stat-color": bmiColor }}>
                <strong>{liveBmi.toFixed(1)}</strong>
                <span>BMI</span>
              </div>
            )}
            {waterGoal && (
              <div className="profile-mini-stat" style={{ "--stat-color": "#00b4d8" }}>
                <strong>{(waterGoal / 1000).toFixed(1)}L</strong>
                <span>{lbl("น้ำ/วัน", "Water/day")}</span>
              </div>
            )}
            {form.age && (
              <div className="profile-mini-stat" style={{ "--stat-color": "#764ba2" }}>
                <strong>{form.age}</strong>
                <span>{lbl("ปี", "yrs")}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM
      ══════════════════════════════════════ */}
      <form className="profile-form" onSubmit={handleSave} noValidate>

        {/* ── Personal info card ── */}
        <div className="profile-card">
          <div className="profile-card__header">
            <div className="profile-card__icon-wrap" style={{ "--card-accent": "#667eea" }}>
              <span>👤</span>
            </div>
            <div>
              <h2 className="profile-card__title">{lbl("ข้อมูลส่วนตัว", "Personal Info")}</h2>
              <p className="profile-card__sub">{lbl("ชื่อ เพศ และอายุ", "Name, gender & age")}</p>
            </div>
          </div>

          {/* Name */}
          <div className="profile-field">
            <label htmlFor="pf-name" className="profile-field__label">
              {lbl("ชื่อ (ไม่บังคับ)", "Name (optional)")}
            </label>
            <input
              id="pf-name"
              className="profile-field__input"
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder={lbl("เช่น สมชาย", "e.g. John")}
              maxLength={40}
            />
          </div>

          {/* Gender */}
          <div className="profile-field">
            <label className="profile-field__label">{lbl("เพศ", "Gender")}</label>
            <div className="profile-gender-grid">
              {GENDER_OPTIONS.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  className={`profile-gender-btn ${form.gender === g.key ? "profile-gender-btn--active" : ""}`}
                  style={{ "--gender-color": g.key === "male" ? "#246afe" : "#d9468f" }}
                  onClick={() => set("gender", g.key)}
                  aria-pressed={form.gender === g.key}
                >
                  <span className="profile-gender-btn__icon">{g.icon}</span>
                  <span>{language === "th" ? g.th : g.en}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="profile-field">
            <label htmlFor="pf-age" className="profile-field__label">
              {lbl("อายุ (ปี)", "Age (years)")}
            </label>
            <input
              id="pf-age"
              className="profile-field__input"
              type="number"
              value={form.age}
              onChange={(e) => set("age", e.target.value)}
              min="1" max="120" step="1"
              placeholder={lbl("เช่น 25", "e.g. 25")}
            />
          </div>
        </div>

        {/* ── Body measurements card ── */}
        <div className="profile-card">
          <div className="profile-card__header">
            <div className="profile-card__icon-wrap" style={{ "--card-accent": "#13a87e" }}>
              <span>📏</span>
            </div>
            <div>
              <h2 className="profile-card__title">{lbl("ขนาดร่างกาย", "Body Measurements")}</h2>
              <p className="profile-card__sub">{lbl("น้ำหนักและส่วนสูง", "Weight & height")}</p>
            </div>
          </div>

          <div className="profile-field-row">
            {/* Weight */}
            <div className="profile-field">
              <label htmlFor="pf-weight" className="profile-field__label">
                {lbl("น้ำหนัก", "Weight")}
              </label>
              <div className="profile-input-wrap">
                <input
                  id="pf-weight"
                  className="profile-field__input"
                  type="number"
                  value={form.weight}
                  onChange={(e) => set("weight", e.target.value)}
                  min="1" max="499" step="0.1"
                  placeholder="65"
                />
                <span className="profile-input-unit">kg</span>
              </div>
            </div>

            {/* Height */}
            <div className="profile-field">
              <label htmlFor="pf-height" className="profile-field__label">
                {lbl("ส่วนสูง", "Height")}
              </label>
              <div className="profile-input-wrap">
                <input
                  id="pf-height"
                  className="profile-field__input"
                  type="number"
                  value={form.height}
                  onChange={(e) => set("height", e.target.value)}
                  min="1" max="299" step="0.1"
                  placeholder="170"
                />
                <span className="profile-input-unit">cm</span>
              </div>
            </div>
          </div>

          {/* Live BMI preview */}
          {liveBmi && (
            <div className="profile-bmi-preview" style={{ "--bmi-color": bmiColor }}>
              <div className="profile-bmi-preview__bar">
                <div className="profile-bmi-preview__seg seg--thin" />
                <div className="profile-bmi-preview__seg seg--normal" />
                <div className="profile-bmi-preview__seg seg--fat" />
                <div className="profile-bmi-preview__seg seg--obese" />
                <div
                  className="profile-bmi-preview__dot"
                  style={{
                    left: `${Math.min(Math.max(((liveBmi - 10) / 30) * 100, 2), 98)}%`,
                    background: bmiColor,
                  }}
                />
              </div>
              <div className="profile-bmi-preview__info">
                <span style={{ color: bmiColor }}>
                  BMI {liveBmi.toFixed(1)}
                </span>
                <span className="profile-bmi-preview__cat" style={{ color: bmiColor }}>
                  {language === "th"
                    ? { thin:"ผอมเกินไป", normal:"ปกติ", fat:"น้ำหนักเกิน", obese:"อ้วน" }[liveCat?.key]
                    : { thin:"Underweight", normal:"Normal", fat:"Overweight", obese:"Obese" }[liveCat?.key]}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Activity card ── */}
        <div className="profile-card">
          <div className="profile-card__header">
            <div className="profile-card__icon-wrap" style={{ "--card-accent": "#f4772e" }}>
              <span>⚡</span>
            </div>
            <div>
              <h2 className="profile-card__title">{lbl("ระดับกิจกรรม", "Activity Level")}</h2>
              <p className="profile-card__sub">{lbl("สำหรับคำนวณ TDEE อัตโนมัติ", "Used for automatic TDEE calculation")}</p>
            </div>
          </div>

          <div className="profile-activity-grid">
            {ACTIVITY_LEVELS.map((act) => {
              const meta = ACTIVITY_META.find((m) => m.key === act.key);
              return (
                <button
                  key={act.key}
                  type="button"
                  className={`profile-activity-btn ${form.activityLevel === act.key ? "profile-activity-btn--active" : ""}`}
                  style={{ "--act-color": meta?.color ?? "#246afe" }}
                  onClick={() => set("activityLevel", act.key)}
                  aria-pressed={form.activityLevel === act.key}
                >
                  <span className="profile-activity-btn__icon">{meta?.icon}</span>
                  <span className="profile-activity-btn__label">
                    {language === "th" ? act.label : act.key.replace("_", " ")}
                  </span>
                  <span className="profile-activity-btn__desc">
                    {language === "th" ? act.description : act.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Action bar ── */}
        <div className="profile-actions">
          <button type="submit" className={`profile-save-btn ${saved ? "profile-save-btn--saved" : ""}`}>
            {saved ? (
              <>
                <span>✓</span>
                <span>{lbl("บันทึกแล้ว!", "Saved!")}</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>{lbl("บันทึกโปรไฟล์", "Save Profile")}</span>
              </>
            )}
            <span className="profile-save-btn__shine" />
          </button>

          <div className="profile-quick-links">
            <span className="profile-quick-links__label">
              {lbl("ไปใช้งานเลย →", "Go use it now →")}
            </span>
            {[
              { to:"/bmi",       icon:"📊", label:"BMI" },
              { to:"/tdee",      icon:"⚡", label:"TDEE" },
              { to:"/water",     icon:"💧", label:lbl("น้ำ","Water") },
              { to:"/dashboard", icon:"✦",  label:lbl("แดชบอร์ด","Dashboard") },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="profile-quick-link">
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="profile-clear-btn"
            onClick={() => setShowClear(true)}
          >
            {lbl("ล้างข้อมูลทั้งหมด", "Clear All Data")}
          </button>
        </div>
      </form>

      {/* ── Confirm clear modal ── */}
      {showClear && (
        <div className="profile-modal-backdrop" onClick={() => setShowClear(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal__icon">🗑️</div>
            <h3>{lbl("ล้างข้อมูลทั้งหมด?", "Clear all data?")}</h3>
            <p>
              {lbl(
                "ข้อมูลโปรไฟล์ทั้งหมดจะถูกลบออก ไม่สามารถกู้คืนได้",
                "All profile data will be permanently deleted"
              )}
            </p>
            <div className="profile-modal__btns">
              <button className="profile-modal__cancel" onClick={() => setShowClear(false)}>
                {lbl("ยกเลิก", "Cancel")}
              </button>
              <button className="profile-modal__confirm" onClick={handleClear}>
                {lbl("ล้างข้อมูล", "Clear")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
