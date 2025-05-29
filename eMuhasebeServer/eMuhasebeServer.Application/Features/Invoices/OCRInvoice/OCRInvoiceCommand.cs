using eMuhasebeServer.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.OCRInvoice;

public sealed record OCRInvoiceCommand(
   IFormFile FormFile) : IRequest<Result<object>>;

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
            return Result<object>.Failure("Extracted result is null.");

        return Result<object>.Succeed(extractedResult);
    }
}
