using System;
using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.Category
{
    public class CategoryDetail
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Category title is required field.")]
        [MaxLength(500, ErrorMessage = "Category title cannot be more than 500 characters.")]
        public string Title { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
