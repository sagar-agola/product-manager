using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Module;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IModuleRepository
    {
        Task<ExecutionResult<List<ModuleDetail>>> GetAll(string searchTerm);
        Task<ExecutionResult<ModuleDetail>> Get(int id);
        Task<ExecutionResult> Save(ModuleDetail model);
        Task<ExecutionResult> Delete(int id);
        Task<ExecutionResult> ToggleActive(int id);
    }
}
