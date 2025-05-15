import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useGetAllCompaniesMutation } from "../../../store/api";

const initialFormData = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  companyIds: [],
  isAdmin: false,
};

function UserModal({
  isOpen,
  isEditMode,
  onClose,
  onEditSubmit,
  onSubmit,
  user,
}) {
  const [getAllCompanies] = useGetAllCompaniesMutation();
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  // Şirketleri yükle
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await getAllCompanies().unwrap();
        setCompanies(result.data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, [getAllCompanies]);

  // user prop'u değiştiğinde form verilerini güncelle
  useEffect(() => {
    if (user) {
      setFormData({
        ...initialFormData,
        ...user,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else if (onEditSubmit) {
      onEditSubmit(formData, user?.id);
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
          {isEditMode ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Kullanıcı ismi giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Kullanıcı Soyadı</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Kullanıcı soyadı giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Kullanıcı Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Kullanıcı username giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">E-Mail Adresi</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-Mail adresi giriniz..."
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
              placeholder="Şifre giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Şirket</label>
            <div className="relative">
              <select
                name="companyIds"
                value={formData.companyIds[0] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, companyIds: [e.target.value] })
                }
                className="w-full border border-gray-300 rounded-md p-2 bg-white appearance-none pr-10"
              >
                <option value="">Şirket seçin</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={16}
              />
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Admin mi?</label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              {isEditMode ? "Kullanıcıyı Güncelle" : "Kullanıcıyı Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
