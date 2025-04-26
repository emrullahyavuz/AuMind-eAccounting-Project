import { useState, useEffect } from "react"
import DataTable from "../../components/Admin/data-table"
import LoadingOverlay from "../../components/UI/Spinner/LoadingOverlay"
import UserModal from "../../components/UI/Modals/UserModal"
import DeleteConfirmationModal from "../../components/UI/Modals/DeleteConfirmationModal"
import { Trash2 } from "lucide-react"

function UsersPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])

  const itemsPerPage = 50

  // Kullanıcı sütun tanımları
  const columns = [
    { header: "# Numara", accessor: "id", className: "w-24 font-bold text-yellow-500" },
    { header: "Kullanıcı Adı", accessor: "username" },
    { header: "Kullanıcı Soyadı", accessor: "surname" },
    { header: "E-Mail Adresi", accessor: "email" },
    { header: "Bağlı Olduğu Şirketler", accessor: "companies" },
  ]

  // Örnek veri yükleme - daha sonra gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı örneği
    setTimeout(() => {
      const mockUsers = Array.from({ length: 120 }, (_, index) => ({
        id: index + 1,
        username: `kullanici${index + 1}`,
        surname: `soyad${index + 1}`,
        email: `kullanici${index + 1}@example.com`,
        companies: `Şirket ${Math.floor(index / 10) + 1}`,
      }))

      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(newPage)
    }
  }

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
          user.surname.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) ||
          user.email.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()),
      )
      setFilteredUsers(filtered)
      setCurrentPage(1) // Arama yapıldığında ilk sayfaya dön
    }
  }

  // Kullanıcı ekleme işlemi
  const handleAddUser = () => {
    setIsAddModalOpen(true)
  }

  // Kullanıcı düzenleme işlemi
  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  // Kullanıcı silme işlemi
  const handleDeleteUser = (userId) => {
    if (Array.isArray(userId)) {
      // Toplu silme
      setUserToDelete({ ids: userId, name: `${userId.length} kullanıcı` })
    } else {
      // Tekli silme
      const user = users.find((u) => u.id === userId)
      setUserToDelete({ ids: [userId], name: user.username })
    }
    setIsDeleteModalOpen(true)
  }

  // Silme onaylama işlemi
  const confirmDelete = () => {
    if (userToDelete) {
      // API silme işlemi burada yapılacak
      const updatedUsers = users.filter(
        (user) => !userToDelete.ids.includes(user.id)
      )
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
      setSelectedItems([]) // Seçili öğeleri temizle
      setIsDeleteModalOpen(false)
      setUserToDelete(null)
    }
  }

  // Geçerli sayfadaki kullanıcıları hesapla
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Özel butonlar
  const customButtons = selectedItems.length > 0 && (
    <button
      onClick={() => handleDeleteUser(selectedItems)}
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
        title="Kullanıcılar"
        addButtonText="Kullanıcı Ekle"
        addButtonColor="yellow"
        columns={columns}
        data={currentUsers}
        searchPlaceholder="İsim Giriniz..."
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        onPageChange={handlePageChange}
        customButtons={customButtons}
        headerColor="gray-800"
        headerTextColor="white"
        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}
      />
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        isEditMode={true}
        user={selectedUser}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setUserToDelete(null)
        }}
        onConfirm={confirmDelete}
        title="Kullanıcı Silme"
        message={`${userToDelete?.name || ''} ${userToDelete?.ids?.length > 1 ? 'kullanıcılarını' : 'kullanıcısını'} silmek istediğinizden emin misiniz?`}
      />
    </>
  )
}

export default UsersPage
