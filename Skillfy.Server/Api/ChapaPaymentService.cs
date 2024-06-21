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

    public async Task<string> InitializePaymentAsync(int price,int courseId, string userId)
    {
        var txRef = $"{courseId}-{userId}-{Guid.NewGuid()}";
        var paymentData = new
        {
            amount = price,
            currency = "ETB",
            tx_ref = txRef,
         //   callback_url = "https://localhost:7182/api/payment/callback",            
            return_url = "",
          
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
            return respond;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error initializing payment");
            throw;
        }
    }


}
