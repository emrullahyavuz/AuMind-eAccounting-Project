// OpenAI API ile iletişim kuracak servis

const API_URL = import.meta.env.VITE_OPENAI_API_URL;

export async function generateResponse(messages, apiKey) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Sen AuMind Muhasebe yazılımının bir parçası olan muhasebe asistanısın. Muhasebe, finans, vergi ve işletme konularında uzmansın. Türkiye'deki muhasebe mevzuatı, vergi kanunları ve finansal raporlama standartları hakkında güncel bilgilere sahipsin. Kullanıcılara kısa, net ve doğru bilgiler ver. Muhasebe terimleri kullan ama açıklamalarını da ekle. Cevapların 3-4 cümleyi geçmesin. Eğer bir konuda emin değilsen, tahmin etme ve kullanıcıya daha spesifik bilgi vermesini iste.",
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      throw new Error(`API hatası: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("OpenAI API hatası:", error)
    throw error
  }
}
