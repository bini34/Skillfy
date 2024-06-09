using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;


namespace Skillfy.Server.Api
{
   
        public class MuxApiClient
        {
            private readonly HttpClient _httpClient;
            private readonly ILogger<MuxApiClient> _logger;
            private readonly string _accessToken;
            private readonly string _secretKey;

            public MuxApiClient(HttpClient httpClient, IConfiguration configuration, ILogger<MuxApiClient> logger)
            {
                _httpClient = httpClient;
                _logger = logger;
                _accessToken = configuration["Mux:AccessToken"];
                _secretKey = configuration["Mux:SecretKey"];

            if (string.IsNullOrEmpty(_accessToken) || string.IsNullOrEmpty(_secretKey))
                {
                    throw new InvalidOperationException("Mux API credentials are not set.");
                }

                _httpClient.BaseAddress = new Uri("https://api.mux.com");
                var byteArray = Encoding.ASCII.GetBytes($"{_accessToken}:{_secretKey}");
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            }

        public async Task UploadVideoAsync(string filePath)
        {
            var content = new MultipartFormDataContent();
            var fileStream = new FileStream(filePath, FileMode.Open);
            content.Add(new StreamContent(fileStream), "file", Path.GetFileName(filePath));
            var retries = 3;
            for (int i = 0; i < retries; i++)
            {
                try
                {
                    _logger.LogInformation("Starting video upload to Mux...");
                    var response = await _httpClient.PostAsync("/video/v1/uploads", content);

                    if (!response.IsSuccessStatusCode)
                    {
                        var responseBody = await response.Content.ReadAsStringAsync();
                        _logger.LogError("Mux API returned an error: {0}", responseBody);
                        throw new HttpRequestException($"Mux API returned an error: {responseBody}");
                        await Task.Delay(2000);
                        continue;

                    }

                    _logger.LogInformation("Video uploaded successfully to Mux.");
                    return;
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, "Error occurred while uploading video to Mux.");
                    throw;
                }

            }
        }
        }
    }

