namespace PM.Business.Core.DataTransferModels
{
    public class PaginationBaseRequestModel
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortField { get; set; }
        public bool IsAsc { get; set; }
    }
}
