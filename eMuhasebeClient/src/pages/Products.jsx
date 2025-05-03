import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/Admin/data-table";
import { Info, Trash2 } from "lucide-react";
import LoadingOverlay from "../components/UI/Spinner/LoadingOverlay";
import ProductModal from "../components/UI/Modals/ProductModal";
import DeleteConfirmationModal from "../components/UI/Modals/DeleteConfirmationModal";
import {
  useGetAllProductsMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../store/api";
import { useToast } from "../hooks/useToast";

const Products = () => {
  const navigate = useNavigate();
  const [currents, setCurrents] = useState([]);
  const [filteredCurrents, setFilteredCurrents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const { showToast } = useToast();

  // RTK Query Hooks
  const [getAllProducts, { isLoading: isLoadingProducts }] =
    useGetAllProductsMutation();
  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeletingProduct }] =
    useDeleteProductMutation();

  // Sayfa başına gösterilecek kasa sayısı
  const itemsPerPage = 50;

  // Detay butonu render fonksiyonu
  const renderDetailButton = (product) => (
    <button
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-1 px-3 rounded-md flex items-center"
    >
      <Info size={16} className="mr-1" />
      Detay Gör
    </button>
  );

  // Ürünler tablosu sütun tanımları
  const columns = [
    {
      header: "# Numara",
      accessor: "id",
      className: "w-24 font-bold text-yellow-500",
    },
    { header: "Ürün Adı", accessor: "name" },
    { header: "Giriş", accessor: "stock" },
    { header: "Çıkış", accessor: "withdrawal" },
    { header: "Bakiye", accessor: "deposit" },
    {
      header: "İşlemler",
      accessor: "actions",
      render: renderDetailButton,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts().unwrap();
        const productArray = Array.isArray(result.data) ? result.data : [];
        setCurrents(productArray);
        setFilteredCurrents(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
        setCurrents([]);
        setFilteredCurrents([]);
      }
    };
    fetchData();
  }, []);

  // Sayfalama işlemleri
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredCurrents.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Kasalar sayfasına özel Detay Gör butonu
  const detailButton = (
    <button
      onClick={() => console.log("Detay Gör butonuna tıklandı")}
      className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center mr-4"
    >
      <Info size={18} className="mr-2" />
      Detay Gör
    </button>
  );

  // Kasa ekleme işlemi
  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  // Kasa düzenleme işlemi
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    console.log(product);
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = async (product) => {
    debugger;
    const result = await createProduct(product).unwrap();
    console.log(result);
    setIsAddModalOpen(false);
    setSelectedProduct(null);
    showToast("Ürün başarıyla eklendi", "success");
  };

  const handleEditSubmit = async (product) => {
    debugger;
    console.log(selectedProduct);
    const result = await updateProduct({id:selectedProduct.id,...product}).unwrap();
    console.log(result);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    showToast("Ürün başarıyla güncellendi", "success");
  };
  console.log(currents);

  // Kasa silme işlemi
  const handleDeleteProduct = (productId) => {
    console.log(productId);
    if (Array.isArray(productId)) {
      // Toplu silme
      setProductToDelete({ ids: productId, name: `${productId.length} ürün` });
    } else {
      // Tekli silme
      const product = currents.find((c) => c.id === productId);
      setProductToDelete({ ids: [productId], name: product.name });
    }
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        if (Array.isArray(productToDelete.ids)) {
          // Toplu silme
          for (const id of productToDelete.ids) {
            await deleteProduct(id);
          }
          showToast(`${productToDelete.ids.length} ürün başarıyla silindi`, "success");
        } else {
          // Tekli silme
          await deleteProduct(productToDelete.ids);
          showToast(`${productToDelete.name} ürün başarıyla silindi`, "success");
        }
        // Update the currents state to remove deleted items
        const updatedCurrents = currents.filter(
          (product) => !productToDelete.ids.includes(product.id)
        );
        setCurrents(updatedCurrents);
        setFilteredCurrents(updatedCurrents);
        // Clear selected items after deletion
        setSelectedItems([]);
      } catch (error) {
        console.error("Error deleting product:", error);
        showToast("Ürün silinirken bir hata oluştu", "error");
      }
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  // Kasa arama işlemi
  const handleSearch = (searchTerm) => {
    setFilteredCurrents(
      currents.filter((cash) =>
        cash.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
      )
    );
    setCurrentPage(1);
  };

  // Özel butonlar
  const customButtons = (
    <>
      {detailButton}
      {selectedItems.length > 0 && (
        <button
          onClick={() => handleDeleteProduct(selectedItems)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
        >
          <Trash2 size={18} className="mr-2" />
          Seçilenleri Sil ({selectedItems.length})
        </button>
      )}
    </>
  );

  // Sayfa başına listeleme işlemi
  const currentProducts = Array.isArray(currents)
    ? currents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  // if (isLoading) {
  //   return (
  //     <div className="p-6">
  //       <LoadingOverlay />
  //     </div>
  //   );
  // }

  return (
    <>
      <DataTable
        title="Ürünler"
        addButtonText="Ürün Ekle"
        addButtonColor="yellow"
        columns={columns}
        data={currentProducts}
        searchPlaceholder="Ürün Adı Giriniz..."
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onSearch={handleSearch}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={filteredCurrents.length}
        onPageChange={handlePageChange}
        customButtons={customButtons}
        headerColor="gray-800"
        headerTextColor="white"
        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}
      />
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddSubmit}
      />
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        isEditMode={true}
        onEditProduct={handleEditSubmit}
        product={selectedProduct}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Ürün Silme"
        message={`${productToDelete?.name || ""} ${
          productToDelete?.ids?.length > 1 ? "ürünlerini" : "ürünü"
        } silmek istediğinizden emin misiniz?`}
      />
    </>
  );
};

export default Products;
