﻿using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using TS.Result;

namespace eMuhasebeServer.Application.Features.CashRegisterDetails.DeleteCashRegisterDetailById;

internal sealed class DeleteCashRegisterDetailByIdCommandHandler(
    ICustomerDetailRepository customerDetailRepository,
    ICustomerRepository customerRepository,
    IBankRepository bankRepository,
    IBankDetailRepository bankDetailRepository,
    ICashRegisterRepository cashRegisterRepository,
    ICashRegisterDetailRepository cashRegisterDetailRepository,
    IUnitOfWorkCompany unitOfWorkCompany,
    ICacheService cacheService) : IRequestHandler<DeleteCashRegisterDetailByIdCommand, Result<string>>
{
    public async Task<Result<string>> Handle(DeleteCashRegisterDetailByIdCommand request, CancellationToken cancellationToken)
    {
        CashRegisterDetail? cashRegisterDetail = await cashRegisterDetailRepository.GetByExpressionWithTrackingAsync(p => p.Id == request.Id, cancellationToken);

        if (cashRegisterDetail is null)
        {
            return Result<string>.Failure("Kasa hareketi bulunamadı");
        }

        CashRegister? cashRegister = await cashRegisterRepository.GetByExpressionWithTrackingAsync(p => p.Id == cashRegisterDetail.CashRegisterId, cancellationToken);

        if (cashRegister is null)
        {
            return Result<string>.Failure("Kasa bulunamadı");
        }

        cashRegister.DepositAmount -= cashRegisterDetail.DepositAmount;
        cashRegister.WithdrawalAmount -= cashRegisterDetail.WithdrawalAmount;

        if(cashRegisterDetail.CashRegisterDetailId is not null)
        {
            CashRegisterDetail? oppositeCashRegisterDetail = await cashRegisterDetailRepository.GetByExpressionWithTrackingAsync(p => p.Id == cashRegisterDetail.CashRegisterDetailId, cancellationToken);

            if (oppositeCashRegisterDetail is null)
            {
                return Result<string>.Failure("Kasa hareketi bulunamadı");
            }

            CashRegister? oppositeCashRegister = await cashRegisterRepository.GetByExpressionWithTrackingAsync(p => p.Id == oppositeCashRegisterDetail.CashRegisterId, cancellationToken);

            if (oppositeCashRegister is null)
            {
                return Result<string>.Failure("Kasa bulunamadı");
            }

            oppositeCashRegister.DepositAmount -= oppositeCashRegister.DepositAmount;
            oppositeCashRegister.WithdrawalAmount -= oppositeCashRegister.WithdrawalAmount;

            cashRegisterDetailRepository.Delete(oppositeCashRegisterDetail);
        }

        if (cashRegisterDetail.BankDetailId is not null)
        {
            BankDetail? oppositeBankDetail = await bankDetailRepository.GetByExpressionWithTrackingAsync(p => p.Id == cashRegisterDetail.BankDetailId, cancellationToken);

            if (oppositeBankDetail is null)
            {
                return Result<string>.Failure("Banka hareketi bulunamadı");
            }

            Bank? oppositeBank = await bankRepository.GetByExpressionWithTrackingAsync(p => p.Id == oppositeBankDetail.BankId, cancellationToken);

            if (oppositeBank is null)
            {
                return Result<string>.Failure("Banka bulunamadı");
            }

            oppositeBank.DepositAmount -= oppositeBank.DepositAmount;
            oppositeBank.WithdrawalAmount -= oppositeBank.WithdrawalAmount;

            bankDetailRepository.Delete(oppositeBankDetail);
        }

        if (cashRegisterDetail.CustomerDetailId is not null)
        {
            CustomerDetail? customerDetail = await customerDetailRepository.GetByExpressionWithTrackingAsync(p => p.Id == cashRegisterDetail.CustomerDetailId, cancellationToken);

            if (customerDetail is null)
            {
                return Result<string>.Failure("Cari hareket bulunamadı");
            }

            Customer? customer = await customerRepository.GetByExpressionWithTrackingAsync(p => p.Id == customerDetail.CustomerId, cancellationToken);

            if (customer is null)
            {
                return Result<string>.Failure("Cari bulunamadı");
            }

            customer.DepositAmount -= customerDetail.DepositAmount;
            customer.WithdrawalAmount -= customerDetail.WithdrawalAmount;

            customerDetailRepository.Delete(customerDetail);

            cacheService.Remove("customers");
        }

        cashRegisterDetailRepository.Delete(cashRegisterDetail);

        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);

        cacheService.Remove("cashRegister");
        cacheService.Remove("banks");

        return "Kasa hareketi başarıyla silindi";
    }
}