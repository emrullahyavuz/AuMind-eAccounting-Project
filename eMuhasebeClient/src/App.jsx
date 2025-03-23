import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import CariHareketleri from "./components/cari-hareketleri";
import LoginForm from "./components/Auth/LoginForm";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm";
import Header from "./components/Header/Header";
import UsersPage from "./pages/Admin/Users";
import InvoicesPage from "./pages/Admin/Invoices";

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
        <div className={`content ${sidebarOpen ? "sidebar-open" : "!ml-[64px]"}`}>
          <Header />
          <Router>
            <Sidebar toggleSidebar={toggleSidebar} />
            <main className="">
            <Routes>
              <Route path="/cari-hareketleri" element={<CariHareketleri />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/" element={<Navigate to="/auth/login" replace />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
            </Routes>
            </main>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
