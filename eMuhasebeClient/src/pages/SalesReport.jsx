import {
  MoneyBagIcon,
  Group327Icon,
  TransactionIcon,
  SplitMoneyIcon,
  taxIcon,
  moneyIcon,
  timeIcon,
  hourglassIcon,
  requestMoneyIcon,
  totalSalesIcon,
  profitIcon,
  fundIcon,
} from "../assets/icons/index";
import { useGetAllInvoicesQuery, useGetPurchaseReportsQuery } from "../store/api";
import { useAuth } from "../hooks/useAuth";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";
function Reports() {
  const { user } = useAuth();
  const { data: purchaseReports, isLoading: isPurchaseReportsLoading } = useGetPurchaseReportsQuery();
  const { data: invoices, isLoading: isInvoicesLoading } = useGetAllInvoicesQuery();

  // Transform purchase reports data for the chart
  const chartData = purchaseReports?.data?.dates?.map((date, index) => ({
    date: new Date(date).toLocaleDateString('tr-TR'),
    value: purchaseReports?.data?.amounts?.[index] || 0
  })) || [];

  // Calculate totals from invoices
  const { totalSales, totalType2, monthlySales, monthlyType2 } = invoices?.data?.reduce((acc, invoice) => {
    const amount = invoice.amount || 0;
    const isType2 = invoice.type?.value === 2;
    const isCurrentMonth = new Date(invoice.date).getMonth() === new Date().getMonth();
    
    return {
      totalSales: acc.totalSales + amount,
      totalType2: acc.totalType2 + (isType2 ? amount : 0),
      monthlySales: acc.monthlySales + (isCurrentMonth ? amount : 0),
      monthlyType2: acc.monthlyType2 + (isCurrentMonth && isType2 ? amount : 0)
    };
  }, { totalSales: 0, totalType2: 0, monthlySales: 0, monthlyType2: 0 }) || { totalSales: 0, totalType2: 0, monthlySales: 0, monthlyType2: 0 };

  // Calculate pie chart data
  const pieData = {
    monthly: {
      completed: Math.round((monthlyType2 / monthlySales) * 100) || 0,
      pending: Math.round(((monthlySales - monthlyType2) / monthlySales) * 100) || 0
    },
    yearly: {
      completed: Math.round((totalType2 / totalSales) * 100) || 0,
      pending: Math.round(((totalSales - totalType2) / totalSales) * 100) || 0
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (isPurchaseReportsLoading || isInvoicesLoading) {
    return <LoadingOverlay />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Başlık */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Raporlar</h1>
        <h2 className="text-xl font-bold text-gray-700">
          HOŞ GELDİNİZ, {user?.fullName?.toUpperCase()}
        </h2>
      </div>

      {/* Çizgi Grafik */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <div className="h-64 relative">
          {/* Y ekseni değerleri */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-white text-xs">
            {[5, 4, 3, 2, 1, 0].map((multiplier) => (
              <div key={multiplier}>
                {formatCurrency(Math.max(...chartData.map(d => d.value)) * (multiplier / 5))}
              </div>
            ))}
          </div>

          {/* Izgara çizgileri */}
          <div className="absolute left-12 right-0 top-0 bottom-0 grid grid-cols-12 grid-rows-5">
            {Array.from({ length: 72 }).map((_, index) => (
              <div key={index} className="border border-gray-600"></div>
            ))}
          </div>

          {/* X ekseni değerleri */}
          <div className="absolute bottom-0 left-12 right-0 flex justify-between transform translate-y-6">
            {chartData.map((point, index) => (
              <div
                key={index}
                className="text-white text-xs -rotate-45 origin-top-left"
              >
                {point.date}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-white text-sm mt-8">
          Son ay günlük raporu görüntülüyorsunuz
        </div>
      </div>

      {/* Pasta Grafikler */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Aylık Ürün Satışı */}
          <div>
            <h3 className="text-white text-center mb-2">AYLIK ÜRÜN SATIŞI</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#00ff00 0% ${pieData.monthly.completed}%, #ffcc00 ${pieData.monthly.completed}% 100%)`,
                  }}
                ></div>
                <div className="absolute inset-3 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-1"></div>
                <span className="text-white text-xs">TAMAMLANAN</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-white text-xs">BEKLEYEN</span>
              </div>
            </div>
          </div>

          {/* Yıllık Ürün Satışı */}
          <div>
            <h3 className="text-white text-center mb-2">YILLIK ÜRÜN SATIŞI</h3>
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#00ff00 0% ${pieData.yearly.completed}%, #ffcc00 ${pieData.yearly.completed}% 100%)`,
                  }}
                ></div>
                <div className="absolute inset-3 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-1"></div>
                <span className="text-white text-xs">TAMAMLANAN</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 mr-1"></div>
                <span className="text-white text-xs">BEKLEYEN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gelir Kartları */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-white text-lg font-bold mb-4">GELİR</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Toplam Gelir */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-green-100 rounded-full p-3 mr-3">
              <img src={MoneyBagIcon} className="h-16 w-16" alt="Money Bag" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Toplam Gelir</div>
              <div className="text-lg font-bold">{formatCurrency(totalType2)}</div>
              <div className="text-xs text-green-600">
                Önceki aya göre %5,5 daha fazla
              </div>
            </div>
          </div>

          {/* Aylık Gelir */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-green-100 rounded-full p-3 mr-3">
              <img src={Group327Icon} className="h-16 w-16" alt="Group 327" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Aylık Gelir</div>
              <div className="text-lg font-bold">{formatCurrency(monthlyType2)}</div>
              <div className="text-xs text-green-600">
                Önceki aya göre %4,5 daha fazla
              </div>
            </div>
          </div>

          {/* Beklenen Gelir */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-green-100 rounded-full p-3 mr-3">
              <img src={TransactionIcon} className="h-16 w-16" alt="Transaction" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Beklenen Gelir</div>
              <div className="text-lg font-bold">{formatCurrency(totalType2 - monthlyType2)}</div>
              <div className="text-xs text-green-600">
                Önceki aya göre %3,5 daha fazla
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gider Kartları */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-white text-lg font-bold mb-4">GİDER</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Toplam Gider */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-red-100 rounded-full p-3 mr-3">
              <img src={SplitMoneyIcon} className="h-16 w-16" alt="Split Money" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Toplam Gider</div>
              <div className="text-lg font-bold">{formatCurrency(totalSales - totalType2)}</div>
              <div className="text-xs text-red-600">
                Önceki aya göre %2,5 daha fazla
              </div>
            </div>
          </div>

          {/* Aylık Gider */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-red-100 rounded-full p-3 mr-3">
              <img src={taxIcon} className="h-16 w-16" alt="tax" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Aylık Gider</div>
              <div className="text-lg font-bold">{formatCurrency(monthlySales - monthlyType2)}</div>
              <div className="text-xs text-red-600">
                Önceki aya göre %3,5 daha fazla
              </div>
            </div>
          </div>

          {/* Beklenen Gider */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-red-100 rounded-full p-3 mr-3">
              <img src={requestMoneyIcon} className="h-16 w-16" alt="requestMoney" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Beklenen Gider</div>
              <div className="text-lg font-bold">{formatCurrency((totalSales - totalType2) - (monthlySales - monthlyType2))}</div>
              <div className="text-xs text-red-600">
                Önceki aya göre %1,5 daha fazla
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bekleyen Kartları */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-white text-lg font-bold mb-4">BEKLEYEN</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Toplam Bekleyen */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-yellow-100 rounded-full p-3 mr-3">
              <img src={moneyIcon} className="h-16 w-16" alt="money" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Toplam Bekleyen</div>
              <div className="text-lg font-bold">{formatCurrency(totalSales - totalType2)}</div>
              <div className="text-xs text-yellow-600">
                Önceki aya göre %1,5 daha fazla
              </div>
            </div>
          </div>

          {/* Aylık Bekleyen */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-yellow-100 rounded-full p-3 mr-3">
              <img src={timeIcon} className="h-16 w-16" alt="time" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Aylık Bekleyen</div>
              <div className="text-lg font-bold">{formatCurrency(monthlySales - monthlyType2)}</div>
              <div className="text-xs text-yellow-600">
                Önceki aya göre %3,5 daha fazla
              </div>
            </div>
          </div>

          {/* Net Bekleyen */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-yellow-100 rounded-full p-3 mr-3">
              <img src={hourglassIcon} className="h-16 w-16" alt="hourglass" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Net Bekleyen</div>
              <div className="text-lg font-bold">{formatCurrency((totalSales - totalType2) - (monthlySales - monthlyType2))}</div>
              <div className="text-xs text-yellow-600">
                Önceki aya göre %0,5 daha fazla
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ürün Satışı Kartları */}
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-white text-lg font-bold mb-4">ÜRÜN SATIŞI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Toplam Satış */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-blue-100 rounded-full p-3 mr-3">
              <img src={totalSalesIcon} className="h-16 w-16" alt="Transaction" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Toplam Satış</div>
              <div className="text-lg font-bold">{formatCurrency(totalSales)}</div>
              <div className="text-xs text-blue-600">
                Önceki aya göre %2,5 daha fazla
              </div>
            </div>
          </div>

          {/* Aylık Satış */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-blue-100 rounded-full p-3 mr-3">
              <img src={profitIcon} className="h-16 w-16" alt="Transaction" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Aylık Satış</div>
              <div className="text-lg font-bold">{formatCurrency(monthlySales)}</div>
              <div className="text-xs text-blue-600">
                Önceki aya göre %4,5 daha fazla
              </div>
            </div>
          </div>

          {/* Beklenen Satış */}
          <div className="bg-white rounded-lg p-4 flex">
            <div className="bg-blue-100 rounded-full p-3 mr-3">
              <img src={fundIcon} className="h-16 w-16" alt="Transaction" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Beklenen Satış</div>
              <div className="text-lg font-bold">{formatCurrency(totalSales - monthlySales)}</div>
              <div className="text-xs text-blue-600">
                Önceki aya göre %2,5 daha fazla
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
