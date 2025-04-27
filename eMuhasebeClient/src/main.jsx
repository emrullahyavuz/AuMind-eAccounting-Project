import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AccountingBotProvider } from "./context/AccountingBotContext.jsx";
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <AccountingBotProvider>
            <App />
          </AccountingBotProvider>
        </ToastProvider>
      </Router>
    </Provider>
  </StrictMode>,
);
