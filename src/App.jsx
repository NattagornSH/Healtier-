import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import Navbar from "./components/layout/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import BMIPage from "./pages/BMIPage.jsx";
import TDEEPage from "./pages/TDEEPage.jsx";
import NutritionPage from "./pages/NutritionPage.jsx";
import WaterPage from "./pages/WaterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <div className="app-shell">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/bmi" element={<BMIPage />} />
                <Route path="/tdee" element={<TDEEPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/water" element={<WaterPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ProfileProvider>
    </LanguageProvider>
  );
}

export default App;

