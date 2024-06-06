using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Repo;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Skillfy.Server.Model;
using Skillfy.Server.service;

namespace Skillfy.Server.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly ICourseRepositary courseRepositary;
        private readonly ICourseService _courseService;  

        private readonly ApplicationDbContext applicationDbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
       public CourseController(ICourseRepositary courseRepositary, ApplicationDbContext applicationDbContext, IWebHostEnvironment webHostEnvironment, ICourseService courseService) {

            this.courseRepositary = courseRepositary;
            this.applicationDbContext = applicationDbContext;
            this.webHostEnvironment = webHostEnvironment;
            _courseService = courseService;
        }


        [HttpPost("createcourse")]
        public async Task<IActionResult> UploadCourse([FromBody] CompositCreateDto createDto)
        {
            

            var result = await _courseService.AddCourse(createDto.CourseCreateDto, createDto.ChapterDtos);

            if (!result.Success)
            {
                return BadRequest(new ResponsViewModel(false, result.Message, null));
            }

            return Ok(new ResponsViewModel(true, result.Message, result.Course));


        }


    }
}
