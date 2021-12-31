using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class ExceptionLog
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(500)]
        [Column(TypeName = "VARCHAR(500)")]
        public string Message { get; set; }

        [Column(TypeName = "VARCHAR(MAX)")]
        public string Source { get; set; }

        [Column(TypeName = "VARCHAR(MAX)")]
        public string StackTrace { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
