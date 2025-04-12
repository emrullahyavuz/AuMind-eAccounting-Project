import { X } from "lucide-react"

function DeleteAlert({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <p className="text-gray-800 font-medium">Bu kullanıcıyı/kullanıcıları kaldırmak istediğinize emin misiniz?</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-8 rounded-md"
          >
            KALDIR
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlert
