using eMuhasebeServer.Domain.Enum;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisters.UpdateCashRegister;

public sealed record UpdateCashRegistersCommand(
    Guid Id,
    string Name,
    int CurrencyTypeValue) : IRequest<Result<string>>;
