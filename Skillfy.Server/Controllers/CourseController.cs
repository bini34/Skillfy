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
        private readonly ICourseRepositary _courseRepositary;
        private readonly ICourseService _courseService;
        private readonly IcatogryRepositary _chatrepo;
        private readonly ApplicationDbContext applicationDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;
       public CourseController(ICourseRepositary courseRepositary, ApplicationDbContext applicationDbContext, IWebHostEnvironment webHostEnvironment, ICourseService courseService, IcatogryRepositary chaprepo) {

            _courseRepositary = courseRepositary;
            this.applicationDbContext = applicationDbContext;
            _webHostEnvironment = webHostEnvironment;
            _courseService = courseService;
            _chatrepo = chaprepo;
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
        public async Task<IActionResult> coursecard()
        {
            var details =await _courseRepositary.getcoursecard();

            if (details == null)
                return BadRequest(new ResponsViewModel(false, "Dont fetched", null));

            return Ok( details);
        }

        [HttpGet("coursedetail{id}")]
        public async Task<IActionResult> coursedetail(int id)
        {
            var details = await _courseRepositary.GetCourseDetails(id);

            if (details == null)
                return BadRequest(new ResponsViewModel(false, "Dont fetched", null));

            return Ok(details);
        }
        [HttpGet("enrolledcourse{userid}")]
        public async Task<IActionResult> enrolledcourse(string userid)
        {
            var course = await _courseRepositary.getenrolled(userid);
            if(course == null)
            {
                return BadRequest(new ResponsViewModel(false, "no course registered", null));
            }

            return Ok(course);
        }

        [HttpGet("coursebycatagory{catagory}")]
        public async Task<IActionResult> coursebycatagory(string catagory)
        {
           var course = await _chatrepo.GetCoursesByCategoryAsync(catagory);
            if (course == null)
            {
                return BadRequest(new ResponsViewModel(false, "no course in this catagory", null));
            }

            return Ok(course);
        }

        [HttpGet("detailenrolled{courseid}")]
        public async Task<IActionResult> enrolledcoursedetails(int courseid)
        {
           var course = await _courseRepositary.GetenrolledCourseDetailsAsync(courseid);
            
            if(course == null)
            {
                return BadRequest(new ResponsViewModel(false, "course not fetched", null));
            }

            return Ok(course);  

        }

        [HttpPut("updatecourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseUpdateDto courseUpdateDto)
        {
            if (courseUpdateDto == null || !ModelState.IsValid)
            {
                return BadRequest(new ResponsViewModel(false, "Invalid course data", null));
            }

            var result = await _courseRepositary.UpdateCourseAsync(courseUpdateDto);

            if (!result)
            {
                return NotFound(new ResponsViewModel(false, "Course not found", null));
            }

            return Ok(new ResponsViewModel(true, "Course updated successfully", null));
        }
        [HttpDelete("deletecourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            var result = await _courseRepositary.DeleteCourseAsync(courseId);

            if (!result)
            {
                return NotFound(new ResponsViewModel(false, "Course not found", null));
            }

            return Ok(new ResponsViewModel(true, "Course deleted successfully", null));
        }
        [HttpPost("rating")]
        public async Task<IActionResult> rating(courseratingdto courseratingdto)
        {
            var review = new Review
            {
                CourseId = courseratingdto.courseid,
                userID = courseratingdto.userid,
                comment = courseratingdto.comment
            };

            var respons =await applicationDbContext.ratings.AddAsync(review);
            
            if(respons == null)
            {
                return BadRequest(new ResponsViewModel(false, "not succesfull", null));
            }
            return Ok(new ResponsViewModel(true, "succesfull", null));


        }
        [HttpGet("search{coursename}")]
        public async Task<IActionResult> search(string  coursename)
        {

          var course = await _courseRepositary.GetCourseByName(coursename);
            if (course == null)
                return BadRequest("not founded");
            var courseid = course.CourseID;
           var coursecard= await _courseRepositary.getcoursecardbyid(courseid);
            if (coursecard == null)
                return BadRequest(new ResponsViewModel(false, "Dont fetched", null));

            return Ok(coursecard);

        }


    }
}
