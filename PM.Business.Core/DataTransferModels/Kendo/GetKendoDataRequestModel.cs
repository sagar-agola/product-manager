using System.Collections.Generic;

namespace PM.Business.Core.DataTransferModels.Kendo
{
    public class GetKendoDataRequestModel
    {
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public List<SortItem> Sort { get; set; }
        public string SearchTerm { get; set; }
    }

    public class SortItem
    {
        public string Field { get; set; }
        public string Dir { get; set; }
    }
}
