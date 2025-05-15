import { useState, useEffect } from "react";
import DataTable from "../components/Admin/data-table";
import { useGetProductProfitabilityReportsQuery } from "../store/api";

export default function StockProfitability() {
  const [currents, setCurrents] = useState([]);
  const [filteredCurrents, setFilteredCurrents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Get product profitability reports
  const { data } = useGetProductProfitabilityReportsQuery();

  useEffect(() => {
    if (data?.data) {
      const productArray = Array.isArray(data.data) ? data.data : [];
      setCurrents(productArray);
      setFilteredCurrents(productArray);
    }
  }, [data]);

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredCurrents.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    setFilteredCurrents(
      currents.filter((item) =>
        item.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      )
    );
    setCurrentPage(1);
  };

  // Sayfa başına listeleme işlemi
  const currentProducts = Array.isArray(filteredCurrents)
    ? filteredCurrents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  return (
    <DataTable
      title="Stok Kârlılık Raporu"
      columns={[
        {
          header: "Ürün Numarası",
          accessor: "id",
          className: "w-24 font-bold text-yellow-500",
        },
        { header: "Ürün Adı", accessor: "name" },
        { header: "Alış Birim Fiyat", accessor: "depositPrice" },
        { header: "Satış Birim Fiyat", accessor: "withdrawalPrice" },
        { header: "Kârlılık", accessor: "profit" },
        {
          header: "Kârlılık Yüzdesi",
          accessor: (row) => Number(row.profitPercent).toFixed(2) + "%",
        },
      ]}
      data={currentProducts}
      isStock={true}
      searchPlaceholder="Ürün Adı Giriniz..."
      onSearch={handleSearch}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={filteredCurrents.length}
      onPageChange={handlePageChange}
      headerColor="gray-800"
      headerTextColor="white"
    />
  );
}
