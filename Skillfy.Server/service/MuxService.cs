using System.Net.Http.Headers;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Skillfy.Server.Controllers;

namespace Skillfy.Server.service
{
    public class MuxService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string _apiKey;
        private readonly string _apiKeySecret;
        private readonly ILogger<MuxController> _logger;
        private readonly LessonService _lessonService;
        public MuxService(IHttpClientFactory httpClientFactory, IConfiguration configuration, LessonService lessonService, ILogger<MuxController> logger) {

            _httpClientFactory = httpClientFactory;
            _apiKey = configuration["Mux:AccessToken"];
            _apiKeySecret = configuration["Mux:SecretKey"];
            _lessonService = lessonService;
            _logger = logger;

        }
        public async Task<string> GetPlaybackIdAsync(string assetId)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

                var response = await client.GetAsync($"https://api.mux.com/video/v1/assets/{assetId}");

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError($"Error fetching asset details: {response.ReasonPhrase}");
                    throw new Exception($"Error fetching asset details: {response.ReasonPhrase}");
                }

                var responseData = await response.Content.ReadAsStringAsync();
                _logger.LogInformation($"Mux API Response: {responseData}");

                var jsonResponse = JsonSerializer.Deserialize<JsonElement>(responseData);
                var playbackId = jsonResponse.GetProperty("data").GetProperty("playback_ids").EnumerateArray().FirstOrDefault().GetProperty("id").GetString();

                return playbackId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in GetPlaybackIdAsync");
                throw;
            }
        }



        public string GetPlaybacktoUrl(string playbackId)
        {
            return $"https://stream.mux.com/{playbackId}.m3u8";
        }

    }
}
