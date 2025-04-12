import { useState } from "react"
import { X, Calendar } from "lucide-react"

function CashTransactionModal({ isOpen, onClose, onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    cariName: "",
    description: "",
    transactionNumber: "",
    input: "",
    output: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTransaction(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4 underline">Kasa Hareketi Ekleme</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Tarih</label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Tarih seçiniz..."
                className="w-full border border-gray-300 rounded-md p-2 bg-white pr-10"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Ekleyen Cari Adı</label>
            <input
              type="text"
              name="cariName"
              value={formData.cariName}
              onChange={handleChange}
              placeholder="Ekleyen cari adı giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Açıklama</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Açıklama giriniz..."
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
              placeholder="İşlem numarası giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
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
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Kasa Hareketi Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CashTransactionModal
