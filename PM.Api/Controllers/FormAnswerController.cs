using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormAnswer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    [Authorize]
    public class FormAnswerController : BaseController
    {
        private readonly IFormAnswerRepository _formAnswerRepository;

        public FormAnswerController(IFormAnswerRepository formAnswerRepository)
        {
            _formAnswerRepository = formAnswerRepository;
        }

        [HttpPost(ApiRoutes.FormAnswer.Create)]
        public async Task<IActionResult> Create(CreateFormAnswerRequestModel model)
        {
            ExecutionResult result = await _formAnswerRepository.Create(model);
            return FromExecutionResult(result);
        }
    }
}
