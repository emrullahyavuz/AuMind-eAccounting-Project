import { createContext, useState } from "react"
import Toast from "../components/Toast"
import PropTypes from "prop-types"

// Toast Context oluşturma
export const ToastContext = createContext()

// Toast Provider bileşeni
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Yeni toast ekle
  const showToast = (message, type = "info", duration = 3000) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])

    // Belirtilen süre sonra toast'u kaldır
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  // Toast'u kaldır
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Context values
  const value = {
    showToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}


