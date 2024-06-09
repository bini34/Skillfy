using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public class ChapaPaymentService
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

    public async Task<string> InitializePaymentAsync(int price, string email, string Fname, string Lname, int phonenumber)
    {
        var paymentData = new
        {
            amount = price,
            currency = "ETB",
            email = email,
            first_name =Fname,
            last_name = Lname,
            phone_number = "0912345678",
            tx_ref = "chewatatest-6669",
            callback_url = "",
            return_url = "",
            customization = new
            {
                title = "Payment for my favourite merchant",
                description = "I love online payments"
            }
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

            var responseBody = await response.Content.ReadAsStringAsync();
            _logger.LogInformation("Payment initialized successfully: {0}", responseBody);
            return responseBody;
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Error initializing payment");
            throw;
        }
    }
}
