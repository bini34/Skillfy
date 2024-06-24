using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;

public class ChapaPaymentService : Ipayment
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ChapaPaymentService> _logger;
    private readonly string _secretKey;

    public ChapaPaymentService(HttpClient httpClient, IConfiguration configuration, ILogger<ChapaPaymentService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
        _secretKey = configuration["Chapa:SecretKey"];
    }

    public async Task<object> InitializePaymentAsync(int price,int courseId, string userId)
    {

        var txRef = $"{courseId}-{userId}-{Guid.NewGuid()}";
        var returnUrl = $"https://localhost:7182/api/payment/paymentreturn?courseId={courseId}&userId={userId}";
        var paymentData = new
        {

            amount = price.ToString(),
            currency = "ETB",
            tx_ref = txRef,
            callback_url = "https://localhost:7182/api/payment/callback",            
           return_url = returnUrl,
          
        };
 
       var jsonContent = JsonSerializer.Serialize(paymentData);
        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        try
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.chapa.co/v1/transaction/initialize")
            {
                Content = content
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _secretKey);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var respond = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Payment initialized successfully: {0}", respond);
        
            var responseJson = JsonSerializer.Deserialize<object>(respond, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            return responseJson;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error initializing payment");
            throw;
        }
    }


}
