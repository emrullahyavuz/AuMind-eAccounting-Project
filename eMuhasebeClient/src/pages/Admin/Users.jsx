import { useState, useEffect } from "react"
import DataTable from "../../components/Admin/data-table"

function UsersPage() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const itemsPerPage = 50

  // Kullanıcı sütun tanımları
  const columns = [
    { header: "# Numara", accessor: "id", className: "w-24 font-bold text-yellow-500" },
    { header: "Kullanıcı Adı", accessor: "username" },
    { header: "Kullanıcı Soyadı", accessor: "surname" },
    { header: "E-Mail Adresi", accessor: "email" },
    { header: "Bağlı Olduğu Şirketler", accessor: "companies" },
    { header: "Kullanıcı Adı", accessor: "username" },
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
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredUsers(filtered)
      setCurrentPage(1) // Arama yapıldığında ilk sayfaya dön
    }
  }

  // Kullanıcı ekleme işlemi
  const handleAddUser = () => {
    console.log("Kullanıcı ekleme modalı açılacak")
    // Burada ekleme modalı açma işlemi yapılacak
  }

  // Kullanıcı düzenleme işlemi
  const handleEditUser = (user) => {
    console.log("Düzenlenecek kullanıcı:", user)
    // Burada düzenleme modalı açma işlemi yapılacak
  }

  // Kullanıcı silme işlemi
  const handleDeleteUser = (userId) => {
    console.log("Silinecek kullanıcı ID:", userId)
    // Burada silme onayı ve silme işlemi yapılacak
  }

  // Geçerli sayfadaki kullanıcıları hesapla
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (isLoading) {
    return <div className="p-6">Yükleniyor...</div>
  }

  return (
    <DataTable
      title="Kullanıcılar"
      addButtonText="Kullanıcı Ekle"
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
    />
  )
}

export default UsersPage

