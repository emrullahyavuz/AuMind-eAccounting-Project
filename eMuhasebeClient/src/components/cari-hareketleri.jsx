import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./UI/Button"
import CariTable from "./cari-table"

function CariHareketleri() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#00b8e6] text-white p-2 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Menü</span>
          </Button>

          <div className="ml-4 bg-white text-black rounded px-3 py-2 flex items-center">
            <span className="mr-2">Kardeşler Taşımacılık A.Ş</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="sr-only">Ana Sayfa</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-white ml-2 bg-red-600 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span className="sr-only">Çıkış</span>
          </Button>
        </div>
      </header>

      {/* Back Button */}
      <div className="p-4 flex justify-end">
        <Button variant="ghost" size="icon" className="rounded-full border border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="sr-only">Geri</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-700 border-b-2 border-gray-700 pb-2 mb-6">CARİ HAREKETLERİ</h1>

        <div className="bg-gray-200 rounded-lg p-6">
          {/* Search Bar */}
          <div className="flex justify-end mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Cari adı giriniz..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-64 rounded"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Ara</span>
              </Button>
            </div>
          </div>

          {/* Table */}
          <CariTable />
        </div>
      </div>
    </div>
  )
}

export default CariHareketleri

