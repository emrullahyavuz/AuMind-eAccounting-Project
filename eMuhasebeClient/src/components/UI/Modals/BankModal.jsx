import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

function BankModal({ isOpen, onClose, onAddBank }) {
  const [formData, setFormData] = useState({
    bankName: "",
    iban: "",
    currencyType: "",
    input: "",
    output: "",
    balance: "",
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
    onAddBank(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4 underline">Banka Ekleme</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Banka Adı</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Banka ismi giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">IBAN Numarası</label>
            <input
              type="text"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              placeholder="IBAN numarası giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Döviz Tipi</label>
            <div className="relative">
              <select
                name="currencyType"
                value={formData.currencyType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                placeholder="Döviz tipi seçiniz..."
                required
              >
                <option value="">Döviz tipi seçiniz...</option>
                <option value="TRY">TRY - Türk Lirası</option>
                <option value="USD">USD - Amerikan Doları</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - İngiliz Sterlini</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Giriş</label>
              <input
                type="number"
                name="input"
                value={formData.input}
                onChange={handleChange}
                placeholder="Tutar..."
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
                placeholder="Tutar..."
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Bakiye</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Banka Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BankModal
