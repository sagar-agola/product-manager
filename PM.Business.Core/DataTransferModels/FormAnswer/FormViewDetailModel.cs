using Newtonsoft.Json.Linq;

namespace PM.Business.Core.DataTransferModels.FormAnswer
{
    public class FormViewDetailModel
    {
        public int FormAnswerId { get; set; }
        public int FormDesignId { get; set; }
        public int EventId { get; set; }
        public string FormTitle { get; set; }
        public string AnswerData { get; set; }
        public string DesignData { get; set; }
    }
}
