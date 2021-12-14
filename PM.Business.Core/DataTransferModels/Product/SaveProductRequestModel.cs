using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.Product
{
    public class SaveProductRequestModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(500, ErrorMessage = "Title can not be more than 500 characters")]
        public string Title { get; set; }

        [MaxLength(500, ErrorMessage = "Sub Title can not be more than 500 characters")]
        public string SubTitle { get; set; }

        [MaxLength(1000, ErrorMessage = "Description can not be more than 1000 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Retail Price is required")]
        public decimal RetailPrice { get; set; }

        [Required(ErrorMessage = "Sale Price is required")]
        public decimal SalePrice { get; set; }

        public IFormFile Image { get; set; }

        public int Quentity { get; set; }

        [Required(ErrorMessage = "Product category is required")]
        public int CategoryId { get; set; }
    }
}
