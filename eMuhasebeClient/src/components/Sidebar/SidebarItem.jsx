import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SidebarItem({
  to,
  icon,
  text,
  active,
  collapsed,
  isBotEnabled,
  toggleBot,
  isToggle,
}) {
  return (
    <div>
      {isToggle ? (
        <div className="flex items-center py-2 px-4 text-gray-300">
          {icon}
          {!collapsed && <span className="ml-3">{text}</span>}
          <div className="ml-auto">
            <label className="relative flex justify-center items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isBotEnabled}
                onChange={toggleBot}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>
      ) : (
        <Link
          to={to}
          className={`flex items-center py-[10px] ${collapsed ? "justify-center px-0" : "px-4"} ${
            active ? "bg-black text-yellow-400" : "text-gray-300 hover:bg-gray-700 hover:text-white"
          } relative`}
        >
          {icon}
          {!collapsed && <span className="ml-3">{text}</span>}
          {active && <div className={`absolute left-0 h-6 w-1 bg-yellow-400 ${collapsed ? "" : "hidden"}`}></div>}
        {active && !collapsed && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400"></div>}

        </Link>
      )}
    </div>
  );
}

SidebarItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  collapsed: PropTypes.bool.isRequired,
  isBotEnabled: PropTypes.bool,
  toggleBot: PropTypes.func,
  isToggle: PropTypes.bool,
};

export default SidebarItem;