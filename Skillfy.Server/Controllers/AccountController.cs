using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Dto;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Controllers
{
    [Route("api/Account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationUser _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public AccountController(SignInManager<ApplicationUser> signinmanger, ApplicationUser applicationdbcontext, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signinmanger;
            _context = applicationdbcontext;
            _userManager = userManager;
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] SigninDto signinDto)
        {
            if (signinDto == null)
            {
                return BadRequest(new ResponsViewModel(false, "Sign-in data is null", null));
            }
            var user = await _userManager.FindByEmailAsync(signinDto.Email);
            if (user == null)
            {
                return Unauthorized(new ResponsViewModel(false, "Invalid login attempt", null));
            }

            
           var result = await _signInManager.PasswordSignInAsync(signinDto.Email, signinDto.Password, false, lockoutOnFailure: false);

                if (!result.Succeeded)
                {

                    return BadRequest(new ResponsViewModel(false, "Invalid login attempt", null));


                }

                return Ok(new ResponsViewModel(true, "Sign in Sucessfully", new {user.UserName,user.Fname,user.Lname}));

            
        }
    }
}
