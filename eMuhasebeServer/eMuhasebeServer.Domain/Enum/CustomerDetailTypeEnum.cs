using Ardalis.SmartEnum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eMuhasebeServer.Domain.Enum;

public sealed class CustomerDetailTypeEnum : SmartEnum<CustomerDetailTypeEnum>
{
    public static readonly CustomerDetailTypeEnum Bank = new("Banka", 1);
    public static readonly CustomerDetailTypeEnum CashRegister = new("Kasa", 2);
    public static readonly CustomerDetailTypeEnum PurchaseInvoice = new("Alış Faturasi", 2);
    public static readonly CustomerDetailTypeEnum SellingInvoice = new("Satış Faturasi", 2);
    public CustomerDetailTypeEnum(string name, int value) : base(name, value)
    {
    }
}
