using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisters.DeleteCashRegisterById;

internal sealed class DeleteCashRegistersByIdCommandHandler(
    ICashRegisterRepository cashRegisterRepository,
    IUnitOfWorkCompany unitOfWorkCompany,
    ICacheService cacheService) : IRequestHandler<DeleteCashRegistersByIdCommand, Result<string>>
{
    public async Task<Result<string>> Handle(DeleteCashRegistersByIdCommand request, CancellationToken cancellationToken)
    {
        CashRegister? cashRegister = await cashRegisterRepository.GetByExpressionWithTrackingAsync(p => p.Id == request.Id, cancellationToken);

        if (cashRegister is null)
        {
            return Result<string>.Failure("Kasa kaydı bulunamadı");
        }

        cashRegister.IsDeleted = true;

        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);  
        
        cacheService.Remove("cashRegister");

        return "Kasa kaydı başarıyla silindi";
    }
}
