using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.OCRInvoice;

public sealed record OCRInvoiceCommand(
   IFormFile FormFile) : IRequest<Result<object>>;
