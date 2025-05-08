using AutoMapper;
using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Enum;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.UpdateInvoice;

internal sealed class UpdateInvoiceCommandHandler(
    IInvoiceRepository invoiceRepository,
    ICustomerRepository customerRepository,
    ICustomerDetailRepository customerDetailRepository,
    IProductRepository productRepository,
    IProductDetailRepository productDetailRepository,
    IUnitOfWorkCompany unitOfWorkCompany,
    ICacheService cacheService,
    IMapper mapper) : IRequestHandler<UpdateInvoiceCommand, Result<string>>
{
    public async Task<Result<string>> Handle(UpdateInvoiceCommand request, CancellationToken cancellationToken)
    {
        var oldInvoice = await invoiceRepository
            .Where(p => p.Id == request.Id)
            .Include(p => p.Details)
            .FirstOrDefaultAsync(cancellationToken);

        if (oldInvoice is null)
            return Result<string>.Failure("Fatura bulunamadı");

        var oldCustomerDetail = await customerDetailRepository
            .Where(p => p.InvoiceId == oldInvoice.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (oldCustomerDetail is not null)
            customerDetailRepository.Delete(oldCustomerDetail);


        if (oldInvoice.Details is not null && oldInvoice.Details.Any())
        {
            foreach (var detail in oldInvoice.Details)
            {
                Product? product = await productRepository
    .GetByExpressionWithTrackingAsync(p => p.Id == detail.ProductId, cancellationToken);

                if (product is not null)
                {
                    var deposit = oldInvoice.Type.Value == 1 ? detail.Quantity : 0;
                    var withdrawal = oldInvoice.Type.Value == 2 ? detail.Quantity : 0;

                    product.Deposit -= deposit;
                    product.Withdrawal -= withdrawal;
                    productRepository.Update(product);
                }

                var productDetail = await productDetailRepository
                    .Where(p => p.InvoiceId == oldInvoice.Id && p.ProductId == detail.ProductId)
                    .FirstOrDefaultAsync(cancellationToken);

                if (productDetail is not null)
                    productDetailRepository.Delete(productDetail);
            }
        }

        var customer = await customerRepository
            .Where(p => p.Id == oldInvoice.CustomerId)
            .FirstOrDefaultAsync(cancellationToken);

        if (customer is not null)
        {
            customer.DepositAmount -= oldInvoice.Type.Value == 2 ? oldInvoice.Amount : 0;
            customer.WithdrawalAmount -= oldInvoice.Type.Value == 1 ? oldInvoice.Amount : 0;
            customerRepository.Update(customer);
        }

        invoiceRepository.Delete(oldInvoice);

        Invoice newInvoice = mapper.Map<Invoice>(request);
        newInvoice.Id = Guid.NewGuid();
        newInvoice.InvoiceNumber = oldInvoice.InvoiceNumber;

        await invoiceRepository.AddAsync(newInvoice, cancellationToken);

        if (customer is not null)
        {
            customer.DepositAmount += newInvoice.Type.Value == 2 ? newInvoice.Amount : 0;
            customer.WithdrawalAmount += newInvoice.Type.Value == 1 ? newInvoice.Amount : 0;
            customerRepository.Update(customer);
        }


        CustomerDetail customerDetail = new()
        {
            CustomerId = newInvoice.CustomerId,
            InvoiceId = newInvoice.Id,
            Date = newInvoice.Date,
            DepositAmount = newInvoice.Type.Value == 2 ? newInvoice.Amount : 0,
            WithdrawalAmount = newInvoice.Type.Value == 1 ? newInvoice.Amount : 0,
            Description = newInvoice.InvoiceNumber + " numaralı " + newInvoice.Type.Name,
            Type = newInvoice.Type.Value == 1 ? CustomerDetailTypeEnum.PurchaseInvoice : CustomerDetailTypeEnum.SellingInvoice
        };

        await customerDetailRepository.AddAsync(customerDetail, cancellationToken);

        if (newInvoice.Details is not null && newInvoice.Details.Any())
        {
            foreach (var detail in newInvoice.Details)
            {
                Product? product = await productRepository
    .GetByExpressionWithTrackingAsync(p => p.Id == detail.ProductId, cancellationToken);

                if (product is not null)
                {
                    var deposit = newInvoice.Type.Value == 1 ? detail.Quantity : 0;
                    var withdrawal = newInvoice.Type.Value == 2 ? detail.Quantity : 0;

                    product.Deposit += deposit;
                    product.Withdrawal += withdrawal;
                    productRepository.Update(product);
                }

                ProductDetail productDetail = new()
                {
                    ProductId = detail.ProductId,
                    InvoiceId = newInvoice.Id,
                    Deposit = newInvoice.Type.Value == 1 ? detail.Quantity : 0,
                    Withdrawal = newInvoice.Type.Value == 2 ? detail.Quantity : 0,
                };

                await productDetailRepository.AddAsync(productDetail, cancellationToken);
            }
        }

        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);


        cacheService.Remove("invoices");
        cacheService.Remove("customers");
        cacheService.Remove("products");

        return Result<string>.Succeed(newInvoice.Type.Name + " başarıyla güncellendi");
    }
}