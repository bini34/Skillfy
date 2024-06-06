using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Skillfy.Server.Dto
{
    public class UserRegistrationDto
    {
        [Required]
        public string Fname {  get; set; }
        [Required]
        public string Lname { get; set; }
        [Required]
        public string role { get ; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        //public IFormFile? Picture { get; set; } 
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

    }
}
