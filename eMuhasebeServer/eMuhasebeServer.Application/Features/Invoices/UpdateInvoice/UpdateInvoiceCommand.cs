using eMuhasebeServer.Domain.Dtos;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.UpdateInvoice;

public sealed record UpdateInvoiceCommand(
    Guid Id,
    string InvoiceNumber,
    DateOnly Date,
    int TypeValue,
    Guid CustomerId,
    decimal VATRate,
    List<InvoiceDetailDto> Details) : IRequest<Result<string>>;
