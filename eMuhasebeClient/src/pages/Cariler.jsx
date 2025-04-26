import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/Admin/data-table";
import { Info, Trash2 } from "lucide-react";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";
import CariModal from "../components/UI/Modals/CariModal";
import DeleteConfirmationModal from "../components/UI/Modals/DeleteConfirmationModal";

const Cariler = () => {
  const navigate = useNavigate();
  const [currents, setCurrents] = useState([]);
  const [filteredCurrents, setFilteredCurrents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCari, setSelectedCari] = useState(null);
  const [cariToDelete, setCariToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // Sayfa başına gösterilecek cari hesap sayısı
  const itemsPerPage = 50;

  // Detay butonu render fonksiyonu
  const renderDetailButton = (cari) => (
    <button
      onClick={() => navigate(`/cari-hareketleri/${cari.id}`)}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-1 px-3 rounded-md flex items-center"
    >
      <Info size={16} className="mr-1" />
      Detay Gör
    </button>
  );

  // Cariler tablosu sütun tanımları
  const columns = [
    {
      header: "# Numara",
      accessor: "id",
      className: "w-24 font-bold text-yellow-500",
    },
    { header: "Cari Adı", accessor: "name" },
    { header: "Tipi", accessor: "type" },
    { header: "İl/İlçe", accessor: "city" },
    { header: "Adres", accessor: "address" },
    { header: "Vergi Dairesi", accessor: "taxOffice" },
    { header: "Vergi Numarası", accessor: "taxNumber" },
    { header: "Giriş", accessor: "inflow" },
    { header: "Çıkış", accessor: "checkout" },
    { header: "Bakiye", accessor: "balance" },
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
        name: `Şirket ${index + 1}`,
        type: `Tip ${index + 1}`,
        city: `İstanbul`,
        address: `Adres ${index + 1}`,
        taxOffice: `Vergi Dairesi ${index + 1}`,
        taxNumber: `${1000000000 + index}`,
        inflow: `${(Math.random() * 10000).toFixed(2)} ₺`,
        checkout: `${(Math.random() * 8000).toFixed(2)} ₺`,
        balance: `${(Math.random() * 20000).toFixed(2)} ₺`,
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

  // Cari sayfasına özel Detay Gör butonu
  const detailButton = (
    <button
      //   onClick={handleUpdateDatabase}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center mr-4"
    >
      <Info size={18} className="mr-2" />
      Detay Gör
    </button>
  );

  // Cari hesap ekleme işlemi
  const handleAddCari = () => {
    setIsAddModalOpen(true);
  };

  // Cari hesap düzenleme işlemi
  const handleEditCari = (cari) => {
    setSelectedCari(cari);
    setIsEditModalOpen(true);
  };

  // Cari hesap silme işlemi
  const handleDeleteCari = (cariId) => {
    if (Array.isArray(cariId)) {
      // Toplu silme
      setCariToDelete({ ids: cariId, name: `${cariId.length} cari hesap` });
    } else {
      // Tekli silme
      const cari = currents.find((c) => c.id === cariId);
      setCariToDelete({ ids: [cariId], name: cari.name });
    }
    setIsDeleteModalOpen(true);
  };

  // Silme onaylama işlemi
  const confirmDelete = () => {
    if (cariToDelete) {
      // API silme işlemi burada yapılacak
      const updatedCurrents = currents.filter(
        (cari) => !cariToDelete.ids.includes(cari.id)
      );
      setCurrents(updatedCurrents);
      setFilteredCurrents(updatedCurrents);
      setSelectedItems([]); // Seçili öğeleri temizle
      setIsDeleteModalOpen(false);
      setCariToDelete(null);
    }
  };

  // Cari hesap arama işlemi
  const handleSearch = (searchTerm) => {
    setFilteredCurrents(
      currents.filter((cari) =>
        cari.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
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
          onClick={() => handleDeleteCari(selectedItems)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <Trash2 size={18} className="mr-2" />
          Seçilenleri Sil ({selectedItems.length})
        </button>
      )}
    </>
  );

  // Sayfa başına listeleme işlemi
  const currentCariler = filteredCurrents.slice(
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
        title="Cariler"
        addButtonText="Cari Ekle"
        addButtonColor="yellow"
        columns={columns}
        data={currentCariler}
        searchPlaceholder="Şirket Adı Giriniz..."
        onAdd={handleAddCari}
        onEdit={handleEditCari}
        onDelete={handleDeleteCari}
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
      <CariModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <CariModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCari(null);
        }}
        isEditMode={true}
        cari={selectedCari}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCariToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Cari Hesap Silme"
        message={`${cariToDelete?.name || ''} ${cariToDelete?.ids?.length > 1 ? 'cari hesaplarını' : 'cari hesabını'} silmek istediğinizden emin misiniz?`}
      />
    </>
  );
};

export default Cariler;
