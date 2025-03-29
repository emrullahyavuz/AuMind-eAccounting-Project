import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

function Toast({ message, type = "info", onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Animasyon tamamlandıktan sonra kaldır
    }, 3000)

    // cleanup function for useEffect
    return () => clearTimeout(timer)
  }, [onClose])

  // Toast tiplerine göre stil ve ikon belirleme
  const toastStyles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-800",
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
  }

  const style = toastStyles[type] || toastStyles.info

  return (
    <div
      className={`${style.bg} ${style.border} ${style.text} border-l-4 p-4 rounded shadow-md flex items-center justify-between max-w-md transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center">
        {style.icon}
        <span className="ml-2 font-medium">{message}</span>
      </div>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default Toast

