using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Database.Models
{
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        [Column(TypeName = "VARCHAR(100)")]
        public string FirstName { get; set; }

        [MaxLength(100)]
        [Column(TypeName = "VARCHAR(100)")]
        public string LastName { get; set; }

        [Required]
        [MaxLength(250)]
        [Column(TypeName = "VARCHAR(250)")]
        public string Email { get; set; }

        [Column(TypeName = "VARCHAR(128)")]
        public Guid? EmailToken { get; set; }
        public bool IsEmailConfirmed { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
