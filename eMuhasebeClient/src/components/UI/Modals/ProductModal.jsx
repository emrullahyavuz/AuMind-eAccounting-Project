import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialFormData = {
  name: "",
};

function ProductModal({
  isOpen,
  isEditMode,
  product,
  onClose,
  onAddProduct,
  onEditProduct,
}) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [isEditMode, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onEditProduct(formData);
    } else {
      onAddProduct(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4 underline">
          {isEditMode ? "Ürün Düzenle" : "Ürün Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Ürün Adı</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {isEditMode ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
