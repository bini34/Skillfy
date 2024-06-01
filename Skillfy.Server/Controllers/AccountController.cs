using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Model;

namespace Skillfy.Server.Controllers
{
    [Route("api/SkillfyWebsite")]
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

        [HttpPost("signin")]
        public async Task<IActionResult> signin()
        {
            var user = await _userManager.FindByEmailAsync(lm.Email);
            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(lm.Email, lm.Password, false, lockoutOnFailure: false);
                var roles = await _userManager.GetRolesAsync(user);
                if (result.Succeeded)
                {
                    if (roles.Contains("Teacher"))
                    {
                        if (result.Succeeded)
                        {
                            //if (Request.Query.Keys.Contains("ReturnUrl"))
                            //{
                            //    return Redirect(Request.Query["ReturnUrl"].First());
                            //}
                            //else
                            //{
                            //    return RedirectToAction("Shop", "Main");
                            //}
                        }
                    }
                }
                if (result.IsLockedOut)
                {
                    return;
                }
                else
                {
                    return;
                }
                return View();
        }
    }
}
