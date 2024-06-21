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
    public class MuxController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey;
        private readonly string _apiKeySecret;
        private readonly ILogger<MuxController> _logger;
        private readonly MuxService _mux;

        private readonly LessonService _lessonService;

        public MuxController(IHttpClientFactory httpClientFactory, IConfiguration configuration, LessonService lessonService, ILogger<MuxController> logger, MuxService mux)
        {
            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["Mux:AccessToken"];
            _apiKeySecret = configuration["Mux:SecretKey"];
            _lessonService = lessonService;
            _logger = logger;
            _mux = mux;
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

        //[HttpPost("getid")]
        //public async Task<IActionResult> GetPlaybackUrl([FromBody] uploadlessondto uploadlessondto)
        //{
        //    try
        //    {

        //        var playbackId = await _mux.CreatePlaybackIdAsync(uploadlessondto.assetId);
        //        var playbackUrl = _mux.GetPlaybacktoUrl(playbackId);

        //        var id = await _lessonService.SaveLessonAsync(uploadlessondto.chpaterid, playbackUrl, uploadlessondto.title);

        //        if (id < 0)
        //            return BadRequest(new ResponsViewModel(false, "lesson not saved", null));

        //        return Ok(new ResponsViewModel(true, "succesfull", "playbackUrl"));
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}

        [HttpPost("getid")]
        public async Task<IActionResult> GetPlaybackUrl(FetchAssetIdDto dto)
        {
            var AssetId = await _mux.GetAssetId(dto.UploadId);
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

            var response = await client.GetAsync($"https://api.mux.com/video/v1/assets/{AssetId}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var responseData = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseData);
            var playbackId = jsonResponse.GetProperty("data").GetProperty("playback_ids")[0].GetProperty("id").GetString();
            var playbackUrl = $"https://stream.mux.com/{playbackId}.m3u8";

            return Ok(new { playbackUrl });
        }

        //[HttpPost("fetch-asset-id")]
        //public async Task<IActionResult> GetAssetId([FromBody] FetchAssetIdDto dto)
        //{

        //    try
        //    {
        //        var client = _httpClientFactory.CreateClient();
        //        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
        //            Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

        //        var response = await client.GetAsync($"https://api.mux.com/video/v1/uploads/{dto.UploadId}");

        //        if (!response.IsSuccessStatusCode)
        //        {
        //            return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
        //        }

        //        var responseData = await response.Content.ReadAsStringAsync();
        //        var jsonResponse = System.Text.Json.JsonSerializer.Deserialize<JsonElement>(responseData);

        //        var assetId = jsonResponse.GetProperty("data").GetProperty("asset_id").GetString();

        //        return Ok(new { assetId });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, ex.Message);
        //    }
        //}
    }   




    }

    public class FetchAssetIdDto
{
        public string UploadId { get; set; }
    }

    public class uploadlessondto
    {
        public string title { get; set; }

        public int chpaterid { get; set; }

        public string assetId { get; set; }

    }



}


