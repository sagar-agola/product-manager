using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.User;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost(ApiRoutes.User.Login)]
        public async Task<IActionResult> Login(LoginRequestModel model)
        {
            ExecutionResult<LoginResponseModel> result = await _userRepository.Login(model);
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.User.Register)]
        public async Task<IActionResult> Register(RegisterRequestModel model)
        {
            ExecutionResult<string> result = await _userRepository.Register(model);
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.User.ConfirmEmail)]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailRequestModel model)
        {
            ExecutionResult result = await _userRepository.ConfirmEmail(model);
            return FromExecutionResult(result);
        }
    }
}
