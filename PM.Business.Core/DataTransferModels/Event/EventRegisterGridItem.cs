using System;

namespace PM.Business.Core.DataTransferModels.Event
{
    public class EventRegisterGridItem
    {
        public int Id { get; set; }
        public string UniqueId { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
