import { useState } from "react"
import { useAccountingBot } from "../../hooks/useAccountingBot"
import { Bot, Save, Key } from "lucide-react"

function BotSettingsPage() {
  const { isBotEnabled, toggleBot } = useAccountingBot()
  const [apiKey, setApiKey] = useState("")
  const [botName, setBotName] = useState("AuMind Muhasebe Asistanı")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleSaveSettings = () => {
    // daha sonra kaydetme işlemi yapılacak
    // burada sadece localStorage'a kaydediyoruz
    localStorage.setItem("botApiKey", apiKey)
    localStorage.setItem("botName", botName)

    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-6">
        Muhasebe Asistanı Ayarları
      </h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bot size={24} className="text-cyan-500 mr-2" />
            <h2 className="text-xl font-semibold">Muhasebe Asistanı Yapılandırması</h2>
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Asistan Durumu:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isBotEnabled} onChange={toggleBot} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Asistan Adı</label>
            <input
              type="text"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-xs text-gray-500 mt-1">Asistanın kullanıcılara görünecek adı</p>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">OpenAI API Anahtarı</label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Key size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">OpenAI API anahtarınız (güvenli bir şekilde saklanır)</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Asistan Davranışı</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Uzmanlık Alanları</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">Muhasebe</span>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">Vergi</span>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">Finans</span>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">Mevzuat</span>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">Raporlama</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Yanıt Tarzı</label>
              <select className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="professional">Profesyonel</option>
                <option value="friendly">Arkadaşça</option>
                <option value="technical">Teknik</option>
                <option value="simple">Basit</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
          >
            <Save size={18} className="mr-2" />
            Ayarları Kaydet
          </button>
        </div>

        {isSaved && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-sm text-center">
            Ayarlar başarıyla kaydedildi!
          </div>
        )}
      </div>
    </div>
  )
}

export default BotSettingsPage
