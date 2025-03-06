﻿using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using GenericRepository;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Companies.DeleteCompanyById;

internal sealed class DeleteCompanyByIdCommandHandler(
    ICompanyRepository companyRepository,
    IUnitOfWork unitOfWork) : IRequestHandler<DeleteCompanyByIdCommand, Result<string>>
{
    
    public async Task<Result<string>> Handle(DeleteCompanyByIdCommand request, CancellationToken cancellationToken)
    {
        Company company = await companyRepository.GetByExpressionAsync(p => p.Id == request.Id, cancellationToken);

        if (company == null)
        {
            return Result<string>.Failure("Şirket bulunamadı.");
        }

        company.IsDeleted = true;
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return "Şirket başarıyla silindi.";
    }
}