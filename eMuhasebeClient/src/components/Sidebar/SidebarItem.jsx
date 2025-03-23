import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// SidebarItem
function SidebarItem({ to, icon, text, active, collapsed }) {
    return (
      <Link
        to={to}
        className={`flex items-center py-3 ${collapsed ? "justify-center px-0" : "px-4"} ${
          active ? "bg-black text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        } relative`}
      >
        <div className={`${active ? "text-yellow-400" : ""}`}>{icon}</div>
        {!collapsed && <span className="ml-3">{text}</span>}
        {active && <div className={`absolute left-0 h-6 w-1 bg-yellow-400 ${collapsed ? "" : "hidden"}`}></div>}
        {active && !collapsed && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400"></div>}
      </Link>
    )
  }

export default SidebarItem

SidebarItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    collapsed: PropTypes.bool.isRequired,
  }