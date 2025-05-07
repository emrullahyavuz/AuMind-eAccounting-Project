using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Customers.UpdateCutomer;

public sealed record UpdateCustomerCommand(
    Guid Id,
    string Name,
    int TypeValue,
    string City,
    string Town,
    string FullAdress,
    string TaxDepartment,
    string TaxNumber) : IRequest<Result<string>>;
