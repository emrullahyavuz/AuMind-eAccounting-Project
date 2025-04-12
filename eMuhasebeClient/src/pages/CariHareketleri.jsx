import React from "react";
import DataTable from "../components/Admin/data-table";

const CariHareketleri = () => {
  return (
    <DataTable
      title="Cari Hareketleri"
      columns={[
        { header: "Cari Hesap No", accessor: "cariAccount" },
        { header: "Tarih", accessor: "date" },
        { header: "Cari Tipi", accessor: "cariType" },
        { header: "Açıklama", accessor: "description" },
        { header: "Giriş", accessor: "inflow" },
        { header: "Çıkış", accessor: "checkout" },
      ]}
      data={[
        {
          cariAccount: "Şirket A",
          date: "2023-10-01",
          cariType: "Alış",
          description: "Malzeme alımı",
          inflow: 1000,
          checkout: 0,
        },
        {
          cariAccount: "Şirket B",
          date: "2023-10-01",
          cariType: "Veriş",
          description: "Malzeme alımı",
          inflow: 1000,
          checkout: 0,
        },
      ]}
      isCari={true} // Cari hesaplar için özel stil
    />
  );
};

export default CariHareketleri;
