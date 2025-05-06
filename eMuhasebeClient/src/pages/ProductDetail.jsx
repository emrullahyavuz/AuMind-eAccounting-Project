import { useEffect, useState } from "react";
import DataTable from "../components/Admin/data-table";
import { useGetAllProductDetailsMutation } from "../store/api";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [productDetails, setProductDetails] = useState([]);
  const [getAllProductDetails, { isLoading }] = useGetAllProductDetailsMutation();
  const { id: productId } = useParams(); // URL'den productId'yi alıyoruz
   
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        debugger
        const response = await getAllProductDetails(productId).unwrap();
        console.log(response)
        setProductDetails(response.data.details);
      } catch (error) {
        console.error('Ürün detayları yüklenirken hata oluştu:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, getAllProductDetails]);

  return (
    <DataTable
      title="Stok Hareketleri"
      columns={[
        { 
          header: "# Numara", 
          accessor: "id", 
          className: "w-24 font-bold text-yellow-500",
        },
        { header: "Tarih", accessor: "date" },
        { header: "Açıklama", accessor: "description" },
        { header: "Giriş", accessor: "deposit" },
        { header: "Çıkış", accessor: "withdrawal" },
      ]}  
      data={productDetails} 
      isStock={true}
      loading={isLoading}
    />
  );
}