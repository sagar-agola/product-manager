using System.Collections.Generic;

namespace PM.Business.Core.DataTransferModels
{
    public class PaginatedResponse<T> where T : class
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }

        public IEnumerable<T> Data { get; set; }
    }
}
