import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/layout/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import BMIPage from "./pages/BMIPage.jsx";
import TDEEPage from "./pages/TDEEPage.jsx";
import NutritionPage from "./pages/NutritionPage.jsx";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <div className="app-shell">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bmi" element={<BMIPage />} />
              <Route path="/tdee" element={<TDEEPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
