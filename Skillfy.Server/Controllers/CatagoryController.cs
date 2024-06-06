using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Repo;

namespace Skillfy.Server.Controllers
{
    [Route("api/catagory")]
    [ApiController]
    public class CatagoryController : Controller
    {
        private readonly IcatogryRepositary _catagoryService;

        public CatagoryController(IcatogryRepositary catagoryService)
        {
            _catagoryService = catagoryService;
        }

        [HttpGet("allnames")]
        public async Task<ActionResult<List<string>>> GetAllCatagoryNames()
        {
            var catagoryNames = await _catagoryService.Retunrallcatagory();
            return Ok(catagoryNames);

        }
    }
}

