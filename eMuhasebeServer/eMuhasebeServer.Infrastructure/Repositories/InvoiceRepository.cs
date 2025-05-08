using eMuhasebeServer.Domain.Entities;
using eMuhasebeServer.Domain.Repositories;
using eMuhasebeServer.Infrastructure.Context;
using GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace eMuhasebeServer.Infrastructure.Repositories;

internal sealed class InvoiceRepository : Repository<Invoice, CompanyDbContext>, IInvoiceRepository
{
    private readonly CompanyDbContext _context;

    public InvoiceRepository(CompanyDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<int> GetInvoiceCountAsync(CancellationToken cancellationToken)
    {
        return await _context.Invoices.CountAsync(cancellationToken);
    }

    public async Task<Invoice?> GetLastByPrefixAsync(string prefix, CancellationToken cancellationToken = default)
    {
        return await _context.Invoices
            .Where(i => i.InvoiceNumber.StartsWith(prefix))
            .OrderByDescending(i => i.InvoiceNumber)
            .FirstOrDefaultAsync(cancellationToken);
    }
}
