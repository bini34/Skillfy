using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;


namespace Skillfy.Server.Api
{
    public class MuxApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _apiSecret;

        public MuxApiClient(string apiKey, string apiSecret)
        {
            _apiKey = apiKey;
            _apiSecret = apiSecret;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://api.mux.com")
            };
            var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_apiKey}:{_apiSecret}"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);
        }

        public async Task<string> UploadVideoAsync(string filePath)
        {
            var requestContent = new
            {
                input = new
                {
                    url = $"file://{filePath}"
                },
                playback_policy = new[] { "public" }
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestContent), Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/video/v1/uploads", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var jsonResponse = JsonConvert.DeserializeObject<dynamic>(responseContent);
            return jsonResponse.data.playback_ids[0].id.ToString();
        }
    }
}
