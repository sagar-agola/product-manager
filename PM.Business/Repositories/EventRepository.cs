using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Helpers.Contracts;
using PM.Database.DataContext;
using PM.Database.Models;

namespace PM.Business.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly IAuthService _authService;

        public EventRepository(ProductManagerDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        #region Generate Reserved Title

        public string GenerateReservedTitle(Event eventObj, string moduleTitle)
        {
            // TODO - make this thing dynamic
            return $"{ eventObj.UniqueId }: { moduleTitle } ({ eventObj.CreatedAt.ToString(AppConsts.DateFormat) })";
        }

        #endregion
    }
}
