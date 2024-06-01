using Microsoft.AspNetCore.Mvc;

namespace Skillfy.Server.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
