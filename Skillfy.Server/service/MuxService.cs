using System.Net.Http.Headers;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Skillfy.Server.Controllers;
using Microsoft.Extensions.Hosting;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Mvc;

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
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Error fetching asset details: {response.ReasonPhrase}. Response: {errorResponse}");
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
        public async Task<string> CreatePlaybackIdAsync(string assetId)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

                var requestBody = new
                {
                    policy = "public",
                    Content_type = "application/json"
                };

                var response = await client.PostAsJsonAsync($"https://api.mux.com/video/v1/assets/{assetId}/playback-ids", requestBody);

                if (!response.IsSuccessStatusCode)
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    _logger.LogError($"Error creating playback ID: {response.ReasonPhrase}. Response: {errorResponse}");
                    throw new Exception($"Error creating playback ID: {response.ReasonPhrase}");
                }
         
                var responseData = await response.Content.ReadAsStringAsync();
                _logger.LogInformation($"Mux API Response: {responseData}");

                var jsonResponse = JsonDocument.Parse(responseData);
                var playbackId = jsonResponse.RootElement.GetProperty("data").GetProperty("id").GetString();

                return playbackId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in CreatePlaybackIdAsync");
                throw;
            }
        }
        public async Task<string> GetAssetId(string UploadId)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"{_apiKey}:{_apiKeySecret}")));

                var response = await client.GetAsync($"https://api.mux.com/video/v1/uploads/{UploadId}");

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("eroor");
                }

                var responseData = await response.Content.ReadAsStringAsync();
                var jsonResponse = System.Text.Json.JsonSerializer.Deserialize<JsonElement>(responseData);

                var assetId = jsonResponse.GetProperty("data").GetProperty("asset_id").GetString();

                return assetId;
            }
            catch (Exception ex)
            {
                // return StatusCode(500, ex.Message);
                return ("does work");
            }
        }
    }
}
