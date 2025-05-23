﻿using eMuhasebeServer.Domain.ValueObjects;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Companies.CreateCompany;

public sealed record CreateCompanyCommand(
    string Name,
    string FullAdress,
    string TaxDepartment,
    string TaxNumber,
    Database Database) : IRequest<Result<string>>;
