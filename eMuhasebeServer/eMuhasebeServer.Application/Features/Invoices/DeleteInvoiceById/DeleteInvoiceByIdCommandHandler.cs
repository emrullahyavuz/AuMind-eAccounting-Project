using eMuhasebeServer.Application.Services;
using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Invoices.DeleteInvoiceById;

internal sealed class DeleteInvoiceByIdCommandHandler(
    IInvoiceRepository invoiceRepository,
    ICustomerRepository customerRepository,
    ICustomerDetailRepository customerDetailRepository,
    IProductRepository productRepository,
    IProductDetailRepository productDetailRepository,
    ICacheService cacheService,
    IUnitOfWorkCompany unitOfWorkCompany) : IRequestHandler<DeleteInvoiceByIdCommand, Result<string>>
{
    public async Task<Result<string>> Handle(DeleteInvoiceByIdCommand request, CancellationToken cancellationToken)
    {
        Invoice? invoice = await invoiceRepository
       .Where(p => p.Id == request.Id && !p.IsDeleted)
       .Include(p => p.Details)
       .FirstOrDefaultAsync(cancellationToken);

        if (invoice is null)
        {
            return Result<string>.Failure("Fatura bulunamadı");
        }

        CustomerDetail? customerDetail = await customerDetailRepository
            .Where(p => p.InvoiceId == request.Id && !p.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (customerDetail is not null)
        {
            customerDetail.IsDeleted = true;
            customerDetailRepository.Update(customerDetail);
        }

        Customer? customer = await customerRepository
            .Where(p => p.Id == invoice.CustomerId && !p.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);

        if (customer is not null)
        {
            customer.DepositAmount -= invoice.Type.Value == 1 ? 0 : invoice.Amount;
            customer.WithdrawalAmount -= invoice.Type.Value == 2 ? 0 : invoice.Amount;

            customerRepository.Update(customer);
        }

        List<ProductDetail> productDetails = await productDetailRepository
            .Where(p => p.InvoiceId == invoice.Id && !p.IsDeleted)
            .ToListAsync(cancellationToken);

        foreach (var detail in productDetails)
        {
            productDetailRepository.Delete(detail);

            Product? product = await productRepository.GetByExpressionWithTrackingAsync(p => p.Id == detail.ProductId, cancellationToken);

            if (product is not null)
            {
                product.Deposit -= detail.Deposit;
                product.Withdrawal -= detail.Withdrawal;

                productRepository.Update(product);
            }
        }

        // InvoiceDetail'ler soft delete
        if (invoice.Details is not null && invoice.Details.Any())
        {
            foreach (var detail in invoice.Details)
            {
                detail.IsDeleted = true;
            }
        }

        invoice.IsDeleted = true;
        invoiceRepository.Update(invoice);

        await unitOfWorkCompany.SaveChangesAsync(cancellationToken);

        cacheService.Remove("invoices");
        cacheService.Remove("customers");
        cacheService.Remove("products");

        return invoice.Type.Name + " kaydı başarıyla silindi";
    }
}
