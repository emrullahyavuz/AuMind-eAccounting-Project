using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Auth.Register;

public sealed record RegisterCommand (
    string FirstName,
    string LastName,
    string UserName,
    string Email,
    string Password) : IRequest<Result<string>>;
