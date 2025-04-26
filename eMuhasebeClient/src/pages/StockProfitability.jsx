import DataTable from "../components/Admin/data-table";

export default function StockProfitability() {
  return (
    <DataTable
      title="Stok Kârlılık Raporu"
      columns={[
        { header: "Cari Hesap No", accessor: "cariAccount" },
        { header: "Ürün Adı", accessor: "productName" },
        { header: "Alış Birim Fiyat", accessor: "purchaseUnitPrice" },
        { header: "Satış Birim Fiyat", accessor: "saleUnitPrice" },
        { header: "Kârlılık", accessor: "profit" },
        { header: "Kârlılık Yüzdesi", accessor: "profitPercentage" },
      ]}
      data={[
        {
          cariAccount: "Şirket A",
          productName: "2023-10-01",
          purchaseUnitPrice: "Alış",
          saleUnitPrice: "Malzeme alımı",
          profit: 1000,
          profitPercentage: 0,
        },
        {
          cariAccount: "Şirket B",
          productName: "2023-10-01",
          purchaseUnitPrice: "Alış",
          saleUnitPrice: "Malzeme alımı",
          profit: 1000,
          profitPercentage: 0,
        },
      ]}
      isStock={true}
    />
  );
}


