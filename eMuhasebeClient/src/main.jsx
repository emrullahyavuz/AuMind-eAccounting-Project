import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountingBotProvider } from "./context/AccountingBotContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Router>
    <ToastProvider>
      <AuthProvider>
        <AccountingBotProvider>
          <App />
        </AccountingBotProvider>
      </AuthProvider>
    </ToastProvider>
  </Router>
  // </StrictMode>,
);
