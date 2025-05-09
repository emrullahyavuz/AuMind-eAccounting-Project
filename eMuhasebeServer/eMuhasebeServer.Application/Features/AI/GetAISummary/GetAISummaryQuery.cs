using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.AI.GetAISummary;

public sealed record GetAISummaryQuery(
    string UserPrompt) : IRequest<Result<string>>;
