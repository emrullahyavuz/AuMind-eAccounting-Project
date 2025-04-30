import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import CariHareketleri from "./pages/CariHareketleri";
import LoginForm from "./components/Auth/LoginForm";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm";
import ConfirmEmail from "./components/Auth/ConfirmEmail";
import Header from "./components/Header/Header";
import UsersPage from "./pages/Admin/Users";
import InvoicesPage from "./pages/Admin/Invoices";
import SalesReportPage from "./pages/SalesReport";
import CompaniesPage from "./pages/Admin/Companies";
import Dashboard from "./pages/Dashboard";
import Cariler from "./pages/Cariler";
import BotSettingsPage from "./pages/settings/bot-settings";
import ChatPage from "./pages/Chat";
import CashPage from "./pages/Cash";
import CashTransactionPage from "./pages/CashTransaction";
import StockProfitability from "./pages/StockProfitability";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="app-container">
        <div
          className={`content ${sidebarOpen ? "sidebar-open" : "!ml-[64px]"}`}
        >
          <Header />
          <Sidebar toggleSidebar={toggleSidebar} />
          <main className="">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/auth/confirm-email" element={<ConfirmEmail />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/companies" element={<CompaniesPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/reports" element={<SalesReportPage />} />
              <Route path="/cariler" element={<Cariler />} />
              <Route path="/cari-hareketleri" element={<CariHareketleri />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/settings/bot" element={<BotSettingsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/safes" element={<CashPage />} />
              <Route path="/kasa-hareketleri" element={<CashTransactionPage />} />
              <Route path="/stok-karlilik" element={<StockProfitability />} />
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
