import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay"

function Dashboard() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    // Gerçek uygulamada API'den veri çekilecek
    const fetchDashboardData = async () => {
      setIsLoading(true)

      // API çağrısı simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Örnek veri
      const data = {
        companyInfo: {
          name: "Kardeşler Taşımacılık A.Ş",
          taxNumber: "1234567890",
          address: "Atatürk Cad. No:123 İstanbul/Türkiye",
          industry: "Lojistik ve Taşımacılık",
          foundedYear: 2010,
        },
        financialSummary: {
          totalRevenue: 1250000,
          monthlyRevenue: 125000,
          pendingInvoices: 45000,
          paidInvoices: 80000,
        },
        revenueData: [
          { month: "Oca", gelir: 65000, gider: 45000 },
          { month: "Şub", gelir: 59000, gider: 40000 },
          { month: "Mar", gelir: 80000, gider: 55000 },
          { month: "Nis", gelir: 81000, gider: 56000 },
          { month: "May", gelir: 90000, gider: 60000 },
          { month: "Haz", gelir: 125000, gider: 80000 },
        ],
        orderStats: {
          totalOrders: 856,
          completedOrders: 720,
          pendingOrders: 98,
          cancelledOrders: 38,
        },
        orderDistribution: [
          { name: "Tamamlanan", value: 720, color: "#10b981" },
          { name: "Bekleyen", value: 98, color: "#f59e0b" },
          { name: "İptal Edilen", value: 38, color: "#ef4444" },
        ],
        recentTransactions: [
          { id: 1, customer: "ABC Lojistik", amount: 12500, date: "15.06.2024", status: "Ödendi" },
          { id: 2, customer: "XYZ Nakliyat", amount: 8750, date: "12.06.2024", status: "Ödendi" },
          { id: 3, customer: "123 Taşıma", amount: 15000, date: "10.06.2024", status: "Beklemede" },
          { id: 4, customer: "Hızlı Kargo", amount: 5250, date: "05.06.2024", status: "Ödendi" },
          { id: 5, customer: "Güven Nakliyat", amount: 9800, date: "01.06.2024", status: "İptal" },
        ],
      }

      setDashboardData(data)
      setIsLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingOverlay />
      </div>
    )
  }

  // Para birimini formatlama
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(value)
  }

  // Yüzde değişimi hesaplama
//   const calculateChange = (current, previous) => {
//     if (!previous) return 0
//     return ((current - previous) / previous) * 100
//   }

  // Örnek değişim yüzdeleri
  const revenueChange = 12.5 // %12.5 artış
  const orderChange = 8.3 // %8.3 artış

  return (
    <div className="p-6 pt-0 bg-gray-100 min-h-screen">
      {/* Başlık ve Kullanıcı Bilgileri */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hoş Geldiniz, {user?.fullName || "Kullanıcı"}</h1>
        <p className="text-gray-600">
          Muhasebe panelinize hoş geldiniz. Güncel finansal durumunuzu buradan takip edebilirsiniz.
        </p>
      </div>

      {/* Firma Bilgileri ve Özet Kartlar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Firma Bilgileri</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Firma Adı</p>
              <p className="font-medium">{dashboardData.companyInfo.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Vergi No</p>
              <p className="font-medium">{dashboardData.companyInfo.taxNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Adres</p>
              <p className="font-medium">{dashboardData.companyInfo.address}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Sektör</p>
              <p className="font-medium">{dashboardData.companyInfo.industry}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Kuruluş Yılı</p>
              <p className="font-medium">{dashboardData.companyInfo.foundedYear}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Toplam Gelir */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Toplam Gelir</p>
              <p className="text-xl font-bold">{formatCurrency(dashboardData.financialSummary.totalRevenue)}</p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs font-medium flex items-center ${revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {revenueChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(revenueChange)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">geçen aya göre</span>
              </div>
            </div>
          </div>

          {/* Aylık Gelir */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Aylık Gelir</p>
              <p className="text-xl font-bold">{formatCurrency(dashboardData.financialSummary.monthlyRevenue)}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">Haziran 2024</span>
              </div>
            </div>
          </div>

          {/* Toplam Sipariş */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Toplam Sipariş</p>
              <p className="text-xl font-bold">{dashboardData.orderStats.totalOrders}</p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-xs font-medium flex items-center ${orderChange >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {orderChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(orderChange)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">geçen aya göre</span>
              </div>
            </div>
          </div>

          {/* Bekleyen Faturalar */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Bekleyen Faturalar</p>
              <p className="text-xl font-bold">{formatCurrency(dashboardData.financialSummary.pendingInvoices)}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">
                  {Math.round(
                    (dashboardData.financialSummary.pendingInvoices / dashboardData.financialSummary.monthlyRevenue) *
                      100,
                  )}
                  % aylık gelirden
                </span>
              </div>
            </div>
          </div>

          {/* Tamamlanan Siparişler */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tamamlanan Siparişler</p>
              <p className="text-xl font-bold">{dashboardData.orderStats.completedOrders}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">
                  {Math.round((dashboardData.orderStats.completedOrders / dashboardData.orderStats.totalOrders) * 100)}%
                  tamamlanma oranı
                </span>
              </div>
            </div>
          </div>

          {/* Aktif Müşteriler */}
          <div className="bg-white p-5 rounded-lg shadow-sm flex items-start">
            <div className="rounded-full bg-indigo-100 p-3 mr-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Aktif Müşteriler</p>
              <p className="text-xl font-bold">42</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5%
                </span>
                <span className="text-xs text-gray-500 ml-1">geçen aya göre</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gelir İstatistikleri */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Gelir İstatistikleri</h2>
            <div className="flex space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
                <span className="text-xs text-gray-600">Gelir</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                <span className="text-xs text-gray-600">Gider</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} labelFormatter={(label) => `${label} 2024`} />
                <Bar dataKey="gelir" fill="#ffcc00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gider" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Sipariş Dağılımı</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.orderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardData.orderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{dashboardData.orderStats.completedOrders}</p>
              <p className="text-xs text-gray-500">Tamamlanan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-500">{dashboardData.orderStats.pendingOrders}</p>
              <p className="text-xs text-gray-500">Bekleyen</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-500">{dashboardData.orderStats.cancelledOrders}</p>
              <p className="text-xs text-gray-500">İptal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Son İşlemler */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Son İşlemler</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlem No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Müşteri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tutar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        transaction.status === "Ödendi"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Beklemede"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

