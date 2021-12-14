using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class Product : BaseEntity
    {
        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Title { get; set; }

        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Slug { get; set; }

        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string SubTitle { get; set; }

        [MaxLength(1000)]
        [Column(TypeName = "VARCHAR(1000)")]
        public string Description { get; set; }

        public decimal RetailPrice { get; set; }
        public decimal SalePrice { get; set; }

        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string ImageUrl { get; set; }

        public int Quentity { get; set; }

        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
