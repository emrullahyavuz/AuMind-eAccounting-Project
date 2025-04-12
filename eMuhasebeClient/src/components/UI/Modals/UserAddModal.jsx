import { useState } from "react"
import { X } from "lucide-react"

function UserAddModal({ isOpen, onClose, onAddUser }) {
  const [formData, setFormData] = useState({
    username: "",
    surname: "",
    email: "",
    password: "",
    company: "Şirket\nŞirket",
    isAdmin: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddUser(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-center text-xl font-medium mb-4 underline">Kullanıcı Ekleme</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Kullanıcı Adı</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Kullanıcı ismi giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Kullanıcı Soyadı</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Kullanıcı soyadı giriniz..."
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              required
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
              required
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Şirket</label>
            <textarea
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
              rows="2"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} className="mr-2" />
            <label className="text-gray-700">Admin mi?</label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
            >
              Kullanıcı Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserAddModal
