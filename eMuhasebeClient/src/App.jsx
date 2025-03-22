import { useState } from "react";
import Sidebar from "./components/Sidebar";
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
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Header />
          <Router>
            <Routes>
              <Route path="/cari-hareketleri" element={<CariHareketleri />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/" element={<Navigate to="/auth/login" replace />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/invoices" element={<InvoicesPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
