using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisters.DeleteCashRegisterById;
public sealed record DeleteCashRegistersByIdCommand(
    Guid Id) : IRequest<Result<string>>;
