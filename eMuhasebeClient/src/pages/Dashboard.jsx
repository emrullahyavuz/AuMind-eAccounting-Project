import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllInvoicesQuery } from "../store/api";
import { useAuth } from "../hooks/useAuth";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";

function Anasayfa() {
  const { user, currentCompany } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 50;

  // RTK Query hooks
  const { data: invoices, isLoading: isInvoicesLoading } = useGetAllInvoicesQuery();

  console.log(invoices)
  // Transform invoice data for the table
  const transactions = [...(invoices?.data || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(invoice => ({
      id: invoice.id,
      customer: `${invoice.customer?.name || ''} ${invoice.customer?.surname || ''}`.trim(),
      amount: new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(invoice.amount),
      date: new Date(invoice.date).toLocaleDateString('tr-TR'),
      type: invoice.type?.value === 1 ? "Satış" : "Alış",
      status: new Date(invoice.date) < new Date() ? "approved" : (invoice.status === 1 ? "approved" : "waiting")
    }));

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredTransactions.length);

  // Get current page transactions
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate financial data for the chart
  const financialData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Get invoices for the current month
    const monthInvoices = invoices?.data?.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate.getMonth() === date.getMonth() &&
             invoiceDate.getFullYear() === date.getFullYear();
    }) || [];

    // Calculate income (type 1 = Satış)
    const income = monthInvoices
      .filter(invoice => invoice.type?.value === 1)
      .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

    // Calculate expense (type 2 = Alış)
    const expense = monthInvoices
      .filter(invoice => invoice.type?.value === 2)
      .reduce((sum, invoice) => sum + (invoice.amount || 0), 0);

    return {
      month: date.toLocaleDateString('tr-TR', { month: 'short' }),
      income,
      expense
    };
  }).reverse();

  // Find max value for chart scaling
  const maxValue = Math.max(...financialData.map(item => Math.max(item.income, item.expense))) || 1;

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isInvoicesLoading) {
    return <LoadingOverlay message="Veriler yükleniyor..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Üst Başlık */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Ana Sayfa</h1>
        <h2 className="text-xl font-bold text-gray-700 mt-1">
          HOŞ GELDİNİZ, {user?.fullName?.toUpperCase()}
        </h2>
      </div>

      {/* Ana Bilgi Kartı */}
      <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Sol Taraf - Firma Bilgileri */}
          <div className="p-6 text-white md:w-1/3">
            <h2 className="text-xl font-bold mb-6 border-b pb-2">AuMind Muhasebe Sistemi</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-300">Firma Adı</p>
                <p className="font-medium">{currentCompany?.name || 'Firma Seçilmedi'}</p>
              </div>

              <div>
                <p className="text-gray-300">Vergi Numarası</p>
                <p className="font-medium">{currentCompany?.taxNumber || '-'}</p>
              </div>

              <div>
                <p className="text-gray-300">Adres</p>
                <p className="font-medium">{currentCompany?.address || '-'}</p>
              </div>

              <div>
                <p className="text-gray-300">Son İşlem Tarihi</p>
                <p className="font-medium">
                  {transactions[0]?.date || new Date().toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Gelir İstatistikleri */}
          <div className="bg-white p-6 md:w-2/3">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Gelir İstatistikleri</h2>

            <div className="h-64 flex items-end space-x-4 mt-6">
              {financialData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  {/* Gelir Çubuğu */}
                  <div className="w-full flex justify-center mb-1">
                    <div 
                      className="bg-yellow-400 w-8" 
                      style={{ height: `${(item.income / maxValue) * 200}px` }}
                    ></div>
                  </div>

                  {/* Gider Çubuğu */}
                  <div className="w-full flex justify-center mb-2">
                    <div 
                      className="bg-gray-700 w-8" 
                      style={{ height: `${(item.expense / maxValue) * 200}px` }}
                    ></div>
                  </div>

                  {/* Ay Etiketi */}
                  <span className="text-xs text-gray-600">{item.month}</span>
                </div>
              ))}
            </div>

            {/* Grafik Açıklaması */}
            <div className="flex justify-end mt-2 space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-xs text-gray-600">Gelir</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-700 mr-1"></div>
                <span className="text-xs text-gray-600">Gider</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Son İşlemler Bölümü */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Son İşlemler</h2>

          {/* Arama Kutusu */}
          <div className="relative">
            <input
              type="text"
              placeholder="İşlem Numarası Giriniz..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* İşlemler Tablosu */}
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          {/* Tablo Başlığı */}
          <div className="grid grid-cols-12 text-white font-medium text-sm">
            <div className="col-span-1 p-3 border-r border-gray-600"># İşlem No</div>
            <div className="col-span-3 p-3 border-r border-gray-600">Müşteri</div>
            <div className="col-span-2 p-3 border-r border-gray-600">Tutar</div>
            <div className="col-span-2 p-3 border-r border-gray-600">Tarih</div>
            <div className="col-span-2 p-3 border-r border-gray-600">Alış / Satış</div>
            <div className="col-span-1 p-3 text-center text-green-400">ONAYLANDI</div>
            <div className="col-span-1 p-3 text-center text-yellow-400">BEKLEMEDE</div>
          </div>

          {/* Tablo İçeriği */}
          <div className="bg-white">
            {currentTransactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-12 border-b border-gray-200 text-sm">
                <div className="col-span-1 p-3 border-r border-gray-200 font-medium text-yellow-600">
                  {transaction.id}
                </div>
                <div className="col-span-3 p-3 border-r border-gray-200">{transaction.customer}</div>
                <div className="col-span-2 p-3 border-r border-gray-200">{transaction.amount}</div>
                <div className="col-span-2 p-3 border-r border-gray-200">{transaction.date}</div>
                <div className="col-span-2 p-3 border-r border-gray-200">{transaction.type}</div>
                <div className="col-span-1 p-3 flex justify-center items-center">
                  {transaction.status === "approved" ? (
                    <div className="w-5 h-5 bg-green-500 rounded"></div>
                  ) : (
                    <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  )}
                </div>
                <div className="col-span-1 p-3 flex justify-center items-center">
                  {transaction.status === "waiting" ? (
                    <div className="w-5 h-5 bg-yellow-500 rounded"></div>
                  ) : (
                    <div className="w-5 h-5 border border-gray-300 rounded"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sayfalama */}
      <div className="flex justify-end items-center text-sm text-gray-600">
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 mr-2 disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>
        <span>{startItem}-{endItem} arası gösteriliyor.</span>
        {totalPages > 1 && (
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
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

export default Anasayfa;
