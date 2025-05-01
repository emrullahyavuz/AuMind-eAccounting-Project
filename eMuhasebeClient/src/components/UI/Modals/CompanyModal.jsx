import { useState, useEffect } from "react";
import { X } from "lucide-react";

function CompanyModal({ isOpen, onClose, isEditMode, onSubmit, company }) {
  const [formData, setFormData] = useState({
    name: "",
    fullAdress: "",
    taxDepartment: "",
    taxNumber: "",
    database: {
      server: "",
      databaseName: "",
      userId: "",
      password: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the name contains dots, it's a nested property
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
    });
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

        <h2 className="text-center text-xl font-medium mb-4">
          {isEditMode ? "Düzenleme İşlemi" : "Şirket Ekleme"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Şirket Adı</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Adres</label>
              <input
                type="text"
                name="fullAdress"
                value={formData.fullAdress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Vergi Dairesi</label>
              <input
                type="text"
                name="taxOffice"
                value={formData.taxOffice}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Vergi Numarası</label>
              <input
                type="text"
                name="taxNumber"
                value={formData.taxNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Server</label>
              <input
                type="text"
                name="database.server"
                value={formData.database.server}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Database Adı</label>
              <input
                type="text"
                name="database.databaseName"
                value={formData.database.databaseName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Yönetici Adı</label>
              <input
                type="text"
                name="database.userId"
                value={formData.database.userId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
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

export default CompanyModal;
