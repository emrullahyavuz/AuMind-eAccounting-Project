import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./UI/Table"

// Boş satır oluşturmak için yardımcı fonksiyon
const EmptyRow = () => (
  <TableRow>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell className="border-r border-gray-300"></TableCell>
    <TableCell></TableCell>
  </TableRow>
)

function CariTable() {
  // Örnek veri - gerçek uygulamada API'den gelecektir
  const data = []

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-700 text-white">
            <TableHead className="font-bold border-r border-gray-600 text-center w-16"># Numara</TableHead>
            <TableHead className="font-bold border-r border-gray-600 text-center">Tarih</TableHead>
            <TableHead className="font-bold border-r border-gray-600 text-center">Cari Tipi</TableHead>
            <TableHead className="font-bold border-r border-gray-600 text-center">Açıklama</TableHead>
            <TableHead className="font-bold border-r border-gray-600 text-center">Giriş</TableHead>
            <TableHead className="font-bold border-r border-gray-600 text-center">Çıkış</TableHead>
            <TableHead className="font-bold text-center">Kâr</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => <TableRow key={index}>{/* Veri satırları burada olacak */}</TableRow>)
          ) : (
            // Boş tablo satırları
            <>
              <EmptyRow />
              <EmptyRow />
              <EmptyRow />
              <EmptyRow />
              <EmptyRow />
              <EmptyRow />
              <EmptyRow />
            </>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CariTable

