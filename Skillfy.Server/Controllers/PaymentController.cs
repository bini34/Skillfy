using Microsoft.AspNetCore.Mvc;
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
        //[HttpPost("callback")]
        //public async Task<IActionResult> callback([FromBody] Paymentdto payment)
        //{



        //}
    }
}
