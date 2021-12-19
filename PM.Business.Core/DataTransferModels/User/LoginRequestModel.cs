using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.User
{
    public class LoginRequestModel
    {
        [Required(ErrorMessage = "Email is required field")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required field")]
        public string Password { get; set; }
    }
}
