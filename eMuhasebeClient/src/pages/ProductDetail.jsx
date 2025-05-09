import { useEffect, useState } from "react";
import DataTable from "../components/Admin/data-table";
import { useGetAllProductDetailsMutation } from "../store/api";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const [productDetails, setProductDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getAllProductDetails, { isLoading }] = useGetAllProductDetailsMutation();
  const { id: productId } = useParams(); // URL'den productId'yi alıyoruz
   
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getAllProductDetails(productId).unwrap();
        console.log(response);
        const details = response.data.details || [];
        setProductDetails(details);
        setFilteredDetails(details);
      } catch (error) {
        console.error('Ürün detayları yüklenirken hata oluştu:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId, getAllProductDetails]);

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredDetails.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Arama işlemi
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredDetails(productDetails);
    } else {
      const filtered = productDetails.filter((detail) =>
        detail.description.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      );
      setFilteredDetails(filtered);
      setCurrentPage(1); // Arama yapıldığında ilk sayfaya dön
    }
  };

  // Sayfa başına listeleme işlemi
  const currentDetails = Array.isArray(filteredDetails)
    ? filteredDetails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

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
        { header: "Giriş", accessor: "deposit", className: "text-green-600" },
        { header: "Çıkış", accessor: "withdrawal", className: "text-red-600" },
      ]}  
      data={currentDetails}
      isStock={true}
      loading={isLoading}
      searchPlaceholder="Açıklama Arayınız..."
      onSearch={handleSearch}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={filteredDetails.length}
      onPageChange={handlePageChange}
      headerColor="gray-800"
      headerTextColor="white"
    />
  );
}