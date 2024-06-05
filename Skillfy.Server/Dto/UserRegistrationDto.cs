using Microsoft.AspNetCore.Identity;

namespace Skillfy.Server.Dto
{
    public class UserRegistrationDto
    {
        public string Fname {  get; set; }

        public string Lname { get; set; }

        public string role { get ; set; }   
        public string Email { get; set; }

        //public IFormFile? Picture { get; set; } 
        public string Password { get; set; }

    }
}
