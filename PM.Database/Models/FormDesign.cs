using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class FormDesign : BaseEntity
    {
        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Title { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR(MAX)")]
        public string DesignData { get; set; }

        public int? Order { get; set; }

        public int ModuleId { get; set; }
        public virtual Module Module { get; set; }
    }
}
