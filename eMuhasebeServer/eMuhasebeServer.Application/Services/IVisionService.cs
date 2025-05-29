namespace eMuhasebeServer.Application.Services;

public interface IVisionService
{
    Task<object> ExtractTextAsync(Stream imageStream);
}
