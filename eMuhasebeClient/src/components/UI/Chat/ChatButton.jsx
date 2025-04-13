import { Bot } from "lucide-react"
import { Link } from "react-router-dom"
import { useAccountingBot } from "../../../hooks/useAccountingBot"

function ChatButton() {
  const { toggleBot } = useAccountingBot()

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <Link
        to="/chat"
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full flex items-center shadow-lg"
      >
        <Bot size={18} className="mr-2" />
        <span>Tam Ekran Sohbet</span>
      </Link>
    </div>
  )
}

export default ChatButton
