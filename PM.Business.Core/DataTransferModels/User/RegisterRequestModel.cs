using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.User
{
    public class RegisterRequestModel
    {
        [Required(ErrorMessage = "FirstName is required field")]
        [MaxLength(100, ErrorMessage = "FirstName cannot be more than 100 characters")]
        public string FirstName { get; set; }

        [MaxLength(100, ErrorMessage = "LastName cannot be more than 100 characters")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Eamil is required field")]
        [MaxLength(256, ErrorMessage = "Email cannot be more than 250 characters")]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required field")]
        [MinLength(8, ErrorMessage = "Password cannot be less than 8 characters")]
        [MaxLength(100, ErrorMessage = "Password cannot be more than 250 characters")]
        public string Password { get; set; }
    }
}
