using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Module;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    [Authorize]
    public class ModuleController : BaseController
    {
        private readonly IModuleRepository _moduleRepository;

        public ModuleController(IModuleRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

        [HttpGet(ApiRoutes.Module.GetAll)]
        public async Task<IActionResult> GetAll([FromQuery] string searchTerm)
        {
            ExecutionResult<List<ModuleDetail>> result = await _moduleRepository.GetAll(searchTerm);
            return FromExecutionResult(result);
        }

        [HttpGet(ApiRoutes.Module.Get)]
        public async Task<IActionResult> Get(int id)
        {
            ExecutionResult<ModuleDetail> result = await _moduleRepository.Get(id);
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.Module.Save)]
        public async Task<IActionResult> Save(ModuleDetail model)
        {
            ExecutionResult result = await _moduleRepository.Save(model);
            return FromExecutionResult(result);
        }

        [HttpDelete(ApiRoutes.Module.Delete)]
        public async Task<IActionResult> Delete(int id)
        {
            ExecutionResult result = await _moduleRepository.Delete(id);
            return FromExecutionResult(result);
        }

        [HttpGet(ApiRoutes.Module.ToggleActive)]
        public async Task<IActionResult> ToggleActive(int id)
        {
            ExecutionResult result = await _moduleRepository.ToggleActive(id);
            return FromExecutionResult(result);
        }
    }
}
