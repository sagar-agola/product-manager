using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormAnswer;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IFormAnswerRepository
    {
        Task<ExecutionResult> Create(CreateFormAnswerRequestModel model);
    }
}
