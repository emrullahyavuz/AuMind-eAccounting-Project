import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/Admin/data-table";
import { Info, Trash2 } from "lucide-react";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";
import CashModal from "../components/UI/Modals/CashModal";
import DeleteConfirmationModal from "../components/UI/Modals/DeleteConfirmationModal";

const Cash = () => {
  const navigate = useNavigate();
  const [currents, setCurrents] = useState([]);
  const [filteredCurrents, setFilteredCurrents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCash, setSelectedCash] = useState(null);
  const [cashToDelete, setCashToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sayfa başına gösterilecek kasa sayısı
  const itemsPerPage = 50;

  // Detay butonu render fonksiyonu
  const renderDetailButton = (cash) => (
    <button
      onClick={() => navigate(`/cash-transaction/${cash.id}`)}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-1 px-3 rounded-md flex items-center"
    >
      <Info size={16} className="mr-1" />
      Detay Gör
    </button>
  );

  // Kasalar tablosu sütun tanımları
  const columns = [
    {
      header: "# Numara",
      accessor: "id",
      className: "w-24 font-bold text-yellow-500",
    },
    { header: "Kasa Adı", accessor: "name" },
    { header: "Döviz Tipi", accessor: "type" },
    { header: "Giriş", accessor: "inflow", className: "text-right text-green-600" },
    { header: "Çıkış", accessor: "checkout", className: "text-right text-red-600" },
    { header: "Bakiye", accessor: "balance", className: "text-right font-bold" },
    { 
      header: "İşlemler", 
      accessor: "transactions",
      render: renderDetailButton
    },
  ];

  // Örnek veri yükleme - gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı simülasyonu
    setTimeout(() => {
      const mockCurrents = Array.from({ length: 80 }, (_, index) => ({
        id: index + 1,
        name: `Kasa ${index + 1}`,
        type: `${index % 3 === 0 ? 'TRY' : index % 3 === 1 ? 'USD' : 'EUR'}`,
        inflow: `${(Math.random() * 10000).toFixed(2)} ${index % 3 === 0 ? '₺' : index % 3 === 1 ? '$' : '€'}`,
        checkout: `${(Math.random() * 8000).toFixed(2)} ${index % 3 === 0 ? '₺' : index % 3 === 1 ? '$' : '€'}`,
        balance: `${(Math.random() * 20000).toFixed(2)} ${index % 3 === 0 ? '₺' : index % 3 === 1 ? '$' : '€'}`,
      }));

      setCurrents(mockCurrents);
      setFilteredCurrents(mockCurrents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredCurrents.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Kasalar sayfasına özel Detay Gör butonu
  const detailButton = (
    <button
      onClick={() => console.log("Detay Gör butonuna tıklandı")}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center mr-4"
    >
      <Info size={18} className="mr-2" />
      Detay Gör
    </button>
  );

  // Kasa ekleme işlemi
  const handleAddCash = () => {
    setIsAddModalOpen(true);
  };

  // Kasa düzenleme işlemi
  const handleEditCash = (cash) => {
    setSelectedCash(cash);
    setIsEditModalOpen(true);
  };

  // Kasa silme işlemi
  const handleDeleteCash = (cashId) => {
    if (Array.isArray(cashId)) {
      // Toplu silme
      setCashToDelete({ ids: cashId, name: `${cashId.length} kasa` });
    } else {
      // Tekli silme
      const cash = currents.find((c) => c.id === cashId);
      setCashToDelete({ ids: [cashId], name: cash.name });
    }
    setIsDeleteModalOpen(true);
  };

  // Silme onaylama işlemi
  const confirmDelete = () => {
    if (cashToDelete) {
      // API silme işlemi burada yapılacak
      const updatedCurrents = currents.filter(
        (cash) => !cashToDelete.ids.includes(cash.id)
      );
      setCurrents(updatedCurrents);
      setFilteredCurrents(updatedCurrents);
      setSelectedItems([]); // Seçili öğeleri temizle
      setIsDeleteModalOpen(false);
      setCashToDelete(null);
    }
  };

  // Kasa arama işlemi
  const handleSearch = (searchTerm) => {
    setFilteredCurrents(
      currents.filter((cash) =>
        cash.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      )
    );
    setCurrentPage(1);
  };

  // Özel butonlar
  const customButtons = (
    <>
      {detailButton}
      {selectedItems.length > 0 && (
        <button
          onClick={() => handleDeleteCash(selectedItems)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <Trash2 size={18} className="mr-2" />
          Seçilenleri Sil ({selectedItems.length})
        </button>
      )}
    </>
  );

  // Sayfa başına listeleme işlemi
  const currentCash = filteredCurrents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <LoadingOverlay />
      </div>
    );
  }

  return (
    <>
      <DataTable
        title="Kasalar"
        addButtonText="Kasa Ekle"
        addButtonColor="yellow"
        columns={columns}
        data={currentCash}
        searchPlaceholder="Kasa Adı Giriniz..."
        onAdd={handleAddCash}
        onEdit={handleEditCash}
        onDelete={handleDeleteCash}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredCurrents.length}
        onPageChange={handlePageChange}
        customButtons={customButtons}
        headerColor="gray-800"
        headerTextColor="white"
        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}
      />
      <CashModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <CashModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCash(null);
        }}
        isEditMode={true}
        cash={selectedCash}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCashToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Kasa Silme"
        message={`${cashToDelete?.name || ''} ${cashToDelete?.ids?.length > 1 ? 'kasalarını' : 'kasasını'} silmek istediğinizden emin misiniz?`}
      />
    </>
  );
};

export default Cash;
