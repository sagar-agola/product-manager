using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.User;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IUserRepository
    {
        Task<ExecutionResult<LoginResponseModel>> Login(LoginRequestModel model);
        Task<ExecutionResult> Register(RegisterRequestModel model);
        Task<ExecutionResult> ConfirmEmail(ConfirmEmailRequestModel model);
    }
}
