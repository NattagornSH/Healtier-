import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // โหลดภาษาจาก localStorage หรือใช้ 'th' เป็นค่าเริ่มต้น
    return localStorage.getItem("language") || "th";
  });

  useEffect(() => {
    // บันทึกภาษาลง localStorage เมื่อมีการเปลี่ยนแปลง
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "th" ? "en" : "th"));
  };

  const t = (translations) => {
    return translations[language] || translations.th;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
