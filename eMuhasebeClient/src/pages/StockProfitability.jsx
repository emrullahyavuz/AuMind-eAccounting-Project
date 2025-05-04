import DataTable from "../components/Admin/data-table";
import { useGetProductProfitabilityReportsQuery } from "../store/api";

export default function StockProfitability() {

  // Get product profitability reports
  const { data, isLoading } = useGetProductProfitabilityReportsQuery();
  
 
  return (
    <DataTable
      title="Stok Kârlılık Raporu"
      columns={[
        { header: "Ürün Numarası", 
          accessor: "id", 
          className: "w-24 font-bold text-yellow-500",
        },
        { header: "Ürün Adı", accessor: "name" },
        { header: "Alış Birim Fiyat", accessor: "depositPrice" },
        { header: "Satış Birim Fiyat", accessor: "withdrawalPrice" },
        { header: "Kârlılık", accessor: "profit" },
        { header: "Kârlılık Yüzdesi", accessor: "profitPercent" },
      ]}  
      data={data?.data || []} 
      isStock={true}
    />
  );
}


