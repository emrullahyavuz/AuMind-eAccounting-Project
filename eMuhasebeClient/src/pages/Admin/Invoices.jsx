import { useState, useEffect } from "react"
import DataTable from "../../components/Admin/data-table"
import LoadingOverlay from "../../components/UI/Spinner/LoadingOverlay"
import InvoiceModal from "../../components/UI/Modals/InvoiceModal"
import DeleteConfirmationModal from "../../components/UI/Modals/DeleteConfirmationModal"
import { Trash2 } from "lucide-react"

function InvoicesPage() {
  const [invoices, setInvoices] = useState([])
  const [filteredInvoices, setFilteredInvoices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

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
    setIsAddModalOpen(true)
  }

  // Fatura düzenleme işlemi
  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsEditModalOpen(true)
  }

  // Fatura silme işlemi
  const handleDeleteInvoice = (invoiceId) => {
    if (Array.isArray(invoiceId)) {
      // Toplu silme
      setInvoiceToDelete({ ids: invoiceId, name: `${invoiceId.length} fatura` })
    } else {
      // Tekli silme
      const invoice = invoices.find((i) => i.id === invoiceId)
      setInvoiceToDelete({ ids: [invoiceId], name: invoice.invoiceNumber })
    }
    setIsDeleteModalOpen(true)
  }

  // Silme onaylama işlemi
  const confirmDelete = () => {
    if (invoiceToDelete) {
      // API silme işlemi burada yapılacak
      const updatedInvoices = invoices.filter(
        (invoice) => !invoiceToDelete.ids.includes(invoice.id)
      )
      setInvoices(updatedInvoices)
      setFilteredInvoices(updatedInvoices)
      setSelectedItems([]) // Seçili öğeleri temizle
      setIsDeleteModalOpen(false)
      setInvoiceToDelete(null)
    }
  }

  // Geçerli sayfadaki faturaları hesapla
  const currentInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Özel butonlar
  const customButtons = selectedItems.length > 0 && (
    <button
      onClick={() => handleDeleteInvoice(selectedItems)}
      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
    >
      <Trash2 size={18} className="mr-2" />
      Seçilenleri Sil ({selectedItems.length})
    </button>
  )

  if (isLoading) {
    return <div className="p-6"><LoadingOverlay /></div>
  }

  return (
    <>
      <DataTable
        title="Faturalar"
        addButtonText="Fatura Ekle"
        addButtonColor="yellow"
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
        customButtons={customButtons}
        headerColor="gray-800"
        headerTextColor="white"
        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}
      />
      <InvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <InvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedInvoice(null)
        }}
        isEditMode={true}
        invoice={selectedInvoice}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setInvoiceToDelete(null)
        }}
        onConfirm={confirmDelete}
        title="Fatura Silme"
        message={`${invoiceToDelete?.name || ''} ${invoiceToDelete?.ids?.length > 1 ? 'faturalarını' : 'faturasını'} silmek istediğinizden emin misiniz?`}
      />
    </>
  )
}

export default InvoicesPage
