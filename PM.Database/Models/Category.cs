using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class Category : BaseEntity
    {
        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Title { get; set; }

        public virtual List<Product> Products { get; set; }
    }
}
