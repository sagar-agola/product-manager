using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class Module : BaseEntity
    {
        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Title { get; set; }

        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(50)")]
        public string Icon { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
