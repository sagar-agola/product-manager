using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Category;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface ICategoryRepository
    {
        Task<ExecutionResult<List<CategoryDetail>>> GetAll();
        Task<ExecutionResult> Save(CategoryDetail model);
        Task<ExecutionResult> Delete(int id);
    }
}
