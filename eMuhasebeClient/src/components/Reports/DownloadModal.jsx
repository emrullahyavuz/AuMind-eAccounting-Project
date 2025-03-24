import { useState } from "react"
import { Download, X } from "lucide-react"
import PropTypes from "prop-types"

function DownloadModal({ isOpen, onClose, onDownload }) {
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const handleDownload = () => {
    onDownload(selectedFormat)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-4 max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <X size={20} />
        </button>

        <div className="text-center mb-4 mt-4">
          <p className="text-gray-800 font-medium">Raporu indirmek istediğiniz formatı seçiniz (PDF, PNG, JPG, WORD)</p>
        </div>

        <div className="mb-4">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="pdf">PDF</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="word">WORD</option>
          </select>
        </div>

        <button onClick={handleDownload} className="w-full bg-yellow-400 hover:bg-cyan-600 text-white py-2 rounded">
          İndir
        </button>
      </div>
    </div>
  )
}

export default DownloadModal

DownloadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
}

