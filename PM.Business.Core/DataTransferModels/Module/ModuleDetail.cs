using System;
using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.Module
{
    public class ModuleDetail
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(500, ErrorMessage = "Title can not be more than 500 characters")]
        public string Title { get; set; }

        [MaxLength(50, ErrorMessage = "Icon text can not be more than 50 characters")]
        public string Icon { get; set; }

        [Required(ErrorMessage = "Module Prefix is required")]
        [MaxLength(20, ErrorMessage = "Module Prefix can not be more than 20 characters")]
        public string Prefix { get; set; }

        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
