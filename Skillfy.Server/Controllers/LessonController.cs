using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Skillfy.Server.Api;
using Skillfy.Server.Dto;
using Skillfy.Server.service;
using Skillfy.Server.ViewModel;


namespace Skillfy.Server.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly MuxApiClient _muxApiClient;
        private readonly LessonService _lessonService;

        public LessonController(IConfiguration configuration, LessonService lessonService)
        {
            _configuration = configuration;
            _lessonService = lessonService;
            var muxApiKey = _configuration["445ce76c-876e-420e-9213-3b7977797b88"];
            var muxApiSecret = _configuration["t4vN+ASUU7mT+YYqWUqexinUev/aXSbrVquvDKTq+iePD3cL/pfAWHdy4gQuscai3bOdH3Yyg3T"];
            _muxApiClient = new MuxApiClient(muxApiKey, muxApiSecret);
        }

       // [HttpPost("uploadlesson")]
        //public async Task<IActionResult> UploadLesson(LessonCreateDto lessondto)
        //{
        //    if (video == null || video.Length == 0)
        //    {
        //        return BadRequest("No video file provided.");
        //    }

        //    // Save video to a temporary location
        //    var tempFilePath = Path.GetTempFileName();
        //    using (var stream = new FileStream(tempFilePath, FileMode.Create))
        //    {
        //        await video.CopyToAsync(stream);
        //    }

        //    // Upload video to Mux
        //    var playbackId = await _muxApiClient.UploadVideoAsync(tempFilePath);
        //    var videoUrl = $"https://stream.mux.com/{playbackId}.m3u8";

        //    // Delete the temporary file
        //    System.IO.File.Delete(tempFilePath);

        //    // Save lesson details to the database
        //    var lesson = await _lessonService.SaveLessonAsync(chapterId, videoUrl);

        //    return Ok(new ResponsViewModel(true, "Succesfully create", lesson));
        //}
    }
}
