using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Skillfy.Server.Data;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;

public class ChapaPaymentService : Ipayment
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<ChapaPaymentService> _logger;
    private readonly string _secretKey;
    private readonly ApplicationDbContext _context;
    public ChapaPaymentService(HttpClient httpClient, IConfiguration configuration, ILogger<ChapaPaymentService> logger, ApplicationDbContext context)
    {
        _httpClient = httpClient;
        _logger = logger;
        _secretKey = configuration["Chapa:SecretKey"];
        _context = context;
    }

    public async Task<object> InitializePaymentAsync(int price,int courseId, string userId)
    {

        var teacherid = await _context.courses
      .Where(c => c.CourseID == courseId)
      .Select(c => c.UserId)
      .FirstOrDefaultAsync();

        if (teacherid == null)
        {
            // Handle the case where teacherid is null
            throw new Exception("Teacher ID not found.");
        }

        var txRef = $"{courseId}-{userId}-{Guid.NewGuid()}";

        var bankId = await _context.teachers
            .Where(t => t.UserId == teacherid)
            .Select(t => t.BankId)
            .FirstOrDefaultAsync();

        if (bankId == null)
        {
            // Handle the case where bankno is null
            throw new Exception("Bank ID not found.");
        }

        var bankaccount = await _context.banks
            .Where(b => b.BankId == bankId)
            .Select(b => b.BankAccount)
            .FirstOrDefaultAsync();

        if (bankaccount == null)
        {
            // Handle the case where bankaccount is null
            throw new Exception("Bank account not found.");
        }

        var returnUrl = $"https://localhost:7182/api/payment/paymentreturn/{courseId}/{userId}/{bankaccount}/{price}";


     
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
