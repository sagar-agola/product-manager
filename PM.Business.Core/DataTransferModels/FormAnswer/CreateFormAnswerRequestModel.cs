namespace PM.Business.Core.DataTransferModels.FormAnswer
{
    public class CreateFormAnswerRequestModel
    {
        public int? EventId { get; set; }
        public int FormDesignId { get; set; }
        public string AnswerDataString { get; set; }
    }
}
