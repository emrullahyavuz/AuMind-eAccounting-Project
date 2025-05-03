namespace eMuhasebeServer.Application.Options;

public sealed class OpenAIOptions
{
    public const string SectionName = "OpenAI";
    public string ApiKey { get; set; } = string.Empty;
}
