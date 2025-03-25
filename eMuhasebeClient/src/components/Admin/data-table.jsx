import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PropTypes from "prop-types";

// Genel tablo bileşeni - hem kullanıcılar hem de faturalar için kullanılabilir
function DataTable({
  title,
  addButtonText,
  addButtonColor = "yellow", // Varsayılan buton rengi
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
  customButtons = null, // Özel butonlar için prop
  headerColor = "gray-700", // Tablo başlığı arka plan rengi
  headerTextColor = "white", // Tablo başlığı metin rengi
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Arama işlemi
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Checkbox işlemleri
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Buton rengi belirleme
  const buttonColorClass =
    addButtonColor === "yellow"
      ? "bg-yellow-300 hover:bg-yellow-400 text-gray-800"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div className="p-6 pt-0 bg-gray-100 min-h-screen">
      {/* Başlık */}
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">
        {title}
      </h1>

      {/* Üst Araç Çubuğu */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <button
            onClick={onAdd}
            className={`${buttonColorClass} font-medium py-2 px-4 rounded-md flex items-center`}
          >
            <Plus size={18} className="mr-1" />
            {addButtonText}
          </button>

          {/* Özel butonlar varsa göster */}
          <div className="custom-button ml-5">{customButtons}</div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearch}
            className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Search size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Tablo */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* Tablo Başlığı */}
          <thead>
            <tr className={`bg-${headerColor} text-${headerTextColor}`}>
              <th className="w-12 p-3 text-left">
                <Edit size={18} />
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`p-3 text-left ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
              <th className="w-12 p-3 text-center">
                <Trash2
                  size={22}
                  className="text-red-500 mx-auto cursor-pointer"
                />
              </th>
            </tr>
          </thead>

          {/* Tablo Gövdesi */}
          <tbody>
            {data.length > 0
              ? data.map((item, rowIndex) => (
                  <tr
                    key={item.id || rowIndex}
                    className="border-b border-gray-300 hover:bg-gray-200"
                  >
                    <td className="p-3">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-500 hover:text-blue-700 bg-blue-100 p-1 rounded"
                      >
                        <Edit size={18} />
                      </button>
                    </td>

                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`p-3 ${column.className || ""}`}
                      >
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
              : // Veri yoksa boş satırlar göster
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-3">
                      <button className="text-blue-500 hover:text-blue-700 bg-blue-100 p-1 rounded">
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
  );
}

export default DataTable;

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
  onDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onPageChange: PropTypes.func,
  customButtons: PropTypes.node,
  headerColor: PropTypes.string,
  headerTextColor: PropTypes.string,
};
