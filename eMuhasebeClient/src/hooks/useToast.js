import { useContext } from "react"
import { ToastContext } from "../context/ToastContext"

// Toast Custom hook
export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
      throw new Error("useToast hook'u ToastProvider içinde kullanılmalıdır")
    }
    return context
  }
  