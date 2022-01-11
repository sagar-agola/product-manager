using Newtonsoft.Json.Linq;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Event;
using PM.Business.Core.DataTransferModels.Kendo;
using PM.Database.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IEventRepository
    {
        Task<KendoResponseModel<EventRegisterGridItem>> GetKendoData(GetKendoDataRequestModel model, int moduleId);
        Task<ExecutionResult<List<EventFormDetail>>> GetFormsDetail(int eventId);
        void SetReservedFiels(Event eventObj, JObject answer, JArray design);
        string GenerateReservedTitle(Event eventObj, string moduleTitle);
    }
}
