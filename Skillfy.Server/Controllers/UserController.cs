using Microsoft.AspNetCore.Mvc;

namespace Skillfy.Server.Controllers
{
    public class UserController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}
