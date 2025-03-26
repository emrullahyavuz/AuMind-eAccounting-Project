using AutoMapper;
using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisters.CreateCashRegister;

internal sealed class CreateCashRegistersCommandHandler(
    ICashRegisterRepository cashRegisterRepository,
    IUnitOfWorkCompany unitOfWorkCompany,
    IMapper mapper,
    ICacheService cacheService) : IRequestHandler<CreateCashRegistersCommand, Result<string>>
{
    public async Task<Result<string>> Handle(CreateCashRegistersCommand request, CancellationToken cancellationToken)
    {
        bool isNameExist = await cashRegisterRepository.AnyAsync(p => p.Name == request.Name, cancellationToken);

        if (isNameExist)
        {
            return Result<string>.Failure("Bu kasa adı daha önce kullanılış");
        }

        CashRegister cashRegister = mapper.Map<CashRegister>(request);

        await cashRegisterRepository.AddAsync(cashRegister);
        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);

        cacheService.Remove("cashRegister");

        return "Kasa kaydı başarıyla tamamlandı";
    }
}
