using Newtonsoft.Json.Linq;

namespace PM.Database.Models
{
    public class FormAnswer : BaseEntity
    {
        public int FormDesignId { get; set; }
        public virtual FormDesign FormDesign { get; set; }
        public JObject AnswerData { get; set; }
    }
}
