using System.Collections.Generic;

namespace PM.Business.Core.DataTransferModels.Kendo
{
    public class GetKendoDataRequestModel
    {
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public List<SortItem> Sort { get; set; }
        public List<KendoColumn> Columns { get; set; }
    }

    public class SortItem
    {
        public string Field { get; set; }
        public string Dir { get; set; }
    }

    public class KendoFilter
    {
        public string Field { get; set; }
        public string Value { get; set; }
        public string Operator { get; set; }
    }

    public class KendoColumn
    {
        public string PropertyName { get; set; }
        public bool Searchable { get; set; }
        public object Search { get; set; }
    }
}
