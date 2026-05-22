import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { calculateProgress } from "../utils/waterCalculator";
import { BMI_CATEGORIES } from "../utils/constants";
import "./DashboardPage.css";

// ── helpers ────────────────────────────────────────────────
function readLS(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const BMI_LABELS = {
  thin:   { th: "ผอมเกินไป",  en: "Underweight" },
  normal: { th: "ปกติ",       en: "Normal" },
  fat:    { th: "น้ำหนักเกิน", en: "Overweight" },
  obese:  { th: "อ้วน",       en: "Obese" },
};

const BMI_COLORS = {
  thin: "#5f95ff", normal: "#16a37a", fat: "#f59f24", obese: "#ef4e4e",
};

function getCategoryByKey(key) {
  return BMI_CATEGORIES.find((c) => c.key === key) ?? null;
}

// ── read all dashboard data from localStorage ─────────────
function useDashboardData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const weight     = localStorage.getItem("waterTracker_weight");
    const waterGoal  = localStorage.getItem("waterTracker_goal");
    const waterIntakeRaw = localStorage.getItem("waterTracker_intake");
    const waterHistory   = readLS("waterTracker_history", []);

    let currentWaterIntake = 0;
    if (waterIntakeRaw) {
      const parsed = JSON.parse(waterIntakeRaw);
      const today  = new Date().toDateString();
      if (parsed.date === today) currentWaterIntake = parsed.amount;
    }

    const tdeeResult = readLS("healtier_tdee_result", null);
    const bmiResult  = readLS("healtier_bmi_result",  null);

    // water streak (newest-first history)
    let streak = 0;
    for (const h of waterHistory) {
      if (h.progress >= 100) streak++;
      else break;
    }

    setData({
      weight: weight ? parseFloat(weight) : null,
      waterGoal: waterGoal ? parseFloat(waterGoal) : null,
      currentWaterIntake,
      waterHistory,
      waterStreak: streak,
      tdeeResult,
      bmiResult,
    });
  }, []);

  return data;
}

