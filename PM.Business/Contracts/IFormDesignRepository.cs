using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.FormDesign;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IFormDesignRepository
    {
        Task<ExecutionResult<List<FormDesignDetail>>> GetAll(int moduleId, string searchTerm);
        Task<ExecutionResult<FormDesignDetail>> Get(int id);
        Task<ExecutionResult> Save(FormDesignDetail model);
        Task<ExecutionResult> Delete(int id);
    }
}
