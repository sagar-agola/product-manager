using Newtonsoft.Json.Linq;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels.Event;
using PM.Business.Core.DataTransferModels.Kendo;
using PM.Business.Helpers;
using PM.Business.Helpers.Contracts;
using PM.Database.DataContext;
using PM.Database.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Business.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ProductManagerDbContext _context;
        private readonly IAuthService _authService;
        private readonly GridDataTableHelpers _gridDataTableHelpers;

        public EventRepository(ProductManagerDbContext context,
                               IAuthService authService,
                               GridDataTableHelpers gridDataTableHelpers)
        {
            _context = context;
            _authService = authService;
            _gridDataTableHelpers = gridDataTableHelpers;
        }

        #region Get Kendo Data

        public async Task<KendoResponseModel<EventRegisterGridItem>> GetKendoData(GetKendoDataRequestModel register, int moduleId)
        {
            IQueryable<EventRegisterGridItem> query = from module in _context.Modules
                                                      from eventObj in _context.Events.Where(e => e.ModuleId == module.Id)
                                                      where
                                                         module.Id == moduleId &&
                                                         module.UserId == _authService.UserId &&
                                                         module.IsActive &&
                                                         module.DeletedAt.HasValue == false &&
                                                         eventObj.DeletedAt.HasValue == false
                                                      select new EventRegisterGridItem
                                                      {
                                                          Id = eventObj.Id,
                                                          UniqueId = eventObj.UniqueId,
                                                          Title = eventObj.ReservedTitle,
                                                          CreatedAt = eventObj.CreatedAt
                                                      };

            return await _gridDataTableHelpers.FilterByDataTableRequest(query, register);
        }

        #endregion

        #region Generate Reserved Title

        public string GenerateReservedTitle(Event eventObj, string moduleTitle)
        {
            // TODO - make this thing dynamic
            return $"{ eventObj.UniqueId }: { moduleTitle } ({ eventObj.CreatedAt.ToString(AppConsts.DateFormat) })";
        }

        #endregion

        #region Set Reserved Fields

        public void SetReservedFiels(Event eventObj, JObject answer, JArray design)
        {
            List<JToken> reservedFields = design.FindTokens("reservedField");
            foreach (JToken token in reservedFields)
            {
                string bind = token.SelectToken("bind").ToString();
                switch (bind)
                {
                    case "Description":
                        eventObj.Description = answer.SelectToken(bind)?.ToString();
                        break;
                    default:
                        break;
                }
            }
        }

        #endregion
    }
}
