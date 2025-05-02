import { Search, ChevronLeft, ChevronRight } from "lucide-react"

function Anasayfa() {
  // Örnek işlem verileri
  const transactions = [
    { id: 1, customer: "ABC Lojistik", amount: "12,500.00 ₺", date: "22.05.2025", type: "Satış", status: "approved" },
    { id: 2, customer: "XYZ Nakliyat", amount: "8,750.00 ₺", date: "21.05.2025", type: "Alış", status: "waiting" },
    { id: 3, customer: "123 Taşıma", amount: "15,000.00 ₺", date: "20.05.2025", type: "Satış", status: "approved" },
    { id: 4, customer: "Hızlı Kargo", amount: "5,250.00 ₺", date: "19.05.2025", type: "Satış", status: "approved" },
    { id: 5, customer: "Güven Nakliyat", amount: "9,800.00 ₺", date: "18.05.2025", type: "Alış", status: "waiting" },
    { id: 6, customer: "Yıldız Lojistik", amount: "7,300.00 ₺", date: "17.05.2025", type: "Satış", status: "approved" },
  ]

  // Gelir ve gider verileri (grafik için)
  const financialData = [
    { month: "Oca", income: 65000, expense: 45000 },
    { month: "Şub", income: 85000, expense: 55000 },
    { month: "Mar", income: 60000, expense: 35000 },
    { month: "Nis", income: 70000, expense: 30000 },
    { month: "May", income: 55000, expense: 40000 },
    { month: "Haz", income: 50000, expense: 45000 },
  ]

  // En yüksek gelir değerini bul (grafik ölçeklendirmesi için)
  const maxValue = Math.max(...financialData.map((item) => Math.max(item.income, item.expense)))

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Üst Başlık */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Ana Sayfa</h1>
        <h2 className="text-xl font-bold text-gray-700 mt-1">HOŞ GELDİNİZ, ŞEREF CAN AVLAK</h2>
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
                <p className="font-medium">KARDEŞLER TAŞIMACILIK A.Ş</p>
              </div>

              <div>
                <p className="text-gray-300">Vergi Numarası</p>
                <p className="font-medium">0000123456789</p>
              </div>

              <div>
                <p className="text-gray-300">Adres</p>
                <p className="font-medium">Atatürk Cad. No:123, İstanbul/Türkiye</p>
              </div>

              <div>
                <p className="text-gray-300">Son İşlem Tarihi</p>
                <p className="font-medium">23.05.2025</p>
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
                    <div className="bg-yellow-400 w-8" style={{ height: `${(item.income / maxValue) * 200}px` }}></div>
                  </div>

                  {/* Gider Çubuğu */}
                  <div className="w-full flex justify-center mb-2">
                    <div className="bg-gray-700 w-8" style={{ height: `${(item.expense / maxValue) * 200}px` }}></div>
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
            {transactions.map((transaction) => (
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
        <button className="p-1 mr-2">
          <ChevronLeft size={18} />
        </button>
        <span>1-50 arası gösteriliyor. Devam et</span>
        <button className="p-1 ml-2">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export default Anasayfa
