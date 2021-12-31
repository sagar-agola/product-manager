using System.Collections.Generic;

namespace PM.Business.Core.DataTransferModels.Kendo
{
    public class GetKendoDataRequestModel
    {
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public string SearchTerm { get; set; }
        public List<SortItem> Sort { get; set; }
        public List<KendoColumn> Columns { get; set; }
    }

    public class SortItem
    {
        public string Field { get; set; }
        public string Dir { get; set; }
    }

    public class KendoColumn
    {
        public string PropertyName { get; set; }
        public bool Searchable { get; set; }
        public object Search { get; set; }
        public ColumnTypeEnum Type { get; set; }
    }

    public enum ColumnTypeEnum
    {
        String = 1,
        Numeric = 2,
        Dropdown = 3,
        Currency = 4,
        Boolean = 5,
        Date = 6
    }
}
