using AutoMapper;
using MediatR;

namespace eMuhasebeServer.Application.Features.Invoices.GeneratePdf;

public sealed record CreateInvoicePdfQuery
    (Guid InvoiceId) : IRequest<byte[]>;
