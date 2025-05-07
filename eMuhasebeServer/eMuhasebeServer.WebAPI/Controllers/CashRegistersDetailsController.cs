using eMuhasebeServer.Application.Features.CashRegisterDetails.CreateCashRegisterDetail;
using eMuhasebeServer.Application.Features.CashRegisterDetails.DeleteCashRegisterDetailById;
using eMuhasebeServer.Application.Features.CashRegisterDetails.GetAllCashRegisterDetails;
using eMuhasebeServer.Application.Features.CashRegisterDetails.UpdateCashRegisterDetail;
using eMuhasebeServer.Application.Features.CashRegisters.GetAllCashRegisters;
using eMuhasebeServer.WebAPI.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace eMuhasebeServer.WebAPI.Controllers;

public sealed class CashRegistersDetailsController(IMediator mediator) : ApiController(mediator)
{
    [HttpPost]
    public async Task<IActionResult> GetAll(GetAllCashRegisterDetailsQuery request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCashRegisterDetailCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> Update(UpdateCashRegisterDetailCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }

    [HttpPost]
    public async Task<IActionResult> DeleteById(DeleteCashRegisterDetailByIdCommand request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return StatusCode(response.StatusCode, response);
    }
}
