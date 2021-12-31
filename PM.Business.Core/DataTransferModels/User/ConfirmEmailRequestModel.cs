using System;
using System.ComponentModel.DataAnnotations;

namespace PM.Business.Core.DataTransferModels.User
{
    public class ConfirmEmailRequestModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Email Token is required field")]
        public Guid? EmailToken { get; set; }
    }
}
