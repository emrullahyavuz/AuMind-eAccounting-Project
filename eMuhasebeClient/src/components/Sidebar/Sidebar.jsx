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
  FaCashRegister,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { Bot, MessageSquare, X } from "lucide-react";
import PropTypes from "prop-types";
import { useAccountingBot } from "../../hooks/useAccountingBot";

function Sidebar({ toggleSidebar }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isBotEnabled, toggleBot } = useAccountingBot();

  // Aktif olan sayfayı belirlemek için path'e göre bir fonksiyon
  const getActiveItem = (path) => {
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/companies")) return "companies";
    if (path.includes("/reports")) return "reports";
    if (path.includes("/banks")) return "banks";
    if (path.includes("/cariler")) return "cariler";
    if (path.includes("/products")) return "products";
    if (path.includes("/invoices")) return "invoices";
    if (path.includes("/safes")) return "safes";
    if (path.includes("/stok-karlilik")) return "profitability";
    if (path.includes("/settings/bot")) return "bot-settings";
    if (path.includes("/chat")) return "chat";
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
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } fixed left-0 top-0 z-50 overflow-auto scrollbar-hide`}
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
      <div className="overflow-y-auto overflow-hidden h-[100vh-64px)] py-3">
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
        <div className="py-2">
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
              text="Raporlar"
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
              to="/cariler"
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
            <SidebarItem
              to="/safes"
              icon={<FaCashRegister size={collapsed ? 24 : 20} />}
              text="Kasalar"
              active={activeItem === "safes"}
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Reports Section */}
        <div className="py-2">
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
              to="/stok-karlilik"
              icon={<FaChartLine size={collapsed ? 24 : 20} />}
              text="Ürün Kârlılık Raporu"
              active={activeItem === "profitability"}
              collapsed={collapsed}
            />
          </nav>
        </div>

        {/* Chat Section */}
        <div className="py-2">
          {!collapsed && (
            <h2 className="text-yellow-400 font-medium px-4 mb-2">Asistan</h2>
          )}
          {collapsed && (
            <h2 className="text-yellow-400 font-medium text-center text-sm mb-2">
              Asistan
            </h2>
          )}
          <nav>
            <SidebarItem
              to="/chat"
              icon={<MessageSquare size={collapsed ? 24 : 20} />}
              text="Muhasebe Asistanı"
              active={activeItem === "chat"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="/settings/bot"
              icon={<Bot size={collapsed ? 24 : 20} />}
              text="Asistan Ayarları"
              active={activeItem === "bot-settings"}
              collapsed={collapsed}
            />
            <SidebarItem
              to="#"
              icon={
                <Bot
                  size={collapsed ? 24 : 20}
                  className={isBotEnabled ? "text-cyan-500" : "text-gray-500"}
                />
              }
              text="Asistan Durumu"
              active={false}
              collapsed={collapsed}
              isBotEnabled={isBotEnabled}
              toggleBot={toggleBot}
              isToggle
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
