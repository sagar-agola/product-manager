using Newtonsoft.Json.Linq;
using PM.Business.Core.DataTransferModels.Event;
using PM.Business.Core.DataTransferModels.Kendo;
using PM.Database.Models;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IEventRepository
    {
        string GenerateReservedTitle(Event eventObj, string moduleTitle);
        Task<KendoResponseModel<EventRegisterGridItem>> GetKendoData(GetKendoDataRequestModel model, int moduleId);
        void SetReservedFiels(Event eventObj, JObject answer, JArray design);
    }
}
