import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaChartBar,
  FaUniversity,
  FaAddressBook,
  FaBoxes,
  FaFileInvoice,
  FaChartLine,
  FaUser,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { X } from "lucide-react";
import PropTypes from "prop-types";

function Sidebar({ toggleSidebar }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Aktif olan sayfayı belirlemek için path'e göre bir fonksiyon
  const getActiveItem = (path) => {
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/companies")) return "companies";
    if (path.includes("/reports")) return "reports";
    if (path.includes("/banks")) return "banks";
    if (path.includes("/cari-hareketleri")) return "cariler";
    if (path.includes("/products")) return "products";
    if (path.includes("/invoices")) return "invoices";
    if (path.includes("/profitability")) return "profitability";
    return "";
  };

  // Aktif olan sayfayı belirle
  const activeItem = getActiveItem(location.pathname);

  // Sidebar'ı genişlet/daralt
  const handleToggleSidebar = () => {
    toggleSidebar();
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen bg-gray-800  text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } fixed left-0 top-0 z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-end items-center p-4 border-b border-gray-700">
        <button
          onClick={handleToggleSidebar}
          className="text-yellow-400 hover:text-yellow-300"
        >
          {collapsed ? (
            <div className="flex flex-col space-y-1.5">
              <div className="w-6 h-0.5 bg-yellow-400"></div>
              <div className="w-6 h-0.5 bg-yellow-400"></div>
              <div className="w-6 h-0.5 bg-yellow-400"></div>
            </div>
          ) : (
            <X size={24} />
          )}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {/* Admin Section */}
        <div className="py-4">
          {!collapsed && (
            <h2 className="text-yellow-400 font-medium px-4 mb-2">Admin</h2>
          )}
          {collapsed && (
            <h2 className="text-yellow-400 font-medium text-center text-sm mb-2">
              Admin
            </h2>
          )}
          <nav>
            <SidebarItem
              to="/admin/companies"
              icon={<FaBuilding size={collapsed ? 24 : 20} />}
              text="Şirketler"
              active={activeItem === "companies"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/admin/users"
              icon={<FaUser size={collapsed ? 24 : 20} />}
              text="Kullanıcılar"
              active={activeItem === "users"}
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Records Section */}
        <div className="py-4">
          {!collapsed && (
            <h2 className="text-yellow-400 font-medium px-4 mb-2">Kayıtlar</h2>
          )}
          {collapsed && (
            <h2 className="text-yellow-400 font-medium text-center text-sm mb-2">
              Kayıtlar
            </h2>
          )}
          <nav>
            <SidebarItem
              to="/reports"
              icon={<FaChartBar size={collapsed ? 24 : 20} />}
              text="Satış Raporu"
              active={activeItem === "reports"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/banks"
              icon={<FaUniversity size={collapsed ? 24 : 20} />}
              text="Bankalar"
              active={activeItem === "banks"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/cari-hareketleri"
              icon={<FaAddressBook size={collapsed ? 24 : 20} />}
              text="Cariler"
              active={activeItem === "cariler"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/products"
              icon={<FaBoxes size={collapsed ? 24 : 20} />}
              text="Ürünler"
              active={activeItem === "products"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/invoices"
              icon={<FaFileInvoice size={collapsed ? 24 : 20} />}
              text="Faturalar"
              active={activeItem === "invoices"}
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Reports Section */}
        <div className="py-4">
          {!collapsed && (
            <h2 className="text-yellow-400 font-medium px-4 mb-2">Raporlar</h2>
          )}
          {collapsed && (
            <h2 className="text-yellow-400 font-medium text-center text-sm mb-2">
              Ürün Kârlılık Raporu
            </h2>
          )}
          <nav>
            <SidebarItem
              to="/profitability"
              icon={<FaChartLine size={collapsed ? 24 : 20} />}
              text="Ürün Kârlılık Raporu"
              active={activeItem === "profitability"}
              collapsed={collapsed}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
