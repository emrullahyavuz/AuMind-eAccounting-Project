using eMuhasebeServer.Domain.Abstractions;
using eMuhasebeServer.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace eMuhasebeServer.Domain.Entities;

public sealed class Company : Entity
{
    public string Name { get; set; } = string.Empty;
    public string FullAdress { get; set; } = string.Empty;
    public string TaxDepartment { get; set; } = string.Empty;
    public string TaxNumber { get; set; } = string.Empty;
    public Database Database { get; set; } = new Database(string.Empty, string.Empty, string.Empty, string.Empty);
}
