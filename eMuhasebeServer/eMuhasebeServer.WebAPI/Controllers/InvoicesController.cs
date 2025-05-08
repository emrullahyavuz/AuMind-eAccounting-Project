using eMuhasebeServer.Application.Features.Invoices.CreateInvoice;
using eMuhasebeServer.Application.Features.Invoices.DeleteInvoiceById;
using eMuhasebeServer.Application.Features.Invoices.GeneratePdf;
using eMuhasebeServer.Application.Features.Invoices.GetAllInvoices;
using eMuhasebeServer.Application.Features.Invoices.UpdateInvoice;
using eMuhasebeServer.WebAPI.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace eMuhasebeServer.WebAPI.Controllers;

public sealed class InvoicesController : ApiController
{
    public InvoicesController(IMediator mediator) : base(mediator)
    {
    }

    [HttpPost]
    public async Task<IActionResult> GetAll(GetAllInvoicesQuery request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> Update(UpdateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> DeleteById(DeleteInvoiceByIdCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpGet]
    public async Task<IActionResult> GenerateInvoicePdf(Guid invoiceId)
    {
        var query = new CreateInvoicePdfQuery(invoiceId);
        var pdfBytes = await _mediator.Send(query);

        return File(pdfBytes, "application/pdf", $"Invoice_{invoiceId}.pdf");
    }
}