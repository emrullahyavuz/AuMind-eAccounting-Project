using eMuhasebeServer.Application.Features.Invoices.GetAllInvoices;
using eMuhasebeServer.Application.Features.Products.GetAllProducts;
using eMuhasebeServer.Application.Options;
using eMuhasebeServer.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using TS.Result;

namespace eMuhasebeServer.Application.Features.AI.GetAISummary;

internal sealed class GetAISummaryQueryHandler(
    IMediator mediator,
    IHttpClientFactory httpClientFactory,
    IOptions<OpenAIOptions> openAIOptions) : IRequestHandler<GetAISummaryQuery, Result<string>>
{
    public async Task<Result<string>> Handle(GetAISummaryQuery request, CancellationToken cancellationToken)
    {
        var companyId = request.CompanyId;

        // 1. Get Invoices
        var invoiceResult = await mediator.Send(new GetAllInvoicesQuery(), cancellationToken);
        if (!invoiceResult.IsSuccessful) return Result<string>.Failure("Fatura verileri alınamadı");

        // 2. Get Products
        var productResult = await mediator.Send(new GetAllProductsQuery(), cancellationToken);
        if (!productResult.IsSuccessful) return Result<string>.Failure("Ürün verileri alınamadı");

        var invoices = invoiceResult.Data?.Take(5).ToList() ?? new List<Invoice>();
        var products = productResult.Data?.Take(5).ToList() ?? new List<Product>();

        // 3. ChatGPT input verisi oluştur
        var builder = new StringBuilder();
        builder.AppendLine("Aşağıda şirketin bazı fatura ve ürün verileri yer alıyor:");
        builder.AppendLine("\nFaturalar:");

        foreach (var invoice in invoices)
        {
            builder.AppendLine($"Tarih: {invoice.Date:yyyy-MM-dd}, Tutar: {invoice.Amount}, Tip: {(invoice.Type == 1 ? "Satış" : "Alış")}");
        }

        builder.AppendLine("\nÜrünler:");

        foreach (var product in products)
        {
            builder.AppendLine($"Ad: {product.Name}, Fiyat: {product.Deposit}");
        }

        builder.AppendLine("\nBu verilere göre:");
        builder.AppendLine("- En çok satılan ürün hangisi?");
        builder.AppendLine("- Toplam fatura tutarı ne?");
        builder.AppendLine("- Dikkat çeken bir trend veya anormallik var mı?");
        builder.AppendLine("Analizini detaylı ve maddeler halinde yap.");

        // 4. OpenAI API çağrısı
        var httpClient = httpClientFactory.CreateClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", openAIOptions.Value.ApiKey);

        var requestBody = new
        {
            model = "gpt-3.5-turbo",
            messages = new[]
            {
                new { role = "user", content = builder.ToString() }
            }
        };

        var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
        var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            var rawResponse = await response.Content.ReadAsStringAsync(cancellationToken);
            return Result<string>.Failure($"ChatGPT API yanıtı: {rawResponse}");
        }

        var responseString = await response.Content.ReadAsStringAsync(cancellationToken);
        using var doc = JsonDocument.Parse(responseString);
        var summary = doc.RootElement
                         .GetProperty("choices")[0]
                         .GetProperty("message")
                         .GetProperty("content")
                         .GetString();

        return Result<string>.Succeed(summary!);
    }
}

