using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;

namespace PM.Business.Core.DataTransferModels.FormAnswer
{
    public class FormAnswerDetail
    {
        public int Id { get; set; }
        public int FormDesignId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string AnswerDataString { get; set; }
    }
}
