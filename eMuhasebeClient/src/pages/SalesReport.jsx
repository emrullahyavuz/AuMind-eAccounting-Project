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
import { useState, useMemo } from "react";

function Reports() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('daily'); // 'daily', 'monthly', 'yearly'
  const { data: purchaseReports, isLoading: isPurchaseReportsLoading } = useGetPurchaseReportsQuery();
  const { data: invoices, isLoading: isInvoicesLoading } = useGetAllInvoicesQuery();

  // Transform purchase reports data based on selected period
  const chartData = useMemo(() => {
    if (!purchaseReports?.data?.dates) return [];

    const dates = purchaseReports.data.dates;
    const amounts = purchaseReports.data.amounts || [];

    const groupedData = dates.reduce((acc, date, index) => {
      const dateObj = new Date(date);
      let key;

      switch (selectedPeriod) {
        case 'daily':
          key = dateObj.toLocaleDateString('tr-TR');
          break;
        case 'monthly':
          key = `${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
          break;
        case 'yearly':
          key = dateObj.getFullYear().toString();
          break;
        default:
          key = dateObj.toLocaleDateString('tr-TR');
      }

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += amounts[index] || 0;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, value]) => ({
      date,
      value
    }));
  }, [purchaseReports?.data, selectedPeriod]);

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
        {/* Period Selection Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setSelectedPeriod('daily')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 'daily'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            Günlük
          </button>
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 'monthly'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            Aylık
          </button>
          <button
            onClick={() => setSelectedPeriod('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 'yearly'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
          >
            Yıllık
          </button>
        </div>

        <div className="h-64 relative">
          {/* Y ekseni değerleri */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-white text-xs w-16">
            {[5, 4, 3, 2, 1, 0].map((multiplier) => (
              <div key={multiplier} className="px-2">
                {formatCurrency(Math.max(...chartData.map(d => d.value)) * (multiplier / 5))}
              </div>
            ))}
          </div>

          {/* Grafik alanı */}
          <div className="absolute left-16 right-0 top-0 bottom-0 pl-4 pr-4">
            {/* Izgara çizgileri */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-5">
              {Array.from({ length: 72 }).map((_, index) => (
                <div key={index} className="border border-gray-600"></div>
              ))}
            </div>

            {/* Grafik çizgisi */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Gradient tanımı */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ff00" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00ff00" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Alan dolgusu */}
              <path
                d={`M 0,100 ${chartData.map((point, index) => {
                  const x = (index / (chartData.length - 1)) * 100;
                  const y = 100 - (point.value / Math.max(...chartData.map(d => d.value))) * 100;
                  return `L ${x},${y}`;
                }).join(' ')} L 100,100 Z`}
                fill="url(#lineGradient)"
              />

              {/* Ana çizgi */}
              <polyline
                points={chartData.map((point, index) => {
                  const x = (index / (chartData.length - 1)) * 100;
                  const y = 100 - (point.value / Math.max(...chartData.map(d => d.value))) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#00ff00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Veri noktaları */}
              {chartData.map((point, index) => {
                const x = (index / (chartData.length - 1)) * 100;
                const y = 100 - (point.value / Math.max(...chartData.map(d => d.value))) * 100;
                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="#00ff00"
                      className="transition-all duration-200 hover:r-5"
                    />
                    {/* Tooltip */}
                    <g className="opacity-0 hover:opacity-100 transition-opacity">
                      <rect
                        x={x - 30}
                        y={y - 25}
                        width="60"
                        height="20"
                        fill="#1a1a1a"
                        rx="4"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="8"
                      >
                        {formatCurrency(point.value)}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X ekseni değerleri */}
          <div className="absolute bottom-0 left-16 right-0 flex justify-between transform translate-y-6 px-4">
            {chartData.map((point, index) => (
              <div
                key={index}
                className="text-white text-xs -rotate-45 origin-top-left whitespace-nowrap"
                style={{ width: '60px' }}
              >
                {point.date}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-white text-sm mt-8">
          {selectedPeriod === 'daily' && 'Son ay günlük raporu görüntülüyorsunuz'}
          {selectedPeriod === 'monthly' && 'Son 12 ay aylık raporu görüntülüyorsunuz'}
          {selectedPeriod === 'yearly' && 'Son 5 yıl yıllık raporu görüntülüyorsunuz'}
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
