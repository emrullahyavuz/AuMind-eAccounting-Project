using eMuhasebeServer.Application.Services;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.OCRInvoice;

internal sealed class OCRInvoiceCommandHandler(
    IVisionService visionService) : IRequestHandler<OCRInvoiceCommand, Result<object>>
{
    async Task<Result<object>> IRequestHandler<OCRInvoiceCommand, Result<object>>.Handle(OCRInvoiceCommand request, CancellationToken cancellationToken)
    {
        if (request.FormFile == null || request.FormFile.Length == 0)
            return Result<object>.Failure("Dosya gönderilmedi.");

        await using var stream = request.FormFile.OpenReadStream();

        var extractedResult = await visionService.ExtractTextAsync(stream);

        if (extractedResult == null)
            return Result<object>.Failure("Dosyadan bir şey okunamadı.");

        return Result<object>.Succeed(extractedResult);
    }
}
