using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormDesign;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    [Authorize]
    public class FormDesignController : BaseController
    {
        private readonly IFormDesignRepository _formDesignRepository;

        public FormDesignController(IFormDesignRepository formDesignRepository)
        {
            _formDesignRepository = formDesignRepository;
        }

        [HttpGet(ApiRoutes.FormDesign.GetAll)]
        public async Task<IActionResult> GetAll(int moduleId, [FromQuery] string searchTerm)
        {
            ExecutionResult<List<FormDesignDetail>> result = await _formDesignRepository.GetAll(moduleId, searchTerm);
            return FromExecutionResult(result);
        }

        [HttpGet(ApiRoutes.FormDesign.Get)]
        public async Task<IActionResult> Get(int id)
        {
            ExecutionResult<FormDesignDetail> result = await _formDesignRepository.Get(id);
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.FormDesign.Save)]
        public async Task<IActionResult> Save(FormDesignDetail model)
        {
            ExecutionResult result = await _formDesignRepository.Save(model);
            return FromExecutionResult(result);
        }

        [HttpDelete(ApiRoutes.FormDesign.Delete)]
        public async Task<IActionResult> Delete(int id)
        {
            ExecutionResult result = await _formDesignRepository.Delete(id);
            return FromExecutionResult(result);
        }
    }
}
