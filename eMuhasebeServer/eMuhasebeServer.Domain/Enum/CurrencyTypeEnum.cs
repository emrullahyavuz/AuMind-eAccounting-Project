using Ardalis.SmartEnum;

namespace eMuhasebeServer.Domain.Enum;

public sealed class CurrencyTypeEnum : SmartEnum<CurrencyTypeEnum>
{
    public static readonly CurrencyTypeEnum TL = new CurrencyTypeEnum("TL", 1);
    public static readonly CurrencyTypeEnum USD = new CurrencyTypeEnum("USD", 2);
    public static readonly CurrencyTypeEnum EUR = new CurrencyTypeEnum("Euro", 3);
    public CurrencyTypeEnum(string name, int value) : base(name, value)
    {
    }
}
