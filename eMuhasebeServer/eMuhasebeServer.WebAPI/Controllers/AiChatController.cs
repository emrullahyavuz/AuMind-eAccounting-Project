using eMuhasebeServer.Application.Features.AI.GetAISummary;
using eMuhasebeServer.WebAPI.Abstractions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eMuhasebeServer.WebAPI.Controllers;

[Authorize(AuthenticationSchemes = "Bearer")]
public sealed class AiChatController : ApiController
{
    public AiChatController(IMediator mediator) : base(mediator)
    {
    }
    [HttpPost]
    public async Task<IActionResult> Summary(GetAISummaryQuery request, CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }
}
