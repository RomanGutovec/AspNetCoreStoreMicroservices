namespace OcelotApiGw.Options;

public class CorsOptions
{
    public string PolicyName { get; set; }
    public string[] AllowedOrigins { get; set; }
    public string[] AllowedHeaders { get; set; }
    public string[] AllowedMethods { get; set; }
}