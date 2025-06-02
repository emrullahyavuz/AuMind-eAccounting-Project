namespace eMuhasebeServer.Application.Services;

public interface IChatMemoryService
{
    Task<List<(string Role, string Content)>> GetMemoryAsync(string userId);
    Task AddToMemoryAsync(string userId, string role, string content);
    Task ClearMemoryAsync(string userId);
}
