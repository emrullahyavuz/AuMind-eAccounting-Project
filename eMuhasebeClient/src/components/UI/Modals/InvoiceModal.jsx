import { useState } from "react"
import { X, Calendar, ChevronDown, Plus } from "lucide-react"

function InvoiceModal({ isOpen, onClose, onAddInvoice }) {
  const [formData, setFormData] = useState({
    invoiceType: "",
    date: "",
    customer: "",
    invoiceNumber: "",
    items: [],
  })

  const [newItem, setNewItem] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    total: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleItemChange = (e) => {
    const { name, value } = e.target

    // Eğer adet veya birim fiyat değişirse, toplamı otomatik hesapla
    const updatedItem = { ...newItem, [name]: value }

    if (name === "quantity" || name === "unitPrice") {
      const quantity = name === "quantity" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItem.quantity) || 0
      const unitPrice = name === "unitPrice" ? Number.parseFloat(value) || 0 : Number.parseFloat(newItem.unitPrice) || 0
      updatedItem.total = (quantity * unitPrice).toFixed(2)
    }

    setNewItem(updatedItem)
  }

  const addItem = () => {
    if (newItem.product && newItem.quantity && newItem.unitPrice) {
      setFormData({
        ...formData,
        items: [...formData.items, { ...newItem, id: Date.now() }],
      })
      setNewItem({
        product: "",
        quantity: "",
        unitPrice: "",
        total: "",
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddInvoice(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-3xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-2xl font-medium mb-6 underline">Fatura Ekleme</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Fatura Tipi</label>
              <div className="relative">
                <select
                  name="invoiceType"
                  value={formData.invoiceType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="satis">Satış Faturası</option>
                  <option value="alis">Alış Faturası</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Tarih</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white pr-10"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Müşteri</label>
              <div className="relative">
                <select
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="musteri1">Müşteri 1</option>
                  <option value="musteri2">Müşteri 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Fatura Numarası</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>
          </div>

          {/* Ürün Ekleme Alanı */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Ürün</label>
              <input
                type="text"
                name="product"
                value={newItem.product}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Adet</label>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Birim Fiyat</label>
              <input
                type="number"
                name="unitPrice"
                value={newItem.unitPrice}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Toplam</label>
              <input
                type="text"
                name="total"
                value={newItem.total}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">İşlemler</label>
              <button
                type="button"
                onClick={addItem}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md p-2 flex items-center justify-center"
              >
                <span>EKLE</span>
                <Plus size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Ürün Tablosu */}
          <div className="border-t border-b border-gray-400 py-2 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="py-2 text-left">#</th>
                  <th className="py-2 text-left">Ürün Adı</th>
                  <th className="py-2 text-left">Adet</th>
                  <th className="py-2 text-left">Birim Fiyat</th>
                  <th className="py-2 text-left">Toplam</th>
                  <th className="py-2 text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{item.product}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">{item.unitPrice}</td>
                    <td className="py-2">{item.total}</td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            items: formData.items.filter((i) => i.id !== item.id),
                          })
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
                {formData.items.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      Henüz ürün eklenmedi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-8 rounded-md"
            >
              FATURA EKLE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceModal
