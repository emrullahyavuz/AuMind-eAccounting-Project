import { useEffect, useState } from "react";
import { X, Calendar, ChevronDown, Plus } from "lucide-react";
import {
  useGetAllCustomersQuery,
  useGetAllProductsMutation,
} from "../../../store/api";

function InvoiceModal({
  isOpen,
  isEditMode,
  invoice,
  onClose,
  onAddInvoice,
  onEditInvoice,
  updateInvoice,
}) {
  const { data: customers } = useGetAllCustomersQuery();
  const [products] = useGetAllProductsMutation();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await products().unwrap();
        setProductsData(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  const [formData, setFormData] = useState({
    typeValue: invoice?.typeValue === 2 ? "satis" : "alis",
    date: invoice?.date || new Date().toISOString().split("T")[0],
    customerId: invoice?.customerId || "",
    details: invoice?.details || [],
    vatRate: invoice?.vatRate || 0,
  });

  const [newItem, setNewItem] = useState({
    productId: "",
    quantity: "",
    price: "",
    total: "",
    vatRate: 0
  });

  // Düzenleme modunda fatura verilerini yükle
  useEffect(() => {
    if (isEditMode && invoice) {
      // Müşteri adını bul
      const customer = customers?.data?.find(c => c.id === invoice.customerId);
      
      // Ürün detaylarını hazırla
      const details = invoice.details?.map(detail => {
        const product = productsData.find(p => p.id === detail.productId);
        return {
          productId: product?.name || "",
          quantity: detail.quantity,
          price: detail.price,
          vatRate: detail.vatRate,
          total: detail.total
        };
      });

      setFormData({
        typeValue: invoice.typeValue === 2 ? "satis" : "alis",
        date: invoice.date,
        customerId: customer?.name || "",
        details: details || [],
        vatRate: invoice.vatRate || 0,
      });
    }
  }, [isEditMode, invoice, customers?.data, productsData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;

    // Eğer adet veya birim fiyat değişirse, toplamı otomatik hesapla
    const updatedItem = { ...newItem, [name]: value };

    if (name === "quantity" || name === "price") {
      const quantity =
        name === "quantity"
          ? Number.parseFloat(value) || 0
          : Number.parseFloat(newItem.quantity) || 0;
      const price =
        name === "price"
          ? Number.parseFloat(value) || 0
          : Number.parseFloat(newItem.price) || 0;
      updatedItem.total = (quantity * price).toFixed(2);
    }

    // KDV input'u temizlendiğinde 0 olarak ayarla
    if (name === "vatRate") {
      updatedItem.vatRate = value === "" ? 0 : Number(value).toFixed(2);
    }

    setNewItem(updatedItem);
  };

  const addItem = () => {
    if (newItem.productId && newItem.quantity && newItem.price) {
      setFormData({
        ...formData,
        details: [...formData.details, { ...newItem }],
      });
      setNewItem({
        productId: "",
        quantity: "",
        price: "",
        total: "",
        vatRate: 0
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      const updatedFormData = {
        ...formData,
        typeValue: formData.typeValue === "satis" ? 2 : 1,
      };

      const customer = customers?.data.find(
        (c) => c.name === formData.customerId
      );

      // Tüm ürünleri tek bir faturada topla
      const filteredUpdateFormData = {
        ...updatedFormData,
        customerId: customer.id,
        details: updatedFormData.details.map((item) => {
          const product = productsData.find((p) => p.name === item.productId);
          return {
            productId: product.id,
            quantity: Number(item.quantity),
            price: Number(item.price),
            vatRate: Number(item.vatRate || 0),
            total: Number(item.total)
          };
        }),
      };

      onEditInvoice(filteredUpdateFormData);
    } else {
      const updatedFormData = {
        ...formData,
        typeValue: formData.typeValue === "satis" ? 2 : 1,
      };

      const customer = customers?.data.find(
        (c) => c.name === formData.customerId
      );

      // Tüm ürünleri tek bir faturada topla
      const filteredUpdateFormData = {
        ...updatedFormData,
        customerId: customer.id,
        details: updatedFormData.details.map((item) => {
          const product = productsData.find((p) => p.name === item.productId);
          return {
            productId: product.id,
            quantity: Number(item.quantity),
            price: Number(item.price),
            vatRate: Number(item.vatRate || 0),
            total: Number(item.total)
          };
        }),
      };

      onAddInvoice(filteredUpdateFormData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-center text-2xl font-medium mb-6 underline">
          {isEditMode ? "Faturayı Güncelle" : "Fatura Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-1">Fatura Tipi</label>
              <div className="relative">
                <select
                  name="typeValue"
                  value={formData.typeValue}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                  required
                >
                  <option value="">Seçiniz...</option>
                  <option value="satis">Satış Faturası</option>
                  <option value="alis">Alış Faturası</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Tarih</label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white pr-10"
                  required
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Müşteri</label>
              <div className="relative">
                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                  required
                >
                  <option value="">Seçiniz...</option>
                  {customers?.data?.map((customer) => (
                    <option key={customer.id} value={customer.name}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            {/* <div>
              <label className="block text-gray-700 mb-1">
                Fatura Numarası
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div> */}
          </div>

          {/* Ürün Ekleme Alanı */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Ürün</label>
              <div className="relative">
                <select
                  name="productId"
                  value={newItem.productId}
                  onChange={handleItemChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
                >
                  <option value="">Seçiniz...</option>
                  {productsData?.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Adet</label>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Birim Fiyat</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">KDV Oranı</label>
              <input
                type="number"
                name="vatRate"
                value={newItem.vatRate}
                onChange={handleItemChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Toplam</label>
              <input
                type="text"
                name="total"
                value={newItem.total}
                readOnly
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">İşlemler</label>
              <button
                type="button"
                onClick={addItem}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md p-2 flex items-center justify-center"
              >
                <span>EKLE</span>
                <Plus size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Ürün Tablosu */}
          <div className="border-t border-b border-gray-400 py-2 mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="py-2 text-left">#</th>
                  <th className="py-2 text-left">Ürün Adı</th>
                  <th className="py-2 text-left">Adet</th>
                  <th className="py-2 text-left">Birim Fiyat</th>
                  <th className="py-2 text-left">KDV Oranı</th>
                  <th className="py-2 text-left">Toplam</th>
                  <th className="py-2 text-left">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {formData.details &&
                  formData.details.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{item.productId}</td>
                      <td className="py-2">{Number(item.quantity).toFixed(2)}</td>
                      <td className="py-2">{Number(item.price).toFixed(2)}</td>
                      <td className="py-2">{Number(item.vatRate).toFixed(2)}</td>
                      <td className="py-2">
                        {(Number(item.price) + Number((item.vatRate * item.price) / 100)).toFixed(2)}
                      </td>
                      <td className="py-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              details: formData.details.filter(
                                (i) => i.productId !== item.productId
                              ),
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                {formData.details && formData.details.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      Henüz ürün eklenmedi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-8 rounded-md"
            >
              {isEditMode ? "Faturayı Güncelle" : "Faturayı Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvoiceModal;
