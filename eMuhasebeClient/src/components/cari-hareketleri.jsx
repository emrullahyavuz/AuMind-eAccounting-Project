import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import CariTable from "./cari-table";

function CariHareketleri() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      

      {/* Main Content */}
      <div className="px-8 py-4">
        <h1 className="text-3xl font-bold text-gray-700 border-b-2 border-gray-700 pb-2 mb-6">
          CARİ HAREKETLERİ
        </h1>

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
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
              >
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
  );
}

export default CariHareketleri;
