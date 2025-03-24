import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import PropTypes from "prop-types"

function DownloadMessage({ isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 text-[18px] bg-gray-200 rounded-lg p-4 flex items-center shadow-lg z-50">
      <CheckCircle size={24} className="text-green-500 mr-2" />
      <span className="text-gray-800 font-medium">Dosya Başarıyla İndirildi!</span>
      <button onClick={onClose} className="ml-4 text-gray-600 hover:text-gray-800">
        <X size={18} />
      </button>
    </div>
  )
}

export default DownloadMessage

DownloadMessage.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
