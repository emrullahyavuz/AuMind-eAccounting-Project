import { useState, useEffect } from "react"
import DataTable from "../../components/Admin/data-table"

function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 50

  // Fatura sütun tanımları
  const columns = [
    { header: "# Numara", accessor: "id", className: "w-24 font-bold text-yellow-500" },
    { header: "Fatura No", accessor: "invoiceNumber" },
    { header: "Tarih", accessor: "date" },
    { header: "Müşteri", accessor: "customer" },
    { header: "Tutar", accessor: "amount", className: "text-right" },
    { header: "KDV", accessor: "tax", className: "text-right" },
    { header: "Toplam", accessor: "total", className: "text-right font-bold" },
  ]

  // Örnek veri yükleme - daha sonra gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı örneği
    setTimeout(() => {
      const mockInvoices = Array.from({ length: 120 }, (_, index) => {
        const amount = Math.floor(Math.random() * 10000) / 100
        const tax = amount * 0.18
        const total = amount + tax

        return {
          id: index + 1,
          invoiceNumber: `FTR-${2023}-${10000 + index}`,
          date: `${Math.floor(Math.random() * 28) + 1}.${Math.floor(Math.random() * 12) + 1}.2023`,
          customer: `Müşteri ${Math.floor(index / 5) + 1}`,
          amount: `${amount.toFixed(2)} ₺`,
          tax: `${tax.toFixed(2)} ₺`,
          total: `${total.toFixed(2)} ₺`,
        }
      })

      setInvoices(mockInvoices)
      setFilteredInvoices(mockInvoices)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredInvoices.length / itemsPerPage)) {
      setCurrentPage(newPage)
    }
  }

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredInvoices(invoices)
    } else {
      const filtered = invoices.filter(
        (invoice) =>
          invoice.invoiceNumber.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
          invoice.customer.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()),
      )
      setFilteredInvoices(filtered)
      setCurrentPage(1) // Arama yapıldığında ilk sayfaya dön
    }
  }

  // Fatura ekleme işlemi
  const handleAddInvoice = () => {
    console.log("Fatura ekleme modalı açılacak")
    // Burada ekleme modalı açma işlemi yapılacak
  }

  // Fatura düzenleme işlemi
  const handleEditInvoice = (invoice) => {
    console.log("Düzenlenecek fatura:", invoice)
    // Burada düzenleme modalı açma işlemi yapılacak
  }

  // Fatura silme işlemi
  const handleDeleteInvoice = (invoiceId) => {
    console.log("Silinecek fatura ID:", invoiceId)
    // Burada silme onayı ve silme işlemi yapılacak
  }

  // Geçerli sayfadaki faturaları hesapla
  const currentInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (isLoading) {
    return <div className="p-6">Yükleniyor...</div>
  }

  return (
    <DataTable
      title="Faturalar"
      addButtonText="Fatura Ekle"
      columns={columns}
      data={currentInvoices}
      searchPlaceholder="Fatura No veya Müşteri Giriniz..."
      onAdd={handleAddInvoice}
      onEdit={handleEditInvoice}
      onDelete={handleDeleteInvoice}
      onSearch={handleSearch}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={filteredInvoices.length}
      onPageChange={handlePageChange}
    />
  )
}

export default InvoicesPage

