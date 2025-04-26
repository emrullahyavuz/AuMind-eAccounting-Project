import { useEffect, useState } from "react"
import { X } from "lucide-react"

const initialFormData = {
  cashName: "",
  currencyType: "",
  transactionNumber: "",
  input: 0,
  output: 0,
  balance: 0,
}

function CashModal({ isOpen,isEditMode,cash, onClose, onAddCash }) {
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => {
    if (isEditMode && cash) {
      setFormData({
        cashName: cash.name || "",
        currencyType: cash.type || "",
        transactionNumber: cash.transactionNumber || "",
        input: String(cash.inflow || 0).replace(/[^\d.-]/g, ''),
        output: String(cash.checkout || 0).replace(/[^\d.-]/g, ''),
        balance: String(cash.balance || 0).replace(/[^\d.-]/g, ''),
      })
    } else {
      setFormData(initialFormData)
    }
  }, [isEditMode, cash])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddCash(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4 underline">
          {isEditMode ? "Kasa Düzenle" : "Kasa Ekle"}
          </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Kasa Adı</label>
            <input
              type="text"
              name="cashName"
              value={formData.cashName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Döviz Tipi</label>
            <input
              type="text"
              name="currencyType"
              value={formData.currencyType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">İşlem Numarası</label>
            <input
              type="text"
              name="transactionNumber"
              value={formData.transactionNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Giriş</label>
              <input
                type="number"
                name="input"
                value={formData.input}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Çıkış</label>
              <input
                type="number"
                name="output"
                value={formData.output}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Bakiye</label>
              <input
                type="number"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {isEditMode ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CashModal
