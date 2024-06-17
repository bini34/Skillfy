using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Repo;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Skillfy.Server.Model;
using Skillfy.Server.service;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace Skillfy.Server.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly ICourseRepositary courseRepositary;
        private readonly ICourseService _courseService;  

        private readonly ApplicationDbContext applicationDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
       public CourseController(ICourseRepositary courseRepositary, ApplicationDbContext applicationDbContext, IWebHostEnvironment webHostEnvironment, ICourseService courseService) {

            this.courseRepositary = courseRepositary;
            this.applicationDbContext = applicationDbContext;
            _webHostEnvironment = webHostEnvironment;
            _courseService = courseService;
        }


        [HttpPost("createcourse")]
       // [Authorize("Instructor")]
        public async Task<IActionResult> UploadCourse([FromForm] CourseCreateDto courseCreateDto)
        {
            string uniqueFileName = null;
            if (courseCreateDto.Thumbline != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "coursethumbline");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }
                uniqueFileName = Guid.NewGuid().ToString() + "_" + courseCreateDto.Thumbline.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await courseCreateDto.Thumbline.CopyToAsync(fileStream);
                }
            }
            
            var result = await _courseService.AddCourse(courseCreateDto, uniqueFileName);

            if (!result.Success)
            {
                return BadRequest(new ResponsViewModel(false, result.Message, null));
            }

            return Ok(new ResponsViewModel(true, result.Message, result.Course));


        }

        [HttpGet("coursecard")]
        public async Task<IActionResult> UploadCourse()
        {
            var details =await courseRepositary.getcoursecard();

            if (details == null)
                return BadRequest(new ResponsViewModel(false, "Dont fetched", null));

            return Ok( details);
        }

        [HttpGet("coursedetail{id}")]
        public async Task<IActionResult> coursedetail(int id)
        {
            var details = await courseRepositary.GetCourseDetails(id);

            if (details == null)
                return BadRequest(new ResponsViewModel(false, "Dont fetched", null));

            return Ok(details);
        }





    }
}
