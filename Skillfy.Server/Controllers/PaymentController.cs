using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Repo;
using Skillfy.Server.service;
using Skillfy.Server.ViewModel;
using System.Security.Cryptography;
namespace Skillfy.Server.Controllers
{
    [Route("/api/payment")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly Ipayment _paymentservice;
        private readonly ICourseRepositary _courserepositary;
        private readonly EnrollmentService  _enrollmentService;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PaymentController> _logger;


        public PaymentController(Ipayment payment, ICourseRepositary courserepositary, EnrollmentService enrollmentService ,ApplicationDbContext context, ILogger<PaymentController> logger)
        {
            _paymentservice = payment;
            _courserepositary = courserepositary;
            _enrollmentService = enrollmentService;
            _context = context;
            _logger = logger;
        }

        [HttpPost("Initialize")]
        public async Task<IActionResult> Initialize([FromBody]Paymentdto payment)
        {


           var response=  await _paymentservice.InitializePaymentAsync(payment.price, payment.courseId, payment.userId);

            return Ok(new ResponsViewModel(true, "payment successful", response));
            

        }


        //[HttpPost("callback")]
        //public async Task<IActionResult> paymentcallback([FromBody] ChapaCallBackModel payment)
        //{
        //    if (payment == null)
        //    {
        //        return BadRequest(new ResponsViewModel(false, "dto is null", null));
        //    }

        //    var result = await _enrollmentService.EnrollUserAsync(payment);

        //    if(result == -2)
        //    {
        //        return BadRequest(new ResponsViewModel(false, "not filled", null));
        //    }

        //    return Ok(new ResponsViewModel(true, "succfully created", result));
        //}

        [HttpGet("paymentreturn")]
        public async Task<IActionResult> PaymentReturn(int courseId , string userId)
        {
            _logger.LogInformation("Payment return received: courseId={0}, userId={1}, status={2}", courseId, userId);

            var result = await _enrollmentService.EnrollUserAsync(courseId, userId);
               

            if(result < 0)
            {
                return BadRequest(new ResponsViewModel(false, "not registerd", null));
            }

            return Ok(new ResponsViewModel(true, "success full", result));
         
               
        }
    }






}



    //public class ChapaCallbackPayload
    //{
    //    public string Event { get; set; }
    //    public ChapaTransactionData Data { get; set; }
    //}

    //public class ChapaTransactionData
    //{
    //    public string Id { get; set; }
    //    public string TxRef { get; set; }
    //    public string Amount { get; set; }
    //    public string Currency { get; set; }
    //    public string Status { get; set; }
    //    public ChapaCustomer Customer { get; set; }
    //    public DateTime CreatedAt { get; set; }
    //}

    //public class ChapaCustomer
    //{
    //    public string Email { get; set; }
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string PhoneNumber { get; set; }
    //}
