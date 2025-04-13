import { useContext } from "react"
import { AccountingBotContext } from "../context/AccountingBotContext"

// AccountingBot Custom hook
export const useAccountingBot = () => {
    const context = useContext(AccountingBotContext)
    if (!context) {
      throw new Error("useAccountingBot must be used within an AccountingBotProvider")
    }
    return context
  }