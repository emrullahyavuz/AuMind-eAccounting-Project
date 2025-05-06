import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PropTypes from "prop-types";

// Genel tablo componenti
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
  headerColor = "gray-700",
  headerTextColor = "white",
  isCari = false, // Cari hesaplar için özel stil
  isStock = false, // Stok hesaplar için özel stil
  selectedItems = [],
  onSelectedItemsChange = () => {},
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama işlemi
  const renderCell = (column, row) => {
    let value;
    if (typeof column.accessor === 'function') {
      value = column.accessor(row);
    } else if (typeof column.accessor === 'string' && column.accessor.includes('.')) {
      const [first, second] = column.accessor.split('.');
      value = row[first]?.[second];
    } else if (typeof column.accessor === 'string') {
      value = row[column.accessor];
    } else {
      value = '';
    }
    if (column.render) {
      return column.render(row);
    }
    return value;
  };

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
    let newSelectedItems;
    if (selectedItems.includes(id)) {
      newSelectedItems = selectedItems.filter((item) => item !== id);
    } else {
      newSelectedItems = [...selectedItems, id];
    }
    onSelectedItemsChange(newSelectedItems);
  };

  // Tüm öğeleri seç/kaldır
  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      onSelectedItemsChange([]);
    } else {
      onSelectedItemsChange(data.map((item) => item.id));
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
          {isCari || isStock ? (
            ""
          ) : (
            <button
              onClick={onAdd}
              className={`flex items-center font-semibold px-4 py-2 rounded-md ${buttonColorClass}`}
            >
              <Plus size={18} className="mr-2" />
              {addButtonText}
            </button>
          )}

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
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white">
          {/* Tablo Başlığı */}
          <thead>
            <tr className={`bg-${headerColor} text-${headerTextColor}`}>
              {!isCari && !isStock && (
                <th className="w-12 p-3 text-left">
                  <Edit size={18} />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`p-3 ${
                    column.header === "İşlemler" ? "text-right px-[60px]" : ""
                  } text-left text-yellow-500 ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
              {!isCari && !isStock && (
                <th className="w-12 p-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      data.length > 0 && selectedItems.length === data.length
                    }
                    onChange={handleSelectAll}
                    className="h-5 w-5 text-red-500 border-gray-300 rounded focus:ring-red-500"
                  />
                </th>
              )}
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
                    {!isCari && !isStock && (
                      <td className="p-3">
                        <button
                          onClick={() => onEdit(item)}
                          className="bg-blue-500 text-white hover:text-yellow-400  p-1 rounded"
                        >
                          <Edit size={18} />
                        </button>
                      </td>
                    )}

{columns.map((column, colIndex) => (
  <td key={colIndex} className={`p-3 ${column.className || ""}`}>
    {renderCell(column, item)}
  </td>
))}


                    {!isCari && !isStock && (
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
                    )}
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
  detailButton: PropTypes.node,
  headerColor: PropTypes.string,
  headerTextColor: PropTypes.string,
  isCari: PropTypes.bool,
  selectedItems: PropTypes.array,
  onSelectedItemsChange: PropTypes.func,
};
