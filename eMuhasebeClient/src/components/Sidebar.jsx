import {
  FaTimes,
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaUniversity,
  FaAddressBook,
  FaBoxes,
  FaFileInvoice,
  FaChartLine,
} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function Sidebar({ isOpen, toggleSidebar }) {

  // navigate fonksiyonunu kullanabilmek için useNavigate hook
  const navigate = useNavigate()

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3 className="section-title">Admin</h3>
          <ul className="menu-list">
            <li className="menu-item active">
              <FaBuilding className="menu-icon" />
              <span>Şirketler</span>
            </li>
            <li className="menu-item">
              <FaUsers className="menu-icon" />
              <a onClick={(e) => {
                e.preventDefault()
                navigate("/admin/users")
              }}>Kullanıcılar</a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Kayıtlar</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <FaChartBar className="menu-icon" />
              <span>Satış Raporu</span>
            </li>
            <li className="menu-item">
              <FaUniversity className="menu-icon" />
              <span>Bankalar</span>
            </li>
            <li className="menu-item">
              <FaAddressBook className="menu-icon" />
              <span>Cariler</span>
            </li>
            <li className="menu-item">
              <FaBoxes className="menu-icon" />
              <span>Ürünler</span>
            </li>
            <li className="menu-item">
              <FaFileInvoice className="menu-icon" />
              <a onClick={(e) => {
                e.preventDefault()
                navigate("/admin/invoices")
              }}>Faturalar</a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">Raporlar</h3>
          <ul className="menu-list">
            <li className="menu-item">
              <FaChartLine className="menu-icon" />
              <span>Ürün Kârlılık Raporu</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

