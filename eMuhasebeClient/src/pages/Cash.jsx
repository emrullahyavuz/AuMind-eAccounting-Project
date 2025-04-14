import React, { useEffect, useState } from "react";
import DataTable from "../components/Admin/data-table";
import { Info } from "lucide-react";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";

const Cash = () => {
  const [currents, setCurrents] = useState([]);
  const [filteredCurrents, setFilteredCurrents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Sayfa başına gösterilecek kasa sayısı
  const itemsPerPage = 50;

  // Kasalar tablosu sütun tanımları
  const columns = [
    {
      header: "# Numara",
      accessor: "id",
      className: "w-24 font-bold text-yellow-500",
    },
    { header: "Kasa Adı", accessor: "name" },
    { header: "Döviz Tipi", accessor: "type" },
    { header: "Giriş", accessor: "inflow" },
    { header: "Çıkış", accessor: "checkout" },
    { header: "Bakiye", accessor: "balance" },
    { header: "İşlemler", accessor: "transactions" },
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
        inflow: `Giriş ${(index % 5) + 1}`,
        checkout: `Çıkış ${index + 1}`,
        balance: `${index + 1}$`,
        transactions: ``,
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
  const handleAddCash = (newCompany) => {
    // Yeni kasa ekleme işlemi burada yapılacak
    console.log("Yeni kasa eklendi:");
  };

  // Kasa düzenleme işlemi
  const handleEditCash = (updatedCompany) => {
    // Kasa düzenleme işlemi burada yapılacak
    console.log("Düzenlenecek şirket:", updatedCompany);
  };

  // Kasa silme işlemi
  const handleDeleteCash = (id) => {
    // Kasa silme işlemi burada yapılacak
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
    <DataTable
      title="Kasalar"
      addButtonText="Kasa Ekle"
      addButtonColor="yellow"
      columns={columns}
      data={currentCash}
      searchPlaceholder="Şirket Adı Giriniz..."
      onAdd={handleAddCash}
      onEdit={handleEditCash}
      onDelete={handleDeleteCash}
      onSearch={handleSearch}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={filteredCurrents.length}
      onPageChange={handlePageChange}
      detailButton={detailButton}
      headerColor="gray-800"
      headerTextColor="white"
    />
  );
};

export default Cash;
