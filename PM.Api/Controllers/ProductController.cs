using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Product;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost(ApiRoutes.Product.GetAll)]
        public async Task<IActionResult> GetAll(GetAllProductsRequestModel model)
        {
            ExecutionResult<PaginatedResponse<ProductDetail>> result = await _productRepository.GetAll(model);
            return FromExecutionResult(result);
        }

        [HttpGet(ApiRoutes.Product.Get)]
        public async Task<IActionResult> Get(int id)
        {
            ExecutionResult<ProductDetail> result = await _productRepository.Get(id);
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.Product.Save)]
        public async Task<IActionResult> Save([FromForm] SaveProductRequestModel model)
        {
            ExecutionResult result = await _productRepository.Save(model);
            return FromExecutionResult(result);
        }

        [HttpDelete(ApiRoutes.Product.Delete)]
        public async Task<IActionResult> Delete(int id)
        {
            ExecutionResult result = await _productRepository.Delete(id);
            return FromExecutionResult(result);
        }

        [HttpGet(ApiRoutes.Product.ToggleActive)]
        public async Task<IActionResult> ToggleActive(int id)
        {
            ExecutionResult result = await _productRepository.ToggleActive(id);
            return FromExecutionResult(result);
        }
    }
}
