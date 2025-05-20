import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { AccountingBotProvider } from "./context/AccountingBotContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastProvider>
      <AccountingBotProvider>
        <App />
      </AccountingBotProvider>
    </ToastProvider>
  </Provider>
);
