import { useState } from "react";
import { X, ChevronDown } from "lucide-react";


function BankModal({ isOpen, onClose, createBank }) {
  const [formData, setFormData] = useState({
    name: "",
    iban: "",
    currencyTypeValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedFormData = {
      name: formData.name,
      iban: formData.iban,
      currencyTypeValue: formData.currencyTypeValue === "TRY" ? 1 : formData.currencyTypeValue === "USD" ? 2 : formData.currencyTypeValue === "EUR" ? 3 : formData.currencyTypeValue,
    };
    createBank(updatedFormData);
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

        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">
          Banka Ekleme
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-lg">
              Banka Adı
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Banka ismi giriniz..."
              className="w-full border border-gray-400 rounded-md p-3 bg-white text-gray-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-lg">
              IBAN Numarası
            </label>
            <input
              type="text"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              placeholder="IBAN numarası giriniz..."
              className="w-full border border-gray-400 rounded-md p-3 bg-white text-gray-400"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 mb-2 text-lg">
              Döviz Tipi
            </label>
            <div className="relative">
              <select
                name="currencyTypeValue"
                value={formData.currencyTypeValue}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md p-3 bg-white appearance-none text-gray-400"
                required
              >
                <option value="" disabled>
                  Döviz tipi seçiniz...
                </option>
                <option value="TRY">TRY - Türk Lirası</option>
                <option value="USD">USD - Amerikan Doları</option>
                <option value="EUR">EUR - Euro</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-12 border border-gray-400 rounded-md"
            >
              Banka Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BankModal;