// ── animated counter ──────────────────────────────────────
function AnimatedNumber({ value, decimals = 0, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const rafRef   = useRef(null);

  useEffect(() => {
    if (value === null || value === undefined) return;
    const endVal   = parseFloat(value);
    const duration = 1200;

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplay(endVal * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    startRef.current = null;
    rafRef.current   = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  if (value === null || value === undefined) return <span>—</span>;
  return (
    <span>
      {Number.isInteger(parseFloat(value)) && decimals === 0
        ? Math.round(display).toLocaleString()
        : display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ── circular progress ring ────────────────────────────────
function CircularProgress({ percent, color, size = 130, stroke = 11 }) {
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (Math.min(percent, 100) / 100) * circ;

  return (
    <svg width={size} height={size} className="dash-ring">
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke="rgba(216,226,251,0.45)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </svg>
  );
}

// ── main ──────────────────────────────────────────────────
export default function DashboardPage() {
  const { language } = useLanguage();
  const data = useDashboardData();

  const lbl = (th, en) => (language === "th" ? th : en);

  // scroll reveal
  useEffect(() => {
    if (!data) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("dash-visible")),
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll("[data-dash-aos]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [data]);

  if (!data) return null;

  const waterPct = data.waterGoal
    ? calculateProgress(data.currentWaterIntake, data.waterGoal)
    : 0;

  // BMI
  const bmiStored  = data.bmiResult;
  const bmiVal     = bmiStored?.bmi ?? null;
  const bmiCatKey  = bmiStored?.categoryKey ?? null;
  const bmiCatObj  = bmiCatKey ? getCategoryByKey(bmiCatKey) : null;
  const bmiColor   = bmiCatKey ? (BMI_COLORS[bmiCatKey] ?? "#246afe") : "#246afe";
  const bmiLabel   = bmiCatKey ? (BMI_LABELS[bmiCatKey]?.[language] ?? bmiCatObj?.label) : null;

  // TDEE
  const tdee = data.tdeeResult;

  const hasAnyData = data.weight || bmiVal || tdee || data.waterGoal;

  // Day-of-week labels for mini bar chart
  const dayLabels = language === "th"
    ? ["อา","จ","อ","พ","พฤ","ศ","ส"]
    : ["Su","Mo","Tu","We","Th","Fr","Sa"];

  // Build last-7-days bars (history newest-first)
  const today    = new Date();
  const last7Bars = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const key     = d.toDateString();
    const hist    = data.waterHistory.find((h) => h.date === key);
    const isToday = i === 6;
    let pct = 0;
    if (isToday && data.waterGoal) {
      pct = calculateProgress(data.currentWaterIntake, data.waterGoal);
    } else if (hist) {
      pct = hist.progress ?? 0;
    }
    return { day: dayLabels[d.getDay()], pct, isToday };
  });

  return (
    <div className="dash-page">
      {/* ── Ambient orbs ── */}
      <div className="dash-bg" aria-hidden="true">
        <div className="dash-orb dash-orb--1" />
        <div className="dash-orb dash-orb--2" />
        <div className="dash-orb dash-orb--3" />
      </div>

      {/* ── Hero header ── */}
      <section className="dash-hero" data-dash-aos>
        <div className="dash-hero__eyebrow">
          <span className="dash-pulse" />
          <span>{lbl("แดชบอร์ด", "Dashboard")}</span>
        </div>
        <h1 className="dash-hero__title">
          {lbl("ภาพรวม", "Your Health")}
          <span className="dash-hero__title-accent">
            {" "}{lbl("สุขภาพ", "Overview")}
          </span>
        </h1>
        <p className="dash-hero__sub">
          {lbl(
            "สรุปข้อมูลสุขภาพทั้งหมดของคุณในที่เดียว",
            "All your health metrics in one beautiful view"
          )}
        </p>
        <div className="dash-hero__date">
          {new Date().toLocaleDateString(language === "th" ? "th-TH" : "en-US", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
          })}
        </div>
      </section>

      {/* ── Empty state ── */}
      {!hasAnyData && (
        <section className="dash-empty" data-dash-aos>
          <div className="dash-empty__icon">🌱</div>
          <h2>{lbl("ยังไม่มีข้อมูล", "No data yet")}</h2>
          <p>
            {lbl(
              "เริ่มต้นใช้งานเครื่องมือด้านล่างเพื่อดูสรุปสุขภาพของคุณที่นี่",
              "Start using the tools below to see your health summary here"
            )}
          </p>
          <div className="dash-empty__links">
            {[
              { to: "/bmi",   icon: "📊", label: "BMI" },
              { to: "/tdee",  icon: "⚡", label: "TDEE" },
              { to: "/water", icon: "💧", label: lbl("น้ำ","Water") },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="dash-empty__link">
                <span>{l.icon}</span> {l.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          PRIMARY METRICS CARDS
      ══════════════════════════════════════════════════════ */}
      {hasAnyData && (
        <section className="dash-metrics" data-dash-aos>

          {/* ─── BMI ─── */}
          <div className={`dash-card dash-card--bmi ${!bmiVal ? "dash-card--empty" : ""}`}>
            <div className="dash-card__header">
              <div className="dash-card__icon-wrap" style={{ "--card-color": bmiColor }}>
                <span>📊</span>
              </div>
              <div className="dash-card__label-group">
                <span className="dash-card__eyebrow">BMI</span>
                <span className="dash-card__name">
                  {lbl("ดัชนีมวลกาย", "Body Mass Index")}
                </span>
              </div>
            </div>

            {bmiVal ? (
              <>
                <div className="dash-bmi__main">
                  <div className="dash-ring-wrap">
                    <CircularProgress
                      percent={Math.min((bmiVal / 40) * 100, 100)}
                      color={bmiColor}
                    />
                    <div className="dash-ring-center">
                      <strong style={{ color: bmiColor }}>
                        <AnimatedNumber value={bmiVal} decimals={1} />
                      </strong>
                      <span>BMI</span>
                    </div>
                  </div>
                  <div className="dash-bmi__info">
                    {bmiLabel && (
                      <div className="dash-badge" style={{ "--badge-color": bmiColor }}>
                        {bmiLabel}
                      </div>
                    )}
                    {bmiStored?.weight && (
                      <div className="dash-stat-row">
                        <span>{lbl("น้ำหนัก","Weight")}</span>
                        <strong>{bmiStored.weight} kg</strong>
                      </div>
                    )}
                    {bmiStored?.height && (
                      <div className="dash-stat-row">
                        <span>{lbl("ส่วนสูง","Height")}</span>
                        <strong>{bmiStored.height} cm</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* BMI scale bar */}
                <div className="dash-bmi-scale">
                  <div className="dash-bmi-scale__track">
                    <div className="dash-bmi-scale__seg seg--thin" />
                    <div className="dash-bmi-scale__seg seg--normal" />
                    <div className="dash-bmi-scale__seg seg--fat" />
                    <div className="dash-bmi-scale__seg seg--obese" />
                    <div
                      className="dash-bmi-scale__dot"
                      style={{
                        left: `${Math.min(Math.max(((bmiVal - 10) / 30) * 100, 2), 98)}%`,
                        background: bmiColor,
                      }}
                    />
                  </div>
                  <div className="dash-bmi-scale__labels">
                    <span>10</span><span>18.5</span><span>23</span><span>25</span><span>40+</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="dash-card__cta">
                <p>{lbl("ยังไม่ได้คำนวณ BMI", "BMI not calculated yet")}</p>
                <Link to="/bmi" className="dash-btn">
                  {lbl("คำนวณเลย →", "Calculate →")}
                </Link>
              </div>
            )}

            <Link to="/bmi" className="dash-card__footer-link">
              {lbl("ไปหน้า BMI","Go to BMI")} →
            </Link>
          </div>

          {/* ─── Water ─── */}
          <div className={`dash-card dash-card--water ${!data.waterGoal ? "dash-card--empty" : ""}`}>
            <div className="dash-card__header">
              <div className="dash-card__icon-wrap" style={{ "--card-color": "#00b4d8" }}>
                <span>💧</span>
              </div>
              <div className="dash-card__label-group">
                <span className="dash-card__eyebrow">{lbl("น้ำ","Water")}</span>
                <span className="dash-card__name">
                  {lbl("การดื่มน้ำวันนี้","Today's Hydration")}
                </span>
              </div>
            </div>

            {data.waterGoal ? (
              <>
                <div className="dash-water__main">
                  <div className="dash-ring-wrap">
                    <CircularProgress percent={waterPct} color="#00b4d8" />
                    <div className="dash-ring-center">
                      <strong style={{ color: "#00b4d8" }}>
                        <AnimatedNumber value={waterPct} decimals={0} suffix="%" />
                      </strong>
                      <span>{lbl("สำเร็จ","done")}</span>
                    </div>
                  </div>
                  <div className="dash-water__info">
                    <div className="dash-stat-row">
                      <span>{lbl("ดื่มแล้ว","Consumed")}</span>
                      <strong>{(data.currentWaterIntake / 1000).toFixed(2)} L</strong>
                    </div>
                    <div className="dash-stat-row">
                      <span>{lbl("เป้าหมาย","Goal")}</span>
                      <strong>{(data.waterGoal / 1000).toFixed(2)} L</strong>
                    </div>
                    <div className="dash-stat-row">
                      <span>{lbl("เหลืออีก","Remaining")}</span>
                      <strong>
                        {(Math.max(0, data.waterGoal - data.currentWaterIntake) / 1000).toFixed(2)} L
                      </strong>
                    </div>
                    {data.waterStreak > 0 && (
                      <div className="dash-streak">
                        🔥 {data.waterStreak} {lbl("วันติดต่อกัน","day streak")}
                      </div>
                    )}
                  </div>
                </div>

                {/* 7-day bar chart */}
                <div className="dash-mini-chart">
                  <div className="dash-mini-chart__title">
                    {lbl("7 วันล่าสุด","Last 7 days")}
                  </div>
                  <div className="dash-mini-chart__bars">
                    {last7Bars.map((b, i) => (
                      <div key={i} className="dash-bar-col">
                        <div className="dash-bar-wrap">
                          <div
                            className={`dash-bar ${b.isToday ? "dash-bar--today" : ""} ${b.pct >= 100 ? "dash-bar--full" : ""}`}
                            style={{ "--bar-h": `${Math.max(b.pct, 4)}%` }}
                          />
                        </div>
                        <span className={b.isToday ? "dash-bar-label--today" : ""}>
                          {b.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="dash-card__cta">
                <p>{lbl("ยังไม่ได้ตั้งค่าการดื่มน้ำ","Water tracker not set up yet")}</p>
                <Link to="/water" className="dash-btn dash-btn--water">
                  {lbl("เริ่มติดตาม →","Start Tracking →")}
                </Link>
              </div>
            )}

            <Link to="/water" className="dash-card__footer-link">
              {lbl("ไปหน้าน้ำ","Go to Water")} →
            </Link>
          </div>

          {/* ─── TDEE ─── */}
          <div className={`dash-card dash-card--tdee ${!tdee ? "dash-card--empty" : ""}`}>
            <div className="dash-card__header">
              <div className="dash-card__icon-wrap" style={{ "--card-color": "#13a87e" }}>
                <span>⚡</span>
              </div>
              <div className="dash-card__label-group">
                <span className="dash-card__eyebrow">TDEE</span>
                <span className="dash-card__name">
                  {lbl("พลังงานต่อวัน","Daily Energy")}
                </span>
              </div>
            </div>

            {tdee ? (
              <>
                <div className="dash-tdee__main">
                  <div className="dash-energy-display">
                    <AnimatedNumber value={tdee.tdee} decimals={0} />
                    <span className="dash-energy-unit">kcal</span>
                  </div>
                  <div className="dash-stat-row">
                    <span>BMR</span>
                    <strong>{Math.round(tdee.bmr).toLocaleString()} kcal</strong>
                  </div>
                </div>

                {/* Macro pills */}
                <div className="dash-macros">
                  {[
                    { cls: "protein", label: lbl("โปรตีน","Protein"), val: tdee.protein },
                    { cls: "carbs",   label: lbl("คาร์บ","Carbs"),    val: tdee.carbs   },
                    { cls: "fat",     label: lbl("ไขมัน","Fat"),       val: tdee.fat     },
                  ].map((m) => (
                    <div key={m.cls} className={`dash-macro dash-macro--${m.cls}`}>
                      <div className="dash-macro__bar" />
                      <span className="dash-macro__label">{m.label}</span>
                      <strong className="dash-macro__val">{Math.round(m.val)}g</strong>
                    </div>
                  ))}
                </div>

                {/* Calorie goal chips */}
                <div className="dash-goals">
                  {[
                    { key:"lose",     th:"ลดน้ำหนัก", en:"Lose",     delta:-500, color:"#5f95ff" },
                    { key:"maintain", th:"คงน้ำหนัก", en:"Maintain", delta:0,    color:"#13a87e" },
                    { key:"gain",     th:"เพิ่มกล้าม", en:"Gain",     delta:300,  color:"#f4772e" },
                  ].map((g) => (
                    <div key={g.key} className="dash-goal-chip" style={{ "--goal-color": g.color }}>
                      <span>{language === "th" ? g.th : g.en}</span>
                      <strong>{(tdee.tdee + g.delta).toLocaleString()}</strong>
                      <small>kcal</small>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="dash-card__cta">
                <p>{lbl("ยังไม่ได้คำนวณ TDEE","TDEE not calculated yet")}</p>
                <Link to="/tdee" className="dash-btn dash-btn--tdee">
                  {lbl("คำนวณเลย →","Calculate →")}
                </Link>
              </div>
            )}

            <Link to="/tdee" className="dash-card__footer-link">
              {lbl("ไปหน้า TDEE","Go to TDEE")} →
            </Link>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          QUICK TOOLS
      ══════════════════════════════════════════════════════ */}
      <section className="dash-tools" data-dash-aos>
        <div className="dash-section-header">
          <span className="dash-section-badge">{lbl("เครื่องมือ","Tools")}</span>
          <h2>{lbl("เข้าถึงเครื่องมือ","Quick Access")}</h2>
        </div>

        <div className="dash-tools__grid">
          {[
            { to:"/bmi",       icon:"📊", gradient:"linear-gradient(135deg,#667eea,#764ba2)",
              th:"BMI Calculator",    en:"BMI Calculator",
              desc_th:"คำนวณดัชนีมวลกาย",     desc_en:"Body mass index" },
            { to:"/tdee",      icon:"⚡", gradient:"linear-gradient(135deg,#f093fb,#f5576c)",
              th:"TDEE Calculator",   en:"TDEE Calculator",
              desc_th:"พลังงานที่ใช้ต่อวัน",  desc_en:"Daily energy needs" },
            { to:"/nutrition", icon:"🍎", gradient:"linear-gradient(135deg,#4facfe,#00f2fe)",
              th:"Nutrition Lookup",  en:"Nutrition Lookup",
              desc_th:"ค้นหาโภชนาการอาหาร",  desc_en:"Search food nutrition" },
            { to:"/water",     icon:"💧", gradient:"linear-gradient(135deg,#00b4d8,#0077b6)",
              th:"Water Tracker",     en:"Water Tracker",
              desc_th:"ติดตามการดื่มน้ำ",     desc_en:"Track water intake" },
          ].map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="dash-tool-card"
              style={{ "--tool-gradient": tool.gradient }}
            >
              <div className="dash-tool-card__shine" />
              <div className="dash-tool-card__glow" />
              <div className="dash-tool-card__icon">{tool.icon}</div>
              <div className="dash-tool-card__text">
                <strong>{language === "th" ? tool.th : tool.en}</strong>
                <span>{language === "th" ? tool.desc_th : tool.desc_en}</span>
              </div>
              <div className="dash-tool-card__arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HEALTH TIPS
      ══════════════════════════════════════════════════════ */}
      <section className="dash-tips" data-dash-aos>
        <div className="dash-section-header">
          <span className="dash-section-badge">{lbl("เคล็ดลับ","Tips")}</span>
          <h2>{lbl("เคล็ดลับสุขภาพวันนี้","Today's Health Tips")}</h2>
        </div>

        <div className="dash-tips__grid">
          {[
            { icon:"🏃", color:"#667eea",
              th:"ออกกำลังกาย", en:"Exercise",
              desc_th:"ออกกำลังกายอย่างน้อย 30 นาที 5 วันต่อสัปดาห์เพื่อสุขภาพที่ดี",
              desc_en:"Exercise at least 30 min, 5 days/week for optimal health" },
            { icon:"🥗", color:"#13a87e",
              th:"โภชนาการ", en:"Nutrition",
              desc_th:"กินผักและผลไม้หลากสีสันเพื่อให้ได้สารอาหารครบถ้วน",
              desc_en:"Eat colorful vegetables and fruits for complete nutrients" },
            { icon:"😴", color:"#764ba2",
              th:"นอนหลับ", en:"Sleep",
              desc_th:"นอนหลับ 7-9 ชั่วโมงต่อคืนช่วยฟื้นฟูร่างกายและจิตใจ",
              desc_en:"Sleep 7-9 hours per night to restore body and mind" },
            { icon:"🧘", color:"#f4772e",
              th:"ผ่อนคลาย", en:"Relax",
              desc_th:"ฝึกหายใจลึกๆ หรือนั่งสมาธิเพื่อลดความเครียดในชีวิตประจำวัน",
              desc_en:"Practice deep breathing or meditation to reduce daily stress" },
          ].map((tip, i) => (
            <div
              key={i}
              className="dash-tip-card"
              style={{ "--tip-color": tip.color }}
              data-dash-aos
            >
              <div className="dash-tip-card__icon">{tip.icon}</div>
              <div className="dash-tip-card__body">
                <strong>{language === "th" ? tip.th : tip.en}</strong>
                <p>{language === "th" ? tip.desc_th : tip.desc_en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
