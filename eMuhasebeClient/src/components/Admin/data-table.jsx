import { useState } from "react"
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import PropTypes from "prop-types"
// Genel tablo bileşeni - hem kullanıcılar hem de faturalar için 
function DataTable({
  title,
  addButtonText,
  columns,
  data,
  searchPlaceholder = "İsim Giriniz...",
  onAdd,
  onEdit,
  onDelete,
  onSearch,
  itemsPerPage = 50,
  currentPage = 1,
  totalItems = 0,
  onPageChange,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState([])

  // Arama işlemi
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  // Checkbox işlemleri
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="bg-gray-100 p-6 rounded-md">
      {/* Başlık */}
      <h1 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">{title}</h1>

      {/* Üst Araç Çubuğu */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onAdd}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-1" />
          {addButtonText}
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Tablo Başlığı */}
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="w-12 p-3 text-left">
                <Edit size={18} />
              </th>
              {columns.map((column, index) => (
                <th key={index} className={`p-3 text-left ${column.className || ""}`}>
                  {column.header}
                </th>
              ))}
              <th className="w-12 p-3 text-center">
                <Trash2 size={18} className="text-red-500 mx-auto" />
              </th>
            </tr>
          </thead>

          {/* Tablo Gövdesi */}
          <tbody>
            {data.length > 0
              ? data.map((item, rowIndex) => (
                  <tr key={item.id || rowIndex} className="border-b border-gray-300 hover:bg-gray-200">
                    <td className="p-3">
                      <button onClick={() => onEdit(item)} className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                    </td>

                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className={`p-3 ${column.className || ""}`}>
                        {item[column.accessor]}
                      </td>
                    ))}

                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleSelectItem(item.id)}
                          className="h-5 w-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              : // Veri yoksa boş satırları göster
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                    </td>

                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-3"></td>
                    ))}

                    <td className="p-3 text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          disabled
                          className="h-5 w-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Sayfalama */}
      <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 mr-2 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        <span>
          {startItem}-{endItem} arası gösteriliyor.{" "}
        </span>

        {totalPages > 1 && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 ml-2 disabled:opacity-50"
          >
            <span>Devam et</span>
            <ChevronRight size={18} className="inline ml-1" />
          </button>
        )}
      </div>
    </div>
  )
}

export default DataTable


DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  addButtonText: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  searchPlaceholder: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSearch: PropTypes.func,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,

} 
