using eMuhasebeServer.Domain.Enum;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisters.CreateCashRegister;

public sealed record CreateCashRegistersCommand(
    string Name,
    int CurrencyTypeValue) : IRequest<Result<string>>;
