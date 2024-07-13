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
        private readonly TeacherPaymentService _teacherservice;


        public PaymentController(Ipayment payment, ICourseRepositary courserepositary, EnrollmentService enrollmentService ,ApplicationDbContext context, ILogger<PaymentController> logger, TeacherPaymentService teacherservice)
        {
            _paymentservice = payment;
            _courserepositary = courserepositary;
            _enrollmentService = enrollmentService;
            _context = context;
            _logger = logger;
            _teacherservice = teacherservice;
        }

        [HttpPost("Initialize")]
        public async Task<IActionResult> Initialize([FromBody]Paymentdto payment)
        {


           var response=  await _paymentservice.InitializePaymentAsync(payment.price, payment.courseId, payment.userId);

            return Ok(new ResponsViewModel(true, "payment successful", response));
            

        }


        
    
       [HttpGet("paymentreturn/{courseId}/{userId}/{bankaccount}/{price}")]
        public async Task<IActionResult> PaymentReturn(int courseId,  string userId, string bankaccount, int price)
        {
            _logger.LogInformation("Payment return received: courseId={0}, userId={1}", courseId, userId);

            var result = await _enrollmentService.EnrollUserAsync(courseId, userId);
            var updatedprice = Convert.ToInt32(price * 0.1);
           
            var respons = await _teacherservice.payteacher(bankaccount, updatedprice);

            if(respons == false)
            {
                return BadRequest(new ResponsViewModel(false, "teacher did not get paid", null));
            }

            if(result < 0)
            {
                return BadRequest(new ResponsViewModel(false, "not registerd", null));
            }

            return Redirect("https://localhost:5173/");
         
               
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
