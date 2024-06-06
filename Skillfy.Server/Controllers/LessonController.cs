using Microsoft.AspNetCore.Mvc;

namespace Skillfy.Server.Controllers
{
    public class LessonController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
