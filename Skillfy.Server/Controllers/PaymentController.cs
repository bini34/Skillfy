using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Skillfy.Server.Dto;
using Skillfy.Server.Repo;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.Controllers
{
    [Route("/api/payment")]
    [ApiController]
    public class PaymentController : Controller
    {
        private readonly Ipayment _paymentservice;
    

        public PaymentController(Ipayment payment)
        {
            _paymentservice = payment;
        }

        [HttpPost("Initialize")]
        public async Task<IActionResult> Initialize([FromBody]Paymentdto payment)
        {


           var response=  await _paymentservice.InitializePaymentAsync(payment.price, payment.courseId, payment.userId);

            return Ok(new ResponsViewModel(true, "payment successful", response));
            


        }
        [HttpPost("getvideourl{assetid}")]
        public async Task<IActionResult> getvideourl(string assetid)
        {
           
            
            return Ok();
        }

    }



    public class ChapaCallbackPayload
    {
        public string Event { get; set; }
        public ChapaTransactionData Data { get; set; }
    }

    public class ChapaTransactionData
    {
        public string Id { get; set; }
        public string TxRef { get; set; }
        public string Amount { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
        public ChapaCustomer Customer { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class ChapaCustomer
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }
}
