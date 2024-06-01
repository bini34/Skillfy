using Microsoft.AspNetCore.Mvc;

namespace Skillfy.Server.Controllers
{
    public class CourseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
