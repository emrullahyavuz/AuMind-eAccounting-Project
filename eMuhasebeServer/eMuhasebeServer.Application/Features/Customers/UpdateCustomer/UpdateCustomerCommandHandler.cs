using AutoMapper;
using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Customers.UpdateCutomer;

internal sealed class UpdateCustomerCommandHandler(
    ICustomerRepository customerRepository,
    IUnitOfWorkCompany unitOfWorkCompany,
    IMapper mapper,
    ICacheService cacheService) : IRequestHandler<UpdateCustomerCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
    {
        Customer? customer = await customerRepository.GetByExpressionWithTrackingAsync(P => P.Id == request.Id, cancellationToken);

        if(customer is null)
        {
            return Result<string>.Failure("Cari bulunmadı");
        }

        mapper.Map(request, customer);

        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);

        cacheService.Remove("customers");

        return "Cari başarıyla güncellendi";
    }
}
