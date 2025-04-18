﻿using AutoMapper;
using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using GenericRepository;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Companies.CreateCompany;

internal sealed class CreateCompanyCommandHandler(
    ICompanyRepository companyRepository,
    ICacheService cacheService,
    IUnitOfWork unitOfWork,
    IMapper mapper) : IRequestHandler<CreateCompanyCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateCompanyCommand request, CancellationToken cancellationToken)
    {
        bool isTaxNumberExist = await companyRepository.AnyAsync(p=>p.TaxNumber == request.TaxNumber, cancellationToken);

        if (isTaxNumberExist) 
        {
            return Result<string>.Failure("Bu vergi numarası daha önce kaydedilmiş.");
        }
        Company company =mapper.Map<Company>(request);

        await companyRepository.AddAsync(company,cancellationToken);

        await unitOfWork.SaveChangesAsync(cancellationToken);

        cacheService.Remove("companies");

        return "Şirket başarıyla oluşturuldu.";
    }
}