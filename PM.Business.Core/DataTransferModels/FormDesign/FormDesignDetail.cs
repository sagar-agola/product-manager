using System;
using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.FormDesign
{
    public class FormDesignDetail
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(500, ErrorMessage = "Title can not be more than 500 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Form design data is required")]
        public string DesignData { get; set; }

        public int ModuleId { get; set; }

        public string Module { get; set; }

        public int? Order { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
