namespace PM.Business.Helpers.Contracts
{
    public interface IAuthService
    {
        int UserId { get; }
        int TimeZoneOffset { get; }
    }
}
