using eMuhasebeServer.Domain.Entities;
using GenericRepository;

namespace eMuhasebeServer.Domain.Repositories;

public interface IInvoiceRepository : IRepository<Invoice>
{
    Task<Invoice?> GetLastByPrefixAsync(string prefix, CancellationToken cancellationToken = default);
    Task<int> GetInvoiceCountAsync(CancellationToken cancellationToken);

}
