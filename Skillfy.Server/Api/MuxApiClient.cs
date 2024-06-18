using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;


namespace Skillfy.Server.Api
{

    using Microsoft.AspNetCore.Mvc;
    using Skillfy.Server.Model;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text.Json;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/mux")]
    public class MuxController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey;
        private readonly string _apiKeySecret;

        public MuxController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["Mux:AccessToken"];
            _apiKeySecret = configuration["Mux:SecretKey"];
        }

        [HttpPost("upload-url")]
        public async Task<IActionResult> GetUploadUrl([FromBody] uploadurldto Dto)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

            var requestBody = new
            {
                cors_origin = "*",
                new_asset_settings = new
                {
                    playback_policy = new[] { "public" },
                    metadata = new { Chapterid = Dto.chpaterId,
                     title = Dto.title
                    },
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

            return StatusCode((int)response.StatusCode, response.Content.ReadAsStringAsync());
        }



    }


    public class uploadurldto
    {
        public int chpaterId { get; set; }

        public string title {  get; set; }  

    }
}

