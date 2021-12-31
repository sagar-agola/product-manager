namespace PM.Business.Core.DataTransferModels.Product
{
    public class GetAllProductsRequestModel : PaginationBaseRequestModel
    {
        public string Title { get; set; }
        public int? CategoryId { get; set; }
    }
}
