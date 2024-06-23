using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Skillfy.Server.Dto;
using Skillfy.Server.Repo;
using Skillfy.Server.service;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Controllers
{
    [Route("/api/payment")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly Ipayment _paymentservice;
        private readonly ICourseRepositary _courserepositary;
        private readonly EnrollmentService  _enrollmentService;
    

        public PaymentController(Ipayment payment, ICourseRepositary courserepositary, EnrollmentService enrollmentService)
        {
            _paymentservice = payment;
            _courserepositary = courserepositary;
            _enrollmentService = enrollmentService;
        }

        [HttpPost("Initialize")]
        public async Task<IActionResult> Initialize([FromBody]Paymentdto payment)
        {


           var response=  await _paymentservice.InitializePaymentAsync(payment.price, payment.courseId, payment.userId);

            return Ok(new ResponsViewModel(true, "payment successful", response));
            

        }


        [HttpPost("callback")]
        public async Task<IActionResult> paymentcallback([FromBody] ChapaCallBackModel payment)
        {
            if (payment == null)
            {
                return BadRequest(new ResponsViewModel(false, "dto is null", null));
            }

            var result = await _enrollmentService.EnrollUserAsync(payment);

            if(result == -2)
            {
                return BadRequest(new ResponsViewModel(false, "not filled", null));
            }

            return Ok(new ResponsViewModel(true, "succfully created", result));
        


           


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
}
