import { useState } from "react"
import Sidebar from "./components/Sidebar"
import "./App.css"
import CariHareketleri from "./components/cari-hareketleri"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="app-container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${sidebarOpen ? "sidebar-open" : ""}`}>
          <CariHareketleri />
        </div>
      </div>
    </div>
  )
}

export default App

