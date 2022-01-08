using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class Event : BaseEntity
    {
        [Required]
        [MaxLength(20)]
        [Column(TypeName = "VARCHAR(20)")]
        public string UniqueId { get; set; }

        [Required]
        [MaxLength(200)]
        [Column(TypeName = "VARCHAR(200)")]
        public string ReservedTitle { get; set; }

        [MaxLength(1000)]
        [Column(TypeName = "VARCHAR(1000)")]
        public string Description { get; set; }

        public int ModuleId { get; set; }
        public virtual Module Module { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
