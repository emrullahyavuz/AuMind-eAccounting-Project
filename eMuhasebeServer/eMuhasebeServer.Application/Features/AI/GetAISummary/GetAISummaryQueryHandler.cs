using eMuhasebeServer.Application.Features.Invoices.GetAllInvoices;
using eMuhasebeServer.Application.Options;
using eMuhasebeServer.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TS.Result;

namespace eMuhasebeServer.Application.Features.AI.GetAISummary;

internal sealed class GetAISummaryQueryHandler(
    IMediator mediator,
    IHttpClientFactory httpClientFactory,
    IOptions<OpenAIOptions> openAIOptions,
    IChatMemoryService chatMemoryService,
    IHttpContextAccessor httpContextAccessor) : IRequestHandler<GetAISummaryQuery, Result<string>>
{
    public async Task<Result<string>> Handle(GetAISummaryQuery request, CancellationToken cancellationToken)
    {

        if (string.IsNullOrWhiteSpace(request.UserPrompt))
            return Result<string>.Failure("Kullanıcıdan bir soru alınamadı.");

        // Kullanıcı ID'sini çek
        var userId = httpContextAccessor.HttpContext?.User?.FindFirst("Id")?.Value;
        if (string.IsNullOrWhiteSpace(userId))
            return Result<string>.Failure("Kullanıcı bilgisi alınamadı.");

        // Fatura verilerini çek
        var invoiceResult = await mediator.Send(new GetAllInvoicesQuery(), cancellationToken);
        if (!invoiceResult.IsSuccessful || invoiceResult.Data == null || invoiceResult.Data.Count == 0)
            return Result<string>.Failure("Fatura verileri alınamadı.");

        var invoices = invoiceResult.Data.OrderByDescending(f => f.Date).ToList();

        // Faturaları yazıya dök
        var sb = new StringBuilder();
        foreach (var invoice in invoices)
        {
            sb.AppendLine($"Fatura No: {invoice.InvoiceNumber}");
            sb.AppendLine($"Tarih: {invoice.Date.ToShortDateString()}");
            sb.AppendLine($"Fatura Türü: {invoice.Type?.Name}");
            sb.AppendLine($"Tutar: {invoice.Amount}₺");

            if (invoice.Customer is not null)
            {
                sb.AppendLine($"Cari Adı: {invoice.Customer.Name}");
                sb.AppendLine($"Cari Tipi: {invoice.Customer.Type?.Name}");
                sb.AppendLine($"Şehir/İlçe: {invoice.Customer.City}/{invoice.Customer.Town}");
                sb.AppendLine($"Vergi Dairesi/No: {invoice.Customer.TaxDepartment} / {invoice.Customer.TaxNumber}");
            }

            if (invoice.Details is not null && invoice.Details.Any())
            {
                sb.AppendLine("Ürün Detayları:");
                foreach (var d in invoice.Details)
                {
                    sb.AppendLine($" - Ürün: {d.Product?.Name}, Adet: {d.Quantity}, Birim Fiyat: {d.Price}₺, Toplam: {d.Quantity * d.Price}₺");
                }
            }
        }

        var prompt = $"""
        Aşağıdaki veriler bir şirkete ait satış ve alış faturalarını temsil etmektedir. 
        {sb}
        Kullanıcının sorusu:
        "{request.UserPrompt}"
        """;

        var openAiKey = openAIOptions.Value.ApiKey;
        if (string.IsNullOrWhiteSpace(openAiKey))
            return Result<string>.Failure("OpenAI API anahtarı yapılandırılmamış.");

        // Kullanıcının geçmiş konuşmalarını al
        var history = await chatMemoryService.GetMemoryAsync(userId);

        // Mesajları oluştur
        var messages = new List<object>
{
    new { role = "system", content = "Sen bir muhasebe uzmanısın. Muhasebe sisteminin ismi AuMind. Cevaplarını detaylı ve resmi ver. Cevabı Json formatında döndür \n json''' {message:string} '''" }
};

        // Önceki mesajları ekle
        foreach (var memory in history)
        {
            messages.Add(new { role = memory.Role, content = memory.Content });
        }

        // Kullanıcının yeni sorusunu da sona ekle
        messages.Add(new { role = "user", content = prompt });

        // Hafızaya yeni mesajı ekle
        await chatMemoryService.AddToMemoryAsync(userId, "user", request.UserPrompt);


        // OpenAI isteği hazırla
        var httpClient = httpClientFactory.CreateClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAiKey);

        var requestBody = new
        {
            model = openAIOptions.Value.Model,
            messages = messages
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            var errorResponse = await response.Content.ReadAsStringAsync(cancellationToken);
            return Result<string>.Failure($"ChatGPT API hatası: {response.StatusCode} - {errorResponse}");
        }

        var responseString = await response.Content.ReadAsStringAsync(cancellationToken);
        using var doc = JsonDocument.Parse(responseString);
        var completion = doc.RootElement
                            .GetProperty("choices")[0]
                            .GetProperty("message")
                            .GetProperty("content")
                            .GetString();

        // Cevabı cache'e ekle (hafızada tut)
        await chatMemoryService.AddToMemoryAsync(userId, "assistant", completion ?? "");

        return Result<string>.Succeed(completion?.Trim() ?? "Yanıt alınamadı.");
    }
}

