import { useState } from "react"
import { Search, Edit, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react"

function Products() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  
  const products = [
    // apiden gelecek ürün verileri
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleAddProduct = (productData) => {
    console.log("Yeni ürün eklendi:", productData)
   
  }

  // Örnek görünüm için
  const emptyRows = Array.from({ length: 6 }).map((_, index) => ({
    id: `empty-${index}`,
    name: "",
    input: "",
    output: "",
    balance: "",
  }))

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Başlık */}
      <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">Ürünler</h1>

      {/* Üst Araç Çubuğu */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Ürün Ekle
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Ürün Adı Giriniz..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Ürünler Tablosu */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* Tablo Başlığı */}
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="w-12 p-3 text-left">
                  <Edit size={18} />
                </th>
                <th className="p-3 text-left">
                  <span className="text-yellow-400"># Numara</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-yellow-400">Ürün Adı</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-yellow-400">Giriş</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-yellow-400">Çıkış</span>
                </th>
                <th className="p-3 text-left">
                  <span className="text-yellow-400">Bakiye</span>
                </th>
                <th className="p-3 text-center">
                  <span className="text-yellow-400">İşlemler</span>
                </th>
                <th className="w-12 p-3 text-center">
                  <Trash2 size={18} className="text-red-500 mx-auto" />
                </th>
              </tr>
            </thead>

            {/* Tablo Gövdesi */}
            <tbody>
              {emptyRows.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="p-3">
                    <button className="bg-blue-500 text-white p-1 rounded">
                      <Edit size={18} />
                    </button>
                  </td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3 text-center">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded-md text-sm">
                      Detay Gör
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="h-5 w-5 border-2 border-red-500 rounded focus:ring-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sayfalama */}
      <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
        <button className="p-1 mr-2">
          <ChevronLeft size={18} />
        </button>

        <span>1-50 arası gösteriliyor.</span>

        <button className="p-1 ml-2 flex items-center">
          <span>Devam et</span>
          <ChevronRight size={18} className="ml-1" />
        </button>
      </div>

      {/* Ürün Ekleme Modalı */}
      {/* <UrunEkleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddProduct={handleAddProduct} /> */}
    </div>
  )
}

export default Products
