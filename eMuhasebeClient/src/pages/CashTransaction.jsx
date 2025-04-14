import { useState, useEffect } from "react";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import DataTable from "../components/Admin/cash-data-table";
import CashTransactionModal from "../components/UI/Modals/CashTransactionModal";

function CashTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const itemsPerPage = 50;

  // Kasa hareketleri sütun tanımları
  const columns = [
    {
      header: "# Numara",
      accessor: "id",
      className: "w-24 font-bold text-yellow-500",
    },
    { header: "Tarih", accessor: "date" },
    { header: "Açıklama", accessor: "description" },
    {
      header: "Giriş",
      accessor: "input",
      className: "text-right text-green-600 font-medium",
    },
    {
      header: "Çıkış",
      accessor: "output",
      className: "text-right text-red-600 font-medium",
    },
  ];

  // Örnek veri yükleme - gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı simülasyonu
    const loadData = async () => {
      setIsLoading(true);

      // Gerçek bir API çağrısını simüle etmek için gecikme ekliyoruz
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Örnek veri
      const mockTransactions = Array.from({ length: 1 }, (_, index) => ({
        id: index + 1,
        date: `${Math.floor(Math.random() * 28) + 1}.${
          Math.floor(Math.random() * 12) + 1
        }.2024`,
        description: "xxx",
        input: index % 2 === 0 ? `${(Math.random() * 1000).toFixed(2)} ₺` : "",
        output: index % 2 === 1 ? `${(Math.random() * 1000).toFixed(2)} ₺` : "",
      }));

      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredTransactions.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
      setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
    }
  };

  // Tarih filtresi uygulama
  const handleApplyFilter = () => {
    console.log("Tarih filtresi uygulanıyor:", { startDate, endDate });
    // Gerçek uygulamada burada API çağrısı yapılacak

    setIsLoading(true);

    setTimeout(() => {
      // Filtreleme simülasyonu
      setIsLoading(false);
    }, 1000);
  };

  // İşlem ekleme işlemi
  const handleAddTransaction = () => {
    setIsAddModalOpen(true);
  };

  const handleAddTransactionSubmit = (transactionData) => {
    console.log("Yeni işlem eklendi:", transactionData);
    // Gerçek uygulamada API çağrısı yapılacak

    // Örnek işlem verisi ekleme
    const newTransaction = {
      id: transactions.length + 1,
      date: transactionData.date,
      description: transactionData.description,
      input: transactionData.input ? `${transactionData.input} ₺` : "",
      output: transactionData.output ? `${transactionData.output} ₺` : "",
    };

    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  // İşlem düzenleme işlemi
  const handleEditTransaction = (transaction) => {
    console.log("Düzenlenecek işlem:", transaction);
    // Burada düzenleme modalı açma işlemi yapılacak
  };

  // İşlem silme işlemi
  const handleDeleteTransaction = (transactionId) => {
    console.log("Silinecek işlem ID:", transactionId);
    // Burada silme onayı ve silme işlemi yapılacak
  };

  // Geçerli sayfadaki işlemleri hesapla
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Özel filtre bileşeni
  const customFilters = (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="pl-3 text-lg py-2 border bg-white border-gray-300 rounded-md"
          placeholder="Başlangıç tarihi giriniz..."
        />
      </div>

      <div className="relative">
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="pl-3 text-lg py-2 border bg-white border-gray-300 rounded-md"
          placeholder="Bitiş tarihi giriniz..."
        />
      </div>

      <Button
        onClick={handleApplyFilter}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md"
      >
        Getir
      </Button>
    </div>
  );

  // Özel başlık bileşeni
  const customHeader = (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold border-b-2 border-gray-300 text-gray-800">
        (Kasa İsmi) Hareketleri
      </h1>
    </div>
  );

  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Özel başlık */}
        {customHeader}

        <DataTable
          title=""
          addButtonText="İşlem Ekle"
          addButtonColor="yellow"
          columns={columns}
          data={currentTransactions}
          searchPlaceholder="Açıklama Arayınız..."
          onAdd={handleAddTransaction}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          onSearch={handleSearch}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={filteredTransactions.length}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          customFilters={customFilters}
          hideTitle={true}
        />
      </div>

      <CashTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransactionSubmit}
      />
    </>
  );
}

export default CashTransaction;
