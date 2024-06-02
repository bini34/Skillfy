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
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AccountController(SignInManager<ApplicationUser> signinmanger, ApplicationUser applicationdbcontext, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _signInManager = signinmanger;
            _context = applicationdbcontext;
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("signin")]
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new ResponsViewModel(false, "User data is null", null));
            }
            string UniqueFileName = null;
            if(userDto.Picture != null)
            {
                string UserProfileFolder = Path.Combine(_webHostEnvironment.WebRootPath, "UserProfile");
                UniqueFileName = Guid.NewGuid().ToString() + "_" + userDto.Picture.FileName;
                var filepath = Path.Combine(UserProfileFolder, UniqueFileName);
                using(var filestream = new FileStream(filepath, FileMode.Create))
                {
                    await userDto.Picture.CopyToAsync(filestream);
                }

            }



            var user = new ApplicationUser
            {
                Email = userDto.Email,
                Fname = userDto.Fname,
                Lname = userDto.Lname,
                ProfileUrl = UniqueFileName!= null ? "/UserProfile/{UniqueFileName}" : null
                


            };  
            var result = await _userManager.CreateAsync(user, userDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new ResponsViewModel(false, "Registration failed", result.Errors));
            }
            return Ok(new ResponsViewModel(true, "Registrated successfully", new { user.Fname,user.Lname, user.ProfileUrl, user.Email}));




        }




    }
}
