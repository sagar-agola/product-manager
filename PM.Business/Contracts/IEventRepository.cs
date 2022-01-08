using PM.Database.Models;

namespace PM.Business.Contracts
{
    public interface IEventRepository
    {
        string GenerateReservedTitle(Event eventObj, string moduleTitle);
    }
}
