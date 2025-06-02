using eMuhasebeServer.Application.Services;
using Microsoft.Extensions.Caching.Memory;

namespace eMuhasebeServer.Infrastructure.Services;

public class ChatMemoryService : IChatMemoryService
{
    private readonly IMemoryCache _cache;
    private readonly TimeSpan _memoryExpiration = TimeSpan.FromMinutes(60); // Oturum süresi kadar tut


    public ChatMemoryService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public Task<List<(string Role, string Content)>> GetMemoryAsync(string userId)
    {
        if (_cache.TryGetValue(userId, out var memoryObj)) // Use 'var' to avoid nullability issues  
        {
            var memory = memoryObj as List<(string Role, string Content)>; // Explicitly cast to the expected type  
            return Task.FromResult(memory ?? new List<(string Role, string Content)>()); // Ensure memory is not null  
        }

        return Task.FromResult(new List<(string Role, string Content)>());
    }

    public Task AddToMemoryAsync(string userId, string role, string content)
    {
        var memory = _cache.GetOrCreate(userId, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = _memoryExpiration;
            return new List<(string Role, string Content)>();
        });

        if (memory != null) // Ensure memory is not null  
        {
            memory.Add((role, content));

            // Cache'i güncelle  
            _cache.Set(userId, memory, _memoryExpiration);
        }

        return Task.CompletedTask;
    }

    public Task ClearMemoryAsync(string userId)
    {
        _cache.Remove(userId);
        return Task.CompletedTask;
    }
}

