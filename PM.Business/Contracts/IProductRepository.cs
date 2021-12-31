using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Kendo;
using PM.Business.Core.DataTransferModels.Product;
using System.Threading.Tasks;

namespace PM.Business.Contracts
{
    public interface IProductRepository
    {
        Task<ExecutionResult<PaginatedResponse<ProductDetail>>> GetAll(GetAllProductsRequestModel model);
        Task<ExecutionResult<ProductDetail>> Get(int id);
        Task<ExecutionResult> Save(SaveProductRequestModel model);
        Task<ExecutionResult> Delete(int id);
        Task<ExecutionResult> ToggleActive(int id);
        Task<KendoResponseModel<ProductDetail>> GetKendoData(GetKendoDataRequestModel model);
    }
}
