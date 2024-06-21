using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;

namespace Skillfy.Server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Skillfy.Server.Model;
    using Skillfy.Server.service;
    using Skillfy.Server.ViewModel;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Text.Json;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/mux")]
    public class MuxController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey;
        private readonly string _apiKeySecret;

        private readonly LessonService _lessonService;

        public MuxController(IHttpClientFactory httpClientFactory, IConfiguration configuration, LessonService lessonService)
        {
            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["Mux:AccessToken"];
            _apiKeySecret = configuration["Mux:SecretKey"];
            _lessonService = lessonService;
        }

        [HttpPost("upload-url")]
        public async Task<IActionResult> GetUploadUrl()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

            var requestBody = new
            {
                cors_origin = "*",
                new_asset_settings = new
                {
                    playback_policy = new[] { "public" },
                    encoding_tier = "baseline"
                }
            };

            var response = await client.PostAsJsonAsync("https://api.mux.com/video/v1/uploads", requestBody);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseData);
                return Ok(jsonResponse);
            }

            return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
        }

        [HttpPost("getplaybackid")]
        public async Task<IActionResult> GetPlaybackUrl([FromBody] uploadlessondto uploadlessondto)
        {
            try
            {
                var playbackId = await GetPlaybackIdAsync(uploadlessondto.assetId);
                var playbackUrl = GeneratePlaybackUrl(playbackId);

                var id = await _lessonService.SaveLessonAsync(uploadlessondto.chapterId, playbackUrl, uploadlessondto.title);

                if (id < 0)
                    return BadRequest(new ResponsViewModel(false, "lesson not saved", null));

                return Ok(new ResponsViewModel(true, "succesfull", playbackUrl));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        public class uploadlessondto
        {
            public string title { get; set; }
            public int chapterId { get; set; }
            public string assetId { get; set; }
        }

        private async Task<string> GetPlaybackIdAsync(string assetId)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
            Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

            var response = await client.GetAsync($"https://api.mux.com/video/v1/assets/{assetId}");

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error fetching asset details: {response.ReasonPhrase}");
            }

            var responseData = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseData);

            var playbackId = jsonResponse.GetProperty("data").GetProperty("playback_ids").EnumerateArray().FirstOrDefault().GetProperty("id").GetString();
            return playbackId;
         }

         private string GeneratePlaybackUrl(string playbackId)
            {
                return $"https://stream.mux.com/{playbackId}.m3u8";
            }
        }
}