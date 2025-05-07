using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TS.Result;

namespace eMuhasebeServer.Application.Features.Reports.ProductProfitabilityReports;

internal sealed class ProductProfitabilityReportsQueryHandler(
    IProductRepository productRepository) : IRequestHandler<ProductProfitabilityReportsQuery, Result<List<ProductProfitabilityReportsQueryResponse>>>
{
    public async Task<Result<List<ProductProfitabilityReportsQueryResponse>>> Handle(ProductProfitabilityReportsQuery request, CancellationToken cancellationToken)
    {
        List<Product> products = 
            await productRepository
            .Where(p=> p.Withdrawal > 0 )
            .Include(p => p.Details)
            .OrderBy(p=>p.Name)
            .ToListAsync(cancellationToken);

        List<ProductProfitabilityReportsQueryResponse> response = new();

        foreach (var product in products)
        {
            decimal depositPriceSum = product.Details!.Where(p => p.Deposit > 0).Sum(s => s.Price);
            decimal depositCount = product.Details!.Where(p => p.Deposit > 0).Count();

            decimal withdrawalCount = product.Details!.Where(p => p.Withdrawal > 0).Count();
            decimal withdrawalPriceSum = product.Details!.Where(p => p.Withdrawal > 0).Sum(s => s.Price);

            decimal depositPrice = 0;
            if (depositPriceSum > 0 | depositCount > 0)
            {
                depositPrice = depositPriceSum / depositCount;
            }

            decimal withDrawalPrice = withdrawalPriceSum / withdrawalCount;

            decimal profitPercentAmount = 0;
            if (depositPrice > 0)
            {
                profitPercentAmount = withDrawalPrice / depositPrice;
            }

            ProductProfitabilityReportsQueryResponse data = new()
            {
                Id = product.Id,
                Name = product.Name,
                DepositPrice = depositPrice,
                WithdrawalPrice = withDrawalPrice,
            };

            data.Profit = data.WithdrawalPrice - data.DepositPrice;

            if (data.DepositPrice > 0)
            {
                data.ProfitPercent = ((data.WithdrawalPrice / data.DepositPrice) - 1) * 100;
            }
            else
            {
                data.ProfitPercent = null; 
            }

            response.Add(data);
        }

        return response;
    }
}
