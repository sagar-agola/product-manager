namespace PM.Business.Core.AppSettings
{
    public class AppSettings
    {
        public string Token { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtAudience { get; set; }
        public int TokenExpiryHour { get; set; }
    }
}
