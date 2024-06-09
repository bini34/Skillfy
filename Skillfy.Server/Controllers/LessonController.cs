using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Skillfy.Server.Api;
using Skillfy.Server.Dto;
using Skillfy.Server.service;
using Skillfy.Server.ViewModel;
using Skillfy.Server.Repo;



namespace Skillfy.Server.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : Controller
    {
        private readonly MuxApiClient _muxApiClient;

        public LessonController(MuxApiClient muxApiClient)
        {
            _muxApiClient = muxApiClient;
        }

        [HttpPost("uploadLesson")]
        public async Task<IActionResult> UploadLesson([FromForm] LessonCreateDto lessonDto)
        {
            if (lessonDto == null || lessonDto.Video == null)
            {
                return BadRequest(new { message = "Invalid lesson data" });
            }

            try
            {
                // Save the video to a temporary location
                var tempFilePath = Path.GetTempFileName();
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await lessonDto.Video.CopyToAsync(stream);
                }

                // Upload the video to Mux
                await _muxApiClient.UploadVideoAsync(tempFilePath);

                // Delete the temporary file
                System.IO.File.Delete(tempFilePath);

                return Ok(new { message = "Video uploaded successfully to Mux." });
            }
            catch (HttpRequestException ex)
            {
                // Handle the HTTP request exception
                return StatusCode(500, new { message = "Error uploading video to Mux.", details = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle any other exceptions
                return StatusCode(500, new { message = "Internal server error", details = ex.Message });
            }
        }
    }
}
