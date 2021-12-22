using System.Collections.Generic;

namespace PM.Business.Core.DataTransferModels.Kendo
{
    public class KendoResponseModel<T> where T : class
    {
        public List<T> Data { get; set; }
        public int Total { get; set; }
    }
}
