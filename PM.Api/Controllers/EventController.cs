using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Event;
using PM.Business.Core.DataTransferModels.Kendo;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    [Authorize]
    public class EventController : BaseController
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpPost(ApiRoutes.Event.GetKendoData)]
        public async Task<IActionResult> GetKendoData(GetKendoDataRequestModel model, int moduleId)
        {
            KendoResponseModel<EventRegisterGridItem> response = await _eventRepository.GetKendoData(model, moduleId);
            return Ok(response);
        }

        [HttpGet(ApiRoutes.Event.GetFormsDetail)]
        public async Task<IActionResult> GetFormsDetail(int eventId)
        {
            ExecutionResult<List<EventFormDetail>> result = await _eventRepository.GetFormsDetail(eventId);
            return FromExecutionResult(result);
        }
    }
}
