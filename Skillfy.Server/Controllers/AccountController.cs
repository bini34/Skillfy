using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Dto;
using Skillfy.Server.ViewModel;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Skillfy.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly SignInManager<ApplicationUser> _signInManager;      
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly RoleManager<IdentityRole> _rolemanager;
        public AccountController( ApplicationDbContext context ,SignInManager<ApplicationUser> signinmanger, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment, RoleManager<IdentityRole> rolemanager)
        {
            _context = context;
            _signInManager = signinmanger;            
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
            _rolemanager = rolemanager;
        }
        [HttpPost("login")]
        [ProducesResponseType(typeof(ResponsViewModel), 200)]
        [ProducesResponseType(typeof(ResponsViewModel), 400)]
        [ProducesResponseType(typeof(ResponsViewModel), 401)]
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

           
            
            var result = await _signInManager.PasswordSignInAsync(user, signinDto.Password, false, lockoutOnFailure: false);

                if (!result.Succeeded)
                {

                    return BadRequest(new ResponsViewModel(false, "Invalid login attempt", null));


                }
            var role = await _userManager.GetRolesAsync(user);
            return Ok(new ResponsViewModel(true, "Login Sucessfully", new { user.Id, user.UserName, user.Fname, user.Lname, user.ProfileUrl , role}));
          


            
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest(new ResponsViewModel(false, "User data is null", null));
            }
       
            

            var user = new ApplicationUser
            {
                Email = userDto.Email,
                Fname = userDto.Fname,
                Lname = userDto.Lname,
                UserName = userDto.Email
               // ProfileUrl = UniqueFileName!= null ? "/UserProfile/{UniqueFileName}" : null
                


            };  

            var result = await _userManager.CreateAsync(user, userDto.Password);
            

            if (!result.Succeeded)
            {
                return BadRequest(new ResponsViewModel(false, "Registration failed", result.Errors));
            }
            if (!string.IsNullOrEmpty(userDto.role))
            {
                if (!await _rolemanager.RoleExistsAsync(userDto.role))
                {
                    await _rolemanager.CreateAsync(new IdentityRole(userDto.role));
                }
               

                var roleResult = await _userManager.AddToRoleAsync(user, userDto.role);
                if (!roleResult.Succeeded)
                {
                    return BadRequest(new ResponsViewModel(false, "Failed to add role", roleResult.Errors));
                }
            }
            return Ok(new ResponsViewModel(true, "Registrated successfully", new {user.Id, user.Fname,user.Lname, user.Email}));




        }




    }
}
