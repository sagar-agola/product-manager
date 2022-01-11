using System;

namespace PM.Business.Core.DataTransferModels.Event
{
    public class EventFormDetail
    {
        public int FormDesignId { get; set; }
        public string Title { get; set; }
        public int? FormAnswerId { get; set; }
        public DateTime? SubmittedAt { get; set; }

        // NOTE - this class will be extended to support drafted forms
    }
}
