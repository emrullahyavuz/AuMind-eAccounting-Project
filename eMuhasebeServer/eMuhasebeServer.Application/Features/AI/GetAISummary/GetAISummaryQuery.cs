using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.AI.GetAISummary;

public sealed record GetAISummaryQuery(Guid CompanyId) : IRequest<Result<string>>;
