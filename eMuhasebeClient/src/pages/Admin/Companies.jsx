import { useState, useEffect } from "react"
import DataTable from "../../components/Admin/data-table"
import { RefreshCw } from "lucide-react"
import LoadingOverlay from "../../components/UI/Spinner/LoadingOverlay"

function Companies() {
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 50

  // Şirket sütun tanımları
  const columns = [
    { header: "# Numara", accessor: "id", className: "w-24 font-bold text-yellow-500" },
    { header: "Şirket Adı", accessor: "name" },
    { header: "Adres", accessor: "address" },
    { header: "Vergi Dairesi", accessor: "taxOffice" },
    { header: "Vergi Numarası", accessor: "taxNumber" },
    { header: "Server", accessor: "server" },
    { header: "Veritabanı Adı", accessor: "databaseName" },
    { header: "Yönetici Adı", accessor: "adminName" },
  ]

  // Örnek veri yükleme - gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı simülasyonu
    setTimeout(() => {
      const mockCompanies = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Şirket ${index + 1}`,
        address: `Adres ${index + 1}`,
        taxOffice: `Vergi Dairesi ${index + 1}`,
        taxNumber: `${1000000000 + index}`,
        server: `Server ${(index % 5) + 1}`,
        databaseName: `DB_${index + 1}`,
        adminName: `Admin ${index + 1}`,
      }))

      setCompanies(mockCompanies)
      setFilteredCompanies(mockCompanies)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredCompanies.length / itemsPerPage)) {
      setCurrentPage(newPage)
    }
  }

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredCompanies(companies)
    } else {
      const filtered = companies.filter(
        (company) =>
          company.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
          company.taxNumber.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()),
      )
      setFilteredCompanies(filtered)
      setCurrentPage(1) // Arama yapıldığında ilk sayfaya dön
    }
  }

  // Şirket ekleme işlemi
  const handleAddCompany = () => {
    console.log("Şirket ekleme modalı açılacak")
    // Burada ekleme modalı açılacak
  }

  // Database güncelleme işlemi
  const handleUpdateDatabase = () => {
    console.log("Database güncelleniyor...")
    // Burada database güncelleme işlemi yapılacak
  }

  // Şirket düzenleme işlemi
  const handleEditCompany = (company) => {
    console.log("Düzenlenecek şirket:", company)
    // Burada düzenleme modalı açılacak
  }

  // Şirket silme işlemi
  const handleDeleteCompany = (companyId) => {
    console.log("Silinecek şirket ID:", companyId)
    // Burada silme işlemi modalı açılacak
  }

  // Geçerli sayfadaki şirketleri hesapla
  const currentCompanies = filteredCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  
  // Özel butonlar
  const customButtons = (
    <button
    onClick={handleUpdateDatabase}
    className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center mr-4"
    >
      <RefreshCw size={18} className="mr-2" />
      Database Güncelle
    </button>
  )
  
  if (isLoading) {
    return <div className="p-6"><LoadingOverlay /></div>
  }
  
  return (
    <DataTable
      title="Şirketler"
      addButtonText="Şirket Ekle"
      addButtonColor="yellow" // Özel buton rengi
      columns={columns}
      data={currentCompanies}
      searchPlaceholder="Şirket Adı Giriniz..."
      onAdd={handleAddCompany}
      onEdit={handleEditCompany}
      onDelete={handleDeleteCompany}
      onSearch={handleSearch}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={filteredCompanies.length}
      onPageChange={handlePageChange}
      customButtons={customButtons}
      headerColor="gray-800" // Başlık için özel prop
      headerTextColor="white" // Başlık metni için özel prop
    />
  )
}

export default Companies

