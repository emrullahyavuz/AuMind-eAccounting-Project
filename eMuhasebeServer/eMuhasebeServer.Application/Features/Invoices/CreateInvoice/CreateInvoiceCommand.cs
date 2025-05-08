using eMuhasebeServer.Domain.Dtos;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.CreateInvoice;

public sealed record CreateInvoiceCommand(
    int TypeValue,
    DateOnly Date,
    Guid CustomerId,
    List<InvoiceDetailDto> Details) : IRequest<Result<string>>;

