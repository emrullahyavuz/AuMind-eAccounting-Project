import { createContext, useState } from "react"
import AccountingBot from "../components/GPT/AccountingBot"

// Bot Context oluşturma
export const AccountingBotContext = createContext()

// Bot Provider bileşeni
export function AccountingBotProvider({ children }) {
  const [isBotEnabled, setIsBotEnabled] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Merhaba! Ben AuMind Muhasebe Asistanı. Size muhasebe, finans ve vergi konularında nasıl yardımcı olabilirim?",
    },
  ])

  // Bot durumunu değiştirme fonksiyonu
  const toggleBot = () => {
    setIsBotEnabled(!isBotEnabled)
  }

  // Mesaj ekleme fonksiyonu
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  // Context değerleri
  const value = {
    isBotEnabled,
    toggleBot,
    messages,
    setMessages,
    addMessage,
  }

  return (
    <AccountingBotContext.Provider value={value}>
      {children}
      {isBotEnabled && <AccountingBot />}
    </AccountingBotContext.Provider>
  )
}

