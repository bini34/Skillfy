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
    //[Route("api/course")]
    //[ApiController]
    public class CourseController : Controller
    {
        private readonly ICourseRepositary courseRepositary;
        private readonly ICourseService courseService;  

        private readonly ApplicationDbContext applicationDbContext;
        private readonly IWebHostEnvironment webHostEnvironment;
        public CourseController(ICourseRepositary courseRepositary, ApplicationDbContext applicationDbContext, IWebHostEnvironment webHostEnvironment) {

            this.courseRepositary = courseRepositary;
            this.applicationDbContext = applicationDbContext;
            this.webHostEnvironment = webHostEnvironment;

        }


       
        //public async Task<IActionResult> UploadCourse([FromBody] CourseCreateDto courseCreateDto)
        //{
        //    //    if (courseCreateDto == null)
        //    //    {
        //    //        return BadRequest(new ResponsViewModel(false, "course is null", null));

        //    //    }
        //    //    string uniqueFileName = null;
        //    //    if (courseCreateDto.Thumbline != null)
        //    //    {
        //    //        string uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "coursethumbline");
        //    //        uniqueFileName = Guid.NewGuid().ToString() + "_" + courseCreateDto.Thumbline.FileName;
        //    //        string filePath = Path.Combine(uploadsFolder, uniqueFileName);
        //    //        using (var fileStream = new FileStream(filePath, FileMode.Create))
        //    //        {
        //    //            await courseCreateDto.Thumbline.CopyToAsync(fileStream);
        //    //        }
        //    //    }

        //    //    var course = new Course
        //    //    {
        //    //        Title = courseCreateDto.CourseName,
        //    //        Description = courseCreateDto.Description,
        //    //        ThumbnailImage = "/coursethumbline/{uniqueFileName}"

        //    //    };

        //    //    var result = await courseRepositary.UploadCourse(course);
        //    //    if(result == null)
        //    //    {
        //    //        return BadRequest(new ResponsViewModel(false, "Course is not Created!!!", null));
        //    //    }
        //    //    return Ok(new ResponsViewModel(true, "Course is Created Succesfully", result));



        //    //var result = await _courseService.AddCourseAsync(courseCreateDto, TeacherId, chapterDtos);

        //    //if (!result.Success)
        //    //{
        //    //    return BadRequest(new ResponseViewModel(false, result.Message, null));
        //    //}

        //    //return Ok(new ResponseViewModel(true, result.Message, result.Course));


        //}


    }
}
