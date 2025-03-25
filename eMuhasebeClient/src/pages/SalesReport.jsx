import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import DownloadModal from "../components/Reports/DownloadModal"
import DownloadMessage from "../components/Reports/DownloadMessage"
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay"

function SalesReport() {
  const [reportType, setReportType] = useState("daily")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMessageVisible, setIsMessageVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  // Örnek veri yükleme - daha sonra gerçek uygulamada API'den gelecek
  useEffect(() => {
    // API çağrısı simülasyonu
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // Grafik için tarih etiketleri
  const dateLabels = [
    "05.01.24",
    "08.02.24",
    "12.03.24",
    "09.04.24",
    "11.05.24",
    "14.06.24",
    "06.07.24",
    "08.08.24",
    "10.09.24",
    "14.10.24",
    "16.11.24",
    "02.12.24",
  ]

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleDownload = (format) => {
    console.log(`Rapor ${format} formatında indiriliyor...`)

    // Gerçek uygulamada burada API çağrısı yapılacak
    // Simüle edilmiş indirme işlemi örneği
    setTimeout(() => {
      setIsMessageVisible(true)
    }, 1000)
  }

  const handleCloseMessage = () => {
    setIsMessageVisible(false)
  }

  if(isLoading) {
    return <div className="p-6"><LoadingOverlay /></div>
  }

  return (
    <div className="p-6 pt-0 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">SATIŞ RAPORU</h1>

      <div className="bg-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            {/* Rapor Filtreleri */}
            <div className="flex flex-wrap gap-4 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="daily"
                  checked={reportType === "daily"}
                  onChange={() => setReportType("daily")}
                  className="sr-only"
                />
                <span
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    reportType === "daily" ? "bg-cyan-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  GÜNLÜK RAPOR
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="weekly"
                  checked={reportType === "weekly"}
                  onChange={() => setReportType("weekly")}
                  className="sr-only"
                />
                <span
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    reportType === "weekly" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  HAFTALIK RAPOR
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="monthly"
                  checked={reportType === "monthly"}
                  onChange={() => setReportType("monthly")}
                  className="sr-only"
                />
                <span
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    reportType === "monthly" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  AYLIK RAPOR
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="reportType"
                  value="yearly"
                  checked={reportType === "yearly"}
                  onChange={() => setReportType("yearly")}
                  className="sr-only"
                />
                <span
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    reportType === "yearly" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  YILLIK RAPOR
                </span>
              </label>
            </div>

            {/* Grafik */}
            <div className="relative h-80 border border-gray-300 bg-white">
              {/* Y ekseni etiketleri */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-right pr-2 text-gray-600">
                <div>250.000</div>
                <div>200.000</div>
                <div>150.000</div>
                <div>100.000</div>
                <div>50.000</div>
                <div>0</div>
              </div>

              {/* Grafik ızgarası */}
              <div className="absolute left-16 right-0 top-0 bottom-0">
                <div className="grid grid-cols-12 grid-rows-5 h-full w-full">
                  {Array.from({ length: 72 }).map((_, index) => (
                    <div key={index} className="border border-gray-200"></div>
                  ))}
                </div>

                {/* X ekseni etiketleri */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between transform translate-y-full mt-1">
                  {dateLabels.map((date, index) => (
                    <div key={index} className="text-xs text-gray-600 -rotate-45 origin-top-left ml-2">
                      {date}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* İndir Butonu */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleOpenModal}
                className="bg-yellow-400 hover:bg-cyan-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Download size={18} className="mr-2" />
                RAPORU İNDİR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* İndirme Modalı */}
      <DownloadModal isOpen={isModalOpen} onClose={handleCloseModal} onDownload={handleDownload} />

      {/* Başarı Mesajı */}
      <DownloadMessage isVisible={isMessageVisible} onClose={handleCloseMessage} />
    </div>
  )
}

export default SalesReport

