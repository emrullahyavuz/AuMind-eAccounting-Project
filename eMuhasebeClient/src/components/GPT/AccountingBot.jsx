import { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  X,
  Loader2,
  Maximize2,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAccountingBot } from "../../hooks/useAccountingBot";

function AccountingBot() {
  const { messages, setMessages, addMessage } = useAccountingBot();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = import.meta.env.VITE_OPENAI_API_URL;

  // Mesajlar güncellendiğinde otomatik olarak en alta kaydır
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Kullanıcı mesajını ekle
    const userMessage = { role: "user", content: inputMessage };
    addMessage(userMessage);
    setInputMessage("");
    setIsLoading(true);

    try {
      // openAI API isteği
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // Kullanılacak model
          messages: [...messages, userMessage], // Önceki mesajlar ve yeni mesaj
        }),
      });

      if (!response.ok) {
        throw new Error("API isteği başarısız oldu");
      }

      const data = await response.json();
      const botResponse = {
        role: "assistant",
        content: data.choices[0].message.content, // API'den dönen yanıt
      };

      addMessage(botResponse);
    } catch (error) {
      console.error("API hatası:", error);
      addMessage({
        role: "assistant",
        content:
          "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOpenFullscreen = () => {
    navigate("/chat");
  };

  return (
    <>
      {/* Bot Açma/Kapama Butonu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-3 shadow-lg z-50"
      >
        <Bot size={24} />
      </button>

      {/* Bot Dialog */}
      <div
        className={`fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 transition-all duration-300 transform ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Bot Header */}
        <div className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <Bot size={20} className="mr-2" />
            <h3 className="font-medium">AuMind Muhasebe Asistanı</h3>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleOpenFullscreen}
              className="text-gray-300 hover:text-white mr-2"
              title="Tam ekran sohbet"
            >
              <Maximize2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Mesajlar */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-100">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-cyan-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none shadow"
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.role === "assistant" ? (
                    <Bot size={16} className="mr-1 text-cyan-500" />
                  ) : (
                    <User size={16} className="mr-1" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === "assistant" ? "Muhasebe Asistanı" : "Siz"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 shadow max-w-[80%]">
                <div className="flex items-center">
                  <Bot size={16} className="mr-1 text-cyan-500" />
                  <span className="text-xs font-medium">Muhasebe Asistanı</span>
                </div>
                <div className="flex items-center mt-2">
                  <Loader2
                    size={16}
                    className="animate-spin text-cyan-500 mr-2"
                  />
                  <span className="text-sm">Yanıt yazılıyor...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Mesaj Giriş Alanı */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Bir soru sorun..."
              className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === "" || isLoading}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-r-md disabled:bg-gray-300"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-1">
            <div className="text-xs text-gray-500">
              Muhasebe, vergi ve finans konularında sorularınızı sorabilirsiniz.
            </div>
            <button
              onClick={handleOpenFullscreen}
              className="text-xs text-cyan-600 hover:text-cyan-800 flex items-center"
            >
              <ExternalLink size={12} className="mr-1" />
              Tam ekran
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountingBot;
