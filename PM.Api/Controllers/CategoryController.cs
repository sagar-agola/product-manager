using Microsoft.AspNetCore.Mvc;
using PM.Business.Contracts;
using PM.Business.Core.Consts;
using PM.Business.Core.DataTransferModels;
using PM.Business.Core.DataTransferModels.Category;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PM.Api.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository productRepository)
        {
            _categoryRepository = productRepository;
        }

        [HttpGet(ApiRoutes.Category.GetAll)]
        public async Task<IActionResult> GetAll()
        {
            ExecutionResult<List<CategoryDetail>> result = await _categoryRepository.GetAll();
            return FromExecutionResult(result);
        }

        [HttpPost(ApiRoutes.Category.Save)]
        public async Task<IActionResult> Save(CategoryDetail model)
        {
            ExecutionResult result = await _categoryRepository.Save(model);
            return FromExecutionResult(result);
        }

        [HttpDelete(ApiRoutes.Category.Delete)]
        public async Task<IActionResult> Delete(int id)
        {
            ExecutionResult result = await _categoryRepository.Delete(id);
            return FromExecutionResult(result);
        }
    }
}
