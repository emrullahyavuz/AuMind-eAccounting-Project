import { useState } from "react"
import { X, ChevronDown } from "lucide-react"

function CariModal({ isOpen, onClose, onAddCari }) {
  const [formData, setFormData] = useState({
    cariName: "",
    type: "",
    province: "",
    address: "",
    taxOffice: "",
    taxNumber: "",
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
    onAddCari(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4">Cari Ekleme</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Cari Adı</label>
              <input
                type="text"
                name="cariName"
                value={formData.cariName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Tipi</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">İl/İlçe</label>
              <div className="relative">
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Adres</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Vergi Dairesi</label>
              <input
                type="text"
                name="taxOffice"
                value={formData.taxOffice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Vergi Numarası</label>
              <input
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Giriş</label>
              <input
                type="number"
                name="input"
                value={formData.input}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Çıkış</label>
              <input
                type="number"
                name="output"
                value={formData.output}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div className="mb-4 col-span-2">
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

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Cari Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CariModal
