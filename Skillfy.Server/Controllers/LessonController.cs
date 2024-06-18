using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Skillfy.Server.Api;
using Skillfy.Server.Dto;
using Skillfy.Server.service;
using Skillfy.Server.ViewModel;
using Skillfy.Server.Repo;
using Microsoft.AspNetCore.Http.HttpResults;



namespace Skillfy.Server.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : Controller
    {
        //private readonly MuxApiClient _muxApiClient;
        private readonly Ilessonrepo _lessorepo;

        public LessonController( Ilessonrepo lessorepo)
        {
            _lessorepo = lessorepo; 
        }

        //[HttpPost("uploadLesson")]
        //public async Task<IActionResult> UploadLesson([FromForm] LessonCreateDto lessonDto)
        //{
        //    if (lessonDto == null || lessonDto.Video == null)
        //    {
        //        return BadRequest(new { message = "Invalid lesson data" });
        //    }
                
        //   var result = await _lessorepo.SaveLessonAsync(lessonDto.chapterId, lessonDto.Video);
        //    if (result < 0)
        //    {
        //        return BadRequest(new ResponsViewModel(false, "lesson not created", null));
        //    }

        //    return Ok(new ResponsViewModel(true, "lesson create succefully", result));
        //}
    }
}
